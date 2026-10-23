import heroes from "@/data/heroes.json";

/** The pages whose first band is a photo hero. Each has its own slot in the admin panel. */
export type HeroPage = "inicio" | "ecosistema" | "publicaciones" | "membresia";

export interface HeroImage {
  /** Path under /public, e.g. "/heroes/illimani.avif". */
  photo: string;
  /** Empty or missing marks the photo as decorative. */
  alt?: string;
  /** Which part of the photo survives the crop — see `Section`'s `photoPosition`. */
  position?: "center" | "top" | "bottom";
}

/** Edited from the admin panel (`/admin`). Emptied optional fields may be `""` or missing. */
// The panel's select restricts `position`; JSON imports type it as plain string.
export const HEROES = heroes as Record<HeroPage, HeroImage>;
