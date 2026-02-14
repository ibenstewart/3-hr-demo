---
title: "Rapid Prototyping 5 Skyscanner Demos with Backpack Design System Compliance"
date: 2026-02-14
category: ui-bugs
tags:
  - backpack
  - design-system
  - tailwind-v4
  - rapid-prototyping
  - react
  - recharts
  - parallel-subagents
components:
  - src/index.css
  - src/components/Button.tsx
  - src/components/Rating.tsx
  - src/components/BottomSheet.tsx
  - src/pages/PriceIntelligence.tsx
  - src/pages/InTripCompanion.tsx
  - src/pages/Experiences.tsx
  - src/pages/ExperienceDetail.tsx
severity: medium
resolution_time: "~4 hours (full build + compliance audit)"
slug: backpack-design-system-compliance-integration
---

## Problem Statement

Built 5 polished Skyscanner product demo apps (AI Trip Planner, In-Trip Companion, Smart Ancillaries, Price Intelligence + Price Freeze, Tours & Experiences) in a single React + Vite + TypeScript application for senior leadership. The build needed to use Backpack design system tokens consistently, but initial implementation drifted from Backpack compliance with hardcoded colors, off-grid spacing, and library-specific color format issues. A systematic audit found 21 compliance issues that needed fixing.

## Symptoms / Requirements

- Hardcoded Tailwind color classes (`amber-400`, `gray-300`, `amber-300`) instead of Backpack semantic tokens
- Button component spacing off the 4px grid (6px, 10px, 28px padding values)
- Recharts charts using hex color strings instead of Backpack token values
- BottomSheet border radius not matching Backpack `lg` radius (24px)
- TypeScript compilation errors from lucide-react dynamic icon lookup and Recharts formatter types
- Subagent token limits hit when generating large mock data files

## Solution

### Phase 1: Project Scaffolding & Token Architecture

Created Vite + React 19 + TypeScript starter, installed dependencies (React Router v7, Recharts, lucide-react, clsx, tailwind-merge, `@tailwindcss/postcss` for Tailwind v4).

**PostCSS configuration** (Tailwind v4 requires the new plugin):
```js
// postcss.config.js
export default { plugins: { '@tailwindcss/postcss': {} } }
```

**Backpack tokens mapped to Tailwind theme** in `src/index.css`:
```css
:root {
  --bpk-marcomms-sky-blue: rgb(0, 98, 227);
  --bpk-marcomms-yellow: rgb(255, 181, 0);
  /* ... all Backpack tokens ... */
}

@theme inline {
  --color-sky-blue: var(--bpk-marcomms-sky-blue);
  --color-star: var(--bpk-marcomms-yellow);
  --color-text-primary: var(--bpk-text-primary-day);
  /* ... mapped to Tailwind classes ... */
}
```

### Phase 2: Shared Components + Parallel Subagents

Built 8 reusable components (Nav, Card, Button, Chip, PriceTag, Rating, StreamingText, BottomSheet) via a parallel subagent while simultaneously writing page components. A second subagent generated 5 TypeScript mock data files.

**`cn()` utility** for class merging:
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

### Phase 3: Backpack Compliance Audit & Fixes

Ran a systematic audit that found 21 issues across 8 files. Key fixes:

**1. Hardcoded colors replaced with Backpack tokens:**
```diff
- <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
+ <Star className="w-5 h-5 fill-star text-star" />

- <Star className="w-3 h-3 text-gray-300" />
+ <Star className="w-3 h-3 text-line" />

- <Sun className="w-5 h-5 text-amber-300" />
+ <Sun className="w-5 h-5 text-yellow" />
```

**2. Button spacing aligned to 4px grid:**
```diff
  const sizeClasses = {
-   sm: 'px-3 py-1.5 text-sm',     // 6px vertical = off grid
-   md: 'px-4 py-2.5 text-sm',     // 10px vertical = off grid
-   lg: 'px-7 py-3 text-base',     // 28px horizontal = off grid
+   sm: 'px-3 py-1 text-sm',       // 4px vertical = on grid
+   md: 'px-4 py-2 text-sm',       // 8px vertical = on grid
+   lg: 'px-6 py-3 text-base',     // 24px horizontal = on grid
  }
```

**3. Recharts colors extracted to Backpack-aligned constants:**
```typescript
// Recharts can't use CSS variables — need raw color strings
const BPK_SKY_BLUE = 'rgb(0, 98, 227)'
const BPK_TEXT_SECONDARY = 'rgb(98, 105, 113)'
const BPK_LINE = 'rgb(193, 199, 207)'
```

