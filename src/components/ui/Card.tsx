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

// Legacy `.mini-card`/`.feature-card`/`.news-card`/`.ally-card`/... share one rule:
// padding 24px, border-radius var(--radius-sm), border #e5e5e5, shadow var(--shadow).
const variants: Record<Variant, string> = {
  feature: "rounded-brand-sm border border-line bg-surface-solid p-6 shadow-brand",
  mini: "rounded-brand-sm border border-line bg-surface-solid p-6 shadow-brand",
  news: "rounded-brand-sm border border-line bg-surface-solid p-6 shadow-brand",
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
