import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF where the browser supports it, with WebP as the fallback;
    // the default (`["image/webp"]`) alone produces larger files. This now
    // only covers the logo — the section background photos are already
    // authored as AVIF and are served `unoptimized` (see `Section`).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
