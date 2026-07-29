import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Nav } from "../Nav";
import { NAV_LINKS } from "@/config/nav";

const usePathname = vi.hoisted(() => vi.fn<() => string>());
vi.mock("next/navigation", () => ({ usePathname }));

const PRIMARY_LINKS = NAV_LINKS.filter((link) => link.href !== "/contacto");

function toggle() {
  return screen.getByRole("button");
}

/** The mobile panel is always in the DOM; open/closed is expressed as a Tailwind
 * display class at the <=920px breakpoint, so that class is the only observable signal. */
function panel() {
  return screen.getByRole("navigation");
}

function linkTo(href: string) {
  const link = NAV_LINKS.find((l) => l.href === href);
  return screen.getByRole("link", { name: link!.label });
}

/** Clicks a link without jsdom trying to navigate (which it can't do, and warns about).
 * The target's own listener runs before React's delegated handler, so the component's
 * onClick still fires — that's what these assertions are about. */
function clickLink(element: HTMLElement) {
  element.addEventListener("click", (e) => e.preventDefault(), { once: true });
  fireEvent.click(element);
}

describe("Nav", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  describe("links", () => {
    it("renders every primary nav link except Contacto, which gets its own CTA", () => {
      render(<Nav />);

      for (const link of PRIMARY_LINKS) {
        expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
          "href",
          link.href,
        );
      }
      expect(screen.getAllByRole("link")).toHaveLength(PRIMARY_LINKS.length + 1);
    });

    it("renders the Contacto CTA separately from the primary links", () => {
      render(<Nav />);

      expect(screen.getByRole("link", { name: "Contacto" })).toHaveAttribute(
        "href",
        "/contacto",
      );
    });
  });

  describe("active route", () => {
    it("marks the link matching the current pathname as the current page", () => {
      usePathname.mockReturnValue("/ecosistema");
      render(<Nav />);

      expect(linkTo("/ecosistema")).toHaveAttribute("aria-current", "page");
    });

    it("marks exactly one link, leaving the rest without the attribute", () => {
      usePathname.mockReturnValue("/ecosistema");
      render(<Nav />);

      const marked = PRIMARY_LINKS.filter((link) =>
        linkTo(link.href).hasAttribute("aria-current"),
      );
      expect(marked).toEqual([{ label: "Ecosistema", href: "/ecosistema" }]);
    });

    it("marks Inicio only on the home page, not on every route", () => {
      usePathname.mockReturnValue("/recursos");
      render(<Nav />);

      expect(linkTo("/")).not.toHaveAttribute("aria-current");
    });

    it("marks nothing when the pathname matches no nav link", () => {
      usePathname.mockReturnValue("/una-ruta-inexistente");
      render(<Nav />);

      for (const link of PRIMARY_LINKS) {
        expect(linkTo(link.href)).not.toHaveAttribute("aria-current");
      }
    });

    // The one deliberately style-coupled assertion here: aria-current alone would let
    // the visual underline regress silently, since sighted users only get that.
    it("also underlines the current link", () => {
      usePathname.mockReturnValue("/ecosistema");
      render(<Nav />);

      expect(linkTo("/ecosistema")).toHaveClass("border-white/70", "text-white");
      expect(linkTo("/recursos")).toHaveClass("border-transparent");
    });
  });

  describe("mobile toggle", () => {
    it("starts closed", () => {
      render(<Nav />);

      expect(toggle()).toHaveAttribute("aria-expanded", "false");
      expect(toggle()).toHaveAccessibleName("Abrir navegación");
      expect(panel()).toHaveClass("max-[920px]:hidden");
    });

    it("points aria-controls at the nav panel it opens", () => {
      render(<Nav />);

      expect(toggle().getAttribute("aria-controls")).toBe(panel().id);
    });

    it("opens the panel and relabels itself on click", () => {
      render(<Nav />);

      fireEvent.click(toggle());

      expect(toggle()).toHaveAttribute("aria-expanded", "true");
      expect(toggle()).toHaveAccessibleName("Cerrar navegación");
      expect(panel()).toHaveClass("max-[920px]:grid");
      expect(panel()).not.toHaveClass("max-[920px]:hidden");
    });

    it("closes again on a second click", () => {
      render(<Nav />);

      fireEvent.click(toggle());
      fireEvent.click(toggle());

      expect(toggle()).toHaveAttribute("aria-expanded", "false");
      expect(panel()).toHaveClass("max-[920px]:hidden");
    });

    it("closes when a primary link is followed, so the panel doesn't cover the new page", () => {
      render(<Nav />);
      fireEvent.click(toggle());

      clickLink(linkTo("/recursos"));

      expect(toggle()).toHaveAttribute("aria-expanded", "false");
      expect(panel()).toHaveClass("max-[920px]:hidden");
    });

    it("closes when the Contacto CTA is followed", () => {
      render(<Nav />);
      fireEvent.click(toggle());

      clickLink(screen.getByRole("link", { name: "Contacto" }));

      expect(toggle()).toHaveAttribute("aria-expanded", "false");
    });
  });
});
