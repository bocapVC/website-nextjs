# website-nextjs

BOCAP's marketing site (Bocap.vc — capital emprendedor / VC network in Bolivia),
rebuilt in Next.js. This is a from-scratch rebuild of an existing site: visual
design is not being reinvented — colors, type, spacing, and component styling
are ported 1:1 from the legacy site's `src/styles.css`.

## Getting started

This repo uses **pnpm** only (it's a pnpm workspace — see `pnpm-workspace.yaml`).
Don't use npm or yarn.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
pnpm build      # production build (Turbopack)
pnpm start      # serve the production build
pnpm lint       # ESLint (eslint-config-next, flat config)
pnpm typecheck  # tsc --noEmit
pnpm test       # Vitest + React Testing Library (jsdom)
```

## Structure

- `src/app/` — Next.js App Router. One folder per route (`contacto/`,
  `convocatorias/`, `ecosistema/`, `membresia/`, `recursos/`) plus the root
  `page.tsx` (home) and `layout.tsx`. `src/app/api/contact/route.ts` is the
  Contacto form's server proxy (see below).
- `src/components/sections/<page>/` — one component per page section, composed
  in that page's `page.tsx`. Tests live alongside each section in
  `__tests__/`.
- `src/components/ui/` — shared presentational primitives (`Button`, `Card`,
  `Badge`, `Section`, `Logo`, `FormField`, ...).
- `src/components/layout/` — `Header`, `Footer`, `Nav`, `CopyEmailButton`.
- `src/data/` — content backing the data-driven sections (one file per
  section, e.g. `startups.ts`, `eventos.ts`, `cifras.ts`). Several of these
  are currently empty arrays or placeholder figures because the real content
  hasn't been supplied yet — see `PLAN.md` for the up-to-date list of what's
  still pending from the institution. Sections render an honest "Próximamente"
  empty state rather than fabricated entries; never fill these with invented
  content.
- `src/config/nav.ts` — single source of truth for primary nav links and
  site-wide constants (see swap points below).
- `src/lib/cn.ts` — small `clsx`-style classname helper.

## Primitive components

`src/components/ui/` (`Button`, `Card`, `Badge`, `Section`, `Eyebrow`,
`FormField`, ...) are built from scratch on top of Tailwind utility classes —
there's no external component library (no shadcn/ui, Radix, Headless UI,
etc.) for now. Each primitive is a single file with a typed prop interface,
a plain `Record<Variant, string>` map of Tailwind classes for variants, and
`src/lib/cn.ts` (a tiny hand-rolled classname joiner) for merging classes —
no `clsx`/`tailwind-merge`/`cva` dependency either. If a future need
justifies pulling in a library, that's a deliberate decision to make then,
not an assumption to carry over from other projects.

## Design tokens

Tailwind CSS v4, CSS-first config — there's no `tailwind.config.*`. All
theming lives in `src/app/globals.css`: BOCAP brand values (`--ink`, `--red`,
`--teal`, `--gold`, `--paper`, `--radius`, `--shadow`, `--serif`, `--sans`,
...) are declared as CSS custom properties under `:root`, then mapped into
Tailwind's `@theme inline` block so they're usable as utilities (`bg-ink`,
`text-red`, `font-serif`, `rounded-brand`, `shadow-brand`, ...).

These are ported 1:1 from the legacy site's `src/styles.css` (see
`reference/legacy-styles.css` for the full original file). Don't invent new
brand colors, radii, or shadows — if a value seems to be missing, check the
legacy source first.

Typography is the one deliberate deviation: `--serif`/`--sans` are loaded via
`next/font/google` (Lora / Inter) in `src/app/layout.tsx`, rather than the
legacy site's Apple-only system font stack, so headings and body text render
consistently on Windows/Android/Linux too.

## Known swap points

A few values are institution-owned and intentionally centralized so they're
easy to update without hunting through components:

- **Contact email** — `SITE.email` in `src/config/nav.ts`.
- **Logo** — `LOGO_SRC` in `src/components/ui/Logo.tsx`, currently
  `public/logo.png`. The component expects a transparent PNG with the full
  white lockup, sized for dark surfaces (header pill, footer); height is
  supplied by the caller via `className`. The institution has been asked for
  an SVG or transparent PNGs in both color variants with the wordmark
  separated from the full lockup — swap in whatever lands.
- **Nav links** — `NAV_LINKS` in `src/config/nav.ts` (shared by `Header` and
  `Footer`).
- **Design tokens** — `:root` block in `src/app/globals.css` (see above).

## Contacto form

`src/app/api/contact/route.ts` is a server-side proxy that forwards
submissions to a Google Form (`formResponse` endpoint) rather than posting
from the browser directly — browser `no-cors` POSTs to Google Forms return an
opaque response with no readable status, so the proxy exists purely to
surface a real success/error to the user.

- Field → Google entry-ID mapping lives in `ENTRY_IDS` in that file. If the
  underlying Google Form is ever recreated, these `entry.xxxxxxxx` IDs will
  change and need updating.
- `CONTACT_TOPICS` in `src/data/contactTopics.ts` holds the "tema" select
  options; each `value` must match one of the Google Form's configured
  choices **exactly** (case- and accent-sensitive). All six were re-checked
  against the live form on 2026-07-28 and match:
  `Membresia` (singular, no accent — the visible label is "Membresías", the
  submitted value is not), `Alianzas Institucionales`,
  `Reportes e Investigación`, `Eventos y Participación`,
  `Prensa y Visibilidad`, `Otro`.
- If topic submissions ever stop appearing in the Form's responses, check for
  an accent/wording drift here first: the choice list has no "other"
  free-text fallback, so a value the form doesn't recognize is lost rather
  than recorded under a fallback.
- Verified live: a real submission returns `{ ok: true }`; missing-fields and
  invalid-JSON return `400`; an unreachable or erroring upstream returns
  `502`.

## Testing

Vitest + React Testing Library (jsdom), config in `vitest.config.mts` /
`vitest.setup.ts`. Tests live alongside each section in
`src/components/sections/<page>/__tests__/`. The established pattern:

- **Data-driven sections** — assert one rendered item per entry in the
  backing data array (plus empty-state copy when the array is empty).
- **CTA / nav links** — assert `href`s point at the right routes.

Not full-copy snapshots — copy is expected to change as real content arrives.

## Working with Next.js 16

This is a very new Next.js major version — APIs, conventions, and file
structure may differ from older training data or muscle memory. Before
relying on prior Next.js knowledge for App Router APIs, check the docs
bundled in `node_modules/next/dist/docs/` (mirrors nextjs.org/docs).

## Status

See `PLAN.md` for the current build status, what's been verified, and what
content is still pending from the institution. That file will be removed once
the site is fully content-complete and ready to ship.
