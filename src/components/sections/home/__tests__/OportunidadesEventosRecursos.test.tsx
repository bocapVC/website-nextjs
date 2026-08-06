import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  OportunidadesEventosRecursos,
  buildActivityColumns,
} from "../OportunidadesEventosRecursos";
import { OPORTUNIDADES_ACELERADORAS, type Oportunidad } from "@/data/oportunidadesAceleradoras";
import { EVENTOS, type Evento } from "@/data/eventos";
import { REPORTES, type Report } from "@/data/reportes";
import { GUIAS_ARTICULOS } from "@/data/guiasArticulos";

const vigenteOportunidad: Oportunidad = {
  program: "Demo",
  organization: "Demo Org",
  description: "Demo",
  deadline: "2026-01-01",
  status: "vigente",
};

// Far-future/far-past dates keep the derived status deterministic over time.
const vigenteEvento: Evento = {
  title: "Demo",
  description: "Demo",
  startDate: "2099-01-01",
  location: "La Paz",
};

const report: Report = { title: "Demo", description: "Demo", year: 2026 };

describe("buildActivityColumns", () => {
  it("marks a column with content only when it has a vigente/real entry", () => {
    const columns = buildActivityColumns([vigenteOportunidad], [], [], []);
    expect(columns.find((c) => c.key === "oportunidades")?.hasContent).toBe(true);
    expect(columns.find((c) => c.key === "eventos")?.hasContent).toBe(false);
    expect(columns.find((c) => c.key === "recursos")?.hasContent).toBe(false);
  });

  it("ignores cerrada oportunidades", () => {
    const columns = buildActivityColumns([{ ...vigenteOportunidad, status: "cerrada" }], [], [], []);
    expect(columns.every((c) => !c.hasContent)).toBe(true);
  });

  it("counts a past event as content, unlike a cerrada oportunidad", () => {
    const columns = buildActivityColumns([], [{ ...vigenteEvento, startDate: "2000-01-01" }], [], []);
    expect(columns.find((c) => c.key === "eventos")?.hasContent).toBe(true);
  });

  it("counts recursos as real content from reportes alone", () => {
    const columns = buildActivityColumns([], [], [report], []);
    expect(columns.find((c) => c.key === "recursos")?.hasContent).toBe(true);
  });

  it("counts recursos as real content from guias alone", () => {
    const columns = buildActivityColumns([], [], [], [
      { title: "Demo", excerpt: "Demo", category: "Demo", meta: "Demo" },
    ]);
    expect(columns.find((c) => c.key === "recursos")?.hasContent).toBe(true);
  });
});

describe("OportunidadesEventosRecursos", () => {
  it("renders exactly the populated columns of the real data, or nothing below the threshold", () => {
    const populated = buildActivityColumns(
      OPORTUNIDADES_ACELERADORAS,
      EVENTOS,
      REPORTES,
      GUIAS_ARTICULOS,
    ).filter((column) => column.hasContent);

    const { container } = render(<OportunidadesEventosRecursos />);

    if (populated.length < 2) {
      expect(container).toBeEmptyDOMElement();
      return;
    }
    for (const column of populated) {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    }
    expect(screen.getAllByText(/^→ Ver /)).toHaveLength(populated.length);
  });
});
