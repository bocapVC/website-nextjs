# BOCAP site build — plan & status

Working branch: `build-bocap-site`. Delete this file before merging/PR.

## Status

- ✅ **Foundation** (commit `5c2ee6f`): `src/config/nav.ts`, `src/lib/cn.ts`, ui primitives
  (`Section`, `Eyebrow`, `SectionHeading`, `Button`, `Card`, `Badge`, `Logo`,
  `FormField`, `StatusPanel`), layout (`Header`, `Footer`, `Nav`,
  `CopyEmailButton`), wired into `src/app/layout.tsx`.
- ✅ **Contacto** (commit `564da60`): `src/app/api/contact/route.ts` (server proxy to
  Google Forms with real status checking), `src/hooks/useContactSubmission.ts`,
  `ContactForm` + `ContactoInfo` sections, `/contacto` page, `src/data/contactTopics.ts`.
  - **Verified live**: real submission returned `ok:true`; error paths return 400/400/502.
  - **Pending human check**: confirm the "[PRUEBA] Test de integración del sitio" entry
    landed in the Google Form's linked responses (Google can 200 without recording if a
    choice value mismatches — esp. the accent-less `"Membresias"` topic value).
- ✅ **Home** (`/`): `src/app/page.tsx` composes `Hero`, `QueEs`, `AQuienRepresenta`,
  `QueHace`, `Cifras`, `JuntaDirectiva`, `MiembrosAliados`, `QuickAccess` from
  `src/components/sections/home/`. Data-driven sections and CTA links built test-first
  (Vitest + React Testing Library, see "Testing" below); `QueEs` has no data/link seam so
  it was implemented directly. `pnpm build` / `pnpm lint` / `pnpm exec tsc --noEmit` clean;
  `pnpm dev` click-through confirmed all 8 sections render in order.
- ✅ **Header/Nav redesign**: replaced the in-flow light `Header` + `MobileNav` with a
  fixed floating glass pill (`Header.tsx` + new `Nav.tsx`, `MobileNav.tsx` deleted),
  matching the legacy site's `.site-header`/`.site-header__inner`/`.site-nav` **exactly**
  (see `reference/legacy-styles.css` + `reference/legacy-header.vue`, both pasted in full
  by the user this session — the ground-truth source, not a screenshot approximation):
  fixed at `top:12px` (`10px` ≤640), `z-[80]`, `rounded-[20px]` (`18px` ≤640),
  `border-white/[0.08]`, background `linear-gradient(rgba(27,40,58,.72)→.6)`,
  `backdrop-blur-[16px] saturate(140%)`, `shadow-[0_18px_40px_rgba(0,0,0,.18)]`. Nav
  collapses to a hamburger + absolute dropdown panel below 920px (`rounded-brand-sm`,
  `bg-[rgba(27,40,58,.95)]`), active-route underline via `usePathname()`. Because the
  header is now `fixed` (not in-flow), `<main>` in `layout.tsx` got `pt-[104px]` so
  content doesn't sit under it — on `/` this leaves a small `paper`-colored strip above
  the Hero's ink band; a true "nav floats over the hero" look would need per-page
  top-padding instead (not done).
  - **Logo**: legacy header is just `<img class="brand-logo">` — no separate wordmark
    markup — so `Logo.tsx` was simplified to a single `<Image>` (no `invert` variant).
    Institution supplied a proper transparent white-lockup PNG at `public/logo.png`
    (replaced the earlier `logo.jpeg` + a hand-derived `logo-invert.png`, both gone).
    Height is caller-supplied via `className` per legacy's `clamp()` values: header
    `clamp(42px,5vw,58px)`, footer `clamp(52px,6vw,72px)`.
  - **Follow-up asks made to the institution**: prefer SVG, or transparent PNGs in both
    color variants, with the wordmark separate from the full lockup.
  - **Not yet re-verified live** after this last precision pass — `pnpm build`/`lint`/
    `typecheck`/tests are clean, but no fresh `pnpm dev` visual check was done post-edit
    (dev server from earlier in the session was left running per user request).

## Reference material
- `reference/legacy-styles.css` — the **full** legacy `src/styles.css`, pasted in full by
  the user. Not built/imported by the app; consult it directly for exact values (colors,
  radii, shadows, breakpoints) instead of re-deriving from screenshots or memory before
  porting any remaining page.
- `reference/legacy-header.vue` — the legacy Vue header component markup (structure only;
  already ported to `Header.tsx`/`Nav.tsx`).

## Testing

Added this session (repo had none before): Vitest + React Testing Library + jsdom
(`vitest.config.mts`, `vitest.setup.ts`, `pnpm test`), per the Next.js 16 docs guide since
Home's sections are synchronous Server Components. Agreed seams: **data-driven sections**
(assert one rendered item per entry in the backing array/data file) and **CTA/nav links**
(assert hrefs point at the right routes) — not full-copy snapshots. Tests live alongside
each section in `src/components/sections/<page>/__tests__/`. Apply the same approach to
the remaining pages below.

