# BOCAP design system

How to use BOCAP's visual language when building or changing UI. Values live in
`src/app/globals.css` (the `:root` block, exposed as Tailwind utilities through
`@theme inline`); this doc names tokens and says where each one belongs. If this
doc and `globals.css` ever disagree, the code wins — fix this doc.

Everything is ported 1:1 from the legacy site (`reference/legacy-styles.css`).
Don't invent new colors, radii or shadows; if something seems missing, check the
legacy source first.

## Build with the existing components

Reach for `src/components/ui` before writing one-off Tailwind classes:

| Need | Use |
| --- | --- |
| A page band | `Section` (`tone="paper" \| "mist" \| "ink"`, `photo`, `firstOnPage`) |
| A photo page header | `PageHeader` |
| Section opener | `SectionHeading` (`eyebrow`, `title`, `description`, `align`, `invert`) |
| Small label above a heading | `Eyebrow` (`color="red" \| "teal" \| "white"`) |
| Action | `Button` (`variant="primary" \| "secondary" \| "ghost"`, `size="md" \| "sm"`, `href`, `external`) |
| Content surface | `Card` (`interactive` for a hover lift) |
| Category or status pill | `Badge` (`tone="neutral" \| "red" \| "ink" \| "gold"`) |
| Category filter over a card grid | `FilterTabs` (`tabs`, `active`, `onChange`, `labels`) |
| Form controls | `InputField`, `SelectField`, `TextareaField` from `FormField` |
| Form result | `StatusPanel` (`variant="success" \| "error"`) |
| Off-site link | `ExternalLink` (new tab, `rel="noreferrer"`) |

`SectionNavigation` is home-page-only and desktop-only; don't add it elsewhere
without discussing it with the team.

## Content

- **Language.** All public copy is Spanish (`lang="es"`, locale `es_BO`), with
  correct accents: *Membresía*, *Publicaciones*, *Únete*.
- **Voice.** First-person plural for BOCAP, plain and institutional:
  "Impulsamos el desarrollo del capital emprendedor en Bolivia conectando
  inversión, conocimiento y colaboración regional."
- **Address.** *Tú* in calls to action and forms ("Escríbenos por correo",
  "Únete a la red"). CTAs may speak in the reader's voice: "Quiero ser miembro".
