# BOCAP site build — plan & status

Working branch: `build-bocap-site`. Delete this file before merging/PR.

## Status

- ✅ **Foundation** (commit `5c2ee6f`): `src/config/nav.ts`, `src/lib/cn.ts`, ui primitives
  (`Section`, `Eyebrow`, `SectionHeading`, `Button`, `Card`, `Badge`, `Logo`,
  `FormField`, `StatusPanel`), layout (`Header`, `Footer`, `MobileNav`,
  `CopyEmailButton`), wired into `src/app/layout.tsx`.
- ✅ **Contacto** (commit `564da60`): `src/app/api/contact/route.ts` (server proxy to
  Google Forms with real status checking), `src/hooks/useContactSubmission.ts`,
  `ContactForm` + `ContactoInfo` sections, `/contacto` page, `src/data/contactTopics.ts`.
  - **Verified live**: real submission returned `ok:true`; error paths return 400/400/502.
  - **Pending human check**: confirm the "[PRUEBA] Test de integración del sitio" entry
    landed in the Google Form's linked responses (Google can 200 without recording if a
    choice value mismatches — esp. the accent-less `"Membresias"` topic value).

## Remaining work

### 1. Home (`/`) — replace placeholder `src/app/page.tsx`
Sections in `src/components/sections/home/`: `Hero` (ink band, eyebrow + serif headline +
tagline + CTAs to /contacto and /ecosistema), `QueEs` (2-col institutional intro),
`AQuienRepresenta` (4 mini cards: fondos, aceleradoras, ángeles, organizaciones — mist band),
`QueHace` (6 numbered feature cards), `Cifras` (ink stats band), `JuntaDirectiva`
(mini cards with initials avatars — mist band), `MiembrosAliados` (partner-name tile wall),
`QuickAccess` (4 link cards to the other pages — mist band).
Data: `src/data/cifras.ts` (`Stat { value, label, description? }`),
`juntaDirectiva.ts` (`BoardMember { name, role, organization? }`),
`miembrosAliados.ts` (`Partner { name, type }`). Realistic placeholder entries.

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
- Add `"typecheck": "tsc --noEmit"` script to package.json.
- README: structure, swap points (tokens in globals.css, `LOGO_SRC` in Logo.tsx,
  `SITE.email` in nav.ts), contact-form verification notes.
- Per-route `metadata` exports (already the pattern in /contacto).

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
  (DirectorioFiltrable, ContactForm, MobileNav, CopyEmailButton).
- pnpm only. Next.js 16: check `node_modules/next/dist/docs/` before assuming APIs.
