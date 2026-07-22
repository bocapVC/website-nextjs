import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase red label that sits above section headings. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold uppercase tracking-[0.16em] text-red",
        className,
      )}
    >
      {children}
    </span>
  );
}
