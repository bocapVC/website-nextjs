import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SubscribeForm, CONSENT_NOTE } from "../SubscribeForm";

function stubRoute(response: { ok: boolean; json: () => Promise<unknown> } | Promise<never>) {
  const fetchMock = vi.fn().mockReturnValue(
    response instanceof Promise ? response : Promise.resolve(response),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function routeAnswers(ok: boolean, body: unknown) {
  return { ok, json: async () => body };
}

function emailField() {
  return screen.getByLabelText(/correo electrónico/i);
}

async function subscribe(email: string) {
  fireEvent.change(emailField(), { target: { value: email } });
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /suscribirme|enviando/i }));
  });
}

describe("SubscribeForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe.each(["full", "compact"] as const)("%s variant", (variant) => {
    it("shows the consent note", () => {
      render(<SubscribeForm variant={variant} />);

      expect(screen.getByText(CONSENT_NOTE)).toBeInTheDocument();
    });

    it("asks the visitor to check their inbox after a new subscription", async () => {
      stubRoute(routeAnswers(true, { ok: true, status: "pending" }));
      render(<SubscribeForm variant={variant} />);

      await subscribe("ana@example.com");

      expect(screen.getByRole("status")).toHaveTextContent("Revisa tu correo para confirmar");
      expect(emailField()).toHaveValue("");
    });

    it("tells an already-confirmed subscriber they're already in", async () => {
      stubRoute(routeAnswers(true, { ok: true, status: "already_subscribed" }));
      render(<SubscribeForm variant={variant} />);

      await subscribe("ana@example.com");

      expect(screen.getByRole("status")).toHaveTextContent("Ya estás suscrito");
    });

    it.each([
      ["a 502 from the route", () => routeAnswers(false, { ok: false, error: "upstream_status" })],
      ["an unexpected body", () => routeAnswers(true, { ok: true, status: "weird" })],
      ["a network failure", () => Promise.reject(new TypeError("offline")) as Promise<never>],
    ])("shows a friendly error on %s, keeping the email", async (_, response) => {
      stubRoute(response());
      render(<SubscribeForm variant={variant} />);

      await subscribe("ana@example.com");

      expect(screen.getByRole("status")).toHaveTextContent(/no pudimos completar/i);
      expect(emailField()).toHaveValue("ana@example.com");
    });

    it.each([
      ["", /ingresa tu correo/i],
      ["ana@", /correo válido/i],
    ])("validates the email %j without calling the route", async (email, message) => {
      const fetchMock = stubRoute(routeAnswers(true, { ok: true, status: "pending" }));
      render(<SubscribeForm variant={variant} />);

      await subscribe(email);

      expect(screen.getByRole("alert")).toHaveTextContent(message);
      expect(emailField()).toHaveAttribute("aria-invalid", "true");
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("disables the button while submitting and ignores double submissions", async () => {
      let resolve!: (v: unknown) => void;
      const fetchMock = vi.fn().mockReturnValue(new Promise((r) => (resolve = r)));
      vi.stubGlobal("fetch", fetchMock);
      render(<SubscribeForm variant={variant} />);

      await subscribe("ana@example.com");
      const button = screen.getByRole("button", { name: /enviando/i });
      expect(button).toBeDisabled();
      await act(async () => {
        fireEvent.submit(button.closest("form")!);
      });
      expect(fetchMock).toHaveBeenCalledOnce();

      await act(async () => resolve(routeAnswers(true, { ok: true, status: "pending" })));
      expect(screen.getByRole("button", { name: /suscribirme/i })).toBeEnabled();
    });
  });

  it("full variant offers an optional name and sends it", async () => {
    const fetchMock = stubRoute(routeAnswers(true, { ok: true, status: "pending" }));
    render(<SubscribeForm variant="full" />);

    const nameField = screen.getByLabelText(/nombre/i);
    expect(nameField).not.toBeRequired();
    fireEvent.change(nameField, { target: { value: "Ana" } });
    await subscribe("ana@example.com");

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/newsletter");
    expect(JSON.parse(init.body)).toMatchObject({ email: "ana@example.com", name: "Ana" });
  });

  it("compact variant renders only the email field", () => {
    render(<SubscribeForm variant="compact" />);

    expect(screen.queryByLabelText(/nombre/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toEqual([emailField()]);
  });
});
