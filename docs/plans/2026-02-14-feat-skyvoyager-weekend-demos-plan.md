---
title: "feat: Build 5 SkyVoyager Weekend Demo Apps"
type: feat
date: 2026-02-14
---

# Build 5 SkyVoyager Weekend Demo Apps

## Overview

Build five polished, functional web app demos proving a single engineer with AI tools can build meaningful product prototypes in a weekend. The audience is SkyVoyager's senior leadership (CEO, Strategy, Commercial, Product, M&A). All five demos run as routes in a single React + Vite app with a shared Backpack-inspired design system.

**Demos:**
1. AI Trip Planner — conversational trip planning
2. In-Trip Companion — post-booking travel assistant
3. Smart Ancillaries — AI-powered upselling
4. Price Intelligence + Price Freeze — predictive pricing & price lock
5. Tours & Experiences Meta — activity metasearch

## Problem Statement / Motivation

SkyVoyager's leadership views these ideas as 12-month roadmap items. The goal is to shift that mental model: these are weekend builds. Together they tell the story that SkyVoyager can be a **travel operating system**, not just a flight comparison site.

The narrative arc across demos:
- **Discover + Plan** → Demo 1 (Trip Planner)
- **Book → Prepare** → Demo 3 (Ancillaries)
- **Plan + Book** → Demo 4 (Price Intelligence)
- **Manage + Trip** → Demo 2 (In-Trip Companion)
- **Trip** → Demo 5 (Tours & Experiences)

## Proposed Solution

### Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React + Vite | Fast scaffold, existing PoC patterns |
| Language | TypeScript | Matches css-flight-site patterns, minimal overhead with Vite |
| Styling | Tailwind CSS v4 + custom Backpack tokens | Spec requirement; actual Backpack npm package not available outside SkyVoyager codebase |
| Routing | React Router v7 | Route per demo + detail pages |
| Charts | Recharts | Demo 4 price history; good Tailwind integration, hover tooltips out of the box |
| Maps | Static images with CSS pin overlays | Demo 1; 80% visual impact in 10% of the time vs Leaflet |
| Icons | lucide-react | Matches existing PoC patterns |
| Utilities | clsx + tailwind-merge | `cn()` helper from css-flight-site |

### Design Token Strategy

Use the **actual Backpack CSS custom properties** from `/Users/benstewart/skyvoyager/pocs/backpack-claude-skill/.claude/skills/backpack/assets/backpack-tokens.css` as the foundation (153 lines, sourced from `@skyvoyager/bpk-foundations-web@24.1.0`). Extend with spec-specific tokens:

- Cabaret accent → use `--bpk-marcomms-berry` (`rgb(231, 8, 102)`)
- Coral Orange → use `--bpk-marcomms-orange` (`rgb(255, 123, 89)`)
- Map Backpack token names to Tailwind classes via `tailwind.config.js`

This gives the most authentic SkyVoyager look vs the approximate hex values in the spec.

### App Structure

```
/                    → Demo Hub (landing page)
/trip-planner        → Demo 1: AI Trip Planner
/companion           → Demo 2: In-Trip Companion
/ancillaries         → Demo 3: Smart Ancillaries
/prices              → Demo 4: Price Intelligence + Price Freeze
/experiences         → Demo 5: Tours & Experiences
/experiences/:id     → Demo 5: Experience detail page
```

### Key Design Decisions (from SpecFlow analysis)

The spec is comprehensive but has gaps that need defaults. Here are the decisions:

**1. Demo Hub / Selector (not in spec — must be built)**

A clean landing page with bold headline: *"What if one engineer could build all of this in a weekend?"* followed by 5 large cards in a grid, each with demo title, one-line description, and "Launch demo" button. Sets up the presentation narrative.

**2. Persistent Navigation**

Top nav bar (Haiti background) with SkyVoyager logo left, 5 horizontal demo links right (Trip Planner | Companion | Ancillaries | Prices | Experiences). Active demo underlined. Mobile: hamburger menu. Enables smooth demo-hopping during presentations.

**3. Demo 1: AI Streaming Transition**

After submitting prompt → pulsing "Planning your trip..." with dot animation for 1.5s → itinerary view fades in as complete page. No actual streaming of structured card content (too complex for the visual payoff). The loading animation IS the "AI magic" moment.

**4. Demo 1: Map Approach**

Static city images (Tokyo, Hakone, Kyoto, Osaka) with colored CSS-positioned pins. No Leaflet. Quick to build, visually effective.

**5. Demo 1: Day Editing**

Edit button reveals an inline text input below the day card. User types a request → 1s pulsing delay → content swaps. "Edited" badge appears on the card. Cancel button available.

