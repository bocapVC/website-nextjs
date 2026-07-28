import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Photo-band page header: centered eyebrow, serif title, and lede over ecosistema.avif. */
export function EcosistemaHeader() {
  return (
    <Section
      tone="ink"
      firstOnPage
      sectionClassName="section-photo-band section-photo-band--ecosistema lg:flex lg:min-h-[55vh] lg:flex-col lg:items-center lg:justify-center"
      className="relative z-10"
    >
      <SectionHeading
        eyebrow="Ecosistema"
        title="Fondos, ángeles, aceleradoras y startups"
        description="Directorio de organizaciones y emprendimientos que forman parte de la red BOCAP."
        align="center"
        invert
      />
    </Section>
  );
}
