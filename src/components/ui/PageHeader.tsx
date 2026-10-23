import { Section } from "@/components/ui/Section";
import type { HeroImage } from "@/data/heroes";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface PageHeaderProps {
  /** The page's admin-edited hero photo, alt text and crop focal point. */
  hero: HeroImage;
  eyebrow: string;
  title: string;
  description: string;
}

/** Photo-band page header: centered eyebrow, serif title, and lede over a full-bleed photo. */
export function PageHeader({ hero, eyebrow, title, description }: PageHeaderProps) {
  return (
    <Section
      tone="ink"
      firstOnPage
      photo={hero.photo}
      photoAlt={hero.alt}
      photoPosition={hero.position || undefined}
      sectionClassName="lg:flex lg:min-h-[55vh] lg:flex-col lg:items-center lg:justify-center"
      className="relative z-10"
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
        invert
      />
    </Section>
  );
}
