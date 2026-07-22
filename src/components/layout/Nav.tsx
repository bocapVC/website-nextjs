"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/config/nav";

const PRIMARY_LINKS = NAV_LINKS.filter((link) => link.href !== "/contacto");

/** Hamburger toggle + primary nav links, with active-route underline. Renders both the
 * desktop link row and the mobile dropdown panel; breakpoint visibility is CSS-driven. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-navigation"
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        className="hidden max-[920px]:inline-flex max-[920px]:flex-col max-[920px]:items-stretch max-[920px]:justify-self-end max-[920px]:gap-1 max-[920px]:rounded-[16px] max-[920px]:bg-white/[0.08] max-[920px]:p-3"
      >
        <span className="block h-0.5 w-6 rounded-full bg-white" />
        <span className="block h-0.5 w-6 rounded-full bg-white" />
        <span className="block h-0.5 w-6 rounded-full bg-white" />
      </button>

      <nav
        id="site-navigation"
        className={cn(
          "flex flex-wrap items-center justify-center gap-7",
          "max-[920px]:gap-2",
          "max-[920px]:absolute max-[920px]:inset-x-0 max-[920px]:top-[calc(100%+10px)]",
          "max-[920px]:rounded-brand-sm max-[920px]:border max-[920px]:border-white/[0.08]",
          "max-[920px]:bg-[rgba(27,40,58,0.95)] max-[920px]:p-[18px] max-[920px]:shadow-brand",
          open ? "max-[920px]:grid" : "max-[920px]:hidden",
        )}
      >
        {PRIMARY_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={cn(
                "border-b-2 border-transparent pb-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/70 hover:text-white",
                active && "border-white/70 text-white",
              )}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          href="/contacto"
          onClick={close}
          className="hidden max-[920px]:mt-2.5 max-[920px]:inline-flex max-[920px]:w-full items-center justify-center gap-2 rounded-full bg-red px-5 py-3.5 text-sm font-semibold text-white"
        >
          Contacto
        </Link>
      </nav>
    </>
  );
}
