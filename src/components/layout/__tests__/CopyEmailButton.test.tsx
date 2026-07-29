import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CopyEmailButton } from "../CopyEmailButton";

const EMAIL = "hola@example.com";

/** jsdom has no clipboard, and `navigator.clipboard` is a getter — so it's installed
 * per-test with defineProperty rather than assigned. */
function stubClipboard(writeText: () => Promise<void>) {
  const spy = vi.fn(writeText);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: spy },
    configurable: true,
    writable: true,
  });
  return spy;
}

function removeClipboard() {
  Object.defineProperty(navigator, "clipboard", {
    value: undefined,
    configurable: true,
    writable: true,
  });
}

function button() {
  return screen.getByRole("button");
}

/** Settles the awaited clipboard write. Microtasks aren't affected by fake timers,
 * so an empty async act is enough to let the state update land. */
function flushClipboard() {
  return act(async () => {});
}

describe("CopyEmailButton", () => {
  afterEach(() => {
    vi.useRealTimers();
    removeClipboard();
  });

  it("shows the address and an affordance to copy it", () => {
    stubClipboard(async () => {});
    render(<CopyEmailButton email={EMAIL} />);

    expect(button()).toHaveTextContent(EMAIL);
    expect(button()).toHaveTextContent("copiar");
  });

  it("names the action for screen readers, since the visible label is just the address", () => {
    stubClipboard(async () => {});
    render(<CopyEmailButton email={EMAIL} />);

    expect(button()).toHaveAccessibleName(`Copiar correo ${EMAIL}`);
  });

  it("writes the address to the clipboard and confirms", async () => {
    const writeText = stubClipboard(async () => {});
    render(<CopyEmailButton email={EMAIL} />);

    fireEvent.click(button());

    await waitFor(() => expect(button()).toHaveTextContent("copiado"));
    expect(writeText).toHaveBeenCalledExactlyOnceWith(EMAIL);
  });

  it("reverts to copiar after the feedback window", async () => {
    // Timers must be faked before the click; the reset is scheduled during it.
    vi.useFakeTimers();
    stubClipboard(async () => {});
    render(<CopyEmailButton email={EMAIL} />);

    fireEvent.click(button());
    await flushClipboard();
    expect(button()).toHaveTextContent("copiado");

    act(() => {
      vi.advanceTimersByTime(1800);
    });

    expect(button()).toHaveTextContent("copiar");
  });

  it("keeps showing copiado until the window elapses", async () => {
    vi.useFakeTimers();
    stubClipboard(async () => {});
    render(<CopyEmailButton email={EMAIL} />);

    fireEvent.click(button());
    await flushClipboard();

    act(() => {
      vi.advanceTimersByTime(1700);
    });

    expect(button()).toHaveTextContent("copiado");
  });

  it("claims no success when the clipboard write is refused", async () => {
    const writeText = stubClipboard(() => Promise.reject(new Error("denied")));
    render(<CopyEmailButton email={EMAIL} />);

    fireEvent.click(button());

    await waitFor(() => expect(writeText).toHaveBeenCalled());
    expect(button()).toHaveTextContent("copiar");
    expect(button()).not.toHaveTextContent("copiado");
  });

  it("survives a context with no clipboard API at all", async () => {
    removeClipboard();
    render(<CopyEmailButton email={EMAIL} />);

    expect(() => fireEvent.click(button())).not.toThrow();

    await waitFor(() => expect(button()).toHaveTextContent("copiar"));
    expect(button()).toHaveTextContent(EMAIL);
  });
});
