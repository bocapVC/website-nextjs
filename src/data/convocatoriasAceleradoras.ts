export interface Convocatoria {
  program: string;
  organization: string;
  description: string;
  deadline: string;
  status: "vigente" | "cerrada";
  url?: string;
}

/** No accelerator applications exist yet — AceleradorasAplicaciones shows an empty state until this is populated. */
export const CONVOCATORIAS_ACELERADORAS: Convocatoria[] = [];
