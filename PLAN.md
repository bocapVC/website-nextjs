# BOCAP site build — plan & status

Working branch: `ui-004`. `main` is at `245184c` (PR #5, `ui-003`); the `build-part-ii` and
`build-bocap-site` branches this file was started on are already merged.

**Build phase is complete**: all 6 pages are built and test-first, Polish and Verify are
both done (see "Remaining work" below), and the branch is committed locally. What's left
is (1) real content from the institution for several still-empty sections, and (2) the
Ship step — push/PR only on explicit user go-ahead. Delete this file at that point (once
those content gaps are resolved or consciously deferred past the PR) — not yet, since it's
still the authoritative tracker for what's pending.

## Status

- ✅ **Foundation** (commit `5c2ee6f`): `src/config/nav.ts`, `src/lib/cn.ts`, ui primitives
  (`Section`, `Eyebrow`, `SectionHeading`, `Button`, `Card`, `Badge`, `Logo`,
  `FormField`, `StatusPanel`, plus `ExternalLink` and `PageHeader` added later), layout
  (`Header`, `Footer`, `Nav`, `CopyEmailButton`), wired into `src/app/layout.tsx`.
  Icons live in `src/components/icons/` (`ArrowUpRight`, `ElegibleIcons`).
- ✅ **Contacto** (commit `564da60`): `src/app/api/contact/route.ts` (server proxy to
  Google Forms with real status checking), `src/hooks/useContactSubmission.ts`,
  `ContactForm` + `ContactoInfo` sections, `/contacto` page, `src/data/contactTopics.ts`.
  - **Verified live**: real submission returned `ok:true`; error paths return 400/400/502.
  - ✅ **Topic values re-checked against the live form** (2026-07-28): all six
    `CONTACT_TOPICS` values match the form's configured choices exactly. The earlier note
    here and in the README claimed the form's choice was the plural `"Membresias"` while
    the code sends the singular `"Membresia"` — the **code was right and the docs were
    wrong**; the form's option really is `Membresia`. No code change was needed.
  - **Pending human check** (narrowed): confirm the "[PRUEBA] Test de integración del
    sitio" entry landed in the Form's linked responses. The topic-value risk is now closed,
    but the five `entry.NNN` field IDs in `route.ts` still can't be validated from outside —
    a wrong ID is accepted by Google and silently drops that one answer. Only seeing a real
    submission arrive with all five fields populated proves them.
- ✅ **Home** (`/`): rebuilt to match a 7-section outline the user supplied directly (Hero,
  Qué es BOCAP, Qué obtienes como miembro, El ecosistema, Oportunidades/eventos/recursos,
  Quiénes conforman BOCAP, Cierre). `src/app/page.tsx` now composes `Hero`, `QueEs`,
  `Ecosistema`, `OportunidadesEventosRecursos`, `QuienesConforman`, `Cierre`
  from `src/components/sections/home/`.
  - **`QueObtienes` moved off Home later** (see the Membresía entry below): the "Qué obtienes
    como miembro" section was judged to be membership content, not homepage content, so it
    was relocated to `/membresia`'s `Beneficios` section (replacing that section's empty
    placeholder) and its CTA dropped — a membership CTA doesn't belong on the page it's
    already pointing at. Home no longer has a dedicated "qué obtienes" section; `QueEs` →
    `Ecosistema` now run back to back.
  - **Removed** (not in the new outline, confirmed with user): `AQuienRepresenta`, `QueHace`
    (+ `src/data/pilares.ts`), `Cifras` (+ `src/data/cifras.ts` — its numbers were fabricated
    anyway), `QuickAccess` (superseded by `Cierre`).
  - **`Ecosistema`** and **`Cierre`** are new, static (no data seam) — ink-toned bands with
    CTAs, mirroring `Hero`'s pattern. `Ecosistema` reuses `/ecosistema.avif` as a photo band.
  - **`OportunidadesEventosRecursos`** is new and conditionally rendered (note the `eventos`
    column's threshold was later loosened to "any event" — see the 2026-08-06 entries): a pure
    `buildActivityColumns()` helper flags each of the three columns (`oportunidades` from
    `oportunidadesAceleradoras.ts` status `vigente`, `eventos` from `eventos.ts` non-empty,
    `recursos` from `reportes.ts`/`guiasArticulos.ts` non-empty) as having real
    content or not; the whole section returns `null` unless at least 2 of 3 columns qualify
    (per the outline's dev note: "mostrar solo contenido real y vigente... ocultar la
    sección" if fewer than 2 items exist). ~~**Currently renders nothing** — all four backing
    data files are still empty~~ — as of 2026-08-06 it renders two columns (`eventos` +
    `recursos`); see the 2026-08-06 entries.
  - **`QuienesConforman`** merges the old separate `MiembrosAliados` + `JuntaDirectiva`
    sections into one `Section` (the outline frames "¿Quiénes conforman BOCAP?" as a single
    section with two parts, not two page bands), with a shared intro before the Miembros logo
    wall. **Its "Conocer cómo participar" CTA (→ `/membresia`) was later removed** —
    redundant with `Cierre`'s membership CTA further down the same page, which already
    covers the membership ask. The logo wall renders
    real assets: `src/data/miembrosAliados.ts` gained a `logo` field per partner, backed by
    `public/logos/` (`babasu-ventures.png`, `cibersons.svg`, `escalatec.svg`,
    `ithink-vc.svg`) — supplied, not placeholders. **Board cards still show
    initials (no photo) and full bios** — the outline wants a photo per member and no long
    bios, but real headshots don't exist yet; user confirmed (2026-07-28) to defer that
    trim until photos are supplied, not to strip bios in the meantime.
  - **Copy fixes**: `Hero`'s ghost CTA now reads "Explorar el ecosistema" (was "Explora el
    ecosistema"); `QueEs`'s second paragraph now reads "No administramos el dinero de
    nadie" (was "No administramos capital") to match the outline verbatim. Misión/Visión
    cards on `QueEs` were kept (user confirmed) even though the outline doesn't mention them.
  - **CTA consolidation (later session)**: all home membership CTAs now point straight at
    the `/membresia` form instead of the top of the page — `UnirseForm` gained `id="unirse"`
    and every CTA links to `/membresia#unirse`. `Ecosistema`'s "Agregar mi organización" CTA
    (the `showOrgCta` prop) was dropped as redundant with `Cierre`'s CTA on the same page —
    `Ecosistema` now renders only "Explorar el mapa". `Cierre` itself went from two CTAs
    ("Quiero ser miembro" + "Agregar mi organización", both doing the same thing) down to
    one, rephrased "Unirse".
  - **Fixed a pre-existing broken test**: `Hero.test.tsx` asserted a `/contacto` link that
    `Hero` has never rendered (only `/membresia` + `/ecosistema`) — was failing on `main`
    before this session; corrected the assertion to `/membresia#unirse`.
  - **`QuienesConforman`'s "Miembros" subhead renamed to "Miembros fundadores"** (later
    session, user confirmed): all 4 entries in `MIEMBROS_ALIADOS` (Babasú Ventures,
    Cibersons, Escalatec, iThink VC) are specifically the founding members, not a general
    members roster, so the label now says that explicitly.
  - Verified: `pnpm test` (56/56), `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean;
    `pnpm dev` HTTP smoke-check confirmed all 6 rendered sections (Hero through Cierre) plus
    the correctly-hidden 7th (`OportunidadesEventosRecursos`).
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

- ✅ **Ecosistema** (`/ecosistema`): a shared `PageHeader` (photo band) + `UneteRed` (server,
  mist band) + `EcosistemaTabs` (`"use client"`). `src/data/startups.ts`,
  `src/data/directorio.ts`.
  - **`UneteRed`** (added later, `src/components/sections/ecosistema/UneteRed.tsx`): sits
    directly after `PageHeader`, mirrors home's `Cierre` band (`SectionHeading` + single
    primary `Button`) but with one CTA only — "Quiero ser miembro" → `/membresia`. Covered by
    `UneteRed.test.tsx` (1 test, asserts the link href).
  - **`EcosistemaTabs` eyebrow** (added later): an `Eyebrow` reading "Ecosistema Bocap" sits
    above the tab row. Covered by a dedicated case in `EcosistemaTabs.test.tsx`.
  - **Superseded structure**: the original `StartupGrid` (server) + `DirectorioFiltrable`
    (`"use client"`, chip filter) pair described here was replaced by the single
    `EcosistemaTabs` component — one tab row (`Todos`, `Fondos`, `Ángeles`, `Aceleradoras`,
    `Startups`) over both `DIRECTORIO` and `STARTUPS`, rather than two separate page bands
    with their own filter. Tests moved with it: `EcosistemaTabs.test.tsx` (now 7 tests) covers
    the eyebrow, every tab, the per-category filtering, and the "próximamente" states.
  - **Content note**: real directory data supplied by the user (4 entries: Babasú Ventures,
    Cibersons, Escalatec, iThink VC — sourced from `members` in the legacy site's
    `siteContent.js`, not fabricated). `angels`/`accelerators`/`allies` arrays were empty in
    that source and are **not yet represented** — more data expected later this week.
  - **Startups**: no startup entries exist anywhere in the source data. `STARTUPS` is an
    empty array by design; the Startups tab renders an honest "próximamente" empty state
    rather than inventing entries. Update `STARTUPS` and
    (if new categories arrive) `DIRECTORIO` when real data lands — `DIRECTORY_CATEGORIES` is
    derived automatically from whatever `category` values are present, so no extra wiring
    needed for new categories.
  - **Category taxonomy deviates from the original plan below**: filter categories are
    driven by the real `category` field values from source data (`Fondo`, `Tecnología`,
    `VC`) rather than the originally-guessed `fondo`/`ángel`/`aceleradora`/`organización`
    union — the plan's guess didn't match the actual source classification.
  - Verified at the time (against the superseded structure): `pnpm test` (13/13 incl. 2 new
    files), `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean; `pnpm dev` HTTP
    smoke-check of rendered `/ecosistema` HTML confirmed all 4 directory cards, all 4 filter
    chips, external links, and the empty-state copy. The tab interaction is covered by
    `EcosistemaTabs.test.tsx`, which fires the clicks and asserts the filtered DOM.
  - Re-verified after adding `UneteRed` + the tabs eyebrow: `pnpm test` (128/128),
    `pnpm typecheck`, `pnpm lint` all clean.

- ✅ **Recursos** (`/recursos`): `GuiasArticulos` (server) + `Reportes` (server, mist band).
  Built test-first (TDD skill) with leaf presentational components — `GuideCard`,
  `ReportRow` — extracted specifically so the url-present/url-absent branches (link-wrap,
  "Descargar →" vs "Próximamente") get real fixture-driven test coverage, since
  `GUIAS_ARTICULOS`/`REPORTES` are currently empty and looping over them would be vacuous.
  `src/data/guiasArticulos.ts` (`Guide { title, excerpt, category, meta, author?, url? }`),
  `src/data/reportes.ts` (`Report { title, description, year, url? }`).
  - `GUIAS_ARTICULOS` holds one real article ("Bolivia como piloto, no como techo",
    Álvaro Villarroel Valencia, 2026), a PDF committed at
    `public/articulos/bolivia_como_piloto.pdf` and linked via `url`. PDFs live in `public/`
    rather than Vercel Blob: one static file that never changes after publication doesn't
    justify the integration + token, and because `url` is just a string, moving to Blob later
    is a one-line data edit. Note Next.js serves `public/` with `Cache-Control: public,
    max-age=0`.
  - `REPORTES` is still empty by design (not fabricated); `Reportes` renders the same honest
    "Próximamente" empty-state pattern as `StartupGrid`. Populate when reports are supplied.
  - `GuideCard` is deliberately **not** a card-wide link: only the
    "Descargar" `ExternalLink` is clickable, and the card has no hover lift (no `interactive`).
    (`EventoCard` was the lone exception to this until 2026-08-06, when it was brought in
    line — see the Oportunidades entry below.)
    It's a real anchor rather than an `onClick` so the component stays a server component and
    keeps middle-click/cmd-click/copy-link for free. A test asserts the button is the sole
    anchor and that the title is not inside one.
  - Verified: `pnpm test` (21/21 incl. 4 new files/8 new tests), `pnpm typecheck`,
    `pnpm lint`, `pnpm build` all clean; `pnpm dev` HTTP smoke-check confirmed both
    "Próximamente" empty states render on `/recursos`.

- ✅ **Oportunidades** (`/oportunidades`, renamed from Convocatorias): `Eventos` (server) +
  `AceleradorasAplicaciones` (server, mist band). Built test-first (TDD skill) with leaf
  presentational components — `EventoCard`, `OportunidadRow` (renamed from
  `ConvocatoriaRow`) — for the same reason as Recursos: `EVENTOS`/
  `OPORTUNIDADES_ACELERADORAS` are currently empty, so fixture-driven tests on the leaf
  components are what actually exercises the conditional logic.
  `src/data/eventos.ts` (`Evento` — see the 2026-08-06 entry below for its current shape),
  `src/data/oportunidadesAceleradoras.ts` (`Oportunidad
  { program, organization, description, deadline, status: "vigente"|"cerrada", url? }`).
  - **No real content existed at the time** — both arrays were empty by design; both
    sections render the established "Próximamente" empty-state pattern. `eventos.ts` has
    since been populated (see below); `oportunidadesAceleradoras.ts` is still empty.
  - **CTA logic for `OportunidadRow`** (confirmed with user, not fully spec'd in the
    original plan item below): `vigente` + `url` → "Postular" (external `Button`);
    `vigente` + no `url` → ghost "Más información" → `/contacto`; `cerrada` → no CTA at all
    (badge only) — a case the original plan text didn't cover.
  - ✅ ~~**`EventoCard` also wraps itself in a link** when `evento.url` is present~~ —
    superseded 2026-08-06: the card-wide link was removed in favor of an explicit
    "Más información" button, so `EventoCard` now matches `GuideCard`'s convention rather
    than diverging from it. See the entry below.
  - Verified: `pnpm test` (31/31 incl. 4 new files/10 new tests), `pnpm typecheck`,
    `pnpm lint`, `pnpm build` all clean; `pnpm dev` HTTP smoke-check confirmed both
    "Próximamente" empty states render on `/oportunidades`.

- ✅ **First real event + derived event state** (2026-08-06). `eventos.ts` is no longer
  empty: it holds the Orbit Ventures "China Insider Access Program: LATAM Investors &
  Builders" delegation (14–18 Sept 2026, Shanghái/Hangzhou), supplied by the user with a
  flyer and a link the user verified. Description is a first pass, flagged for review with
  BOCAP.
  - **`Evento` is now `{ title, description, startDate, endDate?, location, url?,
    image? }`** — `date` and `status` were **removed** from the data. Both are derived in
    `src/lib/eventos.ts` (`eventoStatus`, `formatEventoDate`, `sortEventos`,
    `hasVigenteEvento`) so nobody has to hand-maintain a "Vigente" badge or keep a display
    string in sync with a real date. Rationale from the user: "it does not make sense to
    babysit all the data we add."
  - **Dates are compared as ISO day *strings*, never `Date` objects.** `new Date("2026-09-18")`
    is UTC midnight, which is still Sept 17 in Bolivia — Date arithmetic would flip the badge
    a day early. "Today" comes from `Intl.DateTimeFormat("en-CA", { timeZone: "America/La_Paz" })`,
    and ISO `YYYY-MM-DD` sorts lexicographically, so `<` is the whole comparison. An event
    stays `vigente` through the **end of its last day**.
  - **`export const revalidate = 3600` on `/oportunidades`.** This is load-bearing, not
    decoration: the page is static, so without it the derived status would freeze at build
    time and never flip. Cache Components is **not** enabled in `next.config.ts`, so the
    route segment config `revalidate` is still the right API here (under Cache Components
    it's removed — see `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`).
    The build output confirms the route at `1h`. **Any future data whose rendering depends
    on "now" needs the same treatment.** (`/` also had one until the same-day follow-up
    below removed its last dependency on "now".)
  - `formatEventoDate` collapses ranges as far as it can: `14–18 de septiembre, 2026` /
    `28 de septiembre – 2 de octubre, 2026` / `28 de diciembre, 2026 – 2 de enero, 2027`.
  - `sortEventos` puts `vigente` first (soonest first), then `pasado` (most recent first) —
    same "don't babysit it" reasoning, otherwise past events sit wherever they were pasted.
  - **Flyer support**: optional `image: { src, alt }` rendered full-bleed and square at the
    top of the card, via negative margins (`-mx-6 -mt-6`) cancelling `Card`'s `p-6` plus
    `overflow-hidden` for the rounded top edge. Committed at
    `public/eventos/china-insider-access-program.jpg` (same `public/`-over-Blob reasoning as
    the Recursos PDF). **Caveat: the source is only 400×400**, so it upscales slightly at
    ~33vw on desktop — drop in a larger original at the same path if Orbit supplies one.
  - **`EventoCard` is no longer a card-wide link** (user request): the `MaybeExternalLink`
    wrapper and the `interactive` hover-lift are gone, replaced by an explicit external
    `Button` (`size="sm"`, "Más información") rendered only when `evento.url` is set —
    matching `OportunidadRow`'s idiom. Tests pin down that the card itself isn't an anchor
    (exactly one link, and it's the button).
  - **`MaybeExternalLink` was deleted** from `src/components/ui/ExternalLink.tsx` — the
    `EventoCard` wrapper was its only caller. `ExternalLink` itself stays (used by `Button`).
  - Test fixtures use far-future/far-past dates (`2099-…`/`2000-…`) so derived status stays
    deterministic as time passes; `src/lib/__tests__/eventos.test.ts` passes an explicit
    `today` instead.
  - Verified: `pnpm test` (147/147), `typecheck`, `lint`, `build` all clean; `pnpm start`
    HTTP check confirmed the rendered card, the `Vigente` badge, the "Más información"
    anchor with `target="_blank"`, and the flyer served as AVIF (14.6 KB from 37.7 KB).
    One unrelated intermittent `Nav` test failure was seen once under heavy CPU contention
    and did not reproduce across four subsequent runs — unresolved, worth watching in CI.

- ✅ **Membresía** (`/membresia`): `QuienPuedeParticipar` (ink hero with photo band) +
  `Beneficios` (server, mist band, populated) + `Ecosistema` (shared, ink band — see below) +
  `UnirseForm`. Built test-first for the data-driven sections (TDD skill).
  `src/data/beneficios.ts`, `src/data/elegibles.ts`.
  - **`UnirseForm` is now a real, working form** (commit `e7036d2`), not the disabled demo
    originally described here: it renders `<ContactForm fixedTopic="Membresia" />`, so
    submissions go through the same `/api/contact` proxy as Contacto with the topic locked.
    The "Este formulario es demostrativo" note and the `disabled` submit button are gone.
  - **`UnirseForm` restyled to match `/contacto`'s layout** (user request): swapped the old
    centered `SectionHeading` + single-column form card for the same two-column
    `grid gap-12 lg:grid-cols-2 lg:gap-16` split `ContactoPage` uses — a new left-column
    `UnirseInfo` component (`src/components/sections/membresia/UnirseInfo.tsx`, mirroring
    `ContactoInfo`'s eyebrow/h2/paragraph/callout shape) alongside the same form card on the
    right. **New copy sets expectations that weren't stated before**: the paragraph asks
    visitors to describe their organization and which ecosystem category it fits (Fondos ·
    Ángeles · Aceleradoras · Startups), and a "Qué esperar" callout states BOCAP reviews each
    request manually and follows up by email. `ContactForm` gained an optional
    `messageHint` prop (rendered as the `TextareaField` hint under "Mensaje") so this same
    category prompt also shows inline on the message field itself; `/contacto`'s usage is
    unaffected since it doesn't pass the prop. Covered by `UnirseForm.test.tsx` (new) and two
    new `ContactForm.test.tsx` cases for `messageHint`.
  - Verified: `pnpm test` (132/132), `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean;
    `pnpm dev` HTTP smoke-check of `/membresia` confirmed the two-column layout, the category
    copy, and the "Qué esperar" callout all render.
  - **`QuienPuedeParticipar` is data-driven now**, not inline copy: the six eligibility
    entries live in `src/data/elegibles.ts` and each renders with an icon from
    `ELEGIBLE_ICONS` (`src/components/icons/ElegibleIcons.tsx`).
  - **`TiposDeMiembro` unrendered on `/membresia` for now** (user request) — still no real
    membership-tier content exists (institutional/policy content, too risky to guess at), and
    its "Próximamente" empty state was judged to hurt the page visually more than an omitted
    section would. Component, test, and `src/data/tiposMiembro.ts` are all kept as-is (not
    deleted) — just no longer imported/composed into `MembresiaPage`. Re-add the import once
    real tier content lands.
  - **`Beneficios` is populated now, not empty** — the "Qué obtienes como miembro" content
    (3 cards: Acceso a oportunidades, Con quién invertir, Datos & Know-how) was moved here
    from Home's `QueObtienes` section (real, previously-approved copy — was valid member
    info that belonged on the membership page, not the homepage) and its CTA to `/membresia`
    was dropped, since a membership CTA is redundant on the page it already points at.
    `src/data/beneficios.ts` now holds that content (the old empty array + its
    `QUE_OBTIENES`/`queObtienes.ts` counterpart from Home were retired); `Beneficios.tsx` no
    longer has an empty-state branch, matching the no-dead-code pattern the original
    `QueObtienes` used for the same static data.
  - **`Beneficios` was moved ahead of `TiposDeMiembro`** (user request, since superseded by
    `TiposDeMiembro` being unrendered entirely — see above): it's the page's first content
    section right after the `QuienPuedeParticipar` hero.
  - **`MiembrosActuales` retired** (component, test, and `src/data/miembrosActuales.ts` all
    deleted): its tile wall duplicated the same 4-org roster already shown on `/ecosistema`
    (`EcosistemaTabs`/`directorio.ts`), and its brief "Ver el ecosistema completo" CTA phase
    (added in the prior session) made that duplication obvious — pointing users at
    `/ecosistema` for the real thing rather than a second, thinner copy of it on this page.
  - **`Ecosistema` moved from `home/` to a shared location**
    (`src/components/sections/shared/Ecosistema.tsx`, test alongside it in
    `shared/__tests__/`) since it's now rendered on two pages: `/` (unchanged) and
    `/membresia`, in the slot `MiembrosActuales` vacated — same ink-toned teaser band
    ("El mapa de startups e inversionistas de Bolivia" + "Explorar el mapa" → `/ecosistema`),
    replacing the tile wall with a lighter pointer to the same destination.
  - **`Ecosistema` gained a `showOrgCta` prop** (default `true`) to hide its second button,
    "Agregar mi organización" → `/contacto`, when rendered on `/membresia`
    (`<Ecosistema showOrgCta={false} />`) — asking a visitor already on the membership page
    to "add their organization" via a separate contact-form detour is redundant with the
    `UnirseForm` right below it. Home's usage is unchanged (prop omitted, defaults to shown).
    **Later removed entirely** (later session): with Home's `Cierre` already carrying the
    same "Agregar mi organización" ask, having it on `Ecosistema` too (shown on Home) was
    redundant there as well — dropped the button and the `showOrgCta` prop, `Ecosistema` now
    always renders just "Explorar el mapa" on both pages.
  - Re-verified after the `MiembrosActuales` → shared-`Ecosistema` swap: `pnpm test`
    (127/127), `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean.
  - Re-verified after unrendering `TiposDeMiembro`: `pnpm test` (127/127), `pnpm typecheck`,
    `pnpm lint` all clean.
  - **`QuienPuedeParticipar`'s eligibility copy is drafted, not sourced verbatim** — the
    real `bocap.vc/#/miembros` page is a client-rendered Vue SPA (`WebFetch` only returned
    the page shell/title, no body content). The user supplied the site's `siteContent.js`
    source directly instead. That file has no literal "who's eligible" list, so the six
    bullets (Fondos de venture capital / Inversionistas ángeles / Aceleradoras /
    Corporativos / Founders y startups / Aliados institucionales) were synthesized from
    recurring phrasing across its `homeHighlights`/`institutionalGoals`/`aboutSections`
    fields. **Flagged for user review** — not a literal quote from the source. (Now in
    `src/data/elegibles.ts` rather than inline in the component.)
  - **Fixed the previously-flagged fabricated Home content** using the same
    `siteContent.js` dump (user-confirmed in-session): `src/data/juntaDirectiva.ts` now
    holds the real board (Viviana Coloma/Presidenta · Escalatec + Aceleradora SOLYDES,
    Corina Marion/Vicepresidenta · Babasú Ventures, Juan Cruz Valdez Rojas/Secretario ·
    iThink VC, Álvaro Villarroel/Tesorero · Escalatec — org affiliations taken from each
    person's bio in the source), and `src/data/miembrosAliados.ts` now holds the real
    `members`/`allies` data (same 4 orgs; `allies` is empty in the real source too — no
    additional partners to add). Existing tests for both didn't need changes since they
    assert "one rendered item per data-array entry," not literal names.
  - **`src/data/cifras.ts` was fabricated** ("40+ startups", "$8M+ capital movilizado") and
    was flagged here for a future pass — since **resolved by deletion**: the Home rebuild
    dropped the `Cifras` section and its data file entirely, so no invented figures ship.
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

Vitest + React Testing Library + jsdom (`vitest.config.mts`, `vitest.setup.ts`, `pnpm test`),
per the Next.js 16 docs guide since most sections are synchronous Server Components.
**Current state: 126 tests across 26 files, all passing.**

Original seams, still the rule for section components: **data-driven sections** (assert one
rendered item per entry in the backing array/data file) and **CTA/nav links** (assert hrefs
point at the right routes) — not full-copy snapshots. Tests live alongside each section in
`src/components/sections/<page>/__tests__/`.

Extended beyond section rendering since (commit `10ebd18`), on the principle that anything
which can *silently* fail needs coverage:
- **`src/app/api/contact/__tests__/route.test.ts`** — the site's only server-side logic.
  Validation (bad JSON, each missing/whitespace-only required field), the five Google Form
  `entry.NNN` mappings (spelled out in the test, not imported — a wrong id is accepted by
  Google and silently drops that answer), the request shape, and the full upstream status
  table including status `0`. `next/server` runs fine under the existing jsdom config;
  `POST` is called directly with a plain `Request`.
- **`src/hooks/__tests__/useContactSubmission.test.ts`** — both halves of
  `res.ok && data.ok === true`, the non-JSON-body path, in-flight status, and `reset()`.
- **`src/components/layout/__tests__/`** — `Nav` (toggle state, `aria-current` active route,
  close-on-navigate), `CopyEmailButton` (clipboard success/refused/absent-API, feedback
  window), `Header`/`Footer` (landmarks, link inventory). `usePathname` is mocked via
  `vi.hoisted` + `vi.mock("next/navigation")` — the pattern to reuse for route-aware
  components.

Not yet covered: the `src/app/*/page.tsx` files (nothing renders a whole page, so a section
that throws on import would pass CI and fail at build), and most `src/components/ui/`
primitives (`Section` and `FormField`-adjacent behavior aside).

## Remaining work

All 6 pages are now built (Home, Contacto, Ecosistema, Recursos, Oportunidades, Membresía).
What's left is content, review, and polish:

### 1. Content still needed from the institution
- `QuienPuedeParticipar`'s eligibility bullets (`src/components/sections/membresia/QuienPuedeParticipar.tsx`)
  are **drafted/synthesized**, not a literal source quote — needs review.
- Empty-state sections awaiting real content: `startups.ts` (Ecosistema), `reportes.ts`
  (Recursos — `guiasArticulos.ts` has one real article as of 2026-07-29),
  `oportunidadesAceleradoras.ts` (Oportunidades), `tiposMiembro.ts` (Membresía —
  `beneficios.ts` is populated now, see the Membresía entry above). Also still pending:
  `angels`/`accelerators` entries for `directorio.ts` (mentioned as arriving "later this
  week" as of this session).
- ✅ ~~`eventos.ts` empty~~ — resolved 2026-08-06 with the Orbit Ventures China delegation.
  **This also unhid Home's `OportunidadesEventosRecursos` section**: the 2-of-3 rule is now
  met by `eventos` + `recursos`, with no code change needed (as predicted).
- ✅ ~~The Home section would re-hide itself after 2026-09-18~~ — resolved same day: the
  `eventos` column now counts **any** event, not just `vigente` ones (user call: "we want
  past events displayed for now"), so the section stays up once the Orbit event passes.
  This is the one column that doesn't require currency — `oportunidades` still requires
  `vigente`, and a `cerrada` oportunidad still doesn't count. **Revisit when the calendar is
  less thin**: `hasVigenteEvento` in `src/lib/eventos.ts` is the stricter rule, kept in place
  (and currently unused) precisely so switching back is a one-line change.
  - Knock-on: Home no longer derives anything from today's date, so its `revalidate` was
    removed rather than left as misleading cargo. `/oportunidades` still needs its own.
  - ✅ ~~**Open copy question:** the column is titled "Próximos eventos"~~ — resolved: the
    column title is now just **"Eventos"**. "Próximos" would have gone stale after 2026-09-18
    (advertising upcoming events while only a past one exists), and per the user it "adds no
    value" anyway. The column `key` stays `eventos`; only the visible title changed.
- The Orbit event's `description` is a first pass written from the forwarded blurb; the user
  is reviewing the wording with BOCAP.
- Home's `QuienesConforman` board cards need real headshots to add the photo the outline
  calls for (and to justify dropping the bios) — deferred, user confirmed 2026-07-28.
- ✅ ~~`src/data/cifras.ts` fabricated stats~~ — resolved: the file and its `Cifras` section
  were deleted in the Home rebuild rather than backfilled.

### 2. Polish
- ✅ `"typecheck": "tsc --noEmit"` script added to package.json.
- ✅ Per-route `metadata` exports — `contacto`, `oportunidades`, `ecosistema`,
  `membresia`, `recursos` all export `metadata` via the shared `pageMetadata()` helper
  (`src/lib/metadata.ts`); Home (`src/app/page.tsx`) has none but correctly inherits the
  root layout's default title/description, which is the right copy for the homepage anyway.
- ✅ SEO baseline (commit `7a5007c`): `src/app/robots.ts`, `src/app/sitemap.ts`, a generated
  `src/app/opengraph-image.tsx` shared by every route, OG/Twitter tags through
  `pageMetadata()`, and JSON-LD in `src/app/layout.tsx`.
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
- ✅ Committed per phase locally. `main` is at `245184c` (PR #5, `ui-003`); work since then
  is on `ui-004` — SEO baseline, photo-band contrast, Hero/QueEs copy, the `QueObtienes`
  section, the Home rebuild, and the test-coverage pass (`10ebd18`).
- Push / PR **only on explicit user go-ahead** (remote: `git@github.com:bocapVC/website-nextjs.git`).
  `ui-004` not yet pushed.

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
- Server Components by default; `"use client"` only for real interactivity — currently just
  `EcosistemaTabs`, `ContactForm`, `Nav`, `CopyEmailButton`.
- Cards are not card-wide links: put a real `<a>`/`Button` inside instead (`GuideCard`,
  `EventoCard`, `OportunidadRow`). Keeps them server components and preserves
  middle-click/cmd-click/copy-link.
- Derive state that depends on today's date rather than storing it — store the real date,
  compute the badge/label (`src/lib/eventos.ts` is the reference implementation). Compare ISO
  day strings in `America/La_Paz`, never `Date` objects. Any page rendering such state needs
  `export const revalidate` or it freezes at build time.
- pnpm only. Next.js 16: check `node_modules/next/dist/docs/` before assuming APIs.
