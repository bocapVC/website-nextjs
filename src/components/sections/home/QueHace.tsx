import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PILARES } from "@/data/pilares";

/** Pillar-card grid: one card per entry in PILARES, BOCAP's four strategic axes. */
export function QueHace() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Nuestro rol"
        title="Qué hace BOCAP"
        description="La actividad de BOCAP se organiza sobre cuatro frentes de trabajo, sostenidos con una biblioteca editorial de reportes descargables y una agenda de eventos abierta a la comunidad."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {PILARES.map((pilar) => (
          <Card key={pilar.title}>
            <Eyebrow>{pilar.label}</Eyebrow>
            <p className="mt-3 font-serif text-xl font-bold text-ink">{pilar.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{pilar.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
