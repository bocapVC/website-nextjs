import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueHace, ACCIONES } from "../QueHace";

describe("QueHace", () => {
  it("renders one card per action in ACCIONES", () => {
    render(<QueHace />);
    for (const accion of ACCIONES) {
      expect(screen.getByText(accion.title)).toBeInTheDocument();
    }
  });

  it("numbers each card by its position", () => {
    render(<QueHace />);
    for (let i = 0; i < ACCIONES.length; i++) {
      expect(screen.getByText(String(i + 1).padStart(2, "0"))).toBeInTheDocument();
    }
  });
});
