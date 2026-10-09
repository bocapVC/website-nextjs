import { NextResponse } from "next/server";

/**
 * Server-side proxy for the Contacto form.
 *
 * Posting to Google Forms from the browser is opaque (no-cors responses can't be
 * read), so we forward the submission server-to-server here where the real HTTP
 * status is visible and we can return honest success/error to the client.
 */

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/13L26lKRqN546lYPsPiMKdyISdAvInViVvXG83_ddpnA/formResponse";

/** Contacto field name -> Google Form `entry.xxx` id. */
const ENTRY_IDS = {
  name: "entry.905177308",
  organization: "entry.370367197",
  email: "entry.313738678",
  topic: "entry.1004391731",
  message: "entry.2128493084",
} as const;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Valid JSON isn't necessarily an object of strings (`null`, `{"name": 1}`);
  // anything that isn't a string field reads as empty and fails validation below.
  const field = (key: keyof typeof ENTRY_IDS) => {
    const value = (body as Record<string, unknown> | null)?.[key];
    return typeof value === "string" ? value.trim() : "";
  };
  const name = field("name");
  const organization = field("organization");
  const email = field("email");
  const topic = field("topic");
  const message = field("message");

  // organization is optional; the rest are required.
  if (!name || !email || !topic || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.set(ENTRY_IDS.name, name);
  params.set(ENTRY_IDS.organization, organization);
  params.set(ENTRY_IDS.email, email);
  params.set(ENTRY_IDS.topic, topic);
  params.set(ENTRY_IDS.message, message);

  try {
    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
      // Don't follow the post-submit redirect; we only need the status.
      redirect: "manual",
      cache: "no-store",
    });

    // Google Forms answers a recorded submission with a 200 confirmation page.
    // A redirect means it didn't record it (form closed, or sign-in required) —
    // server-side fetch surfaces the real 3xx, not the browser's opaque 0.
    if (res.status !== 200) {
      return NextResponse.json({ ok: false, error: "upstream_status" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }
}
