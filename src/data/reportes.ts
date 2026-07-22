export interface Report {
  title: string;
  description: string;
  year: number;
  url?: string;
}

/** No reports exist yet — Reportes shows an empty state until this is populated. */
export const REPORTES: Report[] = [];
