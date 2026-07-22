import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MIEMBROS_ALIADOS } from "@/data/miembrosAliados";

/** Tile wall of partner names, one tile per entry in MIEMBROS_ALIADOS. */
export function MiembrosAliados() {
  return (
    <Section>
      <SectionHeading eyebrow="Red" title="Miembros y aliados" align="center" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MIEMBROS_ALIADOS.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col items-center justify-center gap-1 rounded-brand-sm border border-line bg-surface-solid px-4 py-6 text-center"
          >
            <p className="font-semibold text-ink">{partner.name}</p>
            <p className="text-xs uppercase tracking-wide text-ink-soft">{partner.type}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
