import { describe, expect, it } from "vitest";
import sitemap from "../sitemap";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists the newsletter page", () => {
    expect(urls).toContain("https://bocap.vc/newsletter");
  });

  it("leaves out the post-confirmation page", () => {
    expect(urls).not.toContain("https://bocap.vc/newsletter/confirmado");
  });
});
