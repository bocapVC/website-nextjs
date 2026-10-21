import Link from "next/link";
import { NAV_LINKS, SITE } from "@/config/nav";
import { ArrowUpRight } from "@/components/icons/ArrowUpRight";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Logo } from "@/components/ui/Logo";
import { SubscribeForm } from "@/components/sections/newsletter/SubscribeForm";
import { CopyEmailButton } from "./CopyEmailButton";

/** Site footer on the ink theme: brand blurb, nav column, contact column, newsletter signup, meta row. */
export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto w-full max-w-[var(--maxw)] px-[var(--gutter)] py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <Logo className="h-[clamp(52px,6vw,72px)] w-auto" />
            <p className="max-w-sm text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Principal
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Contacto
            </h3>
            <div className="mt-4 flex flex-col items-start gap-2.5">
              <CopyEmailButton email={SITE.email} />
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm text-white/75 transition-colors hover:text-white"
              >
                Escríbenos por correo
              </a>
              {SITE.linkedin ? (
                <ExternalLink
                  href={SITE.linkedin}
                  className="inline-flex items-center gap-1 text-sm text-white/75 transition-colors hover:text-white"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3 w-3" />
                </ExternalLink>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 border-t border-white/15 pt-8 lg:grid-cols-[1.4fr_2fr] lg:items-start">
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-white/50">
              Newsletter
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
              Lo más importante del ecosistema, una vez por trimestre.
            </p>
          </div>
          <div className="max-w-lg">
            <SubscribeForm variant="compact" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.name}</p>
          <p>Bolivia · Capital emprendedor · Ecosistema latinoamericano</p>
        </div>
      </div>
    </footer>
  );
}
