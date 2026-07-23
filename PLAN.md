# BOCAP site build — plan & status

Working branch: `build-part-ii` (continuation of `build-bocap-site`, merged to `main` in #1). Delete this file before merging/PR — but not yet; keep it updated until the remaining pages below are implemented.

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

- ✅ **Ecosistema** (`/ecosistema`): `StartupGrid` (server; feature cards, sector Badge,
  location · stage footer) + `DirectorioFiltrable` (`"use client"`; chip filter, mini cards
  — mist band). `src/data/startups.ts`, `src/data/directorio.ts`.
  - **Content note**: real directory data supplied by the user (4 entries: Babasú Ventures,
    Cibersons, Escalatec, iThink VC — sourced from `members` in the legacy site's
    `siteContent.js`, not fabricated). `angels`/`accelerators`/`allies` arrays were empty in
    that source and are **not yet represented** — more data expected later this week.
  - **Startups**: no startup entries exist anywhere in the source data. `STARTUPS` is an
    empty array by design; `StartupGrid` renders an honest "Próximamente: startups del
    ecosistema boliviano." empty state rather than inventing entries. Update `STARTUPS` and
    (if new categories arrive) `DIRECTORIO` when real data lands — `DIRECTORY_CATEGORIES` is
    derived automatically from whatever `category` values are present, so no extra wiring
    needed for new categories.
  - **Category taxonomy deviates from the original plan below**: filter categories are
    driven by the real `category` field values from source data (`Fondo`, `Tecnología`,
    `VC`) rather than the originally-guessed `fondo`/`ángel`/`aceleradora`/`organización`
    union — the plan's guess didn't match the actual source classification.
  - Verified: `pnpm test` (13/13 incl. 2 new files), `pnpm typecheck`, `pnpm lint`,
    `pnpm build` all clean; `pnpm dev` HTTP smoke-check of rendered `/ecosistema` HTML
    confirmed all 4 directory cards, all 4 filter chips, external links, and the empty-state
    copy render correctly (no browser tooling available in this environment for a full
    click-through, but the client-side filter interaction is covered by
    `DirectorioFiltrable.test.tsx`, which fires the click and asserts the filtered DOM).

- ✅ **Recursos** (`/recursos`): `GuiasArticulos` (server) + `Reportes` (server, mist band).
  Built test-first (TDD skill) with leaf presentational components — `GuideCard`,
  `ReportRow` — extracted specifically so the url-present/url-absent branches (link-wrap,
  "Descargar →" vs "Próximamente") get real fixture-driven test coverage, since
  `GUIAS_ARTICULOS`/`REPORTES` are currently empty and looping over them would be vacuous.
  `src/data/guiasArticulos.ts` (`Guide { title, excerpt, category, meta, url? }`),
  `src/data/reportes.ts` (`Report { title, description, year, url? }`).
  - **No real content exists yet** — both arrays are empty by design (not fabricated);
    `GuiasArticulos`/`Reportes` render the same honest "Próximamente" empty-state pattern as
    `StartupGrid`. Populate when guides/articles/reports content is supplied.
  - Verified: `pnpm test` (21/21 incl. 4 new files/8 new tests), `pnpm typecheck`,
    `pnpm lint`, `pnpm build` all clean; `pnpm dev` HTTP smoke-check confirmed both
    "Próximamente" empty states render on `/recursos`.

- ✅ **Convocatorias** (`/convocatorias`): `Eventos` (server) + `AceleradorasAplicaciones`
  (server, mist band). Built test-first (TDD skill) with leaf presentational components —
  `EventoCard`, `ConvocatoriaRow` — for the same reason as Recursos: `EVENTOS`/
  `CONVOCATORIAS_ACELERADORAS` are currently empty, so fixture-driven tests on the leaf
  components are what actually exercises the conditional logic.
  `src/data/eventos.ts` (`Evento { title, description, date, location, status:
  "vigente"|"pasado", url? }`), `src/data/convocatoriasAceleradoras.ts` (`Convocatoria
  { program, organization, description, deadline, status: "vigente"|"cerrada", url? }`).
  - **No real content exists yet** — both arrays are empty by design; both sections render
    the established "Próximamente" empty-state pattern.
  - **CTA logic for `ConvocatoriaRow`** (confirmed with user, not fully spec'd in the
    original plan item below): `vigente` + `url` → "Postular" (external `Button`);
    `vigente` + no `url` → ghost "Más información" → `/contacto`; `cerrada` → no CTA at all
    (badge only) — a case the original plan text didn't cover.
  - **`EventoCard` also wraps itself in a link** when `evento.url` is present, mirroring
    `GuideCard`'s convention (the plan's `Evento` type includes `url?` but didn't spell out
    its use on the card itself).
  - Verified: `pnpm test` (31/31 incl. 4 new files/10 new tests), `pnpm typecheck`,
    `pnpm lint`, `pnpm build` all clean; `pnpm dev` HTTP smoke-check confirmed both
    "Próximamente" empty states render on `/convocatorias`.

