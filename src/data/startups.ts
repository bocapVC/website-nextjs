export interface Startup {
  name: string;
  sector: string;
  description: string;
  location: string;
  stage: string;
}

/** No startup entries yet — EcosistemaTabs shows a "próximamente" state until this is populated. */
export const STARTUPS: Startup[] = [];
