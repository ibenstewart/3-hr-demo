---
topic: "Geo Growth & PMF Section for Marketing Planner"
date: 2026-02-16
status: decided
participants: [ben, claude]
next: /workflows:plan
---

# Geo Growth & PMF Section for Marketing Planner

## What We're Building

A new "Geo Growth" section in the Marketing Planner's strategy sidebar that helps marketing teams decide **which geographic markets to enter first** and **how to enter each one**. Uses a 4-dimension PMF framework (Demand, Competition, SkyVoyager Position, Regulatory) to rank markets into tiers, then provides full entry playbooks for each market.

The section demonstrates how AI can do the market research, competitive analysis, and localization work that typically takes weeks of analyst time.

## Why This Approach

**The problem it solves:** Marketing teams planning geographic expansion currently do this manually — researching markets one at a time, building spreadsheets, comparing competitors per geo. An AI tool that scores markets, ranks them, and generates localized entry playbooks is immediately valuable.

**Why it belongs in Marketing Planner:** Each of the 6 products has different geo relevance. AI Trip Planner might prioritize Japan and Southeast Asia (high travel demand, weak local competitors). Business Travel Agent might prioritize UK and Germany (enterprise travel spend, regulatory clarity). The per-product lens is the differentiator.

**Skills it leverages:** This feature naturally pulls from competitor-alternatives (per-market competitor positioning), content-strategy (localized content briefs), copywriting (localized messaging angles), marketing-ideas (channel recommendations per geo), and launch-strategy (market entry phasing).

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Placement | New section in Marketing Planner sidebar | Keeps the "one planner" narrative. Each product gets geo growth data. |
| Section group | `strategy` (after Budget Intelligence) | Geo expansion is strategic analysis, not execution |
| Core story | "Prioritize then execute" | Two sub-tabs: market ranking + per-market entry playbooks |
| PMF framework | 4 dimensions | Demand, Competition, SkyVoyager Position, Regulatory/Ops readiness |
| Markets per product | 6-8 | Enough for regional diversity without excessive mock data |
| Visualization | Ranked tier list | Markets grouped into "Launch Now" / "Next Quarter" / "Watch" tiers |
| Entry playbook depth | Full playbook cards | Channel mix, competitor positioning, messaging, regulatory notes, content brief |
| UI pattern | 2 sub-tabs + expandable playbooks | Tab 1: Tier list with expandable entry playbook cards (reuses hero action pattern). Tab 2: Signal Analysis |
| Expand interaction | Reuse hero action pattern | Click "View entry playbook" → 1.5s loading → reveal full playbook card |
| Icon | Globe (already imported) | Natural fit for geographic content |

## Design Details

### Sub-tab 1: Market Prioritization

Ranked tier list with three tiers:

**Launch Now (green/eco)** — Markets with high PMF scores where SkyVoyager has an edge. 2-3 markets per product.

**Next Quarter (amber/coral)** — Promising markets that need preparation (regulatory, localization, partnerships). 2-3 markets per product.

**Watch (gray)** — Lower priority or high-risk markets. Worth monitoring but not investing yet. 1-2 markets per product.

Each market card shows:
- Country/region name and flag emoji
- Overall PMF score (0-100) as a prominent number
- 4 mini progress bars for each dimension (Demand, Competition, SkyVoyager Position, Regulatory)
- One-line insight ("Strong search demand but Booking.com dominates paid channels")
- "View entry playbook" button (Sparkles icon, sky-blue, same as hero action buttons)

Clicking "View entry playbook" → loading animation → expands to show:

### Entry Playbook Card (expandable)

Full playbook for entering that specific market:

- **Localized Channel Mix** — Which channels work in this market (e.g., LINE in Japan, VK in Russia, WhatsApp in Brazil) with recommended budget split
- **Competitor Positioning** — Top 2-3 competitors in this geo with their local strength and SkyVoyager's angle against them
- **Messaging Angles** — 2-3 localized messaging hooks adapted for cultural context
- **Regulatory Notes** — Key compliance/ops considerations (data residency, payment methods, licensing)
- **Content Brief** — Top 3 content priorities for this market (searchable topics, local partnerships, format preferences)
- **"Publish to" row** — Same pattern as Launch Playbook heroes (Slack, Notion, HubSpot, Google Docs)

### Sub-tab 2: Signal Analysis

The "why" behind the ranking. Shows:
- AI Reasoning callout explaining the prioritization methodology
- Dimension breakdown table: all markets ranked by each individual dimension
- Highlight callouts for non-obvious insights ("Japan has high demand but regulatory complexity makes it a 'Next Quarter' despite strong PMF signals")

### Data Model

```typescript
export interface GeoMarket {
  country: string
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America' | 'Middle East & Africa'
  tier: 'launch-now' | 'next-quarter' | 'watch'
  pmfScore: number  // 0-100 overall score
  dimensions: {
    demand: number        // 0-100 — search volume, travel spend, growth rate
    competition: number   // 0-100 — inverse: high = less competition = better
    position: number      // 0-100 — SkyVoyager brand awareness, existing traffic
    regulatory: number    // 0-100 — ease of entry, data laws, payment support
  }
  insight: string  // one-line summary
  playbook: GeoPlaybook
}

export interface GeoPlaybook {
  channels: { name: string; icon: string; budgetPct: number; note: string }[]
  competitors: { name: string; localStrength: string; angle: string }[]
  messaging: string[]
  regulatory: string[]
  contentBrief: string[]
}
```

Add `geoGrowth: GeoMarket[]` to the `MarketingPlan` interface.

### Product-Specific Market Selections

| Product | Likely "Launch Now" Markets | Rationale |
|---------|---------------------------|-----------|
| AI Trip Planner | UK, US, Japan, Australia | High leisure travel demand, English-friendly or strong travel culture |
| In-Trip Companion | UK, Germany, Spain | High inbound tourism, mobile-first travellers |
| Smart Ancillaries | UK, US, UAE | Large OTA ecosystems, high ancillary attach rates |
| Price Intelligence | US, UK, India | Price-sensitive markets with high search volume |
| Tours & Experiences | Spain, Italy, Thailand, Japan | Top experience destinations with fragmented supply |
| Business Travel Agent | UK, US, Germany, Singapore | Enterprise travel hubs with clear compliance frameworks |

## Resolved Questions

1. **Should the entry playbook have a hero action for "Draft localized ad copy"?** **Yes.** Each entry playbook gets a "Draft localized Google Ads copy" hero action that expands to show ad variants for that market (headline + description pairs). Reinforces the "AI does work" message and ties into the copywriting skill.

2. **Should we show a simple world map visualization?** **No.** Tier list cards and tables tell the story without a new dependency. Consistent with existing UI patterns.
