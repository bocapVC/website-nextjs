import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  OportunidadesEventosRecursos,
  buildActivityColumns,
} from "../OportunidadesEventosRecursos";
import type { Oportunidad } from "@/data/oportunidadesAceleradoras";
import type { Evento } from "@/data/eventos";
import type { Report } from "@/data/reportes";

const vigenteOportunidad: Oportunidad = {
  program: "Demo",
  organization: "Demo Org",
  description: "Demo",
  deadline: "2026-01-01",
  status: "vigente",
};

const vigenteEvento: Evento = {
  title: "Demo",
  description: "Demo",
  date: "2026-01-01",
  location: "La Paz",
  status: "vigente",
};

const report: Report = { title: "Demo", description: "Demo", year: 2026 };

describe("buildActivityColumns", () => {
  it("marks a column with content only when it has a vigente/real entry", () => {
    const columns = buildActivityColumns([vigenteOportunidad], [], [], []);
    expect(columns.find((c) => c.key === "oportunidades")?.hasContent).toBe(true);
    expect(columns.find((c) => c.key === "eventos")?.hasContent).toBe(false);
    expect(columns.find((c) => c.key === "recursos")?.hasContent).toBe(false);
  });

  it("ignores non-vigente/cerrada entries", () => {
    const columns = buildActivityColumns(
      [{ ...vigenteOportunidad, status: "cerrada" }],
      [{ ...vigenteEvento, status: "pasado" }],
      [],
      [],
    );
    expect(columns.every((c) => !c.hasContent)).toBe(true);
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
  it("renders nothing with the real current data (fewer than two populated columns)", () => {
    const { container } = render(<OportunidadesEventosRecursos />);
    expect(container).toBeEmptyDOMElement();
  });
});