- ✅ **Membresía** (`/membresia`): `QuienPuedeParticipar` (ink hero, no data seam — built
  directly like `QueEs`) + `TiposDeMiembro` (server, empty-state) + `Beneficios` (server,
  mist band, empty-state) + `MiembrosActuales` (server, tile wall, **populated**) +
  `UnirseForm` (server component, no `"use client"`, no `onSubmit` possible by design —
  submit `Button` is `disabled`; note "Este formulario es demostrativo y aún no está
  conectado"). Built test-first for the three data-driven sections (TDD skill).
  `src/data/tiposMiembro.ts`, `src/data/beneficios.ts`, `src/data/miembrosActuales.ts`.
  - **`TiposDeMiembro`/`Beneficios` are empty by design** — no real membership-tier or
    benefit content exists yet (this is institutional/policy content, judged too risky to
    guess at — could describe a membership incorrectly, not just use a placeholder name).
    Render the established "Próximamente" pattern.
  - **`MiembrosActuales` is populated**, not empty — it reuses the real `members` list from
    `siteContent.js` (same 4 orgs as `directorio.ts`/`miembrosAliados.ts`), since the
    ecosystem directory and BOCAP's actual membership roster are the same underlying data.
  - **`QuienPuedeParticipar`'s eligibility copy is drafted, not sourced verbatim** — the
    real `bocap.vc/#/miembros` page is a client-rendered Vue SPA (`WebFetch` only returned
    the page shell/title, no body content). The user supplied the site's `siteContent.js`
    source directly instead. That file has no literal "who's eligible" list, so the six
    bullets (Fondos de venture capital / Inversionistas ángeles / Aceleradoras /
    Corporativos / Founders y startups / Aliados institucionales) were synthesized from
    recurring phrasing across its `homeHighlights`/`institutionalGoals`/`aboutSections`
    fields. **Flagged for user review** — not a literal quote from the source.
  - **Fixed the previously-flagged fabricated Home content** using the same
    `siteContent.js` dump (user-confirmed in-session): `src/data/juntaDirectiva.ts` now
    holds the real board (Viviana Coloma/Presidenta · Escalatec + Aceleradora SOLYDES,
    Corina Marion/Vicepresidenta · Babasú Ventures, Juan Cruz Valdez Rojas/Secretario ·
    iThink VC, Álvaro Villarroel/Tesorero · Escalatec — org affiliations taken from each
    person's bio in the source), and `src/data/miembrosAliados.ts` now holds the real
    `members`/`allies` data (same 4 orgs; `allies` is empty in the real source too — no
    additional partners to add). Existing tests for both didn't need changes since they
    assert "one rendered item per data-array entry," not literal names.
  - **Still fabricated, not touched this session**: `src/data/cifras.ts` ("40+ startups",
    "$8M+ capital movilizado", etc.) — no real figures were in the `siteContent.js` dump
    supplied. Flagged for a future pass, not fixed now (out of scope for Membresía).
  - Verified: `pnpm test` (34/34 incl. 3 new files/3 new tests), `pnpm typecheck`,
    `pnpm lint`, `pnpm build` all clean; `pnpm dev` HTTP smoke-check confirmed all 6
    eligibility bullets, both empty states, all 4 `MiembrosActuales` tiles, and the
    UnirseForm demo note render on `/membresia`; confirmed on `/` that the real board names
    render and the old fabricated names (`María Fernanda Rojas`, `Andes Ventures`,
    `Impulso Bolivia`) are gone.

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

All 6 pages are now built (Home, Contacto, Ecosistema, Recursos, Convocatorias, Membresía).
What's left is content, review, and polish:

### 1. Content still needed from the institution
- `QuienPuedeParticipar`'s eligibility bullets (`src/components/sections/membresia/QuienPuedeParticipar.tsx`)
  are **drafted/synthesized**, not a literal source quote — needs review.
- Empty-state sections awaiting real content: `startups.ts` (Ecosistema),
  `guiasArticulos.ts`/`reportes.ts` (Recursos), `eventos.ts`/`convocatoriasAceleradoras.ts`
  (Convocatorias), `tiposMiembro.ts`/`beneficios.ts` (Membresía). Also still pending:
  `angels`/`accelerators` entries for `directorio.ts` (mentioned as arriving "later this
  week" as of this session).
- `src/data/cifras.ts` (Home stats: "40+", "$8M+", etc.) is still fabricated — no real
  figures have been supplied yet.

### 2. Polish
- ✅ `"typecheck": "tsc --noEmit"` script added to package.json.
- ✅ Per-route `metadata` exports — `contacto`, `convocatorias`, `ecosistema`,
  `membresia`, `recursos` all export `metadata`; Home (`src/app/page.tsx`) has none but
  correctly inherits the root layout's default title/description, which is the right
  copy for the homepage anyway.
- ✅ README: expanded from the bare install/dev stub into structure, design tokens,
  swap points (tokens in globals.css, `LOGO_SRC` in Logo.tsx, `SITE.email`/`NAV_LINKS`
  in nav.ts), Contacto form proxy + `ENTRY_IDS`/topic-value caveat, testing pattern,
  Next.js 16 docs note.
- ✅ Re-checked the already-built Home sections against `reference/legacy-styles.css`
  for exact-value drift (they were built from ported `globals.css` tokens + judgment,
  before the full legacy file was available). Scoped to **value fixes only** — kept
  the current simpler section structures rather than rebuilding legacy's bespoke
  features (Hero's image-carousel + stats bar, the animated network-diagram
  "regional-home" panel) — those are a separate, bigger undertaking if ever wanted.
  Found and fixed real, sitewide drift in shared primitives (not just Home, since
  these are used on all 6 pages):
  - `Card.tsx`: legacy's `.mini-card`/`.feature-card`/`.news-card`/`.ally-card`/...
    all share one rule (24px padding, `--radius-sm`, `box-shadow: var(--shadow)`).
    Our `feature`/`news` variants used the wrong radius (`--radius`, 22px) and all
    three variants were missing the shadow. Fixed.
  - `Section.tsx`: legacy `.section` padding is `clamp(72px, 11vw, 132px)` (flat
    `62px` below 640px) — ours was `py-16 sm:py-20` (64px/80px), notably tighter.
    Added a `--section-pad-y` token (`globals.css`) and fixed.
  - `Hero.tsx` / `QuienPuedeParticipar.tsx`: both stacked their own extra `py-*` on
    top of `Section`'s padding as a workaround for the old too-tight default — now
    redundant (would double up), removed.
  - `SectionHeading.tsx`: title was `text-3xl sm:text-4xl` (30–36px) vs legacy
    `.section-head h2`'s `clamp(2rem, 4vw, 3.2rem)` (32–51.2px) + `max-width: 16ch`.
    Added a `--heading-lg` token and fixed — affects every section title sitewide.
  - Bonus: an untracked `reference/sitContent.ts` (raw legacy `siteContent.js` dump)
    was breaking `pnpm typecheck`/`build` since `tsconfig`'s `**/*.ts` include picked
    it up. Renamed to `.js` to match how the other `reference/` files are kept
    (unrelated to the CSS audit, but was blocking verification of it).
  - Verified: `pnpm test` (34/34), `typecheck`, `lint`, `build` all clean; `/` and
    `/membresia` HTTP smoke-checked post-fix.

### 3. Verify
- ✅ `pnpm typecheck` / `pnpm lint` / `pnpm build` clean.
- ✅ `pnpm dev` click-through of all 6 routes + mobile nav + directory filter
  interaction — done by the user directly in-browser (confirmed working).

### 4. Ship
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
- Fonts loaded via `next/font/google` (Inter for `--sans`, Lora for `--serif`), set up in
  `src/app/layout.tsx`. h1–h4 get serif bold from globals.css.
- Server Components by default; `"use client"` only for real interactivity
  (DirectorioFiltrable, ContactForm, Nav, CopyEmailButton).
- pnpm only. Next.js 16: check `node_modules/next/dist/docs/` before assuming APIs.
