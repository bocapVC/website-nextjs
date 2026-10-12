import type { Oportunidad } from "@/data/oportunidadesAceleradoras";
import { todayInBolivia } from "./eventos";

export type OportunidadStatus = "vigente" | "cerrada";

/** Open through the end of its deadline day in Bolivia, then `cerrada`. Same ISO-day comparison as `eventoStatus`. */
export function oportunidadStatus(
  oportunidad: Oportunidad,
  today: string = todayInBolivia(),
): OportunidadStatus {
  return oportunidad.deadline < today ? "cerrada" : "vigente";
}
