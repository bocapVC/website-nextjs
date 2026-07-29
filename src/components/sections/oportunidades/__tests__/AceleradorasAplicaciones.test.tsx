import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AceleradorasAplicaciones } from "../AceleradorasAplicaciones";
import { OPORTUNIDADES_ACELERADORAS } from "@/data/oportunidadesAceleradoras";

describe("AceleradorasAplicaciones", () => {
  it("renders a row for every oportunidad, or a próximamente state when there are none yet", () => {
    render(<AceleradorasAplicaciones />);
    if (OPORTUNIDADES_ACELERADORAS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const oportunidad of OPORTUNIDADES_ACELERADORAS) {
        expect(screen.getByText(oportunidad.program)).toBeInTheDocument();
      }
    }
  });
});
