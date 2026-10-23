import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { ShareLinks } from "../ShareLinks";

const URL_ = "https://bocap.vc/publicaciones/deuda-y-cuasi-equity";

describe("ShareLinks", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("links to each network's share intent with the encoded page URL", () => {
    render(<ShareLinks url={URL_} title="Deuda y Cuasi Equity" />);
    const encoded = encodeURIComponent(URL_);

    expect(screen.getByRole("link", { name: "LinkedIn" }).getAttribute("href")).toContain(encoded);
    expect(screen.getByRole("link", { name: "WhatsApp" }).getAttribute("href")).toContain(encoded);
    expect(screen.getByRole("link", { name: "X" }).getAttribute("href")).toContain(encoded);
    expect(screen.getByRole("link", { name: "Facebook" }).getAttribute("href")).toContain(encoded);
  });

  it("copies the page URL and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ShareLinks url={URL_} title="Deuda y Cuasi Equity" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copiar enlace" }));
    });

    expect(writeText).toHaveBeenCalledWith(URL_);
    expect(screen.getByRole("button", { name: "Enlace copiado" })).toBeInTheDocument();
  });
});
