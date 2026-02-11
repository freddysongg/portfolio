# Claude Code Guidelines

This document defines **non-negotiable rules** for AI-generated code. Violations mean the output is not acceptable.

---

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

---

## Code Style Rules

- All code must pass `prettier` formatting — run `npm run format` before completing
- Never create temporary variables that are not used
- Never create redundant variables — return or use values directly
- Never create unused constants
- Remove variables immediately when unused
- Do not create inline type definitions — define interfaces/types separately
- **Always use object destructuring** when accessing object properties:

  ```ts
  // CORRECT - use destructuring
  const { username, password } = config.opensearch;

  // WRONG - do not use dot notation repeatedly
  const username = config.opensearch.username;
  const password = config.opensearch.password;
  ```
- Destructure function parameters when accessing multiple properties
- Destructure in assignments, not just declarations
- When imports can be shortened, always shorten them
- Combine multiple imports from the same source
- Always use ES2020+ JavaScript style
- Prefer arrow functions
- Do not rely on the `this` keyword
- Functions must have well-defined, descriptive names
- **Use Parameter Object Pattern** for functions with more than one argument:

  ```ts
  // CORRECT - single object with destructured named parameters
  function createUser({ name, email, role }: CreateUserParams): User {}

  // WRONG - multiple positional parameters
  function createUser(name: string, email: string, role: string): User {}
  ```
- Positional parameters allowed only for trivial cases (e.g., `add(a, b)`, `Math.max(x, y)`)
- Use default values in destructured parameters: `({ limit = 10, offset = 0 }: QueryParams = {})`

---

## TypeScript Rules

- Never use `any`
- All variables, parameters, and return values must be explicitly typed
- Use `unknown` instead of `any`, then narrow with type guards
- Never add `eslint-disable` comments — fix the issue instead
- All functions must have explicit return types
- Use `import type` for type-only imports
- Use proper interfaces or types for complex objects
- Ensure types match actual runtime data
- When working with JSON or external data, define explicit interfaces
- Never assume values are present — explicit null/undefined checks required
- Avoid non-null assertions (`!`) unless accompanied by a comment explaining why it is safe
- Prefer discriminated unions over flags or enums
- No status objects without a discriminant field
- All `switch` statements must be exhaustive
- Use `never` checks to enforce exhaustiveness
- No magic strings — use string literal unions, constants, or `const enum`
- Always do a type check after modifications

---

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

---

## Project Structure Rules

```
app/                    # Next.js App Router pages and layouts
components/
├── animations/         # Reusable animation wrappers
├── layout/            # Layout components (Navigation, Footer)
├── sections/          # Page sections (Hero, Projects, About, Experience, Contact)
└── ui/                # shadcn/ui primitive components
data/                   # Static content data (projects, experience)
hooks/                  # Custom React hooks
lib/                    # Utility libraries (cn helper)
utils/                  # Constants and shared utilities
```

### Adding New Components

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

---

## Side Effects & Cleanup Rules

- Every side effect must have a corresponding cleanup (timers, listeners, subscriptions, abort controllers)
- Never mutate function arguments — return new objects
- Side-effecting functions must be clearly named (`fetch*`, `write*`, `send*`, etc.)

---

## Error Handling Rules

- Never throw generic errors (`new Error("something went wrong")`)
- Errors must include actionable context
- `catch` blocks must:
  - rethrow, or
  - return a typed failure object, or
  - explicitly document why the error is ignored
- Never swallow errors silently
- Never return `null` to indicate failure

---

## Naming Rules

- No vague names: `data`, `info`, `value`, `item`, `handler`
- Names must encode intent and domain meaning
- Boolean variables must start with: `is`, `has`, `can`, `should`

---

## Performance & Safety Rules

- Nested loops must include a comment explaining time complexity
- Using `.find()` inside loops is forbidden unless the dataset is provably tiny
- Avoid accidental O(n^2) behavior
- Validate all external input at system boundaries
- Do not use unsafe regex patterns that may cause ReDoS
- Avoid nested quantifiers in regex

---

## Styling Guidelines

- **Colors**: Use semantic tokens (`--foreground`, not specific colors)
- **Spacing**: Use Tailwind spacing scale (4px increments)
- **Typography**: Large headings (6xl-9xl), body text (lg-xl), mono for labels
- **Containers**: Use `.container` class for consistent max-width and padding
- **Animations**: Favor subtle, performance-friendly animations
- **Dark mode**: Test both themes, avoid hard-coded colors
- Backdrop blur: `backdrop-blur-md` with `bg-background/80`
- Responsive design: Mobile-first with `md:` and `lg:` breakpoints

**Utility Function** (`lib/utils.ts`):

```tsx
cn(...inputs); // Merges Tailwind classes with clsx and tailwind-merge
```

---

## Key Technical Decisions

1. **Next.js 14 App Router**: Server components by default, client components marked with `'use client'`
2. **CSS Variables over Tailwind colors**: Enables easy theme switching without rebuilding
3. **Intersection Observer animations**: Performance-friendly, triggers only when visible
4. **Radix UI primitives**: Headless, accessible components styled with Tailwind
5. **Framer Motion**: Declarative animations with variants pattern
6. **Single-page layout**: All sections on one page, hash navigation

---

## Documentation & Comments

- Do not comment on *what* the code does
- Comments may only explain:
  - why something exists
  - why it is safe
  - why a trade-off was chosen
- Function length limits:
  - Pure functions: max 30 lines
  - Component render functions: max 50 lines
- If a function name contains `And`, it likely violates single-responsibility

---

## TODO Discipline

- All TODOs must include:
  - a reason
  - an owner or condition for removal
- Anonymous TODOs are forbidden

---

## Git Rules

- Never push to git
- Only stage and commit — user pushes manually
- Never mention AI, Claude, or automation in commit messages
- Commit messages must be a single line, no capitalization, changes separated by commas (e.g., `"added claude.md, refactored button component, added glass ui"`)

---

## AI-Specific Guardrails

- Never invent APIs, schemas, fields, or behavior
- Never guess database schemas or response shapes
- Never refactor beyond the explicitly requested scope
- Never introduce abstractions for hypothetical future use
- If requirements are unclear, stop and ask instead of guessing

---

## Final Rule

If any rule conflicts with speed, convenience, or brevity — **the rule wins**.
