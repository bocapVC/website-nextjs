import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BENEFICIOS } from "@/data/beneficios";

/** Mini-card grid of membership benefits; shows an honest "Próximamente" state while BENEFICIOS is empty. */
export function Beneficios() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Membresía" title="Beneficios" />

      {BENEFICIOS.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFICIOS.map((beneficio) => (
            <Card key={beneficio.title} variant="mini">
              <p className="font-semibold text-ink">{beneficio.title}</p>
              <p className="mt-2 text-sm text-ink-soft">{beneficio.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">Próximamente: beneficios de ser miembro de BOCAP.</p>
        </div>
      )}
    </Section>
  );
}
