---
title: "feat: Add SMB Business Travel Demo to Weekend Build Challenge"
type: feat
status: completed
date: 2026-02-14
---

# Add SMB Business Travel Demo (Demo 6) to Weekend Build Challenge

## Overview

Add travel.ai — an agentic SMB business travel product — as Demo 6 to the existing Weekend Build Challenge app. This demo covers the **full B2B traveller journey**: natural language search → AI option curation → Slack-based manager approval → automated booking → disruption handling. It repositions the demo suite from "5 consumer ideas" to "5 consumer ideas + 1 B2B play", showing leadership that SkyVoyager's AI strategy spans both sides.

The existing standalone PoC (`/Users/benstewart/skyvoyager/ideas/biz-travel/poc/`) has 15+ components with a terminal/monospace aesthetic. This plan covers restyling it to Backpack design system, integrating it as a route in the weekend demo app, and porting the full flow including multi-city trips and disruption handling.

## Problem Statement / Motivation

The current 5 demos tell a consumer story. Business travel is a separate, high-value opportunity for SkyVoyager — especially for SMBs where travel is unmanaged. Adding this demo:

- Shows leadership that SkyVoyager's AI strategy extends to B2B
- Demonstrates a differentiated product (Slack-native approvals, policy awareness, disruption support)
- Proves the "weekend build" thesis applies to enterprise products too
- Completes the portfolio: consumer + business = full travel operating system

## Proposed Solution

Add a new route `/business-travel` with a full-flow page component that adapts the existing PoC. Restyle from terminal/JetBrains Mono to Backpack design system. Port all 4 trip scenarios (Berlin, NYC, Paris day trip, Multi-city) and the disruption handling flow.

