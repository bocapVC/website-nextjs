"use client";

import { useState } from "react";

export type SubscriptionStatus =
  | "idle"
  | "submitting"
  | "pending"
  | "already_subscribed"
  | "error";

export interface NewsletterValues {
  email: string;
  name?: string;
  /** Honeypot — always empty for real visitors. */
  website?: string;
}

/**
 * Owns the newsletter form's subscription lifecycle, mirroring
 * `useContactSubmission`. `submit` POSTs to the server route and resolves to the
 * resulting status so the caller can react (e.g. clear the field).
 */
export function useNewsletterSubscription() {
  const [status, setStatus] = useState<SubscriptionStatus>("idle");

  async function submit(values: NewsletterValues): Promise<SubscriptionStatus> {
    setStatus("submitting");
    let next: SubscriptionStatus = "error";
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; status?: string };
      if (res.ok && data.ok === true) {
        if (data.status === "pending" || data.status === "already_subscribed") {
          next = data.status;
        }
      }
    } catch {
      // Network failure: stays "error".
    }
    setStatus(next);
    return next;
  }

  return { status, submit };
}
