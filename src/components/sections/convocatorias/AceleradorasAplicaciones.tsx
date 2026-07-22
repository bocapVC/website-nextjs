import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONVOCATORIAS_ACELERADORAS } from "@/data/convocatoriasAceleradoras";
import { ConvocatoriaRow } from "./ConvocatoriaRow";

/** Row list of accelerator applications; shows an honest "Próximamente" state while empty. */
export function AceleradorasAplicaciones() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Aceleradoras" title="Convocatorias abiertas" />

      {CONVOCATORIAS_ACELERADORAS.length > 0 ? (
        <div className="mt-10 flex flex-col gap-4">
          {CONVOCATORIAS_ACELERADORAS.map((convocatoria) => (
            <ConvocatoriaRow key={convocatoria.program} convocatoria={convocatoria} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">
            Próximamente: convocatorias de aceleradoras del ecosistema boliviano.
          </p>
        </div>
      )}
    </Section>
  );
}
