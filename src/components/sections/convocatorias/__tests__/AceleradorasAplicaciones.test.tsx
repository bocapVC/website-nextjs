import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AceleradorasAplicaciones } from "../AceleradorasAplicaciones";
import { CONVOCATORIAS_ACELERADORAS } from "@/data/convocatoriasAceleradoras";

describe("AceleradorasAplicaciones", () => {
  it("renders a row for every convocatoria, or a próximamente state when there are none yet", () => {
    render(<AceleradorasAplicaciones />);
    if (CONVOCATORIAS_ACELERADORAS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const convocatoria of CONVOCATORIAS_ACELERADORAS) {
        expect(screen.getByText(convocatoria.program)).toBeInTheDocument();
      }
    }
  });
});
