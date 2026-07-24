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

interface ContactBody {
  name?: string;
  organization?: string;
  email?: string;
  topic?: string;
  message?: string;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const organization = body.organization?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const topic = body.topic?.trim() ?? "";
  const message = body.message?.trim() ?? "";

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

    // Google Forms answers a successful submission with a redirect (surfaced as
    // an opaque response with status 0 under `redirect: "manual"`) or a 200.
    // Anything >= 400 is a failure.
    const status = res.status;
    const ok = status === 0 || (status >= 200 && status < 400);

    if (!ok) {
      return NextResponse.json({ ok: false, error: "upstream_status" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }
}
