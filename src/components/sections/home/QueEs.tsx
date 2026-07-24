import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Two-column institutional intro: what BOCAP is and why it exists. */
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
    </Section>
  );
}
