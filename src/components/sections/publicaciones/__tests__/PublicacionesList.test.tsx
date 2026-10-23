import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PublicacionesList } from "../PublicacionesList";
import type { Publicacion } from "@/lib/publicaciones";

const ARTICULO: Publicacion = {
  slug: "articulo",
  title: "Un artículo",
  date: "2026-04-01",
  category: "Artículo",
  excerpt: "Resumen.",
  access: "open",
};

describe("PublicacionesList", () => {
  it("shows every publication under Todas by default", () => {
    render(<PublicacionesList publicaciones={[ARTICULO]} />);

    expect(screen.getByRole("button", { name: "Todas" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("heading", { name: ARTICULO.title })).toBeInTheDocument();
  });

  it("filters by category, with a próximamente state for an empty one", () => {
    render(<PublicacionesList publicaciones={[ARTICULO]} />);

    fireEvent.click(screen.getByRole("button", { name: "Guías" }));
    expect(screen.queryByRole("heading", { name: ARTICULO.title })).not.toBeInTheDocument();
    expect(screen.getByText("Próximamente: guías sobre el ecosistema.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Artículos" }));
    expect(screen.getByRole("heading", { name: ARTICULO.title })).toBeInTheDocument();
  });

  it("shows a próximamente state when there are none yet", () => {
    render(<PublicacionesList publicaciones={[]} />);
    expect(screen.getByText(/próximamente: guías y artículos/i)).toBeInTheDocument();
  });
});
