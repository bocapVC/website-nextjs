import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Two-column institutional intro: what BOCAP is and why it exists, plus misión/visión. */
export function QueEs() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <SectionHeading eyebrow="Quiénes somos" title="Qué es BOCAP" />
        <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
          <p>
            BOCAP es la plataforma que reúne a quienes están construyendo el
            mercado de capital emprendedor en Bolivia. Conecta fondos,
            inversionistas, startups, aceleradoras, corporativos y aliados que
            comparten una misma ambición: transformar un ecosistema todavía
            naciente en una industria más articulada, visible y lista para
            crecer.
          </p>
          <p>
            Trabajamos para que la información, el capital y las oportunidades
            circulen con más fluidez entre quienes construyen y quienes
            invierten en el futuro emprendedor de Bolivia.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Card>
          <Eyebrow color="teal">Misión</Eyebrow>
          <p className="mt-2 text-sm text-ink-soft">
            Fortalecer el capital emprendedor en Bolivia conectando actores
            clave, generando información relevante, compartiendo mejores
            prácticas y acercando al país a la red regional de venture
            capital.
          </p>
        </Card>
        <Card>
          <Eyebrow color="teal">Visión</Eyebrow>
          <p className="mt-2 text-sm text-ink-soft">
            Posicionar a Bolivia como un mercado más confiable, visible y
            preparado para atraer, desplegar y escalar capital inteligente
            con estándares competitivos en América Latina.
          </p>
        </Card>
      </div>
    </Section>
  );
}
