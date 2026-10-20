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

  it("sends /recursos to /publicaciones permanently, so links and rankings carry over", async () => {
    expect(await redirectFor("/recursos")).toMatchObject({
      destination: "/publicaciones",
      permanent: true,
    });
  });
});
