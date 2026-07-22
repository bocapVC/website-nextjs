import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface QuickLink {
  label: string;
  description: string;
  href: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    label: "Ecosistema",
    description: "Startups, fondos, aceleradoras y ángeles activos en Bolivia.",
    href: "/ecosistema",
  },
  {
    label: "Recursos",
    description: "Guías, artículos y reportes sobre capital emprendedor.",
    href: "/recursos",
  },
  {
    label: "Convocatorias",
    description: "Eventos y programas de aceleración abiertos.",
    href: "/convocatorias",
  },
  {
    label: "Membresía",
    description: "Formas de sumarte a la red como miembro.",
    href: "/membresia",
  },
];

/** Mist-toned closing band: link cards to each of the site's other routes. */
export function QuickAccess() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Explora" title="Recorre el sitio" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <Card variant="mini" interactive className="h-full">
              <p className="font-serif text-lg font-bold text-ink">{item.label}</p>
              <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
