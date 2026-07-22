import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventoCard } from "../EventoCard";
import type { Evento } from "@/data/eventos";

const vigente: Evento = {
  title: "Demo Day BOCAP 2026",
  description: "Startups del ecosistema presentan ante inversionistas.",
  date: "15 de agosto, 2026",
  location: "La Paz, Bolivia",
  status: "vigente",
};

describe("EventoCard", () => {
  it("renders the date, title, description, location and a Vigente badge", () => {
    render(<EventoCard evento={vigente} />);
    expect(screen.getByText(vigente.date)).toBeInTheDocument();
    expect(screen.getByText(vigente.title)).toBeInTheDocument();
    expect(screen.getByText(vigente.description)).toBeInTheDocument();
    expect(screen.getByText(vigente.location)).toBeInTheDocument();
    expect(screen.getByText("Vigente")).toBeInTheDocument();
  });

  it('shows a "Pasado" badge for a past event', () => {
    const pasado: Evento = { ...vigente, status: "pasado" };
    render(<EventoCard evento={pasado} />);
    expect(screen.getByText("Pasado")).toBeInTheDocument();
    expect(screen.queryByText("Vigente")).not.toBeInTheDocument();
  });

  it("wraps itself in a link to evento.url when present", () => {
    const linked: Evento = { ...vigente, url: "https://example.com/demo-day-2026" };
    render(<EventoCard evento={linked} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", linked.url);
  });

  it("does not render a link when url is absent", () => {
    render(<EventoCard evento={vigente} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
