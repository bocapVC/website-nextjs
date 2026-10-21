# 0001 — Admin panel: git-based CMS (Sveltia) with password sign-in

- Status: accepted
- Date: 2026-10-21
- Issue: #25

## Context

Content lived in TypeScript files under `src/data/`, so only a developer could change
it. A few non-technical BOCAP staff need to edit a small set of content (general contact
settings, hero images, junta directiva, directorio, publicaciones; later a blog) through
one shared admin login. A delay of a minute or two before changes go live is fine, and
the site should stay fully static.

## Decision

- **Sveltia CMS** served as a static page at `/admin`. Content stays in the repo as JSON
  under `src/data/`; uploads are committed under `public/`.
- **Save = publish.** Each save is a commit to `main`; Vercel deploys it. No drafts, no
  review step; git history is the undo, and a failed build leaves the last deploy live.
- **Sign-in:** Sveltia's `auth_endpoint` points at our own route. It serves a password
  form, checks the shared `ADMIN_PASSWORD` (rate-limited per IP), and hands the CMS a
  **fine-grained PAT from `bocapVC`** limited to this repo with *Contents: write*, using
  the Decap/Sveltia popup `postMessage` protocol. Staff never see GitHub credentials.
- Spanish only for now; EN fields get added per field when the i18n phase lands.

## Alternatives rejected

- **Keystatic** — open, unanswered compatibility questions with Next.js 16 + Turbopack
  and slow maintenance; it embeds in the Next app, so it would be exposed to that risk.
  Sveltia is a standalone static page and doesn't depend on Next at all.
- **Sanity / hosted headless CMS** — instant updates, but content leaves the repo, pages
  fetch at runtime, and it adds an external service. Not needed for a ~2-minute delay.
- **Custom panel** — roughly 10× the code for forms, uploads and validation.
- **GitHub App installation tokens (1-hour)** — the original plan, tested and dropped:
  Sveltia calls `GET /user` at sign-in (403 *Resource not accessible by integration* for
  app tokens) and requires `permissions.push` on `GET /repos/{repo}` (absent for app
  tokens), so it reports "no access". Working around it needs a proxy that fakes those
  responses for all GitHub API traffic, which ties us to Sveltia internals and may hit
  Vercel's 4.5 MB request-body limit on uploads.
- **Staff signing in as `bocapVC` via GitHub OAuth** — hands out the repo owner's login.

## Consequences

- The PAT is long-lived and ends up in each editor's browser storage after sign-in.
  Mitigations: it can only write contents of this one public repo; rotate it whenever
  someone leaves; revoking it on GitHub is an instant off-switch. It has an expiry date,
  after which saving stops until it's regenerated.
- The rate limit lives in per-instance memory, so it resets on cold starts; the long
  random password is the real defense.
- Commits from the panel are authored as `bocapVC`; there's no per-person audit trail,
  consistent with the single shared login.
- Editable data must be JSON (or YAML/Markdown), not TypeScript; TS types stay alongside.
- Sveltia supports `required`, `hint`, `pattern`, `accept` and `max_file_size`, which
  later tickets use for upload rules.
- The repo is public, so anything uploaded is publicly readable on GitHub.
