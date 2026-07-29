import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BENEFICIOS } from "@/data/beneficios";

/** Benefit-card grid: one card per entry in BENEFICIOS. */
export function Beneficios() {
  return (
    <Section tone="mist">
      <SectionHeading title="Beneficios" />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {BENEFICIOS.map((beneficio) => (
          <Card key={beneficio.title}>
            <p className="font-semibold text-ink">{beneficio.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{beneficio.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
