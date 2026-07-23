import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReportRow } from "../ReportRow";
import type { Report } from "@/data/reportes";

const report: Report = {
  title: "Estado del capital emprendedor en Bolivia 2025",
  description: "Panorama anual de inversión, fondos y actividad del ecosistema.",
  year: 2025,
};

describe("ReportRow", () => {
  it("renders the year, title and description", () => {
    render(<ReportRow report={report} />);
    expect(screen.getByText(String(report.year))).toBeInTheDocument();
    expect(screen.getByText(report.title)).toBeInTheDocument();
    expect(screen.getByText(report.description)).toBeInTheDocument();
  });

  it("shows a Descargar link to report.url when present", () => {
    const withUrl: Report = { ...report, url: "https://example.com/reporte-2025.pdf" };
    render(<ReportRow report={withUrl} />);
    const link = screen.getByRole("link", { name: /descargar/i });
    expect(link).toHaveAttribute("href", withUrl.url);
  });

  it('shows "Próximamente" and no link when url is absent', () => {
    render(<ReportRow report={report} />);
    expect(screen.getByText("Próximamente")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
