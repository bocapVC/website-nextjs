import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Publicacion, PublicacionCategory } from "./publicaciones";

// Reads the file system, so only server code (pages, metadata, sitemap) may import this;
// client components take publications as props and use the pure helpers in ./publicaciones.

const DATA_DIR = join(process.cwd(), "src/data/publicaciones");

/**
 * One JSON file per publication, written by the admin panel (`/admin`). The CMS may
 * save an emptied optional field as `""` or drop it, so both normalize to `undefined`.
 */
function parsePublicacion(slug: string, raw: Record<string, unknown>): Publicacion {
  const optional = (key: string) =>
    typeof raw[key] === "string" && (raw[key] as string).trim() ? (raw[key] as string) : undefined;
  return {
    slug,
    title: String(raw.title),
    date: String(raw.date),
    // The panel's select restricts the category; JSON only types it as a string.
    category: raw.category as PublicacionCategory,
    excerpt: String(raw.excerpt ?? ""),
    author: optional("author"),
    body: optional("body"),
    file: optional("file"),
    access: raw.access === "protected" ? "protected" : "open",
  };
}

/** Every publication, newest first (ties by title). Read at build time — these pages are static. */
export function getPublicaciones(dir: string = DATA_DIR): Publicacion[] {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .map((name) =>
      parsePublicacion(name.slice(0, -".json".length), JSON.parse(readFileSync(join(dir, name), "utf8"))),
    )
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "es"));
}

export function getPublicacion(slug: string, dir?: string): Publicacion | undefined {
  return getPublicaciones(dir).find((publicacion) => publicacion.slug === slug);
}
