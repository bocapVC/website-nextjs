import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Section } from "../Section";

describe("Section", () => {
  it("renders no photo layer when no photo prop is given", () => {
    const { container } = render(<Section>content</Section>);
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector(".section-photo-overlay")).not.toBeInTheDocument();
  });

  it("renders the photo and its gradient overlay when a photo prop is given", () => {
    const { container } = render(<Section photo="/illimani.avif">content</Section>);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("sizes", "100vw");
    expect(container.querySelector(".section-photo-overlay")).toBeInTheDocument();
  });

  it("eagerly loads the photo when firstOnPage, since it's the LCP element", () => {
    const { container } = render(
      <Section photo="/illimani.avif" firstOnPage>
        content
      </Section>,
    );
    expect(container.querySelector("img")).not.toHaveAttribute("loading", "lazy");
  });

  it("lazily loads the photo when it's not firstOnPage and photoPreload isn't set", () => {
    const { container } = render(<Section photo="/illimani.avif">content</Section>);
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
  });

  it("lets an explicit photoPreload override the firstOnPage default", () => {
    const { container } = render(
      <Section photo="/illimani.avif" firstOnPage photoPreload={false}>
        content
      </Section>,
    );
    expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
  });

  it("lets photoPreload force eager loading even when not firstOnPage", () => {
    const { container } = render(
      <Section photo="/illimani.avif" photoPreload>
        content
      </Section>,
    );
    expect(container.querySelector("img")).not.toHaveAttribute("loading", "lazy");
  });
});
