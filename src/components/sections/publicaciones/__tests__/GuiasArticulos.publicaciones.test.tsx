import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

/** GUIAS_ARTICULOS is read when `@/data/guiasArticulos` loads, so each case mocks the JSON file and re-imports. */
async function renderGuiasWith(entries: object[]) {
  vi.resetModules();
  vi.doMock("@/data/guiasArticulos.json", () => ({ default: { entries } }));
  const { GuiasArticulos } = await import("../GuiasArticulos");
  render(<GuiasArticulos />);
}

const BASE = { title: "Guía mínima", excerpt: "Resumen.", category: "Guía", meta: "2026" };

describe("GuiasArticulos with admin-edited publicaciones", () => {
  afterEach(() => {
    vi.doUnmock("@/data/guiasArticulos.json");
  });

  it.each([
    ["missing", { ...BASE, url: "/articulos/guia.pdf" }],
    ["empty", { ...BASE, url: "/articulos/guia.pdf", author: "", access: "" }],
  ])("renders an open entry whose optional fields are %s", async (_, entry) => {
    await renderGuiasWith([entry]);

    expect(screen.getByText("Guía mínima")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Descargar/ })).toHaveAttribute(
      "href",
      "/articulos/guia.pdf",
    );
    expect(screen.queryByText("Requiere correo")).not.toBeInTheDocument();
  });

  it("gates a protected entry behind the email dialog instead of a plain link", async () => {
    await renderGuiasWith([{ ...BASE, url: "https://example.com/guia.pdf", access: "protected" }]);

    expect(screen.getByText("Requiere correo")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Descargar/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Descargar/ })).toBeInTheDocument();
  });
});
