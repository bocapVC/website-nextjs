import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MiembrosActuales } from "../MiembrosActuales";
import { MIEMBROS_ACTUALES } from "@/data/miembrosActuales";

describe("MiembrosActuales", () => {
  it("renders a tile for every member in MIEMBROS_ACTUALES", () => {
    render(<MiembrosActuales />);
    for (const member of MIEMBROS_ACTUALES) {
      expect(screen.getByText(member.name)).toBeInTheDocument();
    }
  });
});
