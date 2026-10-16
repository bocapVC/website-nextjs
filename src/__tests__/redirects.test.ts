import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

async function redirectFor(source: string) {
  const redirects = (await nextConfig.redirects?.()) ?? [];
  return redirects.find((r) => r.source === source);
}

describe("redirects", () => {
  it("sends /oportunidades to the home page temporarily, so the URL can return", async () => {
    expect(await redirectFor("/oportunidades")).toMatchObject({
      destination: "/",
      permanent: false,
    });
  });
});
