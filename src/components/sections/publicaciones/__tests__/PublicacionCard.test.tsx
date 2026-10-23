import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PublicacionCard } from "../PublicacionCard";
import type { Publicacion } from "@/lib/publicaciones";

const base: Publicacion = {
  slug: "ronda-semilla",
  title: "Cómo estructurar una ronda semilla",
  date: "2026-03-14",
  excerpt: "Una guía práctica sobre términos y expectativas en Bolivia.",
  category: "Guía",
  access: "open",
};

describe("PublicacionCard", () => {
  it("renders the category, title, excerpt and date", () => {
    render(<PublicacionCard publicacion={base} />);
    expect(screen.getByText(base.category)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: base.title })).toBeInTheDocument();
    expect(screen.getByText(base.excerpt)).toBeInTheDocument();
    expect(screen.getByText("14 de marzo, 2026")).toBeInTheDocument();
  });

  it("renders the author only when present", () => {
    const { rerender } = render(<PublicacionCard publicacion={base} />);
    expect(screen.queryByText("María Pérez")).not.toBeInTheDocument();
    rerender(<PublicacionCard publicacion={{ ...base, author: "María Pérez" }} />);
    expect(screen.getByText("María Pérez")).toBeInTheDocument();
  });

  it("links the title and a Leer action to the post page, not the whole card", () => {
    const { container } = render(<PublicacionCard publicacion={{ ...base, body: "Texto." }} />);

    expect(screen.getByRole("link", { name: base.title })).toHaveAttribute("href", "/publicaciones/ronda-semilla");
    expect(screen.getByRole("link", { name: /^Leer/ })).toHaveAttribute("href", "/publicaciones/ronda-semilla");
    expect(screen.getByText(/1 min de lectura/)).toBeInTheDocument();
    expect(container.firstElementChild?.tagName).not.toBe("A");
  });

  it("offers Descargar instead of Leer for a file-only publication", () => {
    render(<PublicacionCard publicacion={{ ...base, file: "/articulos/guia.pdf" }} />);

    expect(screen.getByRole("link", { name: /descargar/i })).toHaveAttribute("href", "/articulos/guia.pdf");
    expect(screen.queryByRole("link", { name: /^Leer/ })).not.toBeInTheDocument();
  });

  it("sends a post that also has a protected file to its page, without the lock badge", () => {
    render(
      <PublicacionCard
        publicacion={{ ...base, body: "Texto.", file: "/articulos/guia.pdf", access: "protected" }}
      />,
    );

    expect(screen.getByRole("link", { name: /^Leer/ })).toBeInTheDocument();
    expect(screen.queryByText(/requiere correo/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /descargar/i })).not.toBeInTheDocument();
  });
});
