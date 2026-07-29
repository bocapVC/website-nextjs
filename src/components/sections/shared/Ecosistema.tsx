import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Ink-toned content band teasing the ecosystem map, with a CTA to explore it. */
export function Ecosistema() {
  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow="Ecosistema"
        title="El mapa de startups e inversionistas de Bolivia"
        description="Explora quién está construyendo, financiando y apoyando nuevas empresas en el país: startups, fondos, ángeles, family offices, aceleradoras, y organizaciones de apoyo."
        invert
      />
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button href="/ecosistema" variant="primary">
          Explorar el mapa
        </Button>
      </div>
    </Section>
  );
}
