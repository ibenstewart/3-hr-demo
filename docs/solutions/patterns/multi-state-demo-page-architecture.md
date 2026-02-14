---
title: "Building a multi-state B2B demo page with Backpack design system"
problem_type: ui-feature
component: business-travel-demo
tags: [react, state-machine, backpack-design-system, demo, b2b, component-architecture]
severity: n/a
date_solved: 2026-02-14
time_to_solve: ~30min
---

# Multi-State Demo Page Architecture

## Problem Statement

How to port a standalone 15-component React PoC with terminal aesthetics into an existing demo app using Backpack design system, maintaining a complex 9-state flow across 4 trip scenarios.

## Context

A Business Travel Agent demo (travel.ai) was integrated as the 6th page in the Weekend Build Challenge app. The work involved:

- **Port & Restyle**: Moved code from `ideas/biz-travel/poc/` into `pocs/new-idea-demo/`, converting terminal/monospace UI to Backpack design tokens
- **State Architecture**: 9-state flow (search > thinking > results > summary > approval > booking > confirmed > disruption > rebooked) across 12 sub-components with `Biz` prefix
- **Mock Data**: 4 trip scenarios (Berlin, NYC, Paris day trip, Multi-city) in `src/data/business-travel.ts`
- **Integration**: DemoHub 6th card, Nav 6th link, App router new route

**Result:** 17 files changed, 3,652 lines added. Clean TS compilation, clean Vite build.

## Solution

### State Machine Pattern

Parent component holds a simple string union type for state. Each state renders a single focused sub-component:

```typescript
type AppState = 'search' | 'thinking' | 'results' | 'summary' | 'approval' | 'booking' | 'confirmed' | 'disruption' | 'rebooked'

// Each state renders one component
if (state === 'search') return <BizSearchInput onSearch={handleSearch} />
if (state === 'thinking' && scenario) return <BizThinkingState ... onComplete={handleThinkingComplete} />
```

Benefits:
- Single source of truth for trip/selections in parent
- Clear event flow: child > callback > parent setState
- No prop drilling beyond 2-3 levels
- Easy to add/remove states

### Component Architecture

12 sub-components in `src/components/business-travel/`:

| Component | State | Purpose |
|-----------|-------|---------|
| BizSearchInput | search | Natural language input + example chips + dashboard |
| BizThinkingState | thinking | Step-by-step AI processing animation |
| BizOptionCard | results | Flight option card (Budget/Fastest/Flexible) |
| BizSelectionPanel | results | Right sidebar with selected flight + hotel |
| BizComparisonTable | results | Table view toggle |
| BizMultiCityTabs | results | Multi-leg trip tab navigation |
| BizTripSummary | summary | Flight + hotel review with calendar conflicts |
| BizApprovalFlow | approval | Split-screen: traveler view + Slack preview |
| BizBookingState | booking | Step-by-step booking progress animation |
| BizConfirmedState | confirmed | Confirmation + cross-demo link + disruption trigger |
| BizDisruptionAlert | disruption/rebooked | 3 rebooking alternatives + Slack notification |

### Multi-City Support

Separate state object tracks per-leg flight selections:

```typescript
const [legSelections, setLegSelections] = useState<Record<string, FlightOption>>({})

// Check all legs selected before allowing continue
const allLegsSelected = legs.every(leg => legSelections[leg.id])

// Aggregate costs across all legs
const flightTotal = Object.values(legSelections).reduce((sum, f) => sum + f.price, 0)
const hotelTotal = scenario.legs.reduce((sum, leg) => sum + (leg.hotel?.totalPrice || 0), 0)
```

### Design System Migration

Mapping table from terminal aesthetic to Backpack tokens:

| Terminal Pattern | Backpack Replacement |
|---|---|
| `font-mono` / JetBrains Mono | Removed (system sans via Backpack) |
| `text-[#0770e3]` | `text-sky-blue` |
| `bg-[#f8fafc]` | `bg-canvas-contrast` |
| `border-[#e2e8f0]` | `border-line` |
| `text-[#00a698]` | `text-eco` / `text-success` |

**Exception:** Slack preview keeps authentic Slack styling (`bg-[#1a1d21]`, `text-[#2eb67d]`, etc.) rather than Backpack tokens. Third-party UI simulations should look like the third party.

### Timed Animation Chains

Sequential animations for thinking/booking states:

```typescript
useEffect(() => {
  let current = 0
  const advance = () => {
    if (current < steps.length) {
      setActiveStep(current)
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, steps[current].id])
        current++
        if (current < steps.length) setTimeout(advance, 300)
        else setTimeout(onComplete, 600)
      }, 400 + Math.random() * 300)
    }
  }
  const timer = setTimeout(advance, 500)
  return () => clearTimeout(timer)
}, [scenario, onComplete])
```

### Global ESC Reset

```typescript
const reset = useCallback(() => {
  setState('search')
  setScenario(null)
  setSelectedFlight(null)
  // ... reset all state
}, [])

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') reset()
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [reset])
```

## Lessons Learned

1. **State machine > nested routes for demo flows** — Simple string union + if/return rendering is easier to follow than react-router sub-routes for linear flows with branching.

2. **Component prefix convention scales** — `Biz` prefix avoids collisions with shared components (Card, Button). Pattern works for any demo domain.

3. **`import type` in Vite/Rollup** — Always use `import type { Foo }` for interfaces/types. Rollup warns "X is not exported" for type-only imports without the `type` keyword.

4. **Design system migration is a mapping problem** — Create the full token mapping table before touching code. Systematic find-and-replace beats ad-hoc fixing.

5. **Third-party UI should stay authentic** — Don't Backpack-ify Slack previews. Users spot the inauthenticity immediately.

6. **Centralized mock data prevents cascading changes** — One typed file with scenario-based structure. Adding a new scenario = extending data, not hunting through components.

7. **Timer cleanup prevents ghost animations** — Always return cleanup functions from `useEffect` when using `setTimeout` chains.

## Best Practices

- **Prefix components by domain**: `Biz*` for business travel, keeps imports self-documenting
- **Type your state transitions**: `type AppState = 'search' | 'thinking' | ...` prevents impossible states
- **Co-locate state + data at parent**: Children are pure UI presenters, parent orchestrates
- **Mock data should be strongly typed**: Export interfaces alongside data, catch mismatches at compile time
- **Mobile-responsive selection**: Desktop sidebar + mobile fixed bottom bar pattern works well for selection flows

## Related Documentation

- Plan: `docs/plans/2026-02-14-feat-business-travel-demo-plan.md`
- Weekend demos plan: `docs/plans/2026-02-14-feat-skyscanner-weekend-demos-plan.md`
- Backpack compliance audit: `docs/solutions/ui-bugs/backpack-design-system-compliance-integration.md`
- Source PoC: `/Users/benstewart/skyscanner/ideas/biz-travel/poc/`
- Product spec: `/Users/benstewart/skyscanner/ideas/biz-travel/travel_ai_agentic_smb_business_travel_product_spec_v_0.md`
