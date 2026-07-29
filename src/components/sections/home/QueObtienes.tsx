import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QUE_OBTIENES } from "@/data/queObtienes";

/** Benefit-card grid: one card per entry in QUE_OBTIENES, closing with a membership CTA. */
export function QueObtienes() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Membresía" title="Qué obtienes como miembro" />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {QUE_OBTIENES.map((item) => (
          <Card key={item.title}>
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
          </Card>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href="/membresia" variant="primary">
          Quiero ser miembro
        </Button>
      </div>
    </Section>
  );
}
