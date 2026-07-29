import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONVOCATORIAS_ACELERADORAS } from "@/data/convocatoriasAceleradoras";
import { EVENTOS } from "@/data/eventos";
import { REPORTES } from "@/data/reportes";
import { GUIAS_ARTICULOS } from "@/data/guiasArticulos";
import type { Convocatoria } from "@/data/convocatoriasAceleradoras";
import type { Evento } from "@/data/eventos";
import type { Report } from "@/data/reportes";
import type { Guide } from "@/data/guiasArticulos";

export interface ActivityColumn {
  key: string;
  title: string;
  description: string;
  linkLabel: string;
  href: string;
  hasContent: boolean;
}

/** Pure column builder, extracted so the visibility threshold is fixture-testable. */
export function buildActivityColumns(
  convocatorias: Convocatoria[],
  eventos: Evento[],
  reportes: Report[],
  guias: Guide[],
): ActivityColumn[] {
  return [
    {
      key: "oportunidades",
      title: "Oportunidades abiertas",
      description: "Convocatorias, aceleradoras y programas para startups e inversionistas.",
      linkLabel: "Ver oportunidades",
      href: "/convocatorias",
      hasContent: convocatorias.some((item) => item.status === "vigente"),
    },
    {
      key: "eventos",
      title: "Próximos eventos",
      description: "Encuentros de BOCAP y eventos relevantes dentro y fuera de Bolivia.",
      linkLabel: "Ver eventos",
      href: "/convocatorias",
      hasContent: eventos.some((item) => item.status === "vigente"),
    },
    {
      key: "recursos",
      title: "Reportes y recursos",
      description: "Información para entender el mercado y evaluar oportunidades.",
      linkLabel: "Ver recursos",
      href: "/recursos",
      hasContent: reportes.length > 0 || guias.length > 0,
    },
  ];
}

/**
 * Home teaser for the three activity pages. Each column only appears once its
 * backing data has real, current entries — and the whole section stays
 * hidden unless at least two columns clear that bar, so the home page never
 * teases content that doesn't exist yet.
 */
export function OportunidadesEventosRecursos() {
  const visibleColumns = buildActivityColumns(
    CONVOCATORIAS_ACELERADORAS,
    EVENTOS,
    REPORTES,
    GUIAS_ARTICULOS,
  ).filter((column) => column.hasContent);
  if (visibleColumns.length < 2) return null;

  return (
    <Section>
      <SectionHeading eyebrow="Actividad" title="Oportunidades, eventos y recursos" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleColumns.map((column) => (
          <div key={column.key}>
            <p className="font-semibold text-ink">{column.title}</p>
            <p className="mt-2 text-sm text-ink-soft">{column.description}</p>
            <Link
              href={column.href}
              className="mt-3 inline-block text-sm font-semibold text-teal hover:text-red hover:underline"
            >
              → {column.linkLabel}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
