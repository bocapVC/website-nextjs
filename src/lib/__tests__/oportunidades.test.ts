import { describe, expect, it } from "vitest";
import type { Oportunidad } from "@/data/oportunidadesAceleradoras";
import { oportunidadStatus } from "../oportunidades";

const oportunidad: Oportunidad = {
  program: "Demo",
  organization: "Demo Org",
  description: "Demo",
  deadline: "2026-11-01",
};

describe("oportunidadStatus", () => {
  it("stays vigente through the deadline day, then flips to cerrada", () => {
    expect(oportunidadStatus(oportunidad, "2026-10-31")).toBe("vigente");
    expect(oportunidadStatus(oportunidad, "2026-11-01")).toBe("vigente");
    expect(oportunidadStatus(oportunidad, "2026-11-02")).toBe("cerrada");
  });
});
