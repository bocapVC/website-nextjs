import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Beneficios } from "../Beneficios";
import { BENEFICIOS } from "@/data/beneficios";

describe("Beneficios", () => {
  it("renders one card per entry in BENEFICIOS", () => {
    render(<Beneficios />);
    for (const beneficio of BENEFICIOS) {
      expect(screen.getByText(beneficio.title)).toBeInTheDocument();
      expect(screen.getByText(beneficio.description)).toBeInTheDocument();
    }
  });

  it("does not render a membership CTA", () => {
    render(<Beneficios />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
