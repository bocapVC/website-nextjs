import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  /** Background tone. Defaults to the page's paper background. */
  tone?: "paper" | "mist" | "ink";
  id?: string;
  className?: string;
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  ink: "bg-ink text-white",
};

/** Full-bleed section band with the legacy `--maxw`/`--gutter` content container. */
export function Section({ children, tone = "paper", id, className }: SectionProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], "py-16 sm:py-20")}>
      <div className={cn("mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)]", className)}>
        {children}
      </div>
    </section>
  );
}
