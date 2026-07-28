import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The section background photos are authored as AVIF; the default
    // (`["image/webp"]`) re-encodes them into a larger WebP. Prefer AVIF where
    // the browser supports it, with WebP as the fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
