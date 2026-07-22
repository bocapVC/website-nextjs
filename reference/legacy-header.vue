<!--
  Legacy BOCAP header component (Vue), pasted by the user on 2026-07-22 alongside
  reference/legacy-styles.css. NOT part of the Next.js build — reference only.
  Ported to src/components/layout/Header.tsx + Nav.tsx (React/Tailwind equivalent).
-->
<header class="site-header">
      <div class="wrap site-header__inner">
        <RouterLink class="brand" to="/" @click="closeNav" aria-label="BOCAP inicio">
          <img class="brand-logo" :src="brandLogo" alt="BOCAP" />
        </RouterLink>

        <button
          class="nav-toggle"
          type="button"
          :aria-expanded="isNavOpen ? 'true' : 'false'"
          aria-controls="site-navigation"
          aria-label="Abrir o cerrar navegación"
          @click="toggleNav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="site-navigation" class="site-nav" :class="{ open: isNavOpen }">
          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" @click="closeNav">
            {{ link.label }}
          </RouterLink>
          <RouterLink class="btn btn-primary site-nav__mobile-cta" to="/contacto" @click="closeNav">
            Contacto
          </RouterLink>
        </nav>

        <RouterLink class="btn btn-primary header-cta" to="/contacto" @click="closeNav">
          Contacto
        </RouterLink>
      </div>
    </header>
