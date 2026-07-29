import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "../route";

const FORM_ACTION =
  "https://docs.google.com/forms/d/13L26lKRqN546lYPsPiMKdyISdAvInViVvXG83_ddpnA/formResponse";

/**
 * Spelled out rather than imported from the route, so that changing an id there
 * fails here. A wrong id is accepted by Google Forms and silently drops that
 * answer, which is invisible from the browser.
 */
const ENTRY_IDS = {
  name: "entry.905177308",
  organization: "entry.370367197",
  email: "entry.313738678",
  topic: "entry.1004391731",
  message: "entry.2128493084",
};

const VALID = {
  name: "Ana",
  organization: "Acme",
  email: "ana@example.com",
  topic: "Membresia",
  message: "Hola",
};

function postJson(body: unknown) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

/** The route only reads `.status` off the upstream response, so a bare object suffices —
 * and status 0 (the opaque redirect case) can't be built with `new Response()`. */
function stubUpstream(status: number) {
  const fetchMock = vi.fn().mockResolvedValue({ status });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

/** The urlencoded body of the single upstream call. */
function sentParams(fetchMock: ReturnType<typeof stubUpstream>) {
  const [, init] = fetchMock.mock.calls[0];
  return new URLSearchParams(init.body as string);
}

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("request validation", () => {
    it("rejects a body that isn't JSON without calling upstream", async () => {
      const fetchMock = stubUpstream(200);

      const res = await POST(
        new Request("http://localhost/api/contact", { method: "POST", body: "not json" }),
      );

      expect(res.status).toBe(400);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "invalid_json" });
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it.each(["name", "email", "topic", "message"])(
      "rejects a submission missing %s",
      async (field) => {
        const fetchMock = stubUpstream(200);
        const body = { ...VALID, [field]: undefined };

        const res = await postJson(body);

        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toEqual({ ok: false, error: "missing_fields" });
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );

    it.each(["name", "email", "topic", "message"])(
      "rejects a %s that is only whitespace",
      async (field) => {
        const fetchMock = stubUpstream(200);

        const res = await postJson({ ...VALID, [field]: "   " });

        expect(res.status).toBe(400);
        await expect(res.json()).resolves.toEqual({ ok: false, error: "missing_fields" });
        expect(fetchMock).not.toHaveBeenCalled();
      },
    );

    it("accepts a submission with no organización, which is the one optional field", async () => {
      const fetchMock = stubUpstream(200);

      const res = await postJson({ ...VALID, organization: undefined });

      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toEqual({ ok: true });
      expect(sentParams(fetchMock).get(ENTRY_IDS.organization)).toBe("");
    });
  });

  describe("upstream request", () => {
    it("maps every field onto its Google Form entry id", async () => {
      const fetchMock = stubUpstream(200);

      await postJson(VALID);

      const params = sentParams(fetchMock);
      expect(params.get(ENTRY_IDS.name)).toBe("Ana");
      expect(params.get(ENTRY_IDS.organization)).toBe("Acme");
      expect(params.get(ENTRY_IDS.email)).toBe("ana@example.com");
      expect(params.get(ENTRY_IDS.topic)).toBe("Membresia");
      expect(params.get(ENTRY_IDS.message)).toBe("Hola");
    });

    it("sends no keys beyond the five mapped entries", async () => {
      const fetchMock = stubUpstream(200);

      await postJson({ ...VALID, unexpected: "ignored" });

      expect([...sentParams(fetchMock).keys()].sort()).toEqual(
        Object.values(ENTRY_IDS).sort(),
      );
    });

    it("trims surrounding whitespace off the submitted values", async () => {
      const fetchMock = stubUpstream(200);

      await postJson({ ...VALID, name: "  Ana  ", email: " ana@example.com " });

      const params = sentParams(fetchMock);
      expect(params.get(ENTRY_IDS.name)).toBe("Ana");
      expect(params.get(ENTRY_IDS.email)).toBe("ana@example.com");
    });

    it("posts form-urlencoded to the form action, without following the redirect", async () => {
      const fetchMock = stubUpstream(200);

      await postJson(VALID);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, init] = fetchMock.mock.calls[0];
      expect(url).toBe(FORM_ACTION);
      expect(init).toMatchObject({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        redirect: "manual",
        cache: "no-store",
      });
    });
  });

  describe("upstream outcome", () => {
    // 0 is the opaque response Google's post-submit redirect surfaces under `redirect: "manual"`.
    it.each([0, 200, 204, 302, 399])("reports success for upstream status %i", async (status) => {
      stubUpstream(status);

      const res = await postJson(VALID);

      expect(res.status).toBe(200);
      await expect(res.json()).resolves.toEqual({ ok: true });
    });

    it.each([400, 401, 429, 500, 503])(
      "reports a 502 upstream_status for upstream status %i",
      async (status) => {
        stubUpstream(status);

        const res = await postJson(VALID);

        expect(res.status).toBe(502);
        await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_status" });
      },
    );

    it("reports a 502 upstream_unreachable when the request itself fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));

      const res = await postJson(VALID);

      expect(res.status).toBe(502);
      await expect(res.json()).resolves.toEqual({ ok: false, error: "upstream_unreachable" });
    });
  });
});
