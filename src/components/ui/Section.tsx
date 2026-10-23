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
   * Path to a background photo, rendered beneath the brand gradient
   * overlay. Content is layered above it, so callers still need `relative z-10`
   * on `className`. Served through the image optimizer, resized to the viewport.
   */
  photo?: string;
  /** Alt text for `photo`. Empty or missing marks it decorative (hidden from screen readers). */
  photoAlt?: string;
  /**
   * Preload the background photo — emits a <link rel="preload"> and skips lazy
   * loading. Defaults to `firstOnPage`, where the photo is the LCP element.
   */
  photoPreload?: boolean;
  /**
   * Which part of the photo to keep when `object-cover` crops it. Shorter
   * bands crop away the most, so the default centre crop can cut the subject
   * out entirely — `heroes/illimani.avif`'s mountain sits in the upper half and is
   * lost on anything below full height. The legacy site set a focal point per
   * hero for the same reason (`center 34%`, `center 22%`, ...).
   */
  photoPosition?: "center" | "top" | "bottom";
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

const photoPositionClasses: Record<NonNullable<SectionProps["photoPosition"]>, string> = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
};

/** Full-bleed section band with the legacy `--maxw`/`--gutter` content container. */
export function Section({
  children,
  tone = "paper",
  id,
  className,
  sectionClassName,
  photo,
  photoAlt,
  photoPreload,
  photoPosition = "center",
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
          {/* Optimized so an admin-uploaded original (up to 5 MB) never
              reaches the browser: resized per viewport and re-encoded to
              AVIF/WebP at the default quality 75. This used to be
              `unoptimized` because a second AVIF generation looked grainy;
              re-checked at 1920px, it isn't visibly noisier than the source
              and is about half the bytes (illimani: 150 KB vs 302 KB). */}
          <Image
            src={photo}
            alt={photoAlt ?? ""}
            aria-hidden={photoAlt ? undefined : true}
            fill
            sizes="100vw"
            preload={photoPreload ?? firstOnPage}
            className={cn("object-cover", photoPositionClasses[photoPosition])}
          />
          <div className="section-photo-overlay" />
        </>
      )}
      <div
        className={cn(
          "mx-auto w-full max-w-(--maxw) px-(--gutter)",
          photo && "section-photo-text",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
