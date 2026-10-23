import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getPublicacion, getPublicaciones } from "../getPublicaciones";
import {
  PUBLICACION_CATEGORIES,
  publicacionMeta,
  publicacionPath,
  readingMinutes,
} from "../publicaciones";

/** Writes panel-shaped JSON files into a fresh directory, one per slug. */
function fixtureDir(files: Record<string, object>): string {
  const dir = mkdtempSync(join(tmpdir(), "publicaciones-"));
  for (const [slug, data] of Object.entries(files)) {
    writeFileSync(join(dir, `${slug}.json`), JSON.stringify(data));
  }
  return dir;
}

const BASE = { title: "Guía mínima", date: "2026-05-01", category: "Guía", excerpt: "Resumen." };

describe("getPublicaciones", () => {
  it("takes the slug from the file name and ignores non-JSON files", () => {
    const dir = fixtureDir({ "guia-minima": BASE });
    writeFileSync(join(dir, ".DS_Store"), "");

    expect(getPublicaciones(dir).map((p) => p.slug)).toEqual(["guia-minima"]);
    expect(getPublicacion("guia-minima", dir)?.title).toBe("Guía mínima");
    expect(getPublicacion("otra", dir)).toBeUndefined();
  });

  it("sorts newest first, breaking ties by title", () => {
    const dir = fixtureDir({
      vieja: { ...BASE, title: "Vieja", date: "2025-12-31" },
      b: { ...BASE, title: "Beta", date: "2026-03-10" },
      a: { ...BASE, title: "Alfa", date: "2026-03-10" },
    });

    expect(getPublicaciones(dir).map((p) => p.title)).toEqual(["Alfa", "Beta", "Vieja"]);
  });

  it.each([
    ["missing", {}],
    ["emptied by the panel", { author: "", body: "  ", file: "", access: "" }],
  ])("treats optional fields that are %s as absent, and access as open", (_, optional) => {
    const [publicacion] = getPublicaciones(fixtureDir({ x: { ...BASE, ...optional } }));

    expect(publicacion).toMatchObject({ access: "open" });
    expect(publicacion.author).toBeUndefined();
    expect(publicacion.body).toBeUndefined();
    expect(publicacion.file).toBeUndefined();
  });

  it("keeps protected access", () => {
    const [publicacion] = getPublicaciones(
      fixtureDir({ x: { ...BASE, file: "/articulos/x.pdf", access: "protected" } }),
    );
    expect(publicacion.access).toBe("protected");
  });
});

describe("the published data in src/data/publicaciones", () => {
  const publicaciones = getPublicaciones();

  it.each(publicaciones.map((p) => [p.slug, p]))("%s is well-formed", (_, publicacion) => {
    expect(publicacion.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(publicacion.title).toBeTruthy();
    expect(publicacion.excerpt).toBeTruthy();
    expect(publicacion.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(PUBLICACION_CATEGORIES).toContain(publicacion.category);
    if (publicacion.file?.startsWith("/")) {
      expect(existsSync(join(process.cwd(), "public", publicacion.file))).toBe(true);
    }
  });
});

describe("helpers", () => {
  it("builds the page path from the slug", () => {
    expect(publicacionPath({ slug: "deuda-y-cuasi-equity" })).toBe("/publicaciones/deuda-y-cuasi-equity");
  });

  it("estimates reading time at 200 words a minute, at least one", () => {
    expect(readingMinutes({})).toBeUndefined();
    expect(readingMinutes({ body: "Hola." })).toBe(1);
    expect(readingMinutes({ body: Array(401).fill("palabra").join(" ") })).toBe(3);
  });

  it("shows the date, plus reading time when there is a body", () => {
    expect(publicacionMeta({ date: "2026-09-03" })).toBe("3 de septiembre, 2026");
    expect(publicacionMeta({ date: "2026-09-03", body: "Hola." })).toBe(
      "3 de septiembre, 2026 · 1 min de lectura",
    );
  });
});
