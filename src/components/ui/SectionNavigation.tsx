"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "que-es", label: "¿Qué es?" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "oportunidades", label: "Oportunidades" },
  { id: "quienes", label: "Quiénes Conforman" },
  { id: "cierre", label: "Cierre" },
];

export function SectionNavigation() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observers = new Map();

    const handleIntersection = (index: number) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(index);
        }
      });
    };

    const sectionElements = document.querySelectorAll("section");
    sectionElements.forEach((section, index) => {
      if (index < SECTIONS.length) {
        const observer = new IntersectionObserver(handleIntersection(index), {
          threshold: 0.3,
        });
        observer.observe(section);
        observers.set(index, observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleDotClick = (index: number) => {
    const sections = document.querySelectorAll("section");
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed right-8 top-1/2 z-90 hidden -translate-y-1/2 lg:flex flex-col gap-6"
      aria-label="Section navigation"
    >
      {SECTIONS.map((section, index) => (
        <div key={section.id} className="group flex items-center justify-end gap-3">
          <span className="text-xs font-medium text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
            {section.label}
          </span>
          <button
            onClick={() => handleDotClick(index)}
            className={`cursor-pointer transition-all duration-300 rounded-full ${
              activeSection === index
                ? "h-3 w-3 bg-gold"
                : "h-2.5 w-2.5 bg-ink-soft hover:bg-gold"
            }`}
            aria-label={`Go to ${section.label}`}
            aria-current={activeSection === index ? "page" : undefined}
          />
        </div>
      ))}
    </nav>
  );
}
