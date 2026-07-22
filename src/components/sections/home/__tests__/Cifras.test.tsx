import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Cifras } from "../Cifras";
import { CIFRAS } from "@/data/cifras";

describe("Cifras", () => {
  it("renders one stat per entry in CIFRAS", () => {
    render(<Cifras />);
    for (const stat of CIFRAS) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });
});
