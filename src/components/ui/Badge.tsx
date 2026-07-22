import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "red" | "ink" | "gold";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  neutral: "border-line bg-paper-strong text-ink-soft",
  red: "border-red/30 bg-red/10 text-red",
  ink: "border-line-strong bg-ink/5 text-ink",
  gold: "border-gold/40 bg-gold/10 text-gold",
};

/** Small pill tag for categories and status labels ("vigente"). */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
