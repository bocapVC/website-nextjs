import { NextResponse } from "next/server";
import { isValidEmail } from "@/lib/email";

/**
 * Server-side proxy for the protected-article email gate (see `ProtectedDownload`).
 * Same pattern as the Contacto route: forwarded server-to-server so the real
 * Google Forms status is visible.
 */

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSf5DlQDVrnF-yVKPb-I6aRBw9Odw6bjC_EuRBeEz2eXx5-4Fw/formResponse";

/** Gate field name -> Google Form `entry.xxx` id. */
const ENTRY_IDS = {
  email: "entry.2140414971",
  article: "entry.1559454988",
} as const;

/** Hidden field real visitors never see; anything in it means a bot filled the form. */
export const HONEYPOT_FIELD = "website";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const field = (key: string) => {
    const value = (body as Record<string, unknown> | null)?.[key];
    return typeof value === "string" ? value.trim() : "";
  };

  // Bots get the same answer as people, but nothing is recorded.
  if (field(HONEYPOT_FIELD)) {
    return NextResponse.json({ ok: true });
  }

  const email = field("email");
  const article = field("article");
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!article) {
    return NextResponse.json({ ok: false, error: "missing_article" }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.set(ENTRY_IDS.email, email);
  params.set(ENTRY_IDS.article, article);

  try {
    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
      // Don't follow the post-submit redirect; we only need the status.
      redirect: "manual",
      cache: "no-store",
    });

    // As in the Contacto route: only a 200 means Google recorded the response.
    if (res.status !== 200) {
      return NextResponse.json({ ok: false, error: "upstream_status" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_unreachable" }, { status: 502 });
  }
}
