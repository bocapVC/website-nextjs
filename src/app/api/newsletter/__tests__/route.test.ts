import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "../route";

/** Spelled out rather than imported, so a changed value in the route fails here. */
const LOOKUP_URL =
  "https://api.brevo.com/v3/contacts/ana%40example.com?identifierType=email_id";
const DOI_URL = "https://api.brevo.com/v3/contacts/doubleOptinConfirmation";
const REDIRECT_URL = "https://bocap.vc/newsletter/confirmado";
const LIST_ID = 7;
const TEMPLATE_ID = 12;

function postJson(body: unknown) {
  return POST(
    new Request("http://localhost/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

function brevoResponse(status: number, json: unknown = {}) {
  return { ok: status >= 200 && status < 300, status, json: async () => json };
}

/** Answers the contact lookup with `lookup`, and the DOI call with `doi`. */
function stubBrevo(lookup: ReturnType<typeof brevoResponse>, doi = brevoResponse(201)) {
  const fetchMock = vi.fn((url: string, init?: RequestInit) => {
    void init;
    return Promise.resolve(url === DOI_URL ? doi : lookup);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function doiCall(fetchMock: ReturnType<typeof stubBrevo>) {
  return fetchMock.mock.calls.find(([url]) => url === DOI_URL);
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.stubEnv("BREVO_API_KEY", "test-key");
    vi.stubEnv("BREVO_NEWSLETTER_LIST_ID", String(LIST_ID));
    vi.stubEnv("BREVO_NEWSLETTER_DOI_TEMPLATE_ID", String(TEMPLATE_ID));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe("request validation", () => {
    it("rejects a body that isn't JSON without calling Brevo", async () => {
      const fetchMock = stubBrevo(brevoResponse(404));

      const res = await POST(
        new Request("http://localhost/api/newsletter", { method: "POST", body: "nope" }),
      );

      expect(res.status).toBe(400);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "invalid_json" });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it.each([undefined, "", "  ", "ana", "ana@", "ana@example", null])(
      "rejects a missing or malformed email (%j) without calling Brevo",
      async (email) => {
        const fetchMock = stubBrevo(brevoResponse(404));

        const res = await postJson({ email });

        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toEqual({ ok: false, error: "invalid_email" });
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );

    it("answers a filled honeypot as pending without calling Brevo", async () => {
      const fetchMock = stubBrevo(brevoResponse(404));

      const res = await postJson({ email: "ana@example.com", website: "spam" });

      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toEqual({ ok: true, status: "pending" });
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });

  describe("subscription outcome", () => {
    it("triggers double opt-in for a new email and reports pending", async () => {
      const fetchMock = stubBrevo(brevoResponse(404));

      const res = await postJson({ email: " ana@example.com ", name: " Ana " });

      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toEqual({ ok: true, status: "pending" });
      const [lookupUrl, lookupInit] = fetchMock.mock.calls[0];
      expect(lookupUrl).toBe(LOOKUP_URL);
      expect(lookupInit?.headers).toMatchObject({ "api-key": "test-key" });

      const [, init] = doiCall(fetchMock)!;
      expect(init).toMatchObject({ method: "POST", headers: { "api-key": "test-key" } });
      expect(JSON.parse(init!.body as string)).toEqual({
        email: "ana@example.com",
        includeListIds: [LIST_ID],
        templateId: TEMPLATE_ID,
        redirectionUrl: REDIRECT_URL,
        attributes: { FIRSTNAME: "Ana" },
      });
    });

    it("sends no name attribute when no name is given", async () => {
      const fetchMock = stubBrevo(brevoResponse(404));

      await postJson({ email: "ana@example.com" });

      expect(JSON.parse(doiCall(fetchMock)![1]!.body as string)).not.toHaveProperty(
        "attributes",
      );
    });

    it("re-triggers the confirmation for an existing contact not yet on the list", async () => {
      const fetchMock = stubBrevo(brevoResponse(200, { listIds: [3], emailBlacklisted: false }));

      const res = await postJson({ email: "ana@example.com" });

      await expect(res.json()).resolves.toEqual({ ok: true, status: "pending" });
      expect(doiCall(fetchMock)).toBeDefined();
    });

    it("reports already_subscribed for a confirmed member, without triggering opt-in", async () => {
      const fetchMock = stubBrevo(
        brevoResponse(200, { listIds: [3, LIST_ID], emailBlacklisted: false }),
      );

      const res = await postJson({ email: "ana@example.com" });

      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toEqual({ ok: true, status: "already_subscribed" });
      expect(doiCall(fetchMock)).toBeUndefined();
    });

    it.each([
      ["unsubscribed from the list", { listIds: [LIST_ID], listUnsubscribed: [LIST_ID] }],
      ["blacklisted", { listIds: [LIST_ID], emailBlacklisted: true }],
    ])("asks a contact who %s to confirm again", async (_, contact) => {
      const fetchMock = stubBrevo(brevoResponse(200, contact));

      const res = await postJson({ email: "ana@example.com" });

      await expect(res.json()).resolves.toEqual({ ok: true, status: "pending" });
      expect(doiCall(fetchMock)).toBeDefined();
    });
  });

  describe("Brevo failures", () => {
    it.each([400, 401, 429, 500])("reports 502 when the lookup answers %i", async (status) => {
      const fetchMock = stubBrevo(brevoResponse(status));

      const res = await postJson({ email: "ana@example.com" });

      expect(res.status).toBe(502);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_status" });
      expect(doiCall(fetchMock)).toBeUndefined();
    });

    it.each([400, 401, 500])("reports 502 when the opt-in call answers %i", async (status) => {
      stubBrevo(brevoResponse(404), brevoResponse(status));

      const res = await postJson({ email: "ana@example.com" });

      expect(res.status).toBe(502);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_status" });
    });

    it("reports 502 when Brevo is unreachable", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));

      const res = await postJson({ email: "ana@example.com" });

      expect(res.status).toBe(502);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_unreachable" });
    });

    it("reports 502 without calling Brevo when its configuration is missing", async () => {
      vi.stubEnv("BREVO_API_KEY", "");
      vi.spyOn(console, "error").mockImplementation(() => {});
      const fetchMock = stubBrevo(brevoResponse(404));

      const res = await postJson({ email: "ana@example.com" });

      expect(res.status).toBe(502);
      expect(fetchMock).not.toHaveBeenCalled();
    });
  });
});
