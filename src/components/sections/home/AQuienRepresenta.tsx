import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Representado {
  label: string;
  description: string;
}

export const REPRESENTADOS: Representado[] = [
  { label: "Fondos", description: "Vehículos de inversión que respaldan startups bolivianas." },
  { label: "Aceleradoras", description: "Programas que forman y aceleran equipos emprendedores." },
  { label: "Ángeles inversionistas", description: "Inversionistas individuales en etapas tempranas." },
  { label: "Organizaciones", description: "Instituciones que impulsan el ecosistema emprendedor." },
];

/** Mist-toned band: mini cards for each of the four constituencies BOCAP represents. */
export function AQuienRepresenta() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Comunidad" title="A quién representa BOCAP" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REPRESENTADOS.map((item) => (
          <Card key={item.label}>
            <p className="font-semibold text-ink">{item.label}</p>
            <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
