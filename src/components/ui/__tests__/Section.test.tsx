import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("Section", () => {
  it("renders no photo layer when no photo prop is given", () => {
    const { container } = render(<Section>content</Section>);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector(".section-photo-overlay")).not.toBeInTheDocument();
  });

  it("renders the photo and its gradient overlay when a photo prop is given", () => {
    const { container } = render(<Section photo="/heroes/illimani.avif">content</Section>);
    expect(container.querySelector("img")).toBeInTheDocument();
    expect(container.querySelector(".section-photo-overlay")).toBeInTheDocument();
  });

  it("treats the photo as decorative when no alt text is given", () => {
    const { container } = render(<Section photo="/heroes/illimani.avif">content</Section>);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes the photo to assistive tech when alt text is given", () => {
    render(
      <Section photo="/heroes/illimani.avif" photoAlt="El Illimani">
        content
      </Section>,
    );
    const img = screen.getByRole("img", { name: "El Illimani" });
    expect(img).not.toHaveAttribute("aria-hidden");
  });

  it("serves the photo through the image optimizer at viewport-sized widths", () => {
    const { container } = render(<Section photo="/heroes/illimani.avif">content</Section>);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("sizes", "100vw");
    expect(img?.getAttribute("src")).toMatch(/^\/_next\/image\?url=%2Fheroes%2Fillimani\.avif&w=\d+/);
    expect(img?.getAttribute("srcset")).toContain("w=1920");
  });

  it("centers the photo crop by default", () => {
    const { container } = render(<Section photo="/heroes/illimani.avif">content</Section>);
    expect(container.querySelector("img")).toHaveClass("object-center");
  });

  it("anchors the photo crop to the top when photoPosition says so", () => {
    const { container } = render(
      <Section photo="/heroes/illimani.avif" photoPosition="top">
        content
      </Section>,
    );
    expect(container.querySelector("img")).toHaveClass("object-top");
  });

  it("eagerly loads the photo when firstOnPage, since it's the LCP element", () => {
    const { container } = render(
      <Section photo="/heroes/illimani.avif" firstOnPage>
        content
      </Section>,
    );
    expect(container.querySelector("img")).not.toHaveAttribute("loading", "lazy");
  });

  it("lazily loads the photo when it's not firstOnPage and photoPreload isn't set", () => {
    const { container } = render(<Section photo="/heroes/illimani.avif">content</Section>);
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
  });

  it("lets an explicit photoPreload override the firstOnPage default", () => {
    const { container } = render(
      <Section photo="/heroes/illimani.avif" firstOnPage photoPreload={false}>
        content
      </Section>,
    );
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
  });

  it("lets photoPreload force eager loading even when not firstOnPage", () => {
    const { container } = render(
      <Section photo="/heroes/illimani.avif" photoPreload>
        content
      </Section>,
    );
    expect(container.querySelector("img")).not.toHaveAttribute("loading", "lazy");
  });
});
