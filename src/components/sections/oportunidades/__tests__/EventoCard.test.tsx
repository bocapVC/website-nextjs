import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventoCard } from "../EventoCard";
import type { Evento } from "@/data/eventos";

// Dates are deliberately far from today so the derived badge stays deterministic
// no matter when the suite runs.
const vigente: Evento = {
  title: "Demo Day BOCAP",
  description: "Startups del ecosistema presentan ante inversionistas.",
  startDate: "2099-08-15",
  location: "La Paz, Bolivia",
};

describe("EventoCard", () => {
  it("renders the derived date, title, description, location and a Vigente badge", () => {
    render(<EventoCard evento={vigente} />);
    expect(screen.getByText("15 de agosto, 2099")).toBeInTheDocument();
    expect(screen.getByText(vigente.title)).toBeInTheDocument();
    expect(screen.getByText(vigente.description)).toBeInTheDocument();
    expect(screen.getByText(vigente.location)).toBeInTheDocument();
    expect(screen.getByText("Vigente")).toBeInTheDocument();
  });

  it('shows a "Pasado" badge once the event\'s last day has passed', () => {
    const pasado: Evento = { ...vigente, startDate: "2000-08-15", endDate: "2000-08-18" };
    render(<EventoCard evento={pasado} />);
    expect(screen.getByText("Pasado")).toBeInTheDocument();
    expect(screen.queryByText("Vigente")).not.toBeInTheDocument();
  });

  it('renders a "Más información" button pointing at evento.url, opening in a new tab', () => {
    const linked: Evento = { ...vigente, url: "https://example.com/demo-day" };
    render(<EventoCard evento={linked} />);
    const link = screen.getByRole("link", { name: "Más información" });
    expect(link).toHaveAttribute("href", linked.url);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders no button, and no link at all, when url is absent", () => {
    render(<EventoCard evento={vigente} />);
    expect(screen.queryByText("Más información")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not make the card itself a link when url is present", () => {
    const linked: Evento = { ...vigente, url: "https://example.com/demo-day" };
    render(<EventoCard evento={linked} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveTextContent("Más información");
  });

  it("renders the flyer with its alt text when an image is set", () => {
    const withImage: Evento = {
      ...vigente,
      image: { src: "/eventos/demo.jpg", alt: "Afiche del Demo Day" },
    };
    render(<EventoCard evento={withImage} />);
    expect(screen.getByRole("img", { name: "Afiche del Demo Day" })).toBeInTheDocument();
  });

  it("renders no image element when the event has no flyer", () => {
    render(<EventoCard evento={vigente} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
