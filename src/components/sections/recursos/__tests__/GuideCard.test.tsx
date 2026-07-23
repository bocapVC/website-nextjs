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

  it("wraps itself in a link to guide.url when present", () => {
    const linked: Guide = { ...guide, url: "https://example.com/guia-ronda-semilla" };
    render(<GuideCard guide={linked} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", linked.url);
  });

  it("does not render a link when url is absent", () => {
    render(<GuideCard guide={guide} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
