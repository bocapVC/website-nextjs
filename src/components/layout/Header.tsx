import Link from "next/link";
import { NAV_LINKS } from "@/config/nav";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "./MobileNav";

/** Site header: logo + primary nav + accent CTA. Sticky within the paper theme. */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-[var(--maxw)] items-center justify-between px-[var(--gutter)] py-4">
        <Link href="/" aria-label="BOCAP — inicio">
          <Logo />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.filter((l) => l.href !== "/contacto").map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-teal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button href="/contacto" size="sm">
              Contacto
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
