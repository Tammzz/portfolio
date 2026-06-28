# Portfolio — Dark Editorial Tech Portfolio

A single-page personal portfolio with a systems-engineering / terminal-inspired
aesthetic. Built with React, Vite, and TypeScript using CSS Modules and a shared
design-token system.

## Stack

- React 18 + TypeScript
- Vite 5
- CSS Modules + a global design-token layer (`src/styles/global.css`)
- Lucide icons
- No backend — fully static, frontend-only

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Architecture

```
src/
  data/            # typed content — projects, expertise, tools, nav
    types.ts
    projects.ts
    expertise.ts
    tools.ts
    nav.ts
  hooks/
    useReveal.ts   # IntersectionObserver entrance animations
  lib/
    highlight.tsx  # renders pink-italic accent words in headings
  styles/
    global.css     # tokens, reset, shared primitives, keyframes
  components/       # one .tsx + .module.css per component
    GridOverlay, Header, Hero, AtmosphericBackground,
    SectionHeader, Projects, ProjectVisual, Expertise,
    TechStack, Contact, Footer
  App.tsx
  main.tsx
```

### Design system

Colours, typography, spacing, and motion live as CSS custom properties in
`:root`. Components reference these tokens rather than hardcoding values, and
shared visual primitives (`.mono`, `.display`, `.corner`, `.signal`, `.reveal`)
are defined once in `global.css`.

### Content

All copy is data-driven. Edit the arrays in `src/data/` to change projects,
disciplines, tools, or navigation — components map over them, nothing is
hardcoded in JSX.

### Accessibility & motion

- Semantic landmarks (`header`, `main`, `section`, `article`, `footer`)
- Project index uses real `<button>` elements with `aria-pressed`
- Decorative SVGs and backgrounds are `aria-hidden`
- Active project state is conveyed by an arrow marker + weight, not colour alone
- Visible focus rings; full `prefers-reduced-motion` support

The atmospheric "cloud" backgrounds are generated procedurally with SVG fractal
noise, so the project ships with no external image assets.
