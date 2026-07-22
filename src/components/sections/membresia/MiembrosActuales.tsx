import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MIEMBROS_ACTUALES } from "@/data/miembrosActuales";

/** Tile wall of current BOCAP members, one tile per entry in MIEMBROS_ACTUALES. */
export function MiembrosActuales() {
  return (
    <Section>
      <SectionHeading eyebrow="Membresía" title="Miembros actuales" align="center" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MIEMBROS_ACTUALES.map((member) => (
          <div
            key={member.name}
            className="flex flex-col items-center justify-center gap-1 rounded-brand-sm border border-line bg-surface-solid px-4 py-6 text-center"
          >
            <p className="font-semibold text-ink">{member.name}</p>
            <p className="text-xs uppercase tracking-wide text-ink-soft">{member.type}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
