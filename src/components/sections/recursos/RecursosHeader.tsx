import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Photo-band page header: centered eyebrow, serif title, and lede over recursos.jpg. */
export function RecursosHeader() {
  return (
    <Section
      tone="ink"
      firstOnPage
      sectionClassName="section-photo-band section-photo-band--recursos lg:flex lg:min-h-[55vh] lg:flex-col lg:items-center lg:justify-center"
      className="relative z-10"
    >
      <SectionHeading
        eyebrow="Recursos"
        title="Guías, artículos y reportes"
        description="Contenido para entender el ecosistema de capital emprendedor en Bolivia."
        align="center"
        invert
      />
    </Section>
  );
}
