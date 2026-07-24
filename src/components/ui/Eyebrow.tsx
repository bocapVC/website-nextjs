import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  /** Text color variant (default red). */
  color?: "red" | "teal";
}

/** Small uppercase label that sits above section headings. */
export function Eyebrow({ children, className, color = "red" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold uppercase tracking-[0.16em]",
        color === "red" ? "text-red" : "text-teal",
        className,
      )}
    >
      {children}
    </span>
  );
}
