import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPublicacion, getPublicaciones } from "@/lib/getPublicaciones";
import { OG_IMAGE_SIZE } from "@/lib/metadata";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublicaciones().map(({ slug }) => ({ slug }));
}

/** Per-publication social preview: the site's gradient and logo with the category and title. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const publicacion = getPublicacion((await params).slug);
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1f2f4a 0%, #1f3557 60%, #2e5b8d 100%)",
          padding: 80,
        }}
      >
        <img src={logoSrc} width={186} height={90} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#c3923e",
            }}
          >
            {publicacion?.category ?? "Publicaciones"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#f5f5f5",
              maxWidth: 1000,
            }}
          >
            {publicacion?.title ?? ""}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
