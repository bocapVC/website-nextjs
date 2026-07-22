import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AQuienRepresenta, REPRESENTADOS } from "../AQuienRepresenta";

describe("AQuienRepresenta", () => {
  it("renders one card per category in REPRESENTADOS", () => {
    render(<AQuienRepresenta />);
    for (const item of REPRESENTADOS) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });
});
