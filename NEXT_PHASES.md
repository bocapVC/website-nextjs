# BOCAP Website — Siguientes Fases

Checklist de trabajo post-Fase 1 (Rebuild Next.js). Basado en requerimientos de 3.1–3.5.

---

## 📋 FASE 2: Contenido & Blog (paralelo)

### 2.1 Completar contenido faltante del sitio

- [ ] `startups.ts` — ecosistema (actualmente vacío)
- [ ] `reportes.ts` — recursos (vacío; `guiasArticulos.ts` tiene 1 artículo)
- [ ] `oportunidadesAceleradoras.ts` — oportunidades (vacío)
- [ ] `tiposMiembro.ts` — tipos de membresía (actualmente oculto)
- [ ] Fotos reales de board members (actualmente solo iniciales)
- [ ] `angels`/`accelerators` en directorio (vacío)
- [ ] Description review de evento Orbit Ventures con BOCAP

### 2.2 Implementar sistema de Blog

Sistema de publicación basado en el repositorio (sin CMS visual). Cada artículo es una página propia, indexable individualmente por Google.

- [ ] Elegir & setup librería MDX (`contentlayer`, `next-mdx-remote`, etc.)
- [ ] Estructura de rutas `/blog/[slug]` — cada artículo es una página indexable
- [ ] Metadata dinámicas (title, description, OG) por artículo
- [ ] Componentes para blog posts (heading, code blocks, images, etc.)
- [ ] Tags/categorías con filtrado
- [ ] Share buttons (Twitter, LinkedIn, WhatsApp)
- [ ] Schema.org `BlogPosting` en JSON-LD
- [ ] Archivo/cronología de artículos
- [ ] Página de blog principal (`/blog`)
- [ ] Testing: blog post renderiza, metadata son correctas, links funcionan

---

## 🌍 FASE 3: Bilingüismo ESP/ENG

**Crítico**: debe completarse antes de lanzar (per 3.2).

### 3.1 Setup de i18n

- [ ] Elegir librería: `next-intl` (recomendado para Next.js 16)
- [ ] Estructura de rutas: `/es/`, `/en/` (o `/`, `/en/` si español es default)
- [ ] Configurar `next.config.ts` para routing de idiomas
- [ ] Selector de idioma (header/footer)
- [ ] Persistencia de preferencia de idioma (localStorage/cookie)
- [ ] Fallback a español si idioma no está soportado

### 3.2 Traducción de contenido

- [ ] Duplicar/importar todos los strings del sitio (copy, metadata, labels)
- [ ] Traducir data files:
  - [ ] `beneficios.ts`
  - [ ] `elegibles.ts`
  - [ ] `contactTopics.ts`
  - [ ] `eventos.ts` (descripciones)
  - [ ] Otras data files
- [ ] Traducir componentes (Button labels, placeholders, empty states)
- [ ] Traducir rutas en nav.ts (`/contacto` → `/es/contacto`, `/en/contact`, etc.)
- [ ] Traducir metadata (titles, descriptions en todos los idiomas)

### 3.3 Verificación

- [ ] Cada ruta en ambos idiomas renderiza correctamente
- [ ] Canonical links apuntan al idioma/ruta correcta
- [ ] `hreflang` tags en `<head>` (para multiidioma SEO)
- [ ] Selector de idioma funciona y persiste
- [ ] `pnpm typecheck` / `pnpm lint` / `pnpm build` limpios
- [ ] `pnpm test` sigue pasando (adaptaciones si las hay)

---

## ♿ FASE 4: Accesibilidad & Performance

### 4.1 WCAG 2.1 AA Audit

Cumplimiento del estándar WCAG 2.1 nivel AA.

**Contraste de color**
- [ ] 18:1 para large text (≥18pt o ≥14pt bold)
- [ ] 4.5:1 para texto normal
- [ ] Verificar en herramienta (ej. WebAIM Contrast Checker)

**Navegación por teclado**
- [ ] Tab order correcto (visual left-to-right, top-to-bottom)
- [ ] Focus visible en todos los elementos interactivos
- [ ] Escape cierra menus/modals
- [ ] Enter/Space activa buttons/links

**Screen reader**
- [ ] Testear con NVDA (Windows) o VoiceOver (Mac)
- [ ] Alt text en todas las imágenes (no vacío, descriptivo)
- [ ] Form labels asociados (correctamente linked a inputs)
- [ ] ARIA labels donde sea necesario (buttons de close, toggles, etc.)
- [ ] Anuncio de cambios a screen readers (ej. tab switches, alerts)

