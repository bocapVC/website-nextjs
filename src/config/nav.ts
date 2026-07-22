export interface NavLink {
  label: string;
  href: string;
}

/** Single source of truth for primary navigation — reused by Header and Footer. */
export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Ecosistema", href: "/ecosistema" },
  { label: "Recursos", href: "/recursos" },
  { label: "Convocatorias", href: "/convocatorias" },
  { label: "Membresía", href: "/membresia" },
  { label: "Contacto", href: "/contacto" },
];

/** Site-wide constants. `email` is kept here as a single swap point. */
export const SITE = {
  name: "BOCAP",
  tagline:
    "Impulsamos el desarrollo del capital emprendedor en Bolivia conectando inversión, conocimiento y colaboración regional.",
  email: "bocapbolivia@gmail.com",
} as const;
