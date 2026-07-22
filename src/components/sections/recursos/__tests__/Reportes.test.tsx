import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reportes } from "../Reportes";
import { REPORTES } from "@/data/reportes";

describe("Reportes", () => {
  it("renders a row for every report, or a próximamente state when there are none yet", () => {
    render(<Reportes />);
    if (REPORTES.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const report of REPORTES) {
        expect(screen.getByText(report.title)).toBeInTheDocument();
      }
    }
  });
});
