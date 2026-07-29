import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OPORTUNIDADES_ACELERADORAS } from "@/data/oportunidadesAceleradoras";
import { OportunidadRow } from "./OportunidadRow";

/** Row list of accelerator applications; shows an honest "Próximamente" state while empty. */
export function AceleradorasAplicaciones() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Aceleradoras" title="Oportunidades abiertas" />

      {OPORTUNIDADES_ACELERADORAS.length > 0 ? (
        <div className="mt-10 flex flex-col gap-4">
          {OPORTUNIDADES_ACELERADORAS.map((oportunidad) => (
            <OportunidadRow key={oportunidad.program} oportunidad={oportunidad} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">
            Próximamente: oportunidades de aceleradoras del ecosistema boliviano.
          </p>
        </div>
      )}
    </Section>
  );
}
