"use client";

import { useState } from "react";

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface ContactValues {
  name: string;
  organization: string;
  email: string;
  topic: string;
  message: string;
}

/**
 * Owns the contact form's submission lifecycle. `submit` POSTs to the server
 * route and resolves to a boolean (true on success) so the caller can react.
 */
export function useContactSubmission() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  async function submit(values: ContactValues): Promise<boolean> {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
      const ok = res.ok && data.ok === true;
      setStatus(ok ? "success" : "error");
      return ok;
    } catch {
      setStatus("error");
      return false;
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, submit, reset };
}
