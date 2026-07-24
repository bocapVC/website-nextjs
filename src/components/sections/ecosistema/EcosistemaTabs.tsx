"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { DIRECTORIO } from "@/data/directorio";
import { STARTUPS } from "@/data/startups";

const TABS = ["Fondos", "Ángeles", "Aceleradoras", "Startups"] as const;
type Tab = (typeof TABS)[number];

const EMPTY_STATE_COPY: Record<Tab, string> = {
  Fondos: "Próximamente: fondos del ecosistema boliviano.",
  "Ángeles": "Próximamente: ángeles inversionistas del ecosistema boliviano.",
  Aceleradoras: "Próximamente: aceleradoras del ecosistema boliviano.",
  Startups: "Próximamente: startups del ecosistema boliviano.",
};

/** Tab-navigated view of the ecosystem: Fondos/Ángeles/Aceleradoras share the directory shape, Startups has its own. */
export function EcosistemaTabs() {
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);

  const directoryEntries =
    activeTab === "Startups" ? [] : DIRECTORIO.filter((entry) => entry.category === activeTab);

  return (
    <Section firstOnPage>
      <SectionHeading
        eyebrow="Ecosistema"
        title="Fondos, ángeles, aceleradoras y startups"
        description="El directorio de organizaciones y emprendimientos que forman parte de la red BOCAP."
      />

      <div className="mt-8 flex flex-wrap gap-6 border-b border-line-strong">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            aria-current={activeTab === tab}
            className={cn(
              "border-b-2 pb-4 text-sm font-semibold uppercase tracking-wide transition-colors",
              activeTab === tab
                ? "border-red text-ink"
                : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Startups" ? (
        STARTUPS.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STARTUPS.map((startup) => (
              <Card key={startup.name}>
                <Badge tone="red">{startup.sector}</Badge>
                <p className="mt-3 font-semibold text-ink">{startup.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {startup.description}
                </p>
                <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">
                  {startup.location} · {startup.stage}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
            <p className="text-ink-soft">{EMPTY_STATE_COPY.Startups}</p>
          </div>
        )
      ) : directoryEntries.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {directoryEntries.map((entry) => (
            <Card key={entry.name}>
              <div className="flex items-center justify-between gap-3">
                {entry.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- fixed-size logo, not a content image; avoids the SVG opt-in next/image needs.
                  <img
                    src={entry.logo}
                    alt={`Logo de ${entry.name}`}
                    className="h-10 w-auto max-w-32 object-contain object-left"
                  />
                ) : null}
                <Badge>{entry.category}</Badge>
              </div>
              <p className="mt-3 font-semibold text-ink">{entry.name}</p>
              <p className="text-xs uppercase tracking-wide text-ink-soft">{entry.type}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.description}</p>
              {entry.focus.length > 0 ? (
                <p className="mt-3 text-xs text-ink-soft">
                  <span className="font-semibold text-ink">Enfoque: </span>
                  {entry.focus.join(", ")}
                </p>
              ) : null}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-ink-soft">{entry.location}</span>
                {entry.website ? (
                  <Button href={entry.website} external size="sm" variant="secondary" className="shrink-0">
                    Visitar sitio →
                  </Button>
                ) : null}
              </div>
            </Card>
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
