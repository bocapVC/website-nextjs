import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REPORTES } from "@/data/reportes";
import { ReportRow } from "./ReportRow";

/** Row list of reports; shows an honest "Próximamente" state while REPORTES is empty. */
export function Reportes() {
  return (
    <Section tone="mist">
      <SectionHeading eyebrow="Datos" title="Reportes" />

      {REPORTES.length > 0 ? (
        <div className="mt-10 flex flex-col gap-4">
          {REPORTES.map((report) => (
            <ReportRow key={report.title} report={report} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-brand border border-dashed border-line-strong bg-surface-solid p-10 text-center">
          <p className="text-ink-soft">Próximamente: reportes sobre el ecosistema boliviano.</p>
        </div>
      )}
    </Section>
  );
}
