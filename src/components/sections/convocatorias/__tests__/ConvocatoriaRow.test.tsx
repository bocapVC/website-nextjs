import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConvocatoriaRow } from "../ConvocatoriaRow";
import type { Convocatoria } from "@/data/convocatoriasAceleradoras";

const vigente: Convocatoria = {
  program: "Aceleradora Andina 2026",
  organization: "Impulso Bolivia",
  description: "Programa de aceleración para startups en etapa temprana.",
  deadline: "30 de septiembre, 2026",
  status: "vigente",
};

describe("ConvocatoriaRow", () => {
  it("renders the program, organization, description, deadline and a Vigente badge", () => {
    render(<ConvocatoriaRow convocatoria={vigente} />);
    expect(screen.getByText(vigente.program)).toBeInTheDocument();
    expect(screen.getByText(vigente.organization)).toBeInTheDocument();
    expect(screen.getByText(vigente.description)).toBeInTheDocument();
    expect(screen.getByText(vigente.deadline)).toBeInTheDocument();
    expect(screen.getByText("Vigente")).toBeInTheDocument();
  });

  it("shows a Postular link to convocatoria.url when vigente with a url", () => {
    const withUrl: Convocatoria = {
      ...vigente,
      url: "https://example.com/postular-aceleradora-andina",
    };
    render(<ConvocatoriaRow convocatoria={withUrl} />);
    const link = screen.getByRole("link", { name: /postular/i });
    expect(link).toHaveAttribute("href", withUrl.url);
  });

  it('shows a "Más información" link to /contacto when vigente without a url', () => {
    render(<ConvocatoriaRow convocatoria={vigente} />);
    const link = screen.getByRole("link", { name: /más información/i });
    expect(link).toHaveAttribute("href", "/contacto");
    expect(screen.queryByRole("link", { name: /postular/i })).not.toBeInTheDocument();
  });

  it("shows no CTA and a Cerrada badge when the convocatoria is closed", () => {
    const cerrada: Convocatoria = {
      ...vigente,
      status: "cerrada",
      url: "https://example.com/postular-aceleradora-andina",
    };
    render(<ConvocatoriaRow convocatoria={cerrada} />);
    expect(screen.getByText("Cerrada")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
