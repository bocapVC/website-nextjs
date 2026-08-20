import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { OPORTUNIDADES_ACELERADORAS } from "@/data/oportunidadesAceleradoras";
import { EVENTOS } from "@/data/eventos";
import { REPORTES } from "@/data/reportes";
import { GUIAS_ARTICULOS } from "@/data/guiasArticulos";
import type { Oportunidad } from "@/data/oportunidadesAceleradoras";
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
  oportunidades: Oportunidad[],
  eventos: Evento[],
  reportes: Report[],
  guias: Guide[],
): ActivityColumn[] {
  return [
    {
      key: "oportunidades",
      title: "Oportunidades abiertas",
      description: "Oportunidades, aceleradoras y programas para startups e inversionistas.",
      linkLabel: "Ver oportunidades",
      href: "/oportunidades",
      hasContent: oportunidades.some((item) => item.status === "vigente"),
    },
    {
      key: "eventos",
      title: "Eventos",
      description: "Encuentros de BOCAP y eventos relevantes dentro y fuera de Bolivia.",
      linkLabel: "Ver eventos",
      href: "/oportunidades",
      // Deliberately any event, not just vigente ones (unlike `oportunidades`
      // above): while the calendar is this thin, a past event is still worth
      // linking to. Revisit when there's a steady stream of upcoming ones —
      // `hasVigenteEvento` in `@/lib/eventos` is the stricter rule.
      hasContent: eventos.length > 0,
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
    OPORTUNIDADES_ACELERADORAS,
    EVENTOS,
    REPORTES,
    GUIAS_ARTICULOS,
  ).filter((column) => column.hasContent);
  if (visibleColumns.length < 2) return null;

  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Actualidad" title="Oportunidades, eventos y recursos" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleColumns.map((column) => (
          <div
            key={column.key}
            className="flex flex-col gap-4 rounded-brand border border-line bg-surface-solid p-6 shadow-brand transition-all hover:shadow-lg hover:border-line-strong"
          >
            <div className="flex-1">
              <p className="font-semibold text-ink">{column.title}</p>
              <p className="mt-2 text-sm text-ink-soft">{column.description}</p>
            </div>
            <Button href={column.href} variant="secondary" size="sm" className="justify-center">
              {column.linkLabel} →
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
