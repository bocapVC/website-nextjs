import { NextResponse } from "next/server";
import { SITE } from "@/config/nav";
import { isValidEmail } from "@/lib/email";

/**
 * Server-side proxy for newsletter subscriptions (Brevo, double opt-in).
 * Same pattern as the Contacto route: the Brevo API key never reaches the
 * browser, and the client gets an honest outcome.
 *
 * Config (server-only env vars, set in Vercel):
 * - BREVO_API_KEY
 * - BREVO_NEWSLETTER_LIST_ID — the dedicated public-newsletter list
 * - BREVO_NEWSLETTER_DOI_TEMPLATE_ID — the double opt-in confirmation template
 *
 * Switching to single opt-in only touches the DOI call below and the client's
 * "pending" copy.
 */

const BREVO_API = "https://api.brevo.com/v3";

/** Where Brevo's confirmation link lands. Excluded from the sitemap. */
export const CONFIRMATION_PATH = "/newsletter/confirmado";

/** Hidden field real visitors never see; anything in it means a bot filled the form. */
export const HONEYPOT_FIELD = "website";

export type NewsletterStatus = "pending" | "already_subscribed";

function ok(status: NewsletterStatus) {
  return NextResponse.json({ ok: true, status });
}

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

interface BrevoContact {
  listIds?: number[];
  listUnsubscribed?: number[];
  emailBlacklisted?: boolean;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("invalid_json", 400);
  }

  const field = (key: string) => {
    const value = (body as Record<string, unknown> | null)?.[key];
    return typeof value === "string" ? value.trim() : "";
  };

  // Bots get the same answer as people, but Brevo is never called.
  if (field(HONEYPOT_FIELD)) return ok("pending");

  const email = field("email");
  const name = field("name");
  if (!isValidEmail(email)) return fail("invalid_email", 400);

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_NEWSLETTER_LIST_ID);
  const templateId = Number(process.env.BREVO_NEWSLETTER_DOI_TEMPLATE_ID);
  if (!apiKey || !Number.isInteger(listId) || !Number.isInteger(templateId)) {
    console.error("Newsletter route is missing its Brevo configuration");
    return fail("not_configured", 502);
  }
  const headers = {
    "api-key": apiKey,
    accept: "application/json",
    "content-type": "application/json",
  };

  try {
    // A double opt-in contact only joins the list once they click the confirmation
    // link, so list membership is what tells "confirmed" from "pending".
    const lookup = await fetch(
      `${BREVO_API}/contacts/${encodeURIComponent(email)}?identifierType=email_id`,
      { headers, cache: "no-store" },
    );
    if (lookup.ok) {
      const contact = (await lookup.json()) as BrevoContact;
      const confirmed =
        contact.listIds?.includes(listId) &&
        !contact.listUnsubscribed?.includes(listId) &&
        !contact.emailBlacklisted;
      if (confirmed) return ok("already_subscribed");
    } else if (lookup.status !== 404) {
      return fail("upstream_status", 502);
    }

    // New or unconfirmed: (re)send the confirmation email.
    const doi = await fetch(`${BREVO_API}/contacts/doubleOptinConfirmation`, {
      method: "POST",
      headers,
      cache: "no-store",
      body: JSON.stringify({
        email,
        includeListIds: [listId],
        templateId,
        redirectionUrl: `${SITE.url}${CONFIRMATION_PATH}`,
        ...(name ? { attributes: { FIRSTNAME: name } } : {}),
      }),
    });
    if (!doi.ok) return fail("upstream_status", 502);

    return ok("pending");
  } catch {
    return fail("upstream_unreachable", 502);
  }
}
