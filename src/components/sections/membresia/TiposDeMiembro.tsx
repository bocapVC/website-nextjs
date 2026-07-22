import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TIPOS_MIEMBRO } from "@/data/tiposMiembro";

/** Feature-card grid of membership tiers; shows an honest "Próximamente" state while TIPOS_MIEMBRO is empty. */
export function TiposDeMiembro() {
  return (
    <Section>
      <SectionHeading eyebrow="Membresía" title="Tipos de miembro" />

      {TIPOS_MIEMBRO.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TIPOS_MIEMBRO.map((tipo) => (
            <Card key={tipo.name}>
              <p className="font-serif text-xl font-bold text-ink">{tipo.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{tipo.description}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {tipo.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span className="text-teal">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">Próximamente: tipos de membresía disponibles en BOCAP.</p>
        </div>
      )}
    </Section>
  );
}
