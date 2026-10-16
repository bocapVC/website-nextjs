import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuiasArticulos } from "../GuiasArticulos";
import { GUIAS_ARTICULOS } from "@/data/guiasArticulos";

describe("GuiasArticulos", () => {
  it("renders a card for every guide, or a próximamente state when there are none yet", () => {
    render(<GuiasArticulos />);
    if (GUIAS_ARTICULOS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const guide of GUIAS_ARTICULOS) {
        expect(screen.getByText(guide.title)).toBeInTheDocument();
      }
    }
  });
});
