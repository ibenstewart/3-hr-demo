---
title: "feat: Add Geo Growth & PMF section to Marketing Planner"
type: feat
status: completed
date: 2026-02-16
---

# feat: Add Geo Growth & PMF Section to Marketing Planner

## Overview

A new "Geo Growth" section in the Marketing Planner's strategy sidebar that helps marketing teams decide which geographic markets to enter first and how to enter each one. Uses a 4-dimension PMF framework (Demand, Competition, SkyVoyager Position, Regulatory) to rank markets into tiers, with expandable entry playbooks per market that include localized channel mix, competitor positioning, messaging, regulatory notes, and a "Draft localized Google Ads copy" hero action.

## Problem Statement

Marketing teams planning geographic expansion do this manually — researching markets one at a time, building spreadsheets, comparing competitors per geo. The Marketing Planner already shows *what* to do (channels, budget, tactics) but not *where* to do it. A geo growth lens that scores markets, ranks them, and generates localized entry playbooks demonstrates AI doing weeks of analyst work in seconds.

## Proposed Solution

### Navigation Structure (after changes)

```
Strategy (7 sections)
├── Overview           (existing)
├── Competitors        (existing)
├── Channels           (existing)
├── 90-Day Plan        (existing)
├── Top Tactics        (existing)
├── Budget Intelligence (existing)
└── Geo Growth         (NEW — Globe icon)
    ├── Market Prioritization  (default sub-tab)
    └── Signal Analysis        (second sub-tab)

Execution (3 sections)
├── Copy Studio        (existing)
├── Content Calendar   (existing)
└── Launch Playbook    (existing)
```

### Sub-tab 1: Market Prioritization

Ranked tier list with three tiers, 6-8 markets per product:

- **Launch Now** (eco/green border) — 2-3 markets with high PMF scores. SkyVoyager has an edge.
- **Next Quarter** (coral/amber border) — 2-3 markets needing preparation.
- **Watch** (gray border) — 1-2 lower-priority markets.

Each market card shows:
- Country flag emoji + name
- Overall PMF score (0-100) as prominent number
- 4 horizontal dimension bars (Demand, Competition, Position, Regulatory) with numerical values
- One-line insight text
- "View entry playbook" button (Sparkles icon, reuses hero action pattern)

Clicking "View entry playbook" → 1.5s "Analyzing market..." loading → expands to reveal full entry playbook.

### Entry Playbook (expandable card)

- **Localized Channel Mix** — 4-5 channels per market with budget % and note (e.g., "LINE — 25% — Dominant messaging platform in Japan")
- **Local Competitor Positioning** — 2-3 competitors with local strength and SkyVoyager's angle
- **Messaging Angles** — 2-3 localized hooks
- **Regulatory Notes** — Key compliance considerations
- **Content Brief** — Top 3 content priorities for this market
- **Hero Action: "Draft localized Google Ads copy"** — Expands to show 3 ad variants (headline + description) for that market
- **"Publish to" row** — Slack, Notion, HubSpot, Google Docs with success toast

### Sub-tab 2: Signal Analysis

- AI Reasoning callout explaining PMF methodology
- Dimension breakdown: all markets in a table ranked by each dimension
- 2-3 non-obvious insight callouts (e.g., "Japan has high demand but regulatory complexity makes it Next Quarter despite strong signals")

### Data Model

**File:** `src/data/geo-markets.ts` (NEW — separate file due to marketing-plans.ts size)

```typescript
export interface GeoMarket {
  country: string
  flag: string                    // emoji flag
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America' | 'Middle East & Africa'
  tier: 'launch-now' | 'next-quarter' | 'watch'
  pmfScore: number                // 0-100, derived from dimensions
  dimensions: {
    demand: number                // 0-100
    competition: number           // 0-100 (higher = less competition = better)
    position: number              // 0-100 (SkyVoyager brand/traffic)
    regulatory: number            // 0-100 (higher = easier entry)
  }
  insight: string
  playbook: GeoPlaybook
}

export interface GeoPlaybook {
  channels: { name: string; icon: string; budgetPct: number; note: string }[]
  competitors: { name: string; localStrength: string; angle: string }[]
  messaging: string[]
  regulatory: string[]
  contentBrief: string[]
  adVariants: { headline: string; description: string }[]
}

// Keyed by productId
export const geoMarketsByProduct: Record<string, GeoMarket[]> = {
  'trip-planner': [ /* 6-8 markets */ ],
  'companion': [ /* 6-8 markets */ ],
  // ...
}
```

