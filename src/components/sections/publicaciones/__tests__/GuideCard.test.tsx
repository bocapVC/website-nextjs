import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuideCard } from "../GuideCard";
import type { Guide } from "@/data/guiasArticulos";

const guide: Guide = {
  title: "Cómo estructurar una ronda semilla",
  excerpt: "Una guía práctica sobre términos y expectativas en Bolivia.",
  category: "Guía",
  meta: "8 min de lectura",
};

describe("GuideCard", () => {
  it("renders the category, title, excerpt and meta", () => {
    render(<GuideCard guide={guide} />);
    expect(screen.getByText(guide.category)).toBeInTheDocument();
    expect(screen.getByText(guide.title)).toBeInTheDocument();
    expect(screen.getByText(guide.excerpt)).toBeInTheDocument();
    expect(screen.getByText(guide.meta)).toBeInTheDocument();
  });

  it("renders the author when present", () => {
    const withAuthor: Guide = { ...guide, author: "María Pérez" };
    render(<GuideCard guide={withAuthor} />);
    expect(screen.getByText("María Pérez")).toBeInTheDocument();
  });

  it("renders no author line when author is absent", () => {
    const { container } = render(<GuideCard guide={guide} />);
    // title + excerpt + meta only (the category is a Badge span) — no byline.
    expect(container.querySelectorAll("p")).toHaveLength(3);
  });

  it("links only the Descargar button to guide.url, not the whole card", () => {
    const linked: Guide = { ...guide, url: "https://example.com/guia-ronda-semilla" };
    const { container } = render(<GuideCard guide={linked} />);

    const link = screen.getByRole("link", { name: /descargar/i });
    expect(link).toHaveAttribute("href", linked.url);
    expect(screen.getAllByRole("link")).toHaveLength(1);

    // The click target must be the button alone — the card must not be inside an anchor.
    expect(screen.getByText(linked.title).closest("a")).toBeNull();
    expect(container.firstElementChild?.tagName).not.toBe("A");
  });

  it("shows no Descargar cue when url is absent", () => {
    render(<GuideCard guide={guide} />);
    expect(screen.queryByText("Descargar")).not.toBeInTheDocument();
  });

  it("does not render a link when url is absent", () => {
    render(<GuideCard guide={guide} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