### What Changes

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/business-travel` route |
| `src/components/Nav.tsx` | Add "Business Travel" link |
| `src/pages/DemoHub.tsx` | Add 6th demo card |
| `src/pages/BusinessTravel.tsx` | **New** — main page with state machine |
| `src/components/business-travel/*.tsx` | **New** — sub-components (see below) |
| `src/data/business-travel.ts` | **New** — mock data (4 scenarios) |
| `src/index.css` | Minor additions for new animations |

### Architecture

The page follows the same pattern as other demos (single page file with state management) but uses sub-components due to the flow's complexity (9 states vs 2-3 in other demos).

```
BusinessTravel.tsx (state machine: search → thinking → results → summary → approval → booking → confirmed → disruption → rebooked)
├── BizSearchInput.tsx        — Natural language search with example queries
├── BizThinkingState.tsx      — Step-by-step AI processing animation
├── BizOptionCard.tsx         — Flight option card (Budget/Fastest/Flexible)
├── BizSelectionPanel.tsx     — Right sidebar with selected flight + hotel
├── BizComparisonTable.tsx    — Table view of all 3 options
├── BizTripSummary.tsx        — Flight + hotel review before approval
├── BizApprovalFlow.tsx       — Traveler-side approval view
├── BizSlackPreview.tsx       — Simulated Slack message for manager approval
├── BizBookingState.tsx       — Booking progress animation
├── BizConfirmedState.tsx     — Booking confirmation
├── BizDisruptionAlert.tsx    — Flight disruption with alternatives
├── BizDisruptionSlack.tsx    — Slack notification of rebooking
├── BizMultiCityTabs.tsx      — Multi-leg trip flow
├── BizDateAdjuster.tsx       — Date shift controls
├── BizHomeDashboard.tsx      — Recent trips + suggested deals + calendar
└── BizHotelCarousel.tsx      — Alternative hotel selection
```

**Why `Biz` prefix?** Avoids naming collisions with existing shared components (Card, Button, etc.) and makes clear these are business-travel-specific. The shared Backpack components (Card, Button, Chip, etc.) are used within these.

### State Machine

```
search ──→ thinking ──→ results ──→ summary ──→ approval ──→ booking ──→ confirmed
                                                                              │
                                                                              ▼
                                                                         disruption ──→ rebooked
                                                                              │
                                                                              └──→ confirmed (dismiss)

Reset: Any state → search (via ESC / "New Search" button)
```

States map directly from the existing PoC's `AppState` type:
```typescript
type AppState = 'search' | 'thinking' | 'results' | 'summary' | 'approval' | 'booking' | 'confirmed' | 'disruption' | 'rebooked'
```

### Design System Migration

The PoC uses terminal aesthetic (JetBrains Mono, `#0770e3` hex values, `font-mono` everywhere). Migration to Backpack:

| Terminal Pattern | Backpack Replacement |
|-----------------|---------------------|
| `font-mono` / JetBrains Mono | Remove — use Backpack font stack (system sans) |
| `text-[#0770e3]` (hardcoded blue) | `text-sky-blue` (Tailwind theme token) |
| `text-[#1e293b]` (hardcoded text) | `text-text-primary` |
| `text-[#64748b]` (hardcoded muted) | `text-text-secondary` |
| `bg-[#f8fafc]` (hardcoded bg) | `bg-canvas` / `bg-canvas-contrast` |
| `border-[#e2e8f0]` (hardcoded border) | `border-line` |
| `text-[#00a698]` (hardcoded green) | `text-success` / `text-eco` |
| `bg-white rounded-xl border border-[#e2e8f0]` | Use shared `Card` component |
| `▸` / `[ESC]` / `[CONTINUE]` terminal symbols | Standard Backpack buttons and icons |
| `travel.ai — v1.0` header branding | Uses shared `Nav` component (no separate header) |
| `font-mono text-sm` labels | `text-sm font-medium` |

### DemoHub Integration

Add as 6th card on DemoHub:

```typescript
{
  to: '/business-travel',
  icon: Briefcase,  // from lucide-react
  title: 'Business Travel Agent',
  description: 'AI-powered SMB business travel — natural language booking with Slack approvals and disruption support.',
  phase: 'Full Journey (B2B)',
  color: 'bg-sky-blue',  // or a new accent — potentially a blue-to-purple gradient to differentiate B2B
}
```

Update the "Traveller Journey" arc at bottom of DemoHub to include B2B:
```
Discover + Plan → Plan + Book → Book → Prepare → Manage + Trip → Trip
                                                                    ↓
                                                        Full Journey (B2B)
```

### Nav Update

Add "Biz Travel" to the links array in `Nav.tsx`:
```typescript
{ to: '/business-travel', label: 'Biz Travel' }
```

### Mock Data

Port the 4 scenarios from `ideas/biz-travel/poc/src/data/mockFlights.ts`:

1. **Berlin** — Standard 2-night office visit, 3 flight options, hotel with 2 alternatives
2. **NYC** — Business class client meeting, higher budget, Manhattan hotels
3. **Paris** — Day trip (no hotel), includes Eurostar option
4. **Multi-city** — London → Berlin → Paris → London with per-leg flight selection

Plus: company context (Acme Corp, policy limits, approver), recent trips, suggested deals, disruption scenario, booking steps.

All data is already complete in the existing PoC — this is a copy + adapt task.

### Cross-Demo Integration

- Demo 2 (In-Trip Companion) already shows a Barcelona trip. Business Travel shows London/Berlin/NYC/Paris trips — naturally complementary
- Add a subtle callout on the BusinessTravel confirmed state: "Heading to Barcelona? See what your In-Trip Companion looks like →" linking to `/companion`
- DemoHub narrative ties it together: "And for business travellers, the entire journey in one Slack command"

## Technical Considerations

### Component Count

This demo has significantly more components than others (15 sub-components vs 0 for most demos). This is justified because:
- 9 distinct UI states vs 2-3 in other demos
- Split-screen approval flow is inherently complex (traveler view + Slack preview)
- Multi-city tabs add another dimension

The alternative (one giant file) would be 1500+ lines and unmanageable.

### Shared Component Usage

Reuse existing shared components where possible:
- `Card` — for flight option cards, hotel cards, summary cards
- `Button` — for all CTAs (primary: "Continue", "Book", secondary: "Compare view")
- `Chip` — for trip type chips, status badges
- `StreamingText` — for AI thinking animation
- `BottomSheet` — potentially for mobile approval view

### New Animations Needed

Add to `src/index.css`:
- `live-indicator` — pulsing green dot for "PoC Demo" badge (exists in biz-travel PoC)
- `terminal-grid` — subtle grid background (optional, may skip for Backpack purity)

### Package Dependencies

No new dependencies needed. The existing app already has everything:
- `lucide-react` for Briefcase icon
- `clsx` + `tailwind-merge` for conditional classes
- React Router for the new route

## Build Phases

### Phase 1: Foundation (Data + Route + Hub)

**Files:**

- `src/data/business-travel.ts` — Port all interfaces + 4 scenarios + company context + disruption data from `ideas/biz-travel/poc/src/data/mockFlights.ts`
- `src/App.tsx` — Add route
- `src/pages/DemoHub.tsx` — Add 6th card
- `src/components/Nav.tsx` — Add nav link
- `src/pages/BusinessTravel.tsx` — Scaffold with state machine + page header/footer

### Phase 2: Search + Results Flow

**Files:**

- `src/components/business-travel/BizSearchInput.tsx` — Natural language input with example query chips, recent trips sidebar, suggested deals
- `src/components/business-travel/BizThinkingState.tsx` — Step-by-step thinking animation (reuse `StreamingText` pattern)
- `src/components/business-travel/BizOptionCard.tsx` — 3-column flight option cards with reasoning + tradeoffs
- `src/components/business-travel/BizSelectionPanel.tsx` — Right sidebar showing selected flight + hotel
- `src/components/business-travel/BizComparisonTable.tsx` — Table view toggle
- `src/components/business-travel/BizDateAdjuster.tsx` — Date shift controls above results
- `src/components/business-travel/BizHomeDashboard.tsx` — Recent trips, suggested deals, calendar preview (search state only)

### Phase 3: Summary + Approval + Booking

**Files:**

- `src/components/business-travel/BizHotelCarousel.tsx` — Alternative hotel selection
- `src/components/business-travel/BizTripSummary.tsx` — Flight + hotel review with total pricing
- `src/components/business-travel/BizApprovalFlow.tsx` — Traveler approval view
- `src/components/business-travel/BizSlackPreview.tsx` — Simulated Slack approval message
- `src/components/business-travel/BizBookingState.tsx` — Booking progress steps
- `src/components/business-travel/BizConfirmedState.tsx` — Confirmation with calendar + cross-demo link

### Phase 4: Advanced Flows

**Files:**

- `src/components/business-travel/BizDisruptionAlert.tsx` — Disruption notification with 3 alternatives
- `src/components/business-travel/BizDisruptionSlack.tsx` — Slack rebooking notification
- `src/components/business-travel/BizMultiCityTabs.tsx` — Multi-leg trip tab navigation

### Phase 5: Polish

- Backpack design compliance pass across all components
- Animation consistency (fade-in-up, stagger delays)
- Mobile responsiveness for key screens (search, results, approval split-screen)
- Cross-demo links

## Acceptance Criteria

### Functional
- [x] `/business-travel` route loads and is accessible from DemoHub and Nav
- [x] Natural language search triggers AI thinking animation
- [x] 3 flight options display with reasoning and tradeoffs
- [x] Card view ↔ comparison table toggle works
- [x] Hotel auto-selection with carousel for alternatives
- [x] Trip summary shows complete flight + hotel breakdown
- [x] Split-screen approval: traveler view + Slack preview
- [x] Slack "Approve" button triggers approval animation
- [x] Booking progress animation completes to confirmation
- [x] Disruption alert shows with 3 rebooking alternatives
- [x] Rebooked state shows updated itinerary + Slack notification
- [x] Multi-city scenario works with per-leg flight selection
- [x] "New Search" resets all state
- [x] All 4 scenarios work (Berlin, NYC, Paris, Multi-city)

### Design
- [x] No JetBrains Mono / monospace fonts remaining
- [x] All colors use Backpack theme tokens (not hardcoded hex)
- [x] Cards use shared `Card` component or matching 12px radius + shadow style
- [x] Buttons match Backpack primary/secondary styles
- [x] Consistent with the look and feel of the other 5 demos

### Integration
- [x] DemoHub shows 6 cards (not 5)
- [x] Nav shows 6 links (not 5)
- [x] Cross-demo link from confirmed state to companion
- [x] Journey arc on DemoHub updated to include B2B

## Dependencies & Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Component count (15+) adds complexity | Longer build time than other demos | Phase the build; search+results alone is demoa-ble |
| Slack preview is complex to style in Backpack | May look odd if too "SkyVoyager-ified" | Keep Slack preview with its own authentic Slack styling (purple sidebar, #2C2D30 header) — it's meant to look like Slack |
| Multi-city flow is the most complex state | Could introduce bugs in state transitions | Build multi-city last; single-city flow is the demo star |
| 6 demos on DemoHub may crowd the grid | 2×3 grid or awkward 3+3 layout | Works naturally as 2 rows of 3 in the existing `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid |
| Terminal aesthetic removal may lose some charm | The "agent" feel comes from monospace | Compensate with Backpack's blue accent + AI thinking animations |

## References

### Source Material
- Product spec: `/Users/benstewart/skyvoyager/ideas/biz-travel/travel_ai_agentic_smb_business_travel_product_spec_v_0.md`
- Existing PoC: `/Users/benstewart/skyvoyager/ideas/biz-travel/poc/src/`
- PoC best practices: `/Users/benstewart/skyvoyager/ideas/biz-travel/BEST_PRACTICES.md`
- Previous plans: `/Users/benstewart/skyvoyager/ideas/biz-travel/docs/plans/`

### Weekend Demo App
- App entry: `src/App.tsx` (router with 6 routes + detail page)
- Design tokens: `src/index.css` (Backpack CSS custom properties + Tailwind theme)
- Nav component: `src/components/Nav.tsx`
- DemoHub: `src/pages/DemoHub.tsx`
- Existing plan: `docs/plans/2026-02-14-feat-skyvoyager-weekend-demos-plan.md`

### Key Files to Port
- `ideas/biz-travel/poc/src/App.tsx` → `src/pages/BusinessTravel.tsx`
- `ideas/biz-travel/poc/src/data/mockFlights.ts` → `src/data/business-travel.ts`
- `ideas/biz-travel/poc/src/components/*.tsx` → `src/components/business-travel/*.tsx`
