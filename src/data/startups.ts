export interface Startup {
  name: string;
  sector: string;
  description: string;
  location: string;
  stage: string;
}

/** No startup entries yet — StartupGrid shows a "Próximamente" state until this is populated. */
export const STARTUPS: Startup[] = [];
