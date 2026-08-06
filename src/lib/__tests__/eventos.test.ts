import { describe, expect, it } from "vitest";
import type { Evento } from "@/data/eventos";
import { eventoStatus, formatEventoDate, sortEventos, todayInBolivia } from "../eventos";

const base: Evento = {
  title: "Demo",
  description: "Demo",
  startDate: "2026-09-14",
  location: "La Paz",
};

const evento = (overrides: Partial<Evento>): Evento => ({ ...base, ...overrides });

describe("todayInBolivia", () => {
  it("returns the Bolivian calendar day as ISO, not the UTC one", () => {
    // 03:00 UTC on the 19th is still 23:00 on the 18th in Bolivia (UTC-4).
    expect(todayInBolivia(new Date("2026-09-19T03:00:00Z"))).toBe("2026-09-18");
  });
});

describe("eventoStatus", () => {
  it("stays vigente on the final day of a range", () => {
    const multiDay = evento({ startDate: "2026-09-14", endDate: "2026-09-18" });
    expect(eventoStatus(multiDay, "2026-09-18")).toBe("vigente");
  });

  it("flips to pasado the day after the range ends", () => {
    const multiDay = evento({ startDate: "2026-09-14", endDate: "2026-09-18" });
    expect(eventoStatus(multiDay, "2026-09-19")).toBe("pasado");
  });

  it("is vigente well before it starts", () => {
    expect(eventoStatus(base, "2026-01-01")).toBe("vigente");
  });

  it("uses startDate as the last day for single-day events", () => {
    expect(eventoStatus(base, "2026-09-14")).toBe("vigente");
    expect(eventoStatus(base, "2026-09-15")).toBe("pasado");
  });
});

describe("formatEventoDate", () => {
  it("formats a single day", () => {
    expect(formatEventoDate(base)).toBe("14 de septiembre, 2026");
  });

  it("collapses a range inside one month", () => {
    expect(formatEventoDate(evento({ endDate: "2026-09-18" }))).toBe(
      "14–18 de septiembre, 2026",
    );
  });

  it("treats an endDate equal to startDate as a single day", () => {
    expect(formatEventoDate(evento({ endDate: "2026-09-14" }))).toBe("14 de septiembre, 2026");
  });

  it("spells out both months when a range crosses months", () => {
    expect(formatEventoDate(evento({ startDate: "2026-09-28", endDate: "2026-10-02" }))).toBe(
      "28 de septiembre – 2 de octubre, 2026",
    );
  });

  it("spells out both years when a range crosses new year", () => {
    expect(formatEventoDate(evento({ startDate: "2026-12-28", endDate: "2027-01-02" }))).toBe(
      "28 de diciembre, 2026 – 2 de enero, 2027",
    );
  });
});

describe("sortEventos", () => {
  it("puts vigente events first (soonest first), then pasado (most recent first)", () => {
    const soon = evento({ title: "soon", startDate: "2026-10-01" });
    const later = evento({ title: "later", startDate: "2026-12-01" });
    const recentlyPast = evento({ title: "recentlyPast", startDate: "2026-08-01" });
    const longPast = evento({ title: "longPast", startDate: "2025-01-01" });

    const sorted = sortEventos([longPast, later, recentlyPast, soon], "2026-09-15");
    expect(sorted.map((item) => item.title)).toEqual([
      "soon",
      "later",
      "recentlyPast",
      "longPast",
    ]);
  });

  it("does not mutate the input array", () => {
    const input = [evento({ title: "b", startDate: "2026-12-01" }), evento({ title: "a" })];
    sortEventos(input, "2026-01-01");
    expect(input.map((item) => item.title)).toEqual(["b", "a"]);
  });
});
