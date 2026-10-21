import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Sign-in for the admin panel (Sveltia CMS at `/admin`), which opens this route in a popup as its
 * `auth_endpoint`. GET serves a password form; POST checks the shared ADMIN_PASSWORD and returns
 * GITHUB_CMS_TOKEN, a fine-grained PAT scoped to this repo (contents: write). The form page then
 * hands the token to the CMS window using the Decap/Sveltia popup protocol. See docs/adr/0001.
 */

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

// shortcut: per-instance memory, reset on cold start; the long random password is the real defense.
// Move to a shared store (e.g. Vercel KV) if guessing ever shows up in the logs.
const failures = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

/** Compares digests so neither the length nor the content of the password leaks through timing. */
function passwordMatches(given: string, expected: string) {
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(given), digest(expected));
}

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const token = process.env.GITHUB_CMS_TOKEN;
  if (!expected || !token) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ip = clientIp(request);
  const now = Date.now();
  const record = failures.get(ip);
  if (record && record.resetAt > now && record.count >= MAX_FAILURES) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  const password = (body as Record<string, unknown> | null)?.password;

  if (typeof password !== "string" || !passwordMatches(password, expected)) {
    const current = record && record.resetAt > now ? record : { count: 0, resetAt: now + WINDOW_MS };
    failures.set(ip, { ...current, count: current.count + 1 });
    return NextResponse.json({ ok: false, error: "wrong_password" }, { status: 401 });
  }

  failures.delete(ip);
  return NextResponse.json({ ok: true, token }, { headers: { "Cache-Control": "no-store" } });
}

// Popup page. The handshake mirrors Sveltia's `authorize()`: announce `authorizing:github`, wait for
// the CMS window to echo it, then post the result to the same origin only.
const PAGE = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Ingresar · Panel BOCAP</title>
<style>
  /* Standalone popup outside the app layout, so the brand tokens from globals.css are copied by value. */
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f5f5f5; color: #1f2f4a; font: 16px/1.5 system-ui, sans-serif; }
  form { width: min(320px, calc(100% - 32px)); display: grid; gap: 12px; }
  h1 { margin: 0 0 4px; font-size: 1.25rem; }
  input, button { font: inherit; padding: 10px 12px; border-radius: 8px; }
  input { border: 1px solid rgba(31, 47, 74, 0.2); }
  button { border: 0; background: #1f2f4a; color: #fff; cursor: pointer; }
  button:disabled { opacity: .6; }
  [role=alert] { margin: 0; font-weight: 600; min-height: 1.5em; }
</style>
</head>
<body>
<form id="f">
  <h1>Panel de administración</h1>
  <label for="p">Contraseña</label>
  <input id="p" type="password" autocomplete="current-password" required autofocus>
  <button>Ingresar</button>
  <p role="alert" id="e"></p>
</form>
<script>
  const MESSAGES = {
    wrong_password: "Contraseña incorrecta.",
    rate_limited: "Demasiados intentos. Espera 15 minutos.",
    not_configured: "El panel no está configurado en el servidor.",
  };
  const form = document.getElementById("f");
  const error = document.getElementById("e");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    if (!window.opener) {
      error.textContent = "Abre esta ventana desde /admin.";
      return;
    }
    form.querySelector("button").disabled = true;
    try {
      const res = await fetch(location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: document.getElementById("p").value }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(MESSAGES[data.error] || "No se pudo ingresar.");
      const handshake = "authorizing:github";
      window.addEventListener("message", (msg) => {
        if (msg.origin !== location.origin || msg.data !== handshake) return;
        window.opener.postMessage(
          "authorization:github:success:" + JSON.stringify({ token: data.token, provider: "github" }),
          location.origin,
        );
      });
      window.opener.postMessage(handshake, location.origin);
    } catch (err) {
      error.textContent = err.message;
      form.querySelector("button").disabled = false;
    }
  });
</script>
</body>
</html>`;

export function GET() {
  return new Response(PAGE, {
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
