import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Oportunidad } from "@/data/oportunidadesAceleradoras";

interface OportunidadRowProps {
  oportunidad: Oportunidad;
}

/** Single accelerator application row: program + status badge, org, description, deadline, CTA. */
export function OportunidadRow({ oportunidad }: OportunidadRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-brand border border-line bg-surface-solid p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-ink">{oportunidad.program}</p>
          <Badge tone={oportunidad.status === "vigente" ? "gold" : "neutral"}>
            {oportunidad.status === "vigente" ? "Vigente" : "Cerrada"}
          </Badge>
        </div>
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">
          {oportunidad.organization}
        </p>
        <p className="mt-2 text-sm text-ink-soft">{oportunidad.description}</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-ink-soft">
          <span className="font-semibold text-ink">Fecha límite:</span>
          <span>{oportunidad.deadline}</span>
        </p>
      </div>

      {oportunidad.status === "vigente" ? (
        oportunidad.url ? (
          <Button href={oportunidad.url} external size="sm" className="shrink-0">
            Postular
          </Button>
        ) : (
          <Button href="/contacto" variant="ghost" size="sm" className="shrink-0">
            Más información
          </Button>
        )
      ) : null}
    </div>
  );
}
