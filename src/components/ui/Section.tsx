import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  /** Background tone. Defaults to the page's paper background. */
  tone?: "paper" | "mist" | "ink";
  id?: string;
  className?: string;
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
export function Section({ children, tone = "paper", id, className, firstOnPage = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        toneClasses[tone],
        firstOnPage ? "pt-30" : "pt-15.5 sm:pt-section-pad-y",
        "pb-15.5 sm:pb-section-pad-y",
      )}
    >
      <div className={cn("mx-auto w-full max-w-(--maxw) px-(--gutter)", className)}>
        {children}
      </div>
    </section>
  );
}
