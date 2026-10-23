import { formatIsoDay } from "./eventos";

/** Fixed list so the /publicaciones filters don't fragment; mirrors the panel's select in `public/admin/config.yml`. */
export const PUBLICACION_CATEGORIES = ["Artículo", "Guía"] as const;
export type PublicacionCategory = (typeof PUBLICACION_CATEGORIES)[number];

export interface Publicacion {
  /** The file name under `src/data/publicaciones`, and the page URL: `/publicaciones/<slug>`. */
  slug: string;
  title: string;
  /** Publication day, ISO `YYYY-MM-DD`; newest first on /publicaciones. */
  date: string;
  category: PublicacionCategory;
  /** Card text, page lede and meta description. */
  excerpt: string;
  /** Byline, rendered only when supplied — not every publication is individually authored. */
  author?: string;
  /** Markdown written in the panel. Without it the page shows just the excerpt and the file. */
  body?: string;
  /** An uploaded PDF under /articulos, or an external https:// link. */
  file?: string;
  /**
   * "protected" asks for the visitor's email (once every 3 months, for all protected
   * publications) before downloading `file`. The body itself is never gated.
   */
  access: "open" | "protected";
}

export function publicacionPath(publicacion: Pick<Publicacion, "slug">): string {
  return `/publicaciones/${publicacion.slug}`;
}

const WORDS_PER_MINUTE = 200;

/** Estimated reading time of the body in whole minutes (at least 1), or undefined without a body. */
export function readingMinutes(publicacion: Pick<Publicacion, "body">): number | undefined {
  if (!publicacion.body) return undefined;
  const words = publicacion.body.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Meta line for cards and the page, e.g. `29 de julio, 2026 · 6 min de lectura`. */
export function publicacionMeta(publicacion: Pick<Publicacion, "date" | "body">): string {
  const minutes = readingMinutes(publicacion);
  const date = formatIsoDay(publicacion.date);
  return minutes ? `${date} · ${minutes} min de lectura` : date;
}
