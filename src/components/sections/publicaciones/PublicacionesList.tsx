"use client";

import { useState } from "react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PUBLICACION_CATEGORIES,
  type Publicacion,
  type PublicacionCategory,
} from "@/lib/publicaciones";
import { PublicacionCard } from "./PublicacionCard";

const TABS = ["Todas", ...PUBLICACION_CATEGORIES] as const;
type Tab = (typeof TABS)[number];

const TAB_LABELS: Record<PublicacionCategory, string> = {
  "Artículo": "Artículos",
  "Guía": "Guías",
};

const EMPTY_STATE_COPY: Record<Tab, string> = {
  Todas: "Próximamente: guías y artículos sobre el ecosistema.",
  "Artículo": "Próximamente: artículos sobre el ecosistema.",
  "Guía": "Próximamente: guías sobre el ecosistema.",
};

/** News-card grid of publications, filterable by category, with an honest "Próximamente" state when a filter is empty. */
export function PublicacionesList({ publicaciones }: { publicaciones: Publicacion[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("Todas");
  const visible =
    activeTab === "Todas"
      ? publicaciones
      : publicaciones.filter((publicacion) => publicacion.category === activeTab);

  return (
    <Section>
      <SectionHeading
        eyebrow="Publicaciones"
        title="Guías y artículos"
        description="Contenido para entender el capital emprendedor en Bolivia."
      />

      <FilterTabs
        tabs={TABS}
        active={activeTab}
        onChange={setActiveTab}
        labels={TAB_LABELS}
        className="mt-10"
      />

      {visible.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((publicacion) => (
            <PublicacionCard key={publicacion.slug} publicacion={publicacion} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">{EMPTY_STATE_COPY[activeTab]}</p>
        </div>
      )}
    </Section>
  );
}