**Jerarquía semántica**
- [ ] Un único `<h1>` por página
- [ ] Headings en orden (h1 > h2 > h3, sin saltos)
- [ ] Usar `<nav>`, `<main>`, `<footer>` semánticamente

**Testing final**
- [ ] Lighthouse accessibility score ≥90
- [ ] Herramienta automatizada (axe DevTools, etc.)
- [ ] Manual testing en browsers reales

### 4.2 Core Web Vitals Optimization

Optimización de velocidad de carga y performance.

- [ ] Image optimization (Next.js Image component — verificar uso consistente)
- [ ] Font loading optimization (`next/font/google` — ya hecho, verificar perf)
- [ ] Bundle analysis (`pnpm build` output + Vercel analytics)
- [ ] Code splitting verification (dynamic imports donde corresponda)
- [ ] Lazy loading de sections off-screen
- [ ] Verificar LCP, FID, CLS en Lighthouse
- [ ] Monitoring en Vercel Analytics post-lanzamiento

---

## 🔍 FASE 5: SEO Técnico — Completar

**Prioridad explícita**: dejar toda la base técnica correctamente puesta (per 3.5).

### 5.1 Google Search Console & GA4

- [ ] Verify sitio en Google Search Console
- [ ] Submit `sitemap.xml` (ya generado en `src/app/sitemap.ts`)
- [ ] Setup Google Analytics 4 (si no está hecho)
- [ ] Configurar goals/eventos:
  - [ ] Form submissions (contacto, membresía)
  - [ ] Link clicks (CTAs, nav)
  - [ ] Scroll depth
  - [ ] Blog post views (si aplica)
- [ ] Monitoring inicial de indexación y errores en GSC

### 5.2 Validaciones técnicas SEO

- [ ] `robots.txt` ✅ (ya existe en `src/app/robots.ts`)
- [ ] `sitemap.xml` ✅ (ya existe en `src/app/sitemap.ts`)
- [ ] Metadata dinámicas ✅ (ya existe via `pageMetadata()`)
- [ ] Structured data (schema.org JSON-LD) ✅ (ya existe)
- [ ] Agregar schema.org `BlogPosting` (una vez blog esté listo)
- [ ] Mobile-friendly check (Lighthouse)
- [ ] hreflang tags (una vez bilingüe esté listo)
- [ ] Performance check (Core Web Vitals)

### 5.3 Optimización on-page

Términos objetivo: BOCAP, Venture Capital Bolivia, startup Bolivia, innovación Bolivia, capital semilla, inversiones ángeles.

- [ ] Title tags incluyen términos relevantes
- [ ] Descriptions naturales (no keyword-stuffed), ~155 caracteres
- [ ] H1 en cada página relevante y único
- [ ] Internal linking strategy (blog posts → landing pages, etc.)
- [ ] Verificar densidad de keywords (natural, no spam)

### 5.4 Monitoreo post-lanzamiento

- [ ] Reporte de estado de indexación (manual en GSC)
- [ ] Checklist técnico verificado
- [ ] Dashboard de Core Web Vitals (Vercel Analytics)
- [ ] Monitoreo de 404s y errores en GSC

---

## 🚀 Orden de ejecución recomendado

```
1. Completar contenido faltante (desbloqueador para testing real)
   ↓
2. Implementar i18n bilingüe ESP/ENG (largo, mejor temprano)
   ↓
3. Agregar sistema de Blog (da valor inmediato a SEO)
   ↓
4. WCAG 2.1 AA audit + fixes (accesibilidad crítica)
   ↓
5. Core Web Vitals optimization (performance)
   ↓
6. Google Search Console setup + enviar sitemap
   ↓
7. QA final + Testing (end-to-end, mobile, cross-browser)
   ↓
8. Launch & Monitoreo
```

---

## 📝 Notas

- **Blog sin newsletter**: Newsletter queda fuera de esta fase (planeado para más adelante).
- **Presupuesto**: Hosting en Vercel dentro de $30/mes acordado.
- **Entregable de cierre**: Reporte de estado de indexación y checklist técnico verificado — no una promesa de posición en Google (depende del tiempo propio de Google).
- **Bilingüismo**: Es crítico para lanzar — sin esto el sitio no está listo públicamente.

---

**Última actualización**: 2026-08-12
