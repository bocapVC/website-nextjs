import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const PASSWORD = "correct horse battery staple";
const TOKEN = "github_pat_test";

/** Fresh module per test, so the in-memory failure counter starts empty. */
async function loadRoute() {
  vi.resetModules();
  return import("../route");
}

function attempt(POST: (r: Request) => Promise<Response>, password: unknown, ip = "1.1.1.1") {
  return POST(
    new Request("http://localhost/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify({ password }),
    }),
  );
}

describe("POST /api/admin/auth", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_PASSWORD", PASSWORD);
    vi.stubEnv("GITHUB_CMS_TOKEN", TOKEN);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the CMS token for the right password, uncached", async () => {
    const { POST } = await loadRoute();

    const res = await attempt(POST, PASSWORD);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, token: TOKEN });
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });

  it.each([["wrong"], [""], [undefined], [123]])(
    "rejects %j without leaking the token",
    async (password) => {
      const { POST } = await loadRoute();

      const res = await attempt(POST, password);

      expect(res.status).toBe(401);
      expect(JSON.stringify(await res.json())).not.toContain(TOKEN);
    },
  );

  it("locks an IP out after 5 failures, even for the right password", async () => {
    const { POST } = await loadRoute();

    for (let i = 0; i < 5; i++) {
      expect((await attempt(POST, "wrong")).status).toBe(401);
    }

    expect((await attempt(POST, PASSWORD)).status).toBe(429);
    expect((await attempt(POST, PASSWORD, "2.2.2.2")).status).toBe(200);
  });

  it("lets the IP back in once the 15-minute window passes", async () => {
    vi.useFakeTimers();
    try {
      const { POST } = await loadRoute();
      for (let i = 0; i < 5; i++) await attempt(POST, "wrong");

      vi.advanceTimersByTime(15 * 60 * 1000 + 1);

      expect((await attempt(POST, PASSWORD)).status).toBe(200);
    } finally {
      vi.useRealTimers();
    }
  });

  it("clears the failure count after a successful sign-in", async () => {
    const { POST } = await loadRoute();
    for (let i = 0; i < 4; i++) await attempt(POST, "wrong");

    await attempt(POST, PASSWORD);
    for (let i = 0; i < 4; i++) await attempt(POST, "wrong");

    expect((await attempt(POST, PASSWORD)).status).toBe(200);
  });

  it.each([["ADMIN_PASSWORD"], ["GITHUB_CMS_TOKEN"]])(
    "answers 503 when %s is not set",
    async (name) => {
      vi.stubEnv(name, "");
      const { POST } = await loadRoute();

      expect((await attempt(POST, PASSWORD)).status).toBe(503);
    },
  );

  it("rejects a non-JSON body", async () => {
    const { POST } = await loadRoute();

    const res = await POST(
      new Request("http://localhost/api/admin/auth", { method: "POST", body: "nope" }),
    );

    expect(res.status).toBe(400);
  });
});

describe("GET /api/admin/auth", () => {
  it("serves the non-indexed password form", async () => {
    const { GET } = await loadRoute();

    const res = GET();
    const html = await res.text();

    expect(res.headers.get("Content-Type")).toContain("text/html");
    expect(res.headers.get("X-Robots-Tag")).toBe("noindex");
    expect(html).toContain('type="password"');
    expect(html).toContain("authorizing:github");
    // The token only ever goes to this site's own origin.
    expect(html).toContain("location.origin");
    expect(html).not.toContain('"*"');
  });
});
