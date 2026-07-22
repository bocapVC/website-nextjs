import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Accion {
  title: string;
  description: string;
}

export const ACCIONES: Accion[] = [
  { title: "Conectamos", description: "Ponemos en contacto a fondos, aceleradoras y fundadores." },
  { title: "Informamos", description: "Publicamos reportes y datos sobre el ecosistema boliviano." },
  { title: "Formamos", description: "Compartimos conocimiento a través de guías y eventos." },
  { title: "Representamos", description: "Damos voz a la comunidad emprendedora ante actores clave." },
  { title: "Facilitamos", description: "Acompañamos procesos de inversión y colaboración." },
  { title: "Impulsamos", description: "Promovemos políticas favorables al capital emprendedor." },
];

/** Feature-card grid: one numbered card per entry in ACCIONES. */
export function QueHace() {
  return (
    <Section>
      <SectionHeading eyebrow="Nuestro rol" title="Qué hace BOCAP" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ACCIONES.map((accion, index) => (
          <Card key={accion.title}>
            <p className="font-serif text-2xl font-bold text-red">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 font-semibold text-ink">{accion.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{accion.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
