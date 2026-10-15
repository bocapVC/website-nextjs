import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF where the browser supports it, with WebP as the fallback;
    // the default (`["image/webp"]`) alone produces larger files. This now
    // only covers the logo — the section background photos are already
    // authored as AVIF and are served `unoptimized` (see `Section`).
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Oportunidades is soft-deleted: its components and data stay in the repo,
      // but the page is gone. Temporary (307) so the URL can come back later.
      { source: "/oportunidades", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
