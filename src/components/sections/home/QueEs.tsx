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
            BOCAP es la red boliviana de capital emprendedor: un espacio donde fondos,
            aceleradoras, ángeles inversionistas y organizaciones se coordinan para
            fortalecer el ecosistema de startups del país.
          </p>
          <p>
            Trabajamos para que la información, el capital y las oportunidades circulen
            con más fluidez entre quienes construyen y quienes invierten en el futuro
            emprendedor de Bolivia.
          </p>
        </div>
      </div>
    </Section>
  );
}
