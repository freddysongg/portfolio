# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 14, featuring a single-page application with sections for projects, experience, and contact information. Uses shadcn/ui components with Radix UI primitives and Framer Motion animations.

## Development Commands

```bash
# Development
npm run dev              # Start development server at localhost:3000

# Building
npm run build           # Build production bundle
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint with auto-fix
npm run lint:check      # Run ESLint without auto-fix
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting
npm run typecheck       # Run TypeScript type checking
```

## Architecture

### Design System & Theme

**CSS Variables System**: The project uses a CSS custom properties-based theming system defined in `app/globals.css`:
- Light/dark mode via CSS classes (`.dark`)
- All colors use HSL format: `hsl(var(--variable-name))`
- Semantic color tokens: `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`
- Border radius controlled via `--radius` variable (default: 0.5rem)

**Tailwind Configuration** (`tailwind.config.js`):
- Container: centered, 2rem padding, max-width 1400px at 2xl breakpoint
- Extended theme integrates with CSS variables
- Uses `tailwindcss-animate` plugin for animations
- Custom scrollbar styling in globals.css

**Typography**:
- Primary font: Geist Sans
- Monospace font: Geist Mono
- Both loaded via `geist` package in `app/layout.tsx`

### Component Architecture

**shadcn/ui Integration** (`components.json`):
- Base style: "default"
- Uses React Server Components (RSC)
- Icon library: Lucide React
- Path aliases configured for clean imports
- Base color: neutral with CSS variables enabled

**Component Structure**:
```
components/
├── animations/         # Reusable animation wrappers
│   ├── TextReveal.tsx # Fade-in + slide-up animation with intersection observer
│   └── SlideIn.tsx    # Directional slide animations (up/down/left/right)
├── layout/            # Layout components
│   ├── Navigation.tsx # Fixed desktop nav (top-right), mobile drawer
│   └── Footer.tsx     # Footer section
├── sections/          # Page sections (Hero, Projects, About, Experience, Contact)
└── ui/               # shadcn/ui primitive components (50+ components)
```

**Import Aliases** (tsconfig.json):
- `@/*` → Root directory
- `@/components` → components/
- `@/lib` → lib/
- `@/hooks` → hooks/
- `@/utils` → utils/

### Animation System

**Framer Motion Integration**:
- All client components use `'use client'` directive
- Intersection Observer-based animations via `useIntersectionObserver` hook
- Animation variants stored in `utils/constants.ts` under `ANIMATION_VARIANTS`

**Animation Patterns**:
1. **TextReveal**: Opacity 0→1, translateY 100px→0, 0.8s duration
2. **SlideIn**: Opacity 0→1, directional slide (60px offset), 0.8s duration
3. Both use `threshold: 0.1` for early triggering
4. Both support `delay` prop for staggered animations

**Custom Hook** (`hooks/useIntersectionObserver.ts`):
- Returns `[ref, isVisible]` tuple
- Configurable threshold and rootMargin
- Sets `isVisible` state when element enters viewport

### Page Structure

**Single-page Layout** (`app/page.tsx`):
```tsx
<Navigation />  // Fixed position, responsive
<main>
  <Hero />           // Full-screen intro with grid background
  <Projects />       // Project cards with animations
  <About />          // About section
  <Experience />     // Timeline/experience cards
  <Contact />        // Contact form/info
</main>
<Footer />
```

**Background Pattern** (Hero section):
- Grid background using CSS gradients
- Responsive width: 65% of viewport on right side
- Radial gradient mask for fade effect
- Light/dark mode variants

### Data Management

**Constants** (`utils/constants.ts`):
- `PERSONAL_INFO`: Name, email, social links, resume link
- `ANIMATION_VARIANTS`: Predefined Framer Motion variants

**Content Data** (`data/`):
- `projects.ts`: Project information and metadata
- `experience.ts`: Work experience and timeline data

### Styling Patterns

**Utility Function** (`lib/utils.ts`):
```tsx
cn(...inputs) // Merges Tailwind classes with clsx and tailwind-merge
```

**Common Patterns**:
- Backdrop blur: `backdrop-blur-md` with `bg-background/80`
- Responsive design: Mobile-first with `md:` and `lg:` breakpoints
- Dark mode: Use semantic color tokens (automatically switch)
- Animations: Wrap content in `<TextReveal>` or `<SlideIn>` components

**Button Variants** (via class-variance-authority):
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: default (h-10), sm (h-9), lg (h-11), icon (h-10 w-10)
- All buttons support `asChild` prop for polymorphic rendering

### Navigation Behavior

**Desktop Navigation**:
- Fixed position: `right-8 top-8`
- Pill-shaped container with backdrop blur
- Horizontal menu items + Resume button
- Smooth scroll to sections via anchor links

**Mobile Navigation**:
- Toggle button: `right-6 top-6`
- Full-screen overlay with centered menu
- AnimatePresence for enter/exit animations
- Staggered animation on menu items (0.1s delay each)

## Key Technical Decisions

1. **Next.js 14 App Router**: Server components by default, client components marked with `'use client'`
2. **CSS Variables over Tailwind colors**: Enables easy theme switching without rebuilding
3. **Intersection Observer animations**: Performance-friendly, triggers only when visible
4. **Radix UI primitives**: Headless, accessible components styled with Tailwind
5. **Framer Motion**: Declarative animations with variants pattern
6. **Single-page layout**: All sections on one page, hash navigation

## Adding New Components

When adding new UI components:
1. Use shadcn CLI: `npx shadcn@latest add <component-name>`
2. Components auto-install to `components/ui/`
3. Import using alias: `import { Component } from '@/components/ui/component'`
4. Apply theme colors via semantic tokens (e.g., `bg-background`, `text-foreground`)

When creating section components:
1. Add to `components/sections/`
2. Wrap animated elements in `<TextReveal>` or `<SlideIn>`
3. Use `'use client'` if using state/effects/animations
4. Follow mobile-first responsive design
5. Import and add to `app/page.tsx` in desired order

## Styling Guidelines

- **Colors**: Use semantic tokens (`--foreground`, not specific colors)
- **Spacing**: Use Tailwind spacing scale (4px increments)
- **Typography**: Large headings (6xl-9xl), body text (lg-xl), mono for labels
- **Containers**: Use `.container` class for consistent max-width and padding
- **Animations**: Favor subtle, performance-friendly animations
- **Dark mode**: Test both themes, avoid hard-coded colors
