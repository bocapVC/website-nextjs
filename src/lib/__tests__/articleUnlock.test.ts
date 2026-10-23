import { afterEach, describe, expect, it, vi } from "vitest";
import { triggerDownload } from "../articleUnlock";

/** Captures the anchor triggerDownload clicks, without letting jsdom navigate. */
function clickedAnchor(url: string) {
  const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  triggerDownload(url);
  return click.mock.contexts[0] as HTMLAnchorElement;
}

describe("triggerDownload", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("downloads an uploaded PDF in place", () => {
    const a = clickedAnchor("/articulos/guia.pdf");
    expect(a.hasAttribute("download")).toBe(true);
    expect(a.target).toBe("");
  });

  it("opens an external link in a new tab, where download would be ignored", () => {
    const a = clickedAnchor("https://example.com/guia.pdf");
    expect(a.hasAttribute("download")).toBe(false);
    expect(a.target).toBe("_blank");
    expect(a.rel).toBe("noreferrer");
  });
});
