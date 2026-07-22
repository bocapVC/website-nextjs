"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/config/nav";

/** Minimal disclosure toggle for the header nav on small screens. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink"
      >
        <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
      </button>

      {open ? (
        <nav className="absolute left-0 right-0 top-full border-b border-line bg-paper px-[var(--gutter)] py-4 shadow-brand">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
