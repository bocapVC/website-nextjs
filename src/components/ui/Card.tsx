import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "feature" | "mini" | "news";

interface CardProps {
  children: ReactNode;
  variant?: Variant;
  /** Add hover lift — use for cards that are links. */
  interactive?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  // Prominent bordered card with the brand shadow.
  feature: "rounded-brand border border-line bg-surface-solid p-6 shadow-brand sm:p-7",
  // Compact card for dense grids.
  mini: "rounded-brand-sm border border-line bg-surface-solid p-5",
  // Article/report card with a lighter footprint.
  news: "rounded-brand border border-line bg-surface-solid p-6",
};

/** Shared border + radius + shadow surface. `feature`/`mini`/`news` compose it. */
export function Card({ children, variant = "feature", interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        variants[variant],
        interactive && "transition-transform hover:-translate-y-0.5 hover:shadow-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
