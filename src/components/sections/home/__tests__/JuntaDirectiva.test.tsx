import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { JuntaDirectiva } from "../JuntaDirectiva";
import { JUNTA_DIRECTIVA } from "@/data/juntaDirectiva";

describe("JuntaDirectiva", () => {
  it("renders one card per member in JUNTA_DIRECTIVA", () => {
    render(<JuntaDirectiva />);
    for (const member of JUNTA_DIRECTIVA) {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByText(member.role)).toBeInTheDocument();
    }
  });
});
