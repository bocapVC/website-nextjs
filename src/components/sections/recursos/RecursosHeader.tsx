import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Photo-band page header: centered eyebrow, serif title, and lede over illimani.avif (placeholder until a dedicated recursos photo is ready). */
export function RecursosHeader() {
  return (
    <Section
      tone="ink"
      firstOnPage
      photo="/illimani.avif"
      sectionClassName="lg:flex lg:min-h-[55vh] lg:flex-col lg:items-center lg:justify-center"
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
