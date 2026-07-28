import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Photo-band page header: centered eyebrow, serif title, and lede over convocatoria.jpeg. */
export function ConvocatoriasHeader() {
  return (
    <Section
      tone="ink"
      firstOnPage
      sectionClassName="section-photo-band section-photo-band--convocatorias lg:flex lg:min-h-[55vh] lg:flex-col lg:items-center lg:justify-center"
      className="relative z-10"
    >
      <SectionHeading
        eyebrow="Convocatorias"
        title="Eventos y convocatorias"
        description="Encuentros, demo days y convocatorias de aceleradoras del ecosistema."
        align="center"
        invert
      />
    </Section>
  );
}
