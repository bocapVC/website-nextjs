# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BOCAP's marketing site (Bocap.vc — capital emprendedor / VC network in Bolivia), rebuilt in Next.js. This repo is a from-scratch rebuild of an existing site; visual design is not being reinvented — colors, type, spacing, and component styling are ported from the legacy site's `src/styles.css` and must stay consistent with it (see "Design tokens" below).

## Commands

- `pnpm install` — install dependencies (pnpm only; this repo is a pnpm workspace, see `pnpm-workspace.yaml`)
- `pnpm dev` — start the dev server (Turbopack) at http://localhost:3000
- `pnpm build` — production build (Turbopack)
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint via `eslint-config-next` (`core-web-vitals` + TypeScript rules), flat config in `eslint.config.mjs`

No test runner is configured yet.

## Architecture

- Next.js 16 App Router + TypeScript, source under `src/app`. Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Tailwind CSS v4, CSS-first config — there is no `tailwind.config.*`. All theming happens in `src/app/globals.css` via `@theme inline`.
- **Design tokens** (`src/app/globals.css`): BOCAP brand values (`--ink`, `--red`, `--teal`, `--gold`, `--paper`, `--radius`, `--shadow`, `--serif`, `--sans`, etc.) are declared as CSS custom properties under `:root`, then mapped into Tailwind's `@theme inline` block so they're usable as utilities (`bg-ink`, `text-red`, `font-serif`, `rounded-brand`, `shadow-brand`, ...). These are ported 1:1 from the legacy site — don't invent new brand colors/radii/shadows; if a value seems to be missing, treat that as a signal to check the legacy source rather than picking something new.
- Typography uses system font stacks only (`--serif` for headings, `--sans` for body/UI) — no `next/font` or webfont loading, matching the legacy site, which ships no font files.

## Working with this Next.js version

Next.js 16 is very new. Before relying on prior Next.js knowledge for App Router APIs or conventions, check the docs bundled in `node_modules/next/dist/docs/` (mirrors nextjs.org/docs) — APIs, conventions, or file structure may differ from what you'd otherwise assume.

@AGENTS.md
