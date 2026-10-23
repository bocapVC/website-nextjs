import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "../PageHeader";

describe("PageHeader", () => {
  it("renders the given hero's photo, alt text and crop position", () => {
    render(
      <PageHeader
        hero={{ photo: "/heroes/ecosistema.avif", alt: "Un panel de BOCAP", position: "top" }}
        eyebrow="Ecosistema"
        title="Título"
        description="Descripción"
      />,
    );
    const img = screen.getByRole("img", { name: "Un panel de BOCAP" });
    expect(img.getAttribute("src")).toContain("url=%2Fheroes%2Fecosistema.avif");
    expect(img).toHaveClass("object-top");
  });

  it("falls back to a centred crop when the position was emptied in the panel", () => {
    const { container } = render(
      <PageHeader
        hero={{ photo: "/heroes/ecosistema.avif", alt: "", position: "" as never }}
        eyebrow="Ecosistema"
        title="Título"
        description="Descripción"
      />,
    );
    expect(container.querySelector("img")).toHaveClass("object-center");
  });
});
