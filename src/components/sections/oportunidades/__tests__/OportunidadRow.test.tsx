import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { OportunidadRow } from "../OportunidadRow";
import type { Oportunidad } from "@/data/oportunidadesAceleradoras";

const vigente: Oportunidad = {
  program: "Aceleradora Andina 2026",
  organization: "Impulso Bolivia",
  description: "Programa de aceleración para startups en etapa temprana.",
  deadline: "30 de septiembre, 2026",
  status: "vigente",
};

describe("OportunidadRow", () => {
  it("renders the program, organization, description, deadline and a Vigente badge", () => {
    render(<OportunidadRow oportunidad={vigente} />);
    expect(screen.getByText(vigente.program)).toBeInTheDocument();
    expect(screen.getByText(vigente.organization)).toBeInTheDocument();
    expect(screen.getByText(vigente.description)).toBeInTheDocument();
    expect(screen.getByText(vigente.deadline)).toBeInTheDocument();
    expect(screen.getByText("Vigente")).toBeInTheDocument();
  });

  it("shows a Postular link to oportunidad.url when vigente with a url", () => {
    const withUrl: Oportunidad = {
      ...vigente,
      url: "https://example.com/postular-aceleradora-andina",
    };
    render(<OportunidadRow oportunidad={withUrl} />);
    const link = screen.getByRole("link", { name: /postular/i });
    expect(link).toHaveAttribute("href", withUrl.url);
  });

  it('shows a "Más información" link to /contacto when vigente without a url', () => {
    render(<OportunidadRow oportunidad={vigente} />);
    const link = screen.getByRole("link", { name: /más información/i });
    expect(link).toHaveAttribute("href", "/contacto");
    expect(screen.queryByRole("link", { name: /postular/i })).not.toBeInTheDocument();
  });

  it("shows no CTA and a Cerrada badge when the oportunidad is closed", () => {
    const cerrada: Oportunidad = {
      ...vigente,
      status: "cerrada",
      url: "https://example.com/postular-aceleradora-andina",
    };
    render(<OportunidadRow oportunidad={cerrada} />);
    expect(screen.getByText("Cerrada")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
