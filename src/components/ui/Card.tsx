import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  /** Add hover lift — use for cards that are links. */
  interactive?: boolean;
  className?: string;
}

// Legacy `.mini-card`/`.feature-card`/`.news-card`/`.ally-card`/... share one rule:
// padding 24px, border-radius var(--radius-sm), border #e5e5e5, shadow var(--shadow).
const cardStyles = "rounded-brand-sm border border-line bg-surface-solid p-6 shadow-brand";

/** Shared border + radius + shadow surface used by feature/mini/news card content. */
export function Card({ children, interactive = false, className }: CardProps) {
  return (
    <div
      className={cn(
        cardStyles,
        interactive && "transition-transform hover:-translate-y-0.5 hover:shadow-brand",
        className,
      )}
    >
      {children}
    </div>
  );
}
