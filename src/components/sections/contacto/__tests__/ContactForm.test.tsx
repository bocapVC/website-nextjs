import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "../ContactForm";
import { SITE } from "@/config/nav";

function mockFetchOk() {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  });
}

/** The shape the route returns when Google Forms rejects the submission: a readable
 * body reporting failure, which is not the same as the request itself failing. */
function mockFetchRejected() {
  return vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ ok: false, error: "upstream_status" }),
  });
}

function submitButton() {
  return screen.getByRole("button", { name: /enviar mensaje|enviando/i });
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: "Ana" } });
  fireEvent.change(screen.getByLabelText(/^Correo electrónico/), {
    target: { value: "ana@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/^Mensaje/), { target: { value: "Hola" } });
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the Tema select when no fixedTopic is given", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/^Tema/)).toBeInTheDocument();
  });

  it("hides the Tema select when fixedTopic is set", () => {
    render(<ContactForm fixedTopic="Membresia" />);
    expect(screen.queryByLabelText(/^Tema/)).not.toBeInTheDocument();
  });

  it("renders no message hint by default", () => {
    render(<ContactForm />);
    expect(screen.queryByText(/Fondos, Ángeles/)).not.toBeInTheDocument();
  });

  it("renders the messageHint under the Mensaje field when given", () => {
    render(<ContactForm messageHint="Cuéntanos sobre tu organización." />);
    expect(screen.getByText("Cuéntanos sobre tu organización.")).toBeInTheDocument();
  });

  it("submits the fixed topic without the user choosing one", async () => {
    const fetchMock = mockFetchOk();
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm fixedTopic="Membresia" />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(init.body as string)).toMatchObject({ topic: "Membresia" });
  });

  it("resets back to the fixed topic, not empty, after a successful submit", async () => {
    const fetchMock = mockFetchOk();
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm fixedTopic="Membresia" />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    await waitFor(() => expect(screen.getByText("¡Mensaje enviado!")).toBeInTheDocument());

    expect(screen.getByLabelText(/^Nombre/)).toHaveValue("");

    fillRequiredFields();
    fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    const [, secondInit] = fetchMock.mock.calls[1];
    expect(JSON.parse(secondInit.body as string)).toMatchObject({ topic: "Membresia" });
  });

  describe("submission feedback", () => {
    it("shows no status panel before the first submit", () => {
      render(<ContactForm />);

      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("disables the button and labels it Enviando… while the request is in flight", async () => {
      let settle: (value: unknown) => void = () => {};
      vi.stubGlobal(
        "fetch",
        vi.fn().mockReturnValue(new Promise((resolve) => (settle = resolve))),
      );

      render(<ContactForm fixedTopic="Membresia" />);
      fillRequiredFields();
      fireEvent.click(submitButton());

      await waitFor(() => expect(submitButton()).toBeDisabled());
      expect(submitButton()).toHaveTextContent("Enviando…");

      settle({ ok: true, json: async () => ({ ok: true }) });
      await waitFor(() => expect(submitButton()).toBeEnabled());
      expect(submitButton()).toHaveTextContent("Enviar mensaje");
    });

    it("announces the error panel when the submission fails", async () => {
      vi.stubGlobal("fetch", mockFetchRejected());

      render(<ContactForm fixedTopic="Membresia" />);
      fillRequiredFields();
      fireEvent.click(submitButton());

      const panel = await screen.findByRole("status");
      expect(panel).toHaveTextContent("No pudimos enviar tu mensaje");
      expect(panel).toHaveTextContent(SITE.email);
      expect(screen.queryByText("¡Mensaje enviado!")).not.toBeInTheDocument();
    });

    it("announces the error panel when the request never reaches the server", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));

      render(<ContactForm fixedTopic="Membresia" />);
      fillRequiredFields();
      fireEvent.click(submitButton());

      expect(await screen.findByText("No pudimos enviar tu mensaje")).toBeInTheDocument();
    });

    it("keeps what the user typed when the submission fails, so they can retry", async () => {
      vi.stubGlobal("fetch", mockFetchRejected());

      render(<ContactForm fixedTopic="Membresia" />);
      fillRequiredFields();
      fireEvent.click(submitButton());

      await screen.findByText("No pudimos enviar tu mensaje");
      expect(screen.getByLabelText(/^Nombre/)).toHaveValue("Ana");
      expect(screen.getByLabelText(/^Correo electrónico/)).toHaveValue("ana@example.com");
      expect(screen.getByLabelText(/^Mensaje/)).toHaveValue("Hola");
    });

    it("replaces the error panel with the success panel on a successful retry", async () => {
      vi.stubGlobal("fetch", mockFetchRejected());

      render(<ContactForm fixedTopic="Membresia" />);
      fillRequiredFields();
      fireEvent.click(submitButton());
      await screen.findByText("No pudimos enviar tu mensaje");

      vi.stubGlobal("fetch", mockFetchOk());
      fireEvent.click(submitButton());

      expect(await screen.findByText("¡Mensaje enviado!")).toBeInTheDocument();
      expect(screen.queryByText("No pudimos enviar tu mensaje")).not.toBeInTheDocument();
    });
  });
});
