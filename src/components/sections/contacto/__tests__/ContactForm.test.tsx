import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "../ContactForm";

function mockFetchOk() {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ ok: true }),
  });
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
});
