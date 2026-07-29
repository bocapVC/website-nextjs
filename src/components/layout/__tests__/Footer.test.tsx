import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Footer } from "../Footer";
import { NAV_LINKS, SITE } from "@/config/nav";

function navColumn() {
  return screen.getByRole("list");
}

describe("Footer", () => {
  it("is a contentinfo landmark", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("lists every nav link, including the Contacto one the header nav omits", () => {
    render(<Footer />);

    const links = within(navColumn()).getAllByRole("link");
    expect(links).toHaveLength(NAV_LINKS.length);
    expect(links.map((l) => l.getAttribute("href"))).toEqual(
      NAV_LINKS.map((link) => link.href),
    );
    expect(links.map((l) => l.textContent)).toEqual(NAV_LINKS.map((link) => link.label));
  });

  it("renders the brand blurb and wordmark", () => {
    render(<Footer />);

    expect(screen.getByText(SITE.tagline)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAccessibleName(SITE.name);
  });

  it("offers the address both as a copy button and as a mailto link", () => {
    render(<Footer />);

    expect(
      screen.getByRole("button", { name: `Copiar correo ${SITE.email}` }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Escríbenos por correo" })).toHaveAttribute(
      "href",
      `mailto:${SITE.email}`,
    );
  });

  it("credits the site in the meta row", () => {
    render(<Footer />);

    expect(screen.getByText(`© 2026 ${SITE.name}`)).toBeInTheDocument();
  });
});
