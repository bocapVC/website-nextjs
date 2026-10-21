import siteSettings from "@/data/siteSettings.json";

export interface NavLink {
  label: string;
  href: string;
}

/** Single source of truth for primary navigation — reused by Header and Footer. */
export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Ecosistema", href: "/ecosistema" },
  { label: "Publicaciones", href: "/publicaciones" },
  { label: "Membresía", href: "/membresia" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contacto", href: "/contacto" },
];

/** Edited from the admin panel (`/admin`); the CMS may drop an emptied optional key. */
const settings: { email: string; linkedin?: string } = siteSettings;

/** Site-wide constants. `email` and `linkedin` come from the admin-edited settings file. */
export const SITE = {
  name: "BOCAP",
  tagline:
    "Impulsamos el desarrollo del capital emprendedor en Bolivia conectando inversión, conocimiento y colaboración regional.",
  email: settings.email,
  /** BOCAP's LinkedIn page; the footer link is hidden when empty. */
  linkedin: settings.linkedin || undefined,
  /** Canonical production origin — used for metadataBase, sitemap.xml, and robots.txt. */
  url: "https://bocap.vc",
} as const;
