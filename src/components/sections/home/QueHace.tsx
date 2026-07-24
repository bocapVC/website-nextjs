import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Pilar {
  label: string;
  title: string;
  description: string;
}

export const PILARES: Pilar[] = [
  {
    label: "Agenda sectorial",
    title: "Una voz común para la industria",
    description:
      "Convierte las necesidades del ecosistema en una agenda compartida para mejorar condiciones de inversión, innovación y crecimiento empresarial.",
  },
  {
    label: "Inteligencia de mercado",
    title: "Información para decidir mejor",
    description:
      "Transforma señales dispersas en reportes, benchmarks y lectura sectorial: seis publicaciones activas cubren panorama de mercado, dealflow, inversión ángel, regulación y formación en VC.",
  },
  {
    label: "Desarrollo de capacidades",
    title: "Educación aplicada",
    description:
      "Impulsa formación en venture capital, inversión ángel, escalamiento y gobernanza para profesionalizar una industria en consolidación.",
  },
  {
    label: "Proyección regional",
    title: "Puentes con Latinoamérica",
    description:
      "Abre relación con redes y referentes de la región para ampliar aprendizaje, colaboración, coinversión y visibilidad.",
  },
];

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
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-red">{pilar.label}</p>
            <p className="mt-3 font-serif text-xl font-bold text-ink">{pilar.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{pilar.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
