import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { GuideCard } from "../GuideCard";
import type { Guide } from "@/data/guiasArticulos";

const OPEN: Guide = {
  title: "Artículo abierto",
  excerpt: "Libre.",
  category: "Artículo",
  meta: "2026",
  url: "/articulos/abierto.pdf",
};
const PROTECTED: Guide = {
  ...OPEN,
  title: "Artículo protegido",
  url: "/articulos/protegido.pdf",
  access: "protected",
};
const OTHER_PROTECTED: Guide = {
  ...PROTECTED,
  title: "Otro artículo protegido",
  url: "/articulos/otro.pdf",
};

const DAY = 24 * 60 * 60 * 1000;

/**
 * jsdom has no modal-dialog behavior; stand in for the browser just enough that
 * opening sets `open` and closing fires `close`, as a real <dialog> does.
 */
function polyfillDialog() {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

/** Records which URLs got downloaded through a programmatic anchor click. */
function spyDownloads() {
  const downloads: string[] = [];
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    if (this.hasAttribute("download")) downloads.push(this.getAttribute("href")!);
  });
  return downloads;
}

function stubRoute(response: Promise<unknown> = Promise.resolve({ ok: true, status: 200 })) {
  const fetchMock = vi.fn().mockReturnValue(response);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function dialog() {
  return screen.queryByRole("dialog");
}

function clickDescargar(title = PROTECTED.title) {
  const card = screen.getByText(title).parentElement!;
  fireEvent.click(within(card).getByRole("button", { name: /descargar/i }));
}

async function submitEmail(email: string) {
  const d = screen.getByRole("dialog");
  fireEvent.change(within(d).getByLabelText(/correo electrónico/i), {
    target: { value: email },
  });
  await act(async () => {
    fireEvent.click(within(d).getByRole("button", { name: /enviar y descargar/i }));
  });
}

describe("GuideCard — protected publications", () => {
  let downloads: string[];

  beforeEach(() => {
    polyfillDialog();
    downloads = spyDownloads();
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("leaves open articles as a plain download link, with no lock or dialog", () => {
    render(<GuideCard guide={OPEN} />);

    expect(screen.getByRole("link", { name: /descargar/i })).toHaveAttribute("href", OPEN.url);
    expect(screen.queryByText(/requiere correo/i)).not.toBeInTheDocument();
    expect(dialog()).not.toBeInTheDocument();
  });

  it("marks protected articles with a lock indicator and still shows their details", () => {
    render(<GuideCard guide={PROTECTED} />);

    expect(screen.getByText(/requiere correo/i)).toBeInTheDocument();
    expect(screen.getByText(PROTECTED.excerpt)).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("opens a labelled email dialog instead of downloading", () => {
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();

    expect(screen.getByRole("dialog", { name: "Descarga este artículo" })).toBeInTheDocument();
    expect(
      screen.getByText("Usaremos tu correo solo para saber quién lee nuestras publicaciones."),
    ).toBeInTheDocument();
    expect(downloads).toEqual([]);
  });

  it.each([
    ["Esc", () => fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }))],
    ["the close button", () => fireEvent.click(screen.getByRole("button", { name: "Cerrar" }))],
    ["a click on the backdrop", () => fireEvent.click(screen.getByRole("dialog"))],
  ])("dismissing with %s keeps it locked and returns focus", (_, dismiss) => {
    const fetchMock = stubRoute();
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    dismiss();

    expect(dialog()).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /descargar/i })).toHaveFocus();
    expect(downloads).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();

    clickDescargar();
    expect(dialog()).toBeInTheDocument();
  });

  it("doesn't close when clicking inside the dialog's content", () => {
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    fireEvent.click(screen.getByRole("heading", { name: "Descarga este artículo" }));

    expect(dialog()).toBeInTheDocument();
  });

  it.each([
    ["", /ingresa tu correo/i],
    ["ana@", /correo válido/i],
  ])("validates the email %j before sending anything", async (email, message) => {
    const fetchMock = stubRoute();
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    await submitEmail(email);

    expect(screen.getByRole("alert")).toHaveTextContent(message);
    expect(dialog()).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(downloads).toEqual([]);
  });

  it("sends the email and article title, then closes and downloads", async () => {
    const fetchMock = stubRoute();
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    await submitEmail("ana@example.com");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/article-access");
    expect(JSON.parse(init.body)).toEqual({
      email: "ana@example.com",
      article: PROTECTED.title,
    });
    expect(dialog()).not.toBeInTheDocument();
    expect(downloads).toEqual([PROTECTED.url]);
  });

  it.each([
    ["answers with an error", () => Promise.resolve({ ok: false, status: 502 })],
    ["is unreachable", () => Promise.reject(new TypeError("network error"))],
  ])("still unlocks and downloads when the route %s", async (_, response) => {
    stubRoute(response());
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    await submitEmail("ana@example.com");

    expect(downloads).toEqual([PROTECTED.url]);
    expect(dialog()).not.toBeInTheDocument();
  });

  it("disables the submit button while the email is being sent", async () => {
    let resolve!: (v: unknown) => void;
    stubRoute(new Promise((r) => (resolve = r)));
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    await submitEmail("ana@example.com");

    expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();
    await act(async () => resolve({ ok: true, status: 200 }));
    expect(downloads).toEqual([PROTECTED.url]);
  });

  it("unlocks locally without sending anything when the honeypot is filled", async () => {
    const fetchMock = stubRoute();
    const { container } = render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    fireEvent.change(container.querySelector('input[name="website"]')!, {
      target: { value: "spam" },
    });
    await submitEmail("bot@example.com");

    expect(fetchMock).not.toHaveBeenCalled();
    expect(downloads).toEqual([PROTECTED.url]);
  });

  it("downloads every other protected article directly once unlocked", async () => {
    const fetchMock = stubRoute();
    render(
      <>
        <GuideCard guide={PROTECTED} />
        <GuideCard guide={OTHER_PROTECTED} />
      </>,
    );

    clickDescargar(PROTECTED.title);
    await submitEmail("ana@example.com");
    clickDescargar(OTHER_PROTECTED.title);

    expect(dialog()).not.toBeInTheDocument();
    expect(downloads).toEqual([PROTECTED.url, OTHER_PROTECTED.url]);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("stays unlocked for 3 months, then asks again", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-15T12:00:00Z"));
    stubRoute();
    const { unmount } = render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    await submitEmail("ana@example.com");
    unmount();

    // A returning visit, just under 3 months later: still unlocked.
    vi.setSystemTime(new Date("2027-01-14T12:00:00Z"));
    render(<GuideCard guide={OTHER_PROTECTED} />);
    clickDescargar(OTHER_PROTECTED.title);
    expect(dialog()).not.toBeInTheDocument();

    // Past 3 months: the dialog comes back.
    vi.setSystemTime(new Date(new Date("2027-01-15T12:00:00Z").getTime() + DAY));
    clickDescargar(OTHER_PROTECTED.title);
    expect(dialog()).toBeInTheDocument();
    expect(downloads).toEqual([PROTECTED.url, OTHER_PROTECTED.url]);
  });

  it("still completes the flow when localStorage throws", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    stubRoute();
    render(<GuideCard guide={PROTECTED} />);

    clickDescargar();
    expect(dialog()).toBeInTheDocument();
    await submitEmail("ana@example.com");

    expect(downloads).toEqual([PROTECTED.url]);
    expect(dialog()).not.toBeInTheDocument();
  });
});