**6. Demo 2: Multi-day with Light Days 2-4**

Show Day 1 by default (fully detailed). Day tab bar at top (Day 1-4). Days 2-4 have 3-4 timeline items each — enough to feel real, not enough to double the build time. Disruption notification appears on Day 1 by default.

**7. Demo 2: Chat**

3 pre-populated exchanges visible on open. New user input → single generic streaming response ("I've noted that. Let me update your schedule."). Bottom sheet on mobile, side panel on desktop.

**8. Demo 2: Quick Actions**

Visual-only icons. Tap shows a brief bottom sheet with 2-3 mock items per category (e.g., Transport: "Metro L3 — €2.55", "Taxi — ~€15"). Minimal effort, adds believability.

**9. Demo 3: Add/Remove Toggle**

"Add" button toggles to "Added ✓" with green accent. Click again to remove. Bundle summary animates updates. Trip readiness: starts at 0%, each item adds ~14% (equal weight). Savings badge appears at 3+ items.

**10. Demo 4: Static Route Search**

The pre-filled Edinburgh → New York search is visual-only. No alternative routes. Price chart supports hover tooltips (Recharts default). Countdown timer ticks in real time.

**11. Demo 5: Images**

Use Unsplash photos via URL for Barcelona landmarks. 20 minutes of curation before coding, dramatically improves visual impact vs colored blocks.

**12. Demo 5: Detail Page**

Separate route (`/experiences/:id`). Back arrow in nav. Availability calendar is static visual only — a few dates highlighted, no click behavior.

**13. Cross-Demo Links**

Simple `<Link>` navigation between demos. Each demo owns its own mock data. The "integration" is narrative, not technical. Demo 5's "Based on your Barcelona trip" section has its own data that references Demo 2's trip.

## Build Phases

Following the spec's recommended build order, with shared foundation first:

### Phase 0: Scaffold + Design System
- Vite + React + TypeScript + Tailwind v4 project setup
- Copy Backpack tokens CSS, configure Tailwind theme
- Shared components: Nav, Card, Button, Chip, PriceTag, Rating, StreamingText
- Demo hub landing page
- Router setup with all routes
- SkyVoyager sunrise logo SVG

### Phase 1: Demo 5 — Tours & Experiences
- Destination landing page with hero
- Filter chips + sort dropdown
- Experience card grid with 3-provider price comparison
- Experience detail page (Sagrada Família as the example)
- "Based on your Barcelona trip" section
- Cross-demo banner linking to Demo 1
- Mock data: 15-20 experiences with pricing, ratings, categories

### Phase 2: Demo 3 — Smart Ancillaries
- Post-booking confirmation card
- AI recommendation cards (7 ancillaries)
- Add/remove toggle with bundle summary
- Trip readiness progress bar
- Savings callout at 3+ items
- Mock data: ancillary items with AI reasoning text

### Phase 3: Demo 4 — Price Intelligence + Price Freeze
- Route search header (static)
- Price history line chart (Recharts) with 12-month data
- AI price verdict card with confidence gauge
- Flight comparison cards (5-6 options)
- Price freeze modal flow
- Frozen state with live countdown timer
- Mock data: price history array, flight options

### Phase 4: Demo 1 — AI Trip Planner
- Landing screen with text input + prompt chips
- Loading/streaming animation transition
- Day-by-day timeline with sidebar navigation
- Static map panels per city
- Inline edit flow per day card
- Flight + hotel price summary
- Mock data: complete 10-day Japan itinerary

### Phase 5: Demo 2 — In-Trip Companion
- Home screen with current trip card
- Day timeline view (Day 1 detailed, Days 2-4 lighter)
- Day tab navigation
- Disruption notification card with action buttons
- Chat interface (floating button → panel/bottom sheet)
- Quick actions bar with mini bottom sheets
- Mock data: 4-day Barcelona trip, 2-3 disruption scenarios

## Shared Components

| Component | Used In | Notes |
|-----------|---------|-------|
| `Nav` | All | Haiti bg, logo, demo links, active state |
| `Card` | All | White bg, 12px radius, shadow, hover lift |
| `Button` | All | Primary (Sky Blue) + Secondary (outline) |
| `Chip` | D1, D5 | Filter chips, selected/unselected states |
| `PriceTag` | D3, D4, D5 | Currency-formatted price display |
| `Rating` | D5 | Star rating with review count |
| `Timeline` | D1, D2 | Vertical timeline with time slots |
| `ChatBubble` | D2 | User/AI message bubbles |
| `StreamingText` | D1, D2 | Pulsing dot → text fade-in animation |
| `BottomSheet` | D2 | Slide-up drawer for mobile |

## Technical Considerations

