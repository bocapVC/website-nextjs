import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Ecosistema } from "../Ecosistema";

describe("Ecosistema", () => {
  it("links the primary CTA to the ecosystem page", () => {
    render(<Ecosistema />);
    expect(screen.getByRole("link", { name: "Explorar el mapa" })).toHaveAttribute(
      "href",
      "/ecosistema",
    );
  });

  it("links the secondary CTA to the contact page", () => {
    render(<Ecosistema />);
    expect(
      screen.getByRole("link", { name: "Agregar mi organización" }),
    ).toHaveAttribute("href", "/contacto");
  });
});
