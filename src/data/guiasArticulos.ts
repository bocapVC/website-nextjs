export interface Guide {
  title: string;
  excerpt: string;
  category: string;
  meta: string;
  /** Byline, rendered only when supplied — not every guide is individually authored. */
  author?: string;
  url?: string;
}

export const GUIAS_ARTICULOS: Guide[] = [
  {
    title: "Bolivia como piloto, no como techo",
    excerpt:
      "Bolivia no tiene un problema de talento emprendedor, sino de tamaño de visión. Muchos emprendimientos nacen pensando solo en el mercado local, cuando el verdadero desafío del venture capital exige pensar en escala regional desde el día uno.",
    category: "Artículo",
    meta: "2026",
    author: "Álvaro Villarroel Valencia",
    url: "/articulos/bolivia_como_piloto.pdf",
  },
  {
    title: "Deuda y Cuasi Equity",
    excerpt:
      "Entre la banca que exige garantías y el venture capital que exige escala regional, las startups bolivianas caen en un \"financing gap\". La deuda y el cuasi equity ofrecen una salida real a esa zona gris.",
    category: "Artículo",
    meta: "2026",
    author: "Álvaro Villarroel Valencia",
    url: "/articulos/deuda_y_cuasi_equity.pdf",
  },
];
