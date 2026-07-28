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
            BOCAP es la asociación que reúne al capital que invierte en startups
            en Bolivia. Concentramos información que hoy está dispersa,
            conectamos a inversionistas con los actores relevantes y facilitamos
            el acceso a oportunidades.
          </p>
          <p>
            No administramos capital. Construimos la red, la información y los
            espacios para invertir mejor.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Card>
          <Eyebrow color="teal">Misión</Eyebrow>
          <p className="mt-2 text-sm text-ink-soft">
            Fortalecer el capital emprendedor en Bolivia conectando actores
            clave, generando información relevante, compartiendo mejores
            prácticas y acercando al país a la red regional de venture capital.
          </p>
        </Card>
        <Card>
          <Eyebrow color="teal">Visión</Eyebrow>
          <p className="mt-2 text-sm text-ink-soft">
            Posicionar a Bolivia como un mercado más confiable, visible y
            preparado para atraer, desplegar y escalar capital inteligente con
            estándares competitivos en América Latina.
          </p>
        </Card>
      </div>
    </Section>
  );
}