### Product-Specific Market Selections

All products share US, UK, Germany as common markets. Remaining 3-5 vary by product relevance:

| Product | Markets (6-8) |
|---------|--------------|
| AI Trip Planner | US, UK, Germany, Japan, Australia, France, South Korea |
| In-Trip Companion | US, UK, Germany, Spain, Italy, Thailand, UAE |
| Smart Ancillaries | US, UK, Germany, UAE, Singapore, Australia |
| Price Intelligence | US, UK, Germany, India, Brazil, Japan, Canada |
| Tours & Experiences | US, UK, Germany, Spain, Italy, Thailand, Japan, Mexico |
| Business Travel Agent | US, UK, Germany, Singapore, UAE, Hong Kong, Netherlands |

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data file | Separate `geo-markets.ts` | `marketing-plans.ts` is already ~800 lines. Adding 36-48 market objects would double it. |
| Section placement | Last strategy item (after Budget Intelligence) | Geographic expansion is strategic analysis. Accepts 7/3 strategy/execution split. |
| Section icon | `Globe` (already imported) | Semantically obvious, not taken by other sections. |
| Sub-tab state | Component `useState` | No URL routing needed for a demo. Matches Budget Intelligence pattern. |
| Expansion model | Independent (not accordion) | Multiple playbooks can be open for comparison. Matches hero action `Set<string>` pattern. |
| Ad copy state | Scoped per playbook | Collapsing parent playbook auto-resets ad copy. State is local. |
| PMF score | Derived: average of 4 dimensions | `(demand + competition + position + regulatory) / 4`. Keeps data consistent. |
| Tier thresholds | ≥75 Launch Now, 55-74 Next Quarter, <55 Watch | Ensures good distribution across tiers. |
| Publish behavior | Toast: "Published to [service]" | Matches existing Launch Playbook pattern. Auto-dismiss 3s. |
| Dimension bars | Horizontal, sky-blue, with numerical values | Consistent with existing progress bar patterns (Budget incrementality). |
| Tier styling | Colored left border + tier badge | Left border: eco/coral/line. Badge: pill with tier label. |
| Ad variant layout | Vertical card list | Each variant is a light card with headline + description. Copy button per variant. |
| Mobile label | "Geo" (shortened) | Avoids overflow on mobile bottom tab bar with 10 sections. |
| Market data overlap | 3 common (US, UK, Germany) + 3-5 unique per product | Realistic — all products launch in major English-speaking markets first, then diverge. |
| Channel icons | Reuse `channelIcons` map + add new entries | LINE, VK, WhatsApp etc. use existing icon fallbacks (smartphone, globe). |
| Region field | In data model but not shown in tier list UI | Available for future filtering. Tier grouping is sufficient for demo. |

## Implementation

### Phase 1: Data Model + Mock Data

**File:** `src/data/geo-markets.ts` (NEW)

- [x] Create `GeoMarket` interface with country, flag, region, tier, pmfScore, dimensions, insight, playbook
- [x] Create `GeoPlaybook` interface with channels, competitors, messaging, regulatory, contentBrief, adVariants
- [x] Create `geoMarketsByProduct` Record keyed by productId
- [x] Write mock data for AI Trip Planner (7 markets: US, UK, Germany, Japan, Australia, France, South Korea)
- [x] Write mock data for In-Trip Companion (7 markets: US, UK, Germany, Spain, Italy, Thailand, UAE)
- [x] Write mock data for Smart Ancillaries (6 markets: US, UK, Germany, UAE, Singapore, Australia)
- [x] Write mock data for Price Intelligence (7 markets: US, UK, Germany, India, Brazil, Japan, Canada)
- [x] Write mock data for Tours & Experiences (8 markets: US, UK, Germany, Spain, Italy, Thailand, Japan, Mexico)
- [x] Write mock data for Business Travel Agent (7 markets: US, UK, Germany, Singapore, UAE, Hong Kong, Netherlands)
- [x] Each market needs: 4-5 channels with budget %, 2-3 local competitors, 2-3 messaging angles, 1-3 regulatory notes, 3 content brief items, 3 ad variants

