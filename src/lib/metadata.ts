import type { Metadata } from "next";
import { SITE } from "@/config/nav";

/** Shared with src/app/opengraph-image.tsx, which is the single generated image every route uses. */
export const OG_IMAGE_ALT = `${SITE.name} — Capital emprendedor en Bolivia`;
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

const ogImage = {
  url: "/opengraph-image",
  width: OG_IMAGE_SIZE.width,
  height: OG_IMAGE_SIZE.height,
  alt: OG_IMAGE_ALT,
};

/**
 * Page-level metadata is shallow-merged with the root layout's, so a page
 * that sets `openGraph`/`twitter` at all replaces those objects wholesale
 * (see Next.js metadata merging docs) — this keeps every page's social
 * preview in sync with its title/description instead of inheriting the
 * layout's defaults. The opengraph-image file convention only auto-attaches
 * to segments that *inherit* openGraph rather than override it, so the
 * shared image is referenced explicitly here too.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      locale: "es_BO",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
