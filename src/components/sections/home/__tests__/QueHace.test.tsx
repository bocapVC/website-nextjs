import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueHace, PILARES } from "../QueHace";

describe("QueHace", () => {
  it("renders one card per pillar in PILARES", () => {
    render(<QueHace />);
    for (const pilar of PILARES) {
      expect(screen.getByText(pilar.label)).toBeInTheDocument();
      expect(screen.getByText(pilar.title)).toBeInTheDocument();
    }
  });
});
