import type { MetadataRoute } from "next";
import { NAV_LINKS, SITE } from "@/config/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map(({ href }) => ({
    url: `${SITE.url}${href}`,
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.8,
  }));
}
