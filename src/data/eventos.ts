export interface EventoImage {
  /** Path under `public/`. */
  src: string;
  alt: string;
}

export interface Evento {
  title: string;
  description: string;
  /**
   * Calendar day the event starts, ISO `YYYY-MM-DD`. Both the vigente/pasado
   * badge and the human-readable date on the card are derived from this — see
   * `@/lib/eventos`. Never hand-maintain either.
   */
  startDate: string;
  /** Last day, inclusive, ISO `YYYY-MM-DD`. Omit for single-day events. */
  endDate?: string;
  location: string;
  url?: string;
  /** Flyer/poster, rendered full-bleed at the top of the card. */
  image?: EventoImage;
}

export const EVENTOS: Evento[] = [
  {
    title: "China Insider Access Program: LATAM Investors & Builders",
    description:
      "Delegación de una semana organizada por Orbit Ventures para founders, inversionistas y líderes de innovación de Latinoamérica. Incluye visitas y sesiones privadas en ByteDance (TikTok), Alibaba, DeepSeek y otros referentes del ecosistema chino, además de encuentros con emprendedores e inversores locales.",
    startDate: "2026-09-14",
    endDate: "2026-09-18",
    location: "Shanghái y Hangzhou, China",
    url: "https://orbitventures.com/chinalaunchpad",
    image: {
      src: "/eventos/china-insider-access-program.jpg",
      alt: "China Insider Access Program: LATAM Investors & Builders — Orbit Ventures, 14 al 18 de septiembre de 2026, Shanghái y Hangzhou.",
    },
  },
];
