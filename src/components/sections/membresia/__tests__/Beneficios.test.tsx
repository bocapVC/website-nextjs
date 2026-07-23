import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Beneficios } from "../Beneficios";
import { BENEFICIOS } from "@/data/beneficios";

describe("Beneficios", () => {
  it("renders a card for every benefit, or a próximamente state when there are none yet", () => {
    render(<Beneficios />);
    if (BENEFICIOS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const beneficio of BENEFICIOS) {
        expect(screen.getByText(beneficio.title)).toBeInTheDocument();
      }
    }
  });
});
