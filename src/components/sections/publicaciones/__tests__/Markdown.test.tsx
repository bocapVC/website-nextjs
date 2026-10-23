import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Markdown } from "../Markdown";

describe("Markdown", () => {
  it("renders the editor's formatting, keeping the page title the only h1", () => {
    render(<Markdown source={"# Primero\n\n## Sección\n\nTexto con **énfasis**.\n\n- uno\n- dos"} />);

    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Primero" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Sección" })).toBeInTheDocument();
    expect(screen.getByText("énfasis").tagName).toBe("STRONG");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("opens off-site links in a new tab and keeps on-site ones in place", () => {
    render(<Markdown source={"[fuera](https://example.com) y [dentro](/membresia)"} />);

    expect(screen.getByRole("link", { name: "fuera" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "dentro" })).not.toHaveAttribute("target");
  });

  it("does not render raw HTML from the source", () => {
    const { container } = render(<Markdown source={'Hola <script>alert(1)</script><img src=x onerror="alert(1)">'} />);

    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("img")).toBeNull();
  });
});
