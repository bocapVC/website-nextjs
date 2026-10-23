import type { MetadataRoute } from "next";
import { NAV_LINKS, SITE } from "@/config/nav";
import { getPublicaciones } from "@/lib/getPublicaciones";
import { publicacionPath } from "@/lib/publicaciones";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = NAV_LINKS.map(({ href }) => ({
    url: `${SITE.url}${href}`,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
  const publicaciones: MetadataRoute.Sitemap = getPublicaciones().map((publicacion) => ({
    url: `${SITE.url}${publicacionPath(publicacion)}`,
    lastModified: publicacion.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...publicaciones];
}
