import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "success" | "error";

interface StatusPanelProps {
  variant: Variant;
  title: string;
  children?: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  success: "border-teal/30 bg-teal/10 text-teal-strong",
  error: "border-red/30 bg-red/10 text-ink",
};

/** Success/error feedback panel used by the contact form (and future forms). */
export function StatusPanel({ variant, title, children, className }: StatusPanelProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("rounded-brand-sm border p-4 text-sm", variants[variant], className)}
    >
      <p className="font-semibold">{title}</p>
      {children ? <div className="mt-1 leading-relaxed">{children}</div> : null}
    </div>
  );
}
