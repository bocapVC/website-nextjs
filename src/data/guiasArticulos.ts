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
      "El artículo argumenta que Bolivia no tiene un problema de talento emprendedor, sino de tamaño de visión. Muchos emprendimientos nacen pensando solo en el mercado local, cuando el verdadero desafío del venture capital exige pensar en escala regional desde el día uno.",
    category: "Artículo",
    meta: "2026",
    author: "Álvaro Villarroel Valencia",
    url: "/articulos/bolivia_como_piloto.pdf",
  },
];
