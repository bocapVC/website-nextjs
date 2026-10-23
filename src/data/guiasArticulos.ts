import guiasArticulos from "@/data/guiasArticulos.json";

/** Fixed list so the /publicaciones filters don't fragment; mirrors the panel's select in `public/admin/config.yml`. */
export type GuideCategory = "Artículo" | "Guía";

export interface Guide {
  title: string;
  excerpt: string;
  category: GuideCategory;
  meta: string;
  /** Byline, rendered only when supplied — not every guide is individually authored. */
  author?: string;
  /** An uploaded PDF under /articulos, or an external https:// link. */
  url?: string;
  /**
   * "protected" asks for the visitor's email (once every 3 months, for all protected
   * articles) before downloading. Omitted means "open" — omission is never protected.
   */
  access?: "open" | "protected";
}

/** Edited from the admin panel (`/admin`); list order is display order. Emptied optional fields may be `""` or missing. */
// The panel's selects restrict `category` and `access`; JSON imports type them as plain string.
export const GUIAS_ARTICULOS = guiasArticulos.entries as Guide[];
