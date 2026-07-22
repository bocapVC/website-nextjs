export interface Guide {
  title: string;
  excerpt: string;
  category: string;
  meta: string;
  url?: string;
}

/** No guides/articles exist yet — GuiasArticulos shows an empty state until this is populated. */
export const GUIAS_ARTICULOS: Guide[] = [];