- **Tailwind v4**: Uses the new `@import "tailwindcss"` syntax and `@tailwindcss/postcss` plugin (not the old `tailwindcss` PostCSS plugin). Pattern established in css-flight-site.
- **State management**: Use explicit state machines in page components for multi-step flows (loading → results, add/remove items, freeze flow). Pattern from biz-travel PoC.
- **Mock data**: Hardcoded JSON files in `src/data/`. Realistic airline names, city names, GBP pricing. No API calls.
- **AI delays**: `setTimeout` with 1-2 second delays + pulsing dot animation. No actual AI integration.
- **Images**: Unsplash URLs for Demo 5 experience photos. Static map images for Demo 1. SkyVoyager logo as inline SVG.
- **No dark mode**: Light mode only per spec.
- **Animations**: 200ms ease transitions on hover/focus. Card hover = translateY(-2px) + shadow increase. Reuse animation utilities from css-flight-site (fade-in-up, float, gradient-shift).

## Acceptance Criteria

- [x] All 5 demos accessible from a demo hub landing page
- [x] Smooth navigation between demos via persistent nav bar
- [x] Each demo follows the flows described in the spec
- [x] Backpack-inspired design system applied consistently (actual tokens, not approximations)
- [x] All mock data is realistic (real places, airlines, pricing in GBP/EUR)
- [x] Mobile-responsive — doesn't break on phone screens
- [x] AI interactions have convincing pulsing/streaming animations
- [x] Demo 4 price chart is interactive (hover tooltips)
- [x] Demo 4 countdown timer ticks in real time
- [x] Demo 3 bundle builder updates dynamically as items are added/removed
- [x] Cross-demo links work (Demo 5 → Demo 1 banner, etc.)
- [x] Runs with `npm run dev` — single command to launch everything

## Success Metrics

- Leadership watches the demo and their reaction is "wait, one person built all of this?"
- Each demo looks polished enough to be mistaken for an internal product team prototype
- Demo transitions are smooth enough for a live presentation (no URL fumbling)
- The narrative arc (search → plan → book → prepare → trip) is clear across all 5 demos

## Dependencies & Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Recharts learning curve | Demo 4 chart takes longer than expected | Chart.js as fallback; both support Tailwind styling |
| Mock data volume | 15-20 experiences + 10-day itinerary + 4-day timeline is a lot of JSON | Generate programmatically where possible; focus detail on what's visible |
| Unsplash rate limits | Image URLs may break in demos | Download and serve locally from `/public/images/` as backup |
| Mobile responsiveness | 5 demos × mobile layouts = significant CSS work | Focus mobile effort on Demo 2 (most mobile-native) and Demo 5 (card grid). Others can be "doesn't break" level |
| Tailwind v4 syntax differences | New import syntax may cause confusion | Reference css-flight-site PostCSS config directly |

## Reusable Assets from Existing PoCs

| Asset | Source | How to Reuse |
|-------|--------|-------------|
| Backpack tokens CSS (153 lines) | `pocs/backpack-claude-skill/.claude/skills/backpack/assets/backpack-tokens.css` | Copy to `src/styles/backpack-tokens.css` |
| `cn()` utility | `pocs/css-flight-site/src/lib/utils.ts` | Copy pattern (clsx + tailwind-merge) |
| Animation classes | `pocs/css-flight-site/src/index.css` | Copy fade-in-up, float, gradient-shift, stagger classes |
| Vite + Tailwind v4 config | `pocs/css-flight-site/vite.config.ts` + `postcss.config.js` | Reference for project scaffold |
| State machine patterns | `ideas/biz-travel/docs/solutions/ui-patterns/react-poc-dashboard-patterns.md` | Apply to multi-step flows |
| Mock data interfaces | `ideas/biz-travel/` | Reference FlightDisplayData shape |

## References & Research

### Internal References
- Spec document: `skyvoyager-demos-spec.md` (this repo)
- Backpack tokens: `pocs/backpack-claude-skill/.claude/skills/backpack/assets/backpack-tokens.css`
- Token reference: `pocs/backpack-claude-skill/.claude/skills/backpack/references/token-reference.md`
- CSS flight site PoC: `pocs/css-flight-site/` (React + Vite + Tailwind v4 patterns)
- Dashboard patterns: `ideas/biz-travel/docs/solutions/ui-patterns/react-poc-dashboard-patterns.md`
- CLAUDE.md conventions: `skyvoyager/.claude/CLAUDE.md`

### Key Convention Notes
- Backpack components work best for buttons/cards; use plain Tailwind for typography (from CLAUDE.md)
- Skip tests, error handling, and abstractions unless asked (from CLAUDE.md)
- Focus on learning and rapid prototyping over production quality (from CLAUDE.md)
