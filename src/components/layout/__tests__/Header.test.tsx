import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Header } from "../Header";
import { SITE } from "@/config/nav";

// Header renders Nav, which reads the current route.
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Header", () => {
  it("is a banner landmark", () => {
    render(<Header />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("links the wordmark home, with a label that says where it goes", () => {
    render(<Header />);

    const home = screen.getByRole("link", { name: "BOCAP — inicio" });
    expect(home).toHaveAttribute("href", "/");
    expect(within(home).getByRole("img")).toHaveAccessibleName(SITE.name);
  });

  it("renders the desktop Contacto CTA alongside the nav's own", () => {
    render(<Header />);

    const contacto = screen.getAllByRole("link", { name: "Contacto" });
    expect(contacto).toHaveLength(2);
    for (const link of contacto) {
      expect(link).toHaveAttribute("href", "/contacto");
    }
  });

  it("mounts the navigation", () => {
    render(<Header />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
