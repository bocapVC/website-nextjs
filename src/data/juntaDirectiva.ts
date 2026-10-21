import juntaDirectiva from "@/data/juntaDirectiva.json";

export interface BoardMember {
  name: string;
  role: string;
  organization?: string;
  bio?: string;
  linkedin?: string;
  photo?: string;
}

/** Edited from the admin panel (`/admin`); list order is display order. Emptied optional fields may be `""`. */
export const JUNTA_DIRECTIVA: BoardMember[] = juntaDirectiva.members;