## Remaining work

### 2. Ecosistema (`/ecosistema`)
`StartupGrid` (server; feature cards with sector Badge, location · stage footer) +
`DirectorioFiltrable` (`"use client"`; filter chips Todos/Fondos/Ángeles/Aceleradoras/
Organizaciones, `useState` filter, mini cards with category Badge — mist band).
Data: `startups.ts` (`Startup { name, sector, description, location, stage }`),
`directorio.ts` (`DirectoryEntry { name, category: "fondo"|"ángel"|"aceleradora"|"organización", description, location, url? }` + `DIRECTORY_CATEGORIES` chip list).

### 3. Recursos (`/recursos`)
`GuiasArticulos` (news cards: category Badge, title, excerpt, meta; anchor-wrapped when
`url` present) + `Reportes` (row cards: year in red serif + title + description, "Descargar →"
when `url` else "Próximamente" — mist band).
Data: `guiasArticulos.ts` (`Guide { title, excerpt, category, meta, url? }`),
`reportes.ts` (`Report { title, description, year, url? }`).

### 4. Convocatorias (`/convocatorias`)
`Eventos` (feature cards: date in red, gold Badge "Vigente" / neutral "Pasado", title,
description, location) + `AceleradorasAplicaciones` (row cards: program + status Badge,
organization, description, deadline; CTA "Postular" (external url) or ghost "Más información"
→ /contacto when vigente — mist band).
Data: `eventos.ts` (`Evento { title, description, date, location, status: "vigente"|"pasado", url? }`),
`convocatoriasAceleradoras.ts` (`Convocatoria { program, organization, description, deadline, status: "vigente"|"cerrada", url? }`).

### 5. Membresía (`/membresia`)
`QuienPuedeParticipar` (ink hero + 2-col bullet list of who can join), `TiposDeMiembro`
(3 feature cards with ✓ highlight lists), `Beneficios` (6 mini cards — mist band),
`MiembrosActuales` (tile wall), `UnirseForm` (**UI only, intentionally unwired** — plain
server-component `<form>`, reuses FormField primitives, note "Este formulario es
demostrativo y aún no está conectado" — mist band, centered max-w-2xl).
Data: `tiposMiembro.ts` (`MemberType { name, description, highlights[] }`),
`beneficios.ts` (`Beneficio { title, description }`),
`miembrosActuales.ts` (`CurrentMember { name, type }` — separate from miembrosAliados until real data).

### 6. Polish
- ✅ `"typecheck": "tsc --noEmit"` script added to package.json.
- README: structure, swap points (tokens in globals.css, `LOGO_SRC` in Logo.tsx,
  `SITE.email` in nav.ts), contact-form verification notes.
- Per-route `metadata` exports (already the pattern in /contacto).
- Now that `reference/legacy-styles.css` exists, re-check the already-built Home
  sections against it for exact-value drift (they were built from the ported
  `globals.css` tokens + judgment, before the full legacy file was available).

### 7. Verify
`pnpm typecheck` / `pnpm lint` / `pnpm build` clean; `pnpm dev` click-through of all 6
routes + mobile nav; directory filter interaction.

### 8. Ship
Commit per phase. Push / PR **only on explicit user go-ahead**
(remote: git@github.com:bocapVC/website-nextjs.git).

## Conventions (from CLAUDE.md + established code)
- Real design tokens only — never invent colors/radii/shadows. Available: `ink`, `ink-soft`,
  `ink-deep`, `teal`, `teal-strong`, `gold`, `red`, `paper`, `paper-strong`, `mist`, `line`,
  `line-strong`, `surface`, `surface-solid`; `rounded-brand`, `rounded-brand-sm`,
  `shadow-brand`; `font-serif`/`font-sans`. Alpha variants (`red/10`, `white/70`) are fine.
- Muted text = `text-ink-soft`; card surface = `bg-surface-solid`; alt section band =
  `tone="mist"` on `Section`; pills = `rounded-full`; success/highlight = `gold` or `teal`.
- Eyebrow idiom: `text-xs font-bold uppercase tracking-[0.16em] text-red`.
- Containers: `max-w-[var(--maxw)] px-[var(--gutter)]` (Section handles this).
- No `next/font` — system stacks only. h1–h4 get serif bold from globals.css.
- Server Components by default; `"use client"` only for real interactivity
  (DirectorioFiltrable, ContactForm, Nav, CopyEmailButton).
- pnpm only. Next.js 16: check `node_modules/next/dist/docs/` before assuming APIs.
