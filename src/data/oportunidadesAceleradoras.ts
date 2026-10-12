export interface Oportunidad {
  program: string;
  organization: string;
  description: string;
  /**
   * Last day to apply, inclusive, ISO `YYYY-MM-DD`. The vigente/cerrada status and
   * the displayed date are derived from it — see `@/lib/oportunidades`.
   */
  deadline: string;
  url?: string;
}

/** No accelerator applications exist yet — AceleradorasAplicaciones shows an empty state until this is populated. */
export const OPORTUNIDADES_ACELERADORAS: Oportunidad[] = [];
