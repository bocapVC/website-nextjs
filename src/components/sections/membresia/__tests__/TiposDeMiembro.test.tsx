import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TiposDeMiembro } from "../TiposDeMiembro";
import { TIPOS_MIEMBRO } from "@/data/tiposMiembro";

describe("TiposDeMiembro", () => {
  it("renders a card for every member type, or a próximamente state when there are none yet", () => {
    render(<TiposDeMiembro />);
    if (TIPOS_MIEMBRO.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const tipo of TIPOS_MIEMBRO) {
        expect(screen.getByText(tipo.name)).toBeInTheDocument();
      }
    }
  });
});
