import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Nav } from "./Nav";

/** Floating glass pill header: logo + primary nav + accent CTA. Fixed above all pages.
 * Values below (radius, shadow, background, blur) are ported 1:1 from the legacy
 * `.site-header`/`.site-header__inner` — see reference/legacy-styles.css. */
export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[80] w-full max-[640px]:top-[10px]">
      <div
        className="pointer-events-auto relative mx-auto grid min-h-[78px] w-[min(100%,var(--maxw))] grid-cols-[auto_1fr_auto] items-center gap-10 rounded-[20px] border border-white/[0.08] bg-gradient-to-b from-[rgba(27,40,58,0.72)] to-[rgba(27,40,58,0.6)] px-6 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-[16px] backdrop-saturate-[140%] max-[920px]:grid-cols-[auto_auto] max-[920px]:min-h-[76px] max-[920px]:px-[18px] max-[640px]:rounded-[18px] max-[640px]:px-4 max-[640px]:py-2.5"
      >
        <Link href="/" aria-label="BOCAP — inicio" className="inline-flex items-center gap-3">
          <Logo className="h-[clamp(42px,5vw,58px)] w-auto" />
        </Link>

        <Nav />

        <Button href="/contacto" size="sm" className="justify-self-end max-[920px]:hidden">
          Contacto
        </Button>
      </div>
    </header>
  );
}
