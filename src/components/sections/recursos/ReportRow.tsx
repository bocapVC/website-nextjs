import type { Report } from "@/data/reportes";

interface ReportRowProps {
  report: Report;
}

/** Single report row: year in red serif + title + description, download link or "Próximamente". */
export function ReportRow({ report }: ReportRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-brand border border-line bg-surface-solid p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4">
        <p className="font-serif text-2xl font-bold text-red">{report.year}</p>
        <div>
          <p className="font-semibold text-ink">{report.title}</p>
          <p className="mt-1 text-sm text-ink-soft">{report.description}</p>
        </div>
      </div>

      {report.url ? (
        <a
          href={report.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-sm font-semibold text-teal hover:text-teal-strong"
        >
          Descargar →
        </a>
      ) : (
        <span className="shrink-0 text-sm text-ink-soft">Próximamente</span>
      )}
    </div>
  );
}