- **Casing.** Sentence case for headings, buttons and nav ("Explorar el
  ecosistema", "Más información"). Uppercase only via the eyebrow and meta
  styles, never typed in caps.
- **No emoji.** Status is a word in a `Badge` ("Vigente", "Pasado", "Requiere
  correo").
- **Dates.** Spanish long form ("14–18 de septiembre, 2026") from
  `formatEventoDate` / `formatIsoDay`. Anything that depends on today is derived at render time —
  see "Dates and derived state" in `README.md`.

## Color

| Token | Role |
| --- | --- |
| `ink` | Text and headings on light bands; fill of `ink` bands, the footer and the `secondary` button |
| `ink-soft` | Secondary text: ledes, card excerpts, meta lines, hints, inactive nav dots |
| `ink-deep` | Legacy near-black; currently unused — prefer `ink` |
| `red` | The single action color: primary buttons, eyebrows, required asterisks, active nav dot, event dates, one highlighted word in the hero |
| `teal` / `teal-strong` | Inline links and focus; `teal-strong` on hover and in success panels |
| `gold` | Status accent only (`Badge tone="gold"`): "Vigente", "Requiere correo" |
| `paper` | Page background and default band |
| `paper-strong` | Neutral badge fill |
| `mist` | Alternate band for long pages |
| `line` / `line-strong` | Hairline borders (cards, inputs, badges) / ghost button and ink badge |
| `surface-solid` | Card and form-control background |
| `surface` | Translucent white panel over a band |

- On `ink` and photo bands, text is white; drop to white at 85% for ledes,
  75% for footer links, 50% for footer headings. Never use `ink-soft` there.
- Never use `red` as a band or large fill.
- **Contrast, kept exact from the legacy site:** `ink-soft` on `paper` is
  3.6:1, red eyebrows on `paper` 3.8:1, white on `red` 4.2:1, `gold` text on
  white 2.8:1 — all under WCAG's 4.5:1 for body text. Keep these colors to short
  or non-essential text; anything a user must read to act goes in `ink`.

## Typography

- **Lora** (`font-serif`) for `h1`–`h4`, always bold. **Inter** (`font-sans`)
  for body and UI. Both are self-hosted through `next/font/google` in
  `src/app/layout.tsx` — don't switch to `@import` webfonts or system stacks.
- Scale in use:

| Style | Spec | Where |
| --- | --- | --- |
| Display | Lora 700, `text-5xl sm:text-6xl` | Home hero h1 only |
| Section title | Lora 700, `text-heading-lg` (clamp(2rem, 4vw, 3.2rem)), `leading-tight`, `max-w-[16ch]` | `SectionHeading` |
| Card title | Lora 700, `text-xl` | Publication / feature cards |
| Article body | 17px, `leading-relaxed`, `text-ink`, `max-w-3xl` column; h2 Lora `text-3xl`, h3 `text-2xl` | `/publicaciones/<slug>` (`Markdown`) |
| Date | Lora 700, `text-lg`, `text-red` | `EventoCard` |
| Lede | 16px, `leading-relaxed`, `max-w-2xl`, `text-ink-soft` | Under section titles |
| Body small | `text-sm leading-relaxed` | Card excerpts, footer |
| Label | `text-sm font-medium` | Form labels, nav links |
| Eyebrow | `text-xs font-bold uppercase tracking-[0.16em]` | Above titles; footer column headings |
| Meta | `text-xs uppercase tracking-wide text-ink-soft` | Author, location, year on cards |

## Layout and spacing

- Pages are a stack of full-bleed `Section` bands that butt together — no
  margins between sections. Alternate `paper` and `mist`; use `ink` (often with
  a photo) for the hero, page headers and the closing CTA band.
- Content sits in `max-w-(--maxw)` (1180px) with `px-(--gutter)`
  (clamp(18px, 4vw, 40px)).
- Bands pad by `--section-pad-y` (clamp(72px, 11vw, 132px)), a flat 62px below
  640px. The first band on a page uses `firstOnPage` (120px top) so its
  background fills the area behind the floating header.
- Use flex/grid gaps: `gap-3` inside heading stacks, `gap-4` between buttons,
  `p-6` card padding, `gap-10` between footer columns.
- Breakpoints: 640px (mobile type and padding), 920px (header collapses to a
  hamburger), plus Tailwind's `sm` / `lg` for grids.

## Surfaces

- One card recipe (`Card`): `bg-surface-solid`, `border-line`,
  `rounded-brand-sm` (18px), `shadow-brand`, `p-6`. No cards inside cards.
- **Cards are not card-wide links.** Put a real `<a>` / `Button` inside.
- Buttons, badges and nav dots are pills (`rounded-full`). Inputs and panels use
  `rounded-brand-sm`; `rounded-brand` (22px) is for large panels and media.
- `shadow-brand` is the only content elevation. The header pill has its own
  shadow and glass gradient (see `Header.tsx`).

## Imagery

- Photo bands (`Section photo=…`) put a photo under `.section-photo-overlay`
  (red and teal corner tints, a dark vertical scrim, a red diagonal) and add
  `.section-photo-text` (text shadow) to the content. Use white eyebrows there.
- The four page heroes (inicio, ecosistema, publicaciones, membresía) take
  their photo, alt text and `photoPosition` from `src/data/heroes.json`, which
  staff edit in the admin panel (Ajustes generales → Imágenes de portada).
  Don't hard-code a hero photo; pass the page's `HEROES` entry (`PageHeader`
  takes it as `hero`).
- Photos go through the Next image optimizer (`sizes="100vw"`, AVIF/WebP,
  default quality), so uploads can be large originals. Pass `photoAlt` for a
  meaningful photo; without it the image is decorative (`alt=""`,
  `aria-hidden`).

## Motion and states

- Only color transitions on hover, a 2px lift on `interactive` cards, and the
  section-nav label fade (300ms). Nothing animates on load.
- Focus: buttons get `ring-2 ring-red/50 ring-offset-2`; form controls switch to
  a `teal` border with `ring-2 ring-teal/30`.
- Disabled: 60% opacity, `cursor-not-allowed`.

## Icons

- Inline SVG components in `src/components/icons/`: 24×24 grid, no fill,
  1.5px stroke, round caps and joins, `currentColor`. No icon library, no emoji.
- Size to the text: `h-3.5 w-3.5` in badges, `h-4 w-4` beside link text.
- Meanings: `ArrowUpRight` opens externally, `ArrowDownTray` downloads,
  `LockClosed` marks an email-gated publication; `ElegibleIcons` (fund, angel,
  rocket, building, bulb, shield) mark member types.

## Logo

- `public/logo.png` is the white full lockup (620×300) for dark grounds only:
  the header pill and the footer. Always pass an explicit height (header
  clamp(42px, 5vw, 58px), footer clamp(52px, 6vw, 72px)). No dark version
  exists yet — see "Known swap points" in `README.md`.

## Visual reference

A browsable version of this system (token swatches, type specimens and
component previews) is published as a private claude.ai artifact:
https://claude.ai/artifact/69KTEQXS3N5Lh5D1dEefkC — ask the maintainer for
access. It is a snapshot of commit `2c4be3a`; this doc and `globals.css` are the
source of truth.