**4. BottomSheet radius updated:**
```diff
- 'absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl animate-slide-up',
+ 'absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.5rem] animate-slide-up',
```

### TypeScript Fixes

**lucide-react dynamic icon lookup** requires double cast:
```typescript
function getIcon(name: string) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return Icon || MapPin
}
```

**Recharts Tooltip formatter** — don't type the parameter:
```typescript
// Wrong: formatter={(value: number) => ...}
// Right:
formatter={(value) => [`£${value}`, 'Price']}
```

## Key Technical Patterns

### State Machine for Multi-Step Flows
```typescript
type ViewState = 'landing' | 'loading' | 'results'
const [view, setView] = useState<ViewState>('landing')
```

### Mock AI Delay with setTimeout
```typescript
const handleSearch = () => {
  setView('loading')
  setTimeout(() => setView('results'), 1800)
}
```

### CSS Animations with Stagger Delays
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
```

### Streaming Dots Animation (AI "Thinking")
```css
.streaming-dots span { animation: pulse-dot 1.4s ease-in-out infinite; }
.streaming-dots span:nth-child(2) { animation-delay: 0.2s; }
.streaming-dots span:nth-child(3) { animation-delay: 0.4s; }
```

## What Didn't Work / Gotchas

1. **Tailwind v4 requires `@tailwindcss/postcss`**, not the legacy `tailwindcss` PostCSS plugin
2. **CSS variables don't work in Recharts** — must use raw color strings
3. **`@theme inline` requires explicit mapping** — Tailwind won't auto-inherit CSS variables
4. **lucide-react icon typing** needs `as unknown as Record<...>` intermediate cast
5. **Recharts Tooltip formatter** breaks with explicit `(value: number)` parameter typing
6. **Edit tool `replace_all` with template literals** creates literal strings `'${VAR}'` instead of variable references — must rewrite entire sections instead
7. **Subagent token limits** (8192 max output) — large data files need to be written by the main agent or split across multiple agents
8. **setTimeout without cleanup** causes timer stacking on rapid re-renders — always return cleanup function in useEffect

## Lessons Learned

**Type System Friction:**
- Dynamic icon lookup with lucide-react requires `as unknown as Record<...>` — document this as a template for future icon integration
- Recharts formatters need bare parameter names `(value) =>` rather than typed `(value: number) =>`

**Spacing Grid Discipline:**
- UI spacing quickly drifts off the 4px grid without automated validation
- Spacing inconsistency signals "unfinished" even when functionality is solid

**Token Architecture Gap:**
- Design tokens in Backpack aren't auto-consumed by non-Backpack components (Recharts, etc.)
- Building with Tailwind + Backpack tokens requires manual bridging, creating an audit burden

**Subagent Orchestration:**
- Break large data generation into <5k token chunks per agent
- Have the main agent handle files that exceed subagent output limits
- Parallel agents for components + data simultaneously is highly effective

## Reusable Patterns

### Design Token Bridge for Chart Libraries
Create constants that mirror Backpack tokens for libraries that can't use CSS variables:
```typescript
// src/lib/chart-tokens.ts
export const BPK_SKY_BLUE = 'rgb(0, 98, 227)'
export const BPK_TEXT_SECONDARY = 'rgb(98, 105, 113)'
export const BPK_LINE = 'rgb(193, 199, 207)'
```

### Tailwind v4 + Backpack Quickstart
1. `postcss.config.js` with `@tailwindcss/postcss`
2. `@import "tailwindcss"` at top of CSS
3. `:root` block with all `--bpk-*` tokens
4. `@theme inline` block mapping tokens to `--color-*`, `--shadow-*`
5. `cn()` utility from clsx + tailwind-merge

## Future Improvements

- Add ESLint rules to flag hardcoded colors outside approved Backpack palette
- Add CSS class validator for 4px grid spacing enforcement
- Create a "friction log" per dependency documenting type workarounds
- Pre-generate large mock data files rather than relying on subagent generation
- Test with realistic data sizes before running full multi-agent sessions

## Related Documentation

- [skyscanner-demos-spec.md](../../../skyscanner-demos-spec.md) — Full specification for all 5 demos
- [docs/plans/2026-02-14-feat-skyscanner-weekend-demos-plan.md](../../plans/2026-02-14-feat-skyscanner-weekend-demos-plan.md) — Build plan
- CSS Platform PoC (`pocs/css-flight-site/`) — Prior PoC with similar Backpack integration patterns
