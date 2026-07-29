import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuienesConforman } from "../QuienesConforman";
import { JUNTA_DIRECTIVA } from "@/data/juntaDirectiva";
import { MIEMBROS_ALIADOS } from "@/data/miembrosAliados";

describe("QuienesConforman", () => {
  it("labels the partner logo wall as founding members", () => {
    render(<QuienesConforman />);
    expect(screen.getByText("Miembros fundadores")).toBeInTheDocument();
  });

  it("renders a logo tile for every partner in MIEMBROS_ALIADOS", () => {
    render(<QuienesConforman />);
    for (const partner of MIEMBROS_ALIADOS) {
      const logo = screen.getByAltText(partner.name);
      expect(logo).toHaveAttribute("src", expect.stringContaining(partner.logo));
    }
  });

  it("renders one card per member in JUNTA_DIRECTIVA", () => {
    render(<QuienesConforman />);
    for (const member of JUNTA_DIRECTIVA) {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
    }
  });
});
