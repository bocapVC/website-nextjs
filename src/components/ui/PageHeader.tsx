import type { ComponentProps } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface PageHeaderProps {
  photo: string;
  /** Focal point for the photo crop — see `Section`'s `photoPosition`. */
  photoPosition?: ComponentProps<typeof Section>["photoPosition"];
  eyebrow: string;
  title: string;
  description: string;
}

/** Photo-band page header: centered eyebrow, serif title, and lede over a full-bleed photo. */
export function PageHeader({ photo, photoPosition, eyebrow, title, description }: PageHeaderProps) {
  return (
    <Section
      tone="ink"
      firstOnPage
      photo={photo}
      photoPosition={photoPosition}
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
