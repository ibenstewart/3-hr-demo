# Three Hour Build Challenge

## What This Is
Seven interactive product demos showing what SkyVoyager could look like as a travel operating system. Built as a rapid prototyping exercise with Claude Code. Deployed on Vercel.

## Tech Stack
- React 19 + TypeScript, Vite 7, Tailwind CSS 4, React Router 7
- Recharts for price charts, Lucide React for icons
- All data is mock — no backend, no API calls

## Project Structure
```
src/
  pages/              # One page per demo + DemoHub landing
  components/         # Shared UI (Button, Card, Chip, StreamingText, ErrorBoundary)
    business-travel/  # Biz-prefixed components for the B2B demo
  data/               # Mock data files (TypeScript)
  lib/                # Utilities (cn helper via clsx + tailwind-merge)
```

## The 7 Demos
| Route | Demo | Data file |
|-------|------|-----------|
| `/` | DemoHub (landing) | — |
| `/trip-planner` | AI Trip Planner | `japan-itinerary.ts` |
| `/companion` | In-Trip Companion | `barcelona-trip.ts` |
| `/ancillaries` | Smart Ancillaries | `ancillaries.ts` |
| `/prices` | Price Intelligence | `price-history.ts` |
| `/experiences` | Tours & Experiences | `experiences.ts` |
| `/business-travel` | Business Travel Agent | `business-travel.ts` |
| `/marketing` | Marketing Planner | `marketing-plans.ts` |

## Conventions
- **Backpack design tokens** via CSS custom properties mapped to Tailwind theme (see `index.css`)
- **Component naming**: Business travel components use `Biz` prefix (BizSearchInput, BizOptionCard, etc.)
- **Type imports**: Always use `import type { Foo }` for type-only imports (Vite/Rollup requirement)
- **State machines**: Complex demos use a string union type for state (`type AppState = 'search' | 'thinking' | ...`)
- **Timers in effects**: Use `useState` for step counters, never mutable closure variables (React 19 StrictMode double-fires effects)
- **Images**: Unsplash URLs with `?w=800&h=600&fit=crop` params. Verify URLs return 200 before committing.

## Running
```bash
npm install
npm run dev     # Dev server (port 5173+)
npm run build   # TypeScript check + Vite build (what Vercel runs)
```

## Deployment
- GitHub: https://github.com/ibenstewart/3-hr-demo
- Vercel builds on push to main
- Build command: `npm run build` (runs `tsc -b && vite build`)
- Unused imports will fail the build (`noUnusedLocals` in tsconfig)
