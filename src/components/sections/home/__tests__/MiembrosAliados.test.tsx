import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MiembrosAliados } from "../MiembrosAliados";
import { MIEMBROS_ALIADOS } from "@/data/miembrosAliados";

describe("MiembrosAliados", () => {
  it("renders a tile for every partner in MIEMBROS_ALIADOS", () => {
    render(<MiembrosAliados />);
    for (const partner of MIEMBROS_ALIADOS) {
      expect(screen.getByText(partner.name)).toBeInTheDocument();
    }
  });
});
