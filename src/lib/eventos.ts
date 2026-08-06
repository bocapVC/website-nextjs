import type { Evento } from "@/data/eventos";

export type EventoStatus = "vigente" | "pasado";

const TIMEZONE = "America/La_Paz";

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// Event dates are plain calendar days, not instants, so every comparison below is
// a string comparison between ISO days — ISO `YYYY-MM-DD` sorts lexicographically.
// That sidesteps the usual trap: `new Date("2026-09-18")` is UTC midnight, which
// is still Sept 17 in Bolivia, so Date arithmetic would flip the badge a day early.
/** Today in Bolivia as ISO `YYYY-MM-DD`. */
export function todayInBolivia(now: Date = new Date()): string {
  return isoFormatter.format(now);
}

/** An event stays `vigente` through the end of its last day, then flips to `pasado`. */
export function eventoStatus(evento: Evento, today: string = todayInBolivia()): EventoStatus {
  return (evento.endDate ?? evento.startDate) < today ? "pasado" : "vigente";
}

export function hasVigenteEvento(eventos: Evento[], today: string = todayInBolivia()): boolean {
  return eventos.some((evento) => eventoStatus(evento, today) === "vigente");
}

/** Upcoming/current first (soonest first), then past ones (most recent first). */
export function sortEventos(eventos: Evento[], today: string = todayInBolivia()): Evento[] {
  return [...eventos].sort((a, b) => {
    const statusA = eventoStatus(a, today);
    const statusB = eventoStatus(b, today);
    if (statusA !== statusB) return statusA === "vigente" ? -1 : 1;
    return statusA === "vigente"
      ? a.startDate.localeCompare(b.startDate)
      : b.startDate.localeCompare(a.startDate);
  });
}

// Formatted in UTC to match how the ISO day is parsed, so the day number never shifts.
const dayFormatter = new Intl.DateTimeFormat("es", { day: "numeric", timeZone: "UTC" });
const monthFormatter = new Intl.DateTimeFormat("es", { month: "long", timeZone: "UTC" });

function dateParts(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return {
    day: dayFormatter.format(date),
    month: monthFormatter.format(date),
    year: iso.slice(0, 4),
  };
}

/**
 * Human-readable Spanish date for the card, collapsing a range as far as it can:
 * `14–18 de septiembre, 2026` / `28 de septiembre – 2 de octubre, 2026` /
 * `28 de diciembre, 2026 – 2 de enero, 2027`.
 */
export function formatEventoDate(evento: Evento): string {
  const start = dateParts(evento.startDate);
  const end =
    evento.endDate && evento.endDate !== evento.startDate ? dateParts(evento.endDate) : null;

  if (!end) return `${start.day} de ${start.month}, ${start.year}`;
  if (start.year !== end.year) {
    return `${start.day} de ${start.month}, ${start.year} – ${end.day} de ${end.month}, ${end.year}`;
  }
  if (start.month !== end.month) {
    return `${start.day} de ${start.month} – ${end.day} de ${end.month}, ${start.year}`;
  }
  return `${start.day}–${end.day} de ${start.month}, ${start.year}`;
}
