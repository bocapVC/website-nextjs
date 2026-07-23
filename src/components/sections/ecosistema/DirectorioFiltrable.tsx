"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { DIRECTORIO, DIRECTORY_CATEGORIES } from "@/data/directorio";

/** Chip-filtered directory of funds, VCs and organizations backing the ecosystem. */
export function DirectorioFiltrable() {
  const [filter, setFilter] = useState<string>("Todos");
  const entries =
    filter === "Todos" ? DIRECTORIO : DIRECTORIO.filter((entry) => entry.category === filter);

  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Directorio" title="Fondos, VCs y organizaciones" />

      <div className="mt-8 flex flex-wrap gap-2">
        {DIRECTORY_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors",
              filter === category
                ? "border-red bg-red text-white"
                : "border-line-strong bg-surface-solid text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.name}>
            <Badge>{entry.category}</Badge>
            <p className="mt-3 font-semibold text-ink">{entry.name}</p>
            <p className="text-xs uppercase tracking-wide text-ink-soft">{entry.type}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.description}</p>
            {entry.focus.length > 0 ? (
              <p className="mt-3 text-xs text-ink-soft">
                <span className="font-semibold text-ink">Enfoque: </span>
                {entry.focus.join(", ")}
              </p>
            ) : null}
            <div className="mt-4 flex items-center justify-between gap-2 text-xs text-ink-soft">
              <span>{entry.location}</span>
              {entry.website ? (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-teal hover:text-teal-strong"
                >
                  Visitar sitio →
                </a>
              ) : null}
            </div>
          </Card>
        ))}
      </div>

      {entries.length === 0 ? (
        <p className="mt-8 text-center text-ink-soft">Aún no hay entradas en esta categoría.</p>
      ) : null}
    </Section>
  );
}
