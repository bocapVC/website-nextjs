export interface Evento {
  title: string;
  description: string;
  date: string;
  location: string;
  status: "vigente" | "pasado";
  url?: string;
}

/** No events exist yet — Eventos shows an empty state until this is populated. */
export const EVENTOS: Evento[] = [];
