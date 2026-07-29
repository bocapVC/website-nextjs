import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eventos } from "../Eventos";
import { EVENTOS } from "@/data/eventos";

describe("Eventos", () => {
  it("renders a card for every event, or a próximamente state when there are none yet", () => {
    render(<Eventos />);
    if (EVENTOS.length === 0) {
      expect(screen.getByText(/próximamente/i)).toBeInTheDocument();
    } else {
      for (const evento of EVENTOS) {
        expect(screen.getByText(evento.title)).toBeInTheDocument();
      }
    }
  });
});
