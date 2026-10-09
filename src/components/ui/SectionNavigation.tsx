"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "que-es", label: "Quiénes somos" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "oportunidades", label: "Actualidad" },
  { id: "quienes", label: "Comunidad" },
  { id: "cierre", label: "Únete" },
];

interface SectionNavigationProps {
  /** Ids of sections that render nothing on this page (e.g. Actualidad below its content threshold), so their dots are dropped. */
  omit?: string[];
}

/** Dots are matched to sections by `id`, never by position on the page. */
export function SectionNavigation({ omit = [] }: SectionNavigationProps) {
  const sections = SECTIONS.filter(({ id }) => !omit.includes(id));
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleDotClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed right-8 top-1/2 z-90 hidden -translate-y-1/2 lg:flex flex-col gap-6"
      aria-label="Section navigation"
    >
      {sections.map((section) => (
        <div key={section.id} className="group flex items-center justify-end gap-3">
          <span className="text-xs font-medium text-red opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
            {section.label}
          </span>
          <button
            onClick={() => handleDotClick(section.id)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${
              activeId === section.id
                ? "h-3 w-3 bg-red"
                : "h-2.5 w-2.5 bg-ink-soft hover:bg-red"
            }`}
            aria-label={`Go to ${section.label}`}
            aria-current={activeId === section.id ? "page" : undefined}
          />
        </div>
      ))}
    </nav>
  );
}
