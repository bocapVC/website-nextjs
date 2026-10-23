import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const otherSlot = { photo: "/heroes/otra.avif", alt: "Otra", position: "center" };

/** HEROES is read when `@/data/heroes` loads, so each case mocks the JSON file and re-imports. */
async function renderHeroWith(inicio: { photo: string; alt?: string; position?: string }) {
  vi.resetModules();
  vi.doMock("@/data/heroes.json", () => ({
    default: { inicio, ecosistema: otherSlot, publicaciones: otherSlot, membresia: otherSlot },
  }));
  const { Hero } = await import("../Hero");
  return render(<Hero />);
}

describe("Hero photo", () => {
  afterEach(() => {
    vi.doUnmock("@/data/heroes.json");
  });

  it("uses the admin-set inicio photo, alt text and crop position", async () => {
    await renderHeroWith({ photo: "/heroes/nueva.jpg", alt: "La Paz de día", position: "bottom" });

    const img = screen.getByRole("img", { name: "La Paz de día" });
    expect(img.getAttribute("src")).toContain("url=%2Fheroes%2Fnueva.jpg");
    expect(img).toHaveClass("object-bottom");
  });

  it("is decorative when the alt text is empty", async () => {
    const { container } = await renderHeroWith({ photo: "/heroes/nueva.jpg", alt: "" });

    expect(container.querySelector("img")).toHaveAttribute("aria-hidden", "true");
  });
});
