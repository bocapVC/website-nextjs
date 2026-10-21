import directorio from "@/data/directorio.json";

/** One of the three directory tabs that share the DirectoryEntry shape (Startups has its own shape in data/startups.ts). */
export type DirectorioCategory = "Fondos" | "Ángeles" | "Aceleradoras";

export interface DirectoryEntry {
  name: string;
  category: DirectorioCategory;
  type?: string;
  description?: string;
  location?: string;
  focus?: string[];
  website?: string;
  /** Path under /public, e.g. "/logos/escalatec.svg". */
  logo: string;
}

/** Edited from the admin panel (`/admin`); list order is display order. Emptied optional fields may be `""` or missing. */
// The panel's select restricts `category` to DirectorioCategory; JSON imports type it as plain string.
export const DIRECTORIO = directorio.entries as DirectoryEntry[];
