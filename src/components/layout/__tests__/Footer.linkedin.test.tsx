import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

/** SITE is computed when `@/config/nav` loads, so each case mocks the settings file and re-imports. */
async function renderFooterWith(settings: { email: string; linkedin?: string }) {
  vi.resetModules();
  vi.doMock("@/data/siteSettings.json", () => ({ default: settings }));
  const { Footer } = await import("../Footer");
  render(<Footer />);
}

describe("Footer LinkedIn link", () => {
  afterEach(() => {
    vi.doUnmock("@/data/siteSettings.json");
  });

  it("links to the admin-set LinkedIn page in a new tab", async () => {
    await renderFooterWith({
      email: "hola@bocap.vc",
      linkedin: "https://www.linkedin.com/company/bocap",
    });

    const link = screen.getByRole("link", { name: "LinkedIn" });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/company/bocap");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it.each([
    ["empty", { email: "hola@bocap.vc", linkedin: "" }],
    ["missing", { email: "hola@bocap.vc" }],
  ])("is hidden when the URL is %s", async (_, settings) => {
    await renderFooterWith(settings);

    expect(screen.queryByRole("link", { name: "LinkedIn" })).not.toBeInTheDocument();
  });

  it("uses the admin-set email", async () => {
    await renderFooterWith({ email: "hola@bocap.vc" });

    expect(screen.getByRole("link", { name: "Escríbenos por correo" })).toHaveAttribute(
      "href",
      "mailto:hola@bocap.vc",
    );
  });
});
