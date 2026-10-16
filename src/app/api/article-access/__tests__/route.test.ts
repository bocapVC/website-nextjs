import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "../route";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSf5DlQDVrnF-yVKPb-I6aRBw9Odw6bjC_EuRBeEz2eXx5-4Fw/formResponse";

/**
 * Spelled out rather than imported from the route, so that changing an id there
 * fails here. A wrong id is accepted by Google Forms and silently drops that
 * answer, which is invisible from the browser.
 */
const ENTRY_IDS = {
  email: "entry.2140414971",
  article: "entry.1559454988",
};

const VALID = { email: "ana@example.com", article: "Deuda y Cuasi Equity" };

function postJson(body: unknown) {
  return POST(
    new Request("http://localhost/api/article-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

function stubUpstream(status: number) {
  const fetchMock = vi.fn().mockResolvedValue({ status });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("POST /api/article-access", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects a body that isn't JSON without calling Google", async () => {
    const fetchMock = stubUpstream(200);

    const res = await POST(
      new Request("http://localhost/api/article-access", { method: "POST", body: "nope" }),
    );

    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "invalid_json" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([undefined, "", "   ", "ana", "ana@", "ana@example", "ana @example.com", 42])(
    "rejects a missing or malformed email (%j) without calling Google",
    async (email) => {
      const fetchMock = stubUpstream(200);

      const res = await postJson({ ...VALID, email });

      expect(res.status).toBe(400);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "invalid_email" });
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("rejects a submission with no article title", async () => {
    const fetchMock = stubUpstream(200);

    const res = await postJson({ ...VALID, article: " " });

    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("answers a filled honeypot as a success without calling Google", async () => {
    const fetchMock = stubUpstream(200);

    const res = await postJson({ ...VALID, website: "http://spam.example" });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the email and article title, and nothing else, to the form", async () => {
    const fetchMock = stubUpstream(200);

    const res = await postJson({ email: " ana@example.com ", article: VALID.article, extra: "x" });

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(FORM_ACTION);
    expect(init).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      redirect: "manual",
      cache: "no-store",
    });
    const params = new URLSearchParams(init.body as string);
    expect(params.get(ENTRY_IDS.email)).toBe("ana@example.com");
    expect(params.get(ENTRY_IDS.article)).toBe(VALID.article);
    expect([...params.keys()].sort()).toEqual(Object.values(ENTRY_IDS).sort());
  });

  it.each([0, 302, 400, 500])("reports a 502 when Google answers %i", async (status) => {
    stubUpstream(status);

    const res = await postJson(VALID);

    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_status" });
  });

  it("reports a 502 when Google is unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));

    const res = await postJson(VALID);

    expect(res.status).toBe(502);
    await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_unreachable" });
  });
});
