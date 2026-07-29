import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cierre } from "../Cierre";

describe("Cierre", () => {
  it("links the primary CTA to the membership page", () => {
    render(<Cierre />);
    expect(screen.getByRole("link", { name: "Quiero ser miembro" })).toHaveAttribute(
      "href",
      "/membresia",
    );
  });

  it("links the secondary CTA to the contact page", () => {
    render(<Cierre />);
    expect(
      screen.getByRole("link", { name: "Agregar mi organización" }),
    ).toHaveAttribute("href", "/contacto");
  });
});
