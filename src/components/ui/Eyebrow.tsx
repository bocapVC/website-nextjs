import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const colorClasses = {
  red: "text-red",
  teal: "text-teal",
  white: "text-white",
} as const;

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /**
   * Text color variant (default red). Use `white` on dark or photo-backed
   * bands, where brand red is too close in luminance to read — the legacy site
   * did the same via `.section--dark-band .eyebrow { color: inherit }`.
   */
  color?: keyof typeof colorClasses;
}

/** Small uppercase label that sits above section headings. */
export function Eyebrow({ children, className, color = "red" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold uppercase tracking-[0.16em]",
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
