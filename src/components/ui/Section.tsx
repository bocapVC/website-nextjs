import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  /** Background tone. Defaults to the page's paper background. */
  tone?: "paper" | "mist" | "ink";
  id?: string;
  className?: string;
  /** Extra classes for the outer full-bleed <section> element. */
  sectionClassName?: string;
  /**
   * Path to a decorative background photo, served through next/image (responsive
   * srcset + format negotiation) beneath the brand gradient overlay. Content is
   * layered above it, so callers still need `relative z-10` on `className`.
   */
  photo?: string;
  /**
   * Preload the background photo — emits a <link rel="preload"> and skips lazy
   * loading. Defaults to `firstOnPage`, where the photo is the LCP element.
   */
  photoPreload?: boolean;
  /**
   * True for the first section on a page. Swaps the default top padding for
   * enough clearance to sit under the fixed floating header, so this
   * section's own background — not the body background — fills the area
   * behind the translucent header (no seam between header and content).
   */
  firstOnPage?: boolean;
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-white",
};

/** Full-bleed section band with the legacy `--maxw`/`--gutter` content container. */
export function Section({
  children,
  tone = "paper",
  id,
  className,
  sectionClassName,
  photo,
  photoPreload,
  firstOnPage = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        toneClasses[tone],
        firstOnPage ? "pt-30" : "pt-15.5 sm:pt-section-pad-y",
        "pb-15.5 sm:pb-section-pad-y",
        photo && "relative overflow-hidden",
        sectionClassName,
      )}
    >
      {photo && (
        <>
          <Image
            src={photo}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            preload={photoPreload ?? firstOnPage}
            className="object-cover"
          />
          <div className="section-photo-overlay" />
        </>
      )}
      <div className={cn("mx-auto w-full max-w-(--maxw) px-(--gutter)", className)}>
        {children}
      </div>
    </section>
  );
}
