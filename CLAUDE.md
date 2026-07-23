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
- `pnpm test` — Vitest + React Testing Library (jsdom), config in `vitest.config.mts`/`vitest.setup.ts`; tests live alongside each section in `src/components/sections/<page>/__tests__/`
- `pnpx tsc --noEmit -p tsconfig.json` - type-checks the whole project against tsconfig.json without emitting output files.

## Architecture

- Next.js 16 App Router + TypeScript, source under `src/app`. Path alias `@/*` maps to `src/*` (see `tsconfig.json`).
- Tailwind CSS v4, CSS-first config — there is no `tailwind.config.*`. All theming happens in `src/app/globals.css` via `@theme inline`.
- **Design tokens** (`src/app/globals.css`): BOCAP brand values (`--ink`, `--red`, `--teal`, `--gold`, `--paper`, `--radius`, `--shadow`, `--serif`, `--sans`, etc.) are declared as CSS custom properties under `:root`, then mapped into Tailwind's `@theme inline` block so they're usable as utilities (`bg-ink`, `text-red`, `font-serif`, `rounded-brand`, `shadow-brand`, ...). These are ported 1:1 from the legacy site — don't invent new brand colors/radii/shadows; if a value seems to be missing, treat that as a signal to check the legacy source rather than picking something new.
- Typography (`--serif` for headings, `--sans` for body/UI) is loaded via `next/font/google` (Inter for `--sans`, Lora for `--serif`), set up in `src/app/layout.tsx` and referenced by the `--sans`/`--serif` custom properties in `src/app/globals.css`. This is a deliberate deviation from the legacy site (which used Apple-only system fonts and shipped no font files): those fonts don't resolve consistently across Windows/Android/Linux, so the fonts are self-hosted by Next.js instead for consistent, readable rendering on every platform. Don't revert to raw `@import` webfont loading or bare system-font stacks.

## Working with this Next.js version

Next.js 16 is very new. Before relying on prior Next.js knowledge for App Router APIs or conventions, check the docs bundled in `node_modules/next/dist/docs/` (mirrors nextjs.org/docs) — APIs, conventions, or file structure may differ from what you'd otherwise assume.

@AGENTS.md
