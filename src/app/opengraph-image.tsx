import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/config/nav";
import { OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/metadata";

export const alt = OG_IMAGE_ALT;
export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

export default async function Image() {
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
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background:
            "linear-gradient(135deg, #1f2f4a 0%, #1f3557 60%, #2e5b8d 100%)",
          padding: 80,
        }}
      >
        <img src={logoSrc} width={340} height={165} alt="" />
        <div
          style={{
            display: "flex",
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#c3923e",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            lineHeight: 1.35,
            textAlign: "center",
            color: "#f5f5f5",
            maxWidth: 880,
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
