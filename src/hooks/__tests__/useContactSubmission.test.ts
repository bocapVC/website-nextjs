import { afterEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useContactSubmission, type ContactValues } from "../useContactSubmission";

const VALUES: ContactValues = {
  name: "Ana",
  organization: "Acme",
  email: "ana@example.com",
  topic: "Membresia",
  message: "Hola",
};

/** Only the two properties the hook reads off the response. */
function response(ok: boolean, json: () => Promise<unknown>) {
  return { ok, json };
}

function stubFetch(value: unknown) {
  const fetchMock = vi.fn().mockResolvedValue(value);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("useContactSubmission", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts idle", () => {
    const { result } = renderHook(() => useContactSubmission());

    expect(result.current.status).toBe("idle");
  });

  it("POSTs the values as JSON to the contact route", async () => {
    const fetchMock = stubFetch(response(true, async () => ({ ok: true })));
    const { result } = renderHook(() => useContactSubmission());

    await act(async () => {
      await result.current.submit(VALUES);
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init).toMatchObject({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    expect(JSON.parse(init.body as string)).toEqual(VALUES);
  });

  it("reports submitting while the request is in flight", async () => {
    let settle: (value: unknown) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise((resolve) => (settle = resolve))),
    );
    const { result } = renderHook(() => useContactSubmission());

    let submitted: Promise<boolean>;
    act(() => {
      submitted = result.current.submit(VALUES);
    });
    expect(result.current.status).toBe("submitting");

    await act(async () => {
      settle(response(true, async () => ({ ok: true })));
      await submitted;
    });
    expect(result.current.status).toBe("success");
  });

  describe("outcome", () => {
    it("succeeds only when the response is ok and the body says ok", async () => {
      stubFetch(response(true, async () => ({ ok: true })));
      const { result } = renderHook(() => useContactSubmission());

      let returned: boolean | undefined;
      await act(async () => {
        returned = await result.current.submit(VALUES);
      });

      expect(returned).toBe(true);
      expect(result.current.status).toBe("success");
    });

    it("fails on a 2xx whose body reports ok: false", async () => {
      stubFetch(response(true, async () => ({ ok: false, error: "upstream_status" })));
      const { result } = renderHook(() => useContactSubmission());

      let returned: boolean | undefined;
      await act(async () => {
        returned = await result.current.submit(VALUES);
      });

      expect(returned).toBe(false);
      expect(result.current.status).toBe("error");
    });

    it("fails on a non-ok response even when its body claims ok: true", async () => {
      stubFetch(response(false, async () => ({ ok: true })));
      const { result } = renderHook(() => useContactSubmission());

      let returned: boolean | undefined;
      await act(async () => {
        returned = await result.current.submit(VALUES);
      });

      expect(returned).toBe(false);
      expect(result.current.status).toBe("error");
    });

    it("fails, rather than throwing, when the response body isn't JSON", async () => {
      stubFetch(
        response(true, async () => {
          throw new SyntaxError("Unexpected token < in JSON");
        }),
      );
      const { result } = renderHook(() => useContactSubmission());

      let returned: boolean | undefined;
      await act(async () => {
        returned = await result.current.submit(VALUES);
      });

      expect(returned).toBe(false);
      expect(result.current.status).toBe("error");
    });

    it("fails when the request itself rejects", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));
      const { result } = renderHook(() => useContactSubmission());

      let returned: boolean | undefined;
      await act(async () => {
        returned = await result.current.submit(VALUES);
      });

      expect(returned).toBe(false);
      expect(result.current.status).toBe("error");
    });
  });

  it("clears a previous error when the user retries", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));
    const { result } = renderHook(() => useContactSubmission());

    await act(async () => {
      await result.current.submit(VALUES);
    });
    expect(result.current.status).toBe("error");

    stubFetch(response(true, async () => ({ ok: true })));
    await act(async () => {
      await result.current.submit(VALUES);
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
  });

  it("returns to idle on reset", async () => {
    stubFetch(response(true, async () => ({ ok: true })));
    const { result } = renderHook(() => useContactSubmission());

    await act(async () => {
      await result.current.submit(VALUES);
    });
    expect(result.current.status).toBe("success");

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
  });
});
