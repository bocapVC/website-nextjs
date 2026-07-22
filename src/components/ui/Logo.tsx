import Image from "next/image";
import { cn } from "@/lib/cn";
import { SITE } from "@/config/nav";

/**
 * Institutional wordmark, transparent PNG with the full lockup (BOCAP + tagline) in
 * white — built for dark surfaces (the header pill, the ink footer), which is the
 * only context this site currently uses it in. Native size is 620×300 (~2.07:1).
 * Height is caller-supplied via `className` (the legacy site sizes it differently in
 * the header vs. the footer — see `.brand-logo`/`.brand-logo--footer` in
 * reference/legacy-styles.css) — always pass an explicit height class.
 */
const LOGO_SRC = "/logo.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt={SITE.name}
      width={132}
      height={64}
      priority
      className={cn("w-auto", className)}
    />
  );
}