### Phase 2: Section Scaffolding

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Add `'geo-growth'` entry to `sections` array: `{ id: 'geo-growth', label: 'Geo Growth', icon: Globe, group: 'strategy' as const }`
- [x] Position after `budget` in the array
- [x] Add `import { geoMarketsByProduct } from '../data/geo-markets'`
- [x] Add `import type { GeoMarket } from '../data/geo-markets'`
- [x] Add conditional render: `{activeSection === 'geo-growth' && <GeoGrowthSection plan={plan} />}`
- [x] Create skeleton `GeoGrowthSection` component with sub-tab state

### Phase 3: Market Prioritization Tab

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Build `GeoGrowthSection` with sub-tab switcher (Market Prioritization | Signal Analysis)
- [x] Add `expandedMarkets` and `loadingMarkets` state (`Set<string>`)
- [x] Add `expandedAdCopy` state (`Set<string>`) for nested hero actions
- [x] Add toast state for "Published to" notifications
- [x] Define tier config: `{ 'launch-now': { label: 'Launch Now', color: 'eco', border: 'border-l-eco' }, ... }`
- [x] Build tier group rendering: group markets by tier, render each group with colored header
- [x] Build market cards: flag + name, PMF score badge, 4 dimension bars, insight text, "View entry playbook" button
- [x] Staggered fade-in animation on market cards (`animationDelay: ${i * 0.1}s`)

### Phase 4: Entry Playbook + Hero Action

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Build expandable playbook card (triggered by "View entry playbook" button)
- [x] 1.5s loading animation with Loader2 spinner → reveal with `animate-fade-in-up`
- [x] Build playbook sections:
  - [x] **Localized Channel Mix**: Table/list with channel name, icon, budget %, note
  - [x] **Local Competitors**: Cards with name, local strength, SkyVoyager's angle
  - [x] **Messaging Angles**: Numbered list of localized hooks
  - [x] **Regulatory Notes**: Warning-styled list items
  - [x] **Content Brief**: Numbered list of priorities
- [x] Build "Draft localized Google Ads copy" hero action:
  - [x] Nested expand with 1.5s loading
  - [x] 3 ad variant cards: headline + description + copy button
  - [x] Copy-to-clipboard with "Copied" toast
- [x] Build "Publish to" row: Slack, Notion, HubSpot, Google Docs (reuse `PublishToRow` component)
- [x] Toast notification for publish actions (reuse existing toast pattern)

### Phase 5: Signal Analysis Tab

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Build Signal Analysis sub-tab content
- [x] AI Reasoning callout: explain PMF methodology ("SkyVoyager's PMF score combines 4 signals...")
- [x] Dimension breakdown table: all markets × 4 dimensions, sorted by overall PMF score
- [x] 2-3 non-obvious insight callout cards (per-product, pre-written in mock data)
- [x] AI Reasoning callout at bottom connecting signals to recommended launch sequence

### Phase 6: Polish + Verify

- [x] Build passes (`npm run build`)
- [x] All 6 products show geo growth data (no empty states)
- [x] Market cards expand with loading animation
- [x] Nested ad copy hero action works inside expanded playbook
- [x] "Publish to" toast works
- [x] Sub-tab switching preserves/resets state correctly
- [x] Sidebar navigation includes Geo Growth with Globe icon
- [x] Mobile bottom tab bar doesn't overflow (shortened "Geo" label)
- [x] Staggered animations work on tier list cards
- [x] Existing sections still work (no regressions)

## References

- Brainstorm: `docs/brainstorms/2026-02-16-geo-growth-pmf-section-brainstorm.md`
- Sections array pattern: `src/pages/MarketingPlanner.tsx:289-299`
- Hero action expand pattern: `src/pages/MarketingPlanner.tsx:1704-1865` (Launch Playbook)
- Sub-tab pattern: `src/pages/MarketingPlanner.tsx:931-949` (Budget Intelligence)
- `PublishToRow` component: `src/pages/MarketingPlanner.tsx:1686-1702`
- `formatSlackText` utility: `src/pages/MarketingPlanner.tsx:1551-1559`
- Channel icons map: `src/pages/MarketingPlanner.tsx:65-84`
- Globe icon: already imported at `src/pages/MarketingPlanner.tsx:33`
- StrictMode timer safety: `docs/solutions/runtime-errors/react-strictmode-double-fire-closure-corruption.md`
- Credible AI demo pattern: `docs/solutions/patterns/credible-ai-demo-with-execution-output.md`
- Backpack design tokens: `src/index.css:4-68`
