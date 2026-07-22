import Image from "next/image";
import { cn } from "@/lib/cn";
import { SITE } from "@/config/nav";

/**
 * Set this to the logo asset path once it's dropped into `public/`
 * (e.g. "/logo.svg"). While null, a bordered wordmark box renders instead —
 * swapping in the real asset is a one-line change here.
 */
const LOGO_SRC: string | null = null;

interface LogoProps {
  /** Render light-on-dark, for use on the ink footer. */
  invert?: boolean;
  className?: string;
}

export function Logo({ invert = false, className }: LogoProps) {
  if (LOGO_SRC) {
    return (
      <Image
        src={LOGO_SRC}
        alt={SITE.name}
        width={120}
        height={32}
        priority
        className={cn("h-8 w-auto", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border-2 px-2.5 py-1 font-serif text-lg font-bold tracking-wide",
        invert ? "border-white text-white" : "border-ink text-ink",
        className,
      )}
    >
      {SITE.name}
    </span>
  );
}
