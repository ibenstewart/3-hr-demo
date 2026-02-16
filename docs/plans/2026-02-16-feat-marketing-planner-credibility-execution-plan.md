---
title: "feat: Make Marketing Planner credible and show AI doing work"
type: feat
status: active
date: 2026-02-16
---

# feat: Make Marketing Planner Credible and Show AI Doing Work

## Overview

Marketing team feedback: "we already do this" and "AI doesn't have our context." The current demo generates strategy docs — but marketing teams already think they're good strategists. What kills that objection is showing AI as an **executor** (doing tedious work they hate) and adding **analytical depth** that proves the tool is smarter than a generic strategy generator.

Five enhancements, ordered by demo impact:

1. **Deeper Launch Playbook** — AI does work, not just suggests it (hero feature)
2. **More Channels + PR** — expand from 4 to 6 per product
3. **ROI / Spend Elasticity** — show marginal efficiency per channel
4. **Marketing Incrementality** — allocate budget by incrementality
5. **Competitor Analysis** — new section showing competitive positioning

## Problem Statement

The Marketing Planner demo currently looks like "a nicer ChatGPT output" — strategy text that any marketer could write themselves. The feedback is specific:

- **"We already do this"** — channel selection and timeline planning aren't novel
- **"You don't have our context"** — generic strategy without competitive intelligence
- **"AI will replace us"** — the tool suggests, but doesn't do any actual work
- **"Where's the ROI?"** — no performance metrics or budget justification

## Proposed Solution

### Navigation Structure (after changes)

```
Strategy (6 sections)
├── Overview           (existing)
├── Competitors        (NEW — Feature 5)
├── Channels           (enhanced — 6 channels + ROI badges)
├── 90-Day Plan        (existing)
├── Top Tactics        (existing)
└── Budget Intelligence (enhanced — 3 sub-views)
    ├── Allocation     (existing percentage bars)
    ├── ROI & Efficiency (NEW — Feature 3)
    └── Incrementality  (NEW — Feature 4)

Execution (3 sections)
├── Copy Studio        (existing + landing page preview)
├── Content Calendar   (existing)
└── Launch Playbook    (ENHANCED — hero actions with AI execution)
```

**Key decision**: ROI and Incrementality are sub-views within Budget (renamed "Budget Intelligence"), not separate sidebar items. This keeps the sidebar at 9 items (currently 8) instead of 11.

### Feature 5: Deeper Launch Playbook (Hero Feature)

**The "wow moment"**: When a marketer clicks into a launch phase action, the AI doesn't just suggest "create a landing page" — it shows the landing page being drafted in real-time, offers to publish it, and suggests the next action.

**Interaction pattern**: Simulated streaming over rich mock data (NOT real API calls). This is a demo — reliability matters more than authenticity. The existing "Generate with AI" button already proves the real API concept.

3-4 "hero actions" per product that expand to show AI output:

| Hero Action | Output | UI Pattern |
|-------------|--------|------------|
| "Draft landing page" | Reuse `LandingPagePreview` component | Inline expand with fade-in |
| "Identify creators to target" | Table of 10 mock creator profiles | Streaming table rows |
| "Draft launch Slack message" | Slack-styled message block | Typewriter animation |
| "Send beta invite to team" | Email preview with subject + body | Typewriter animation |

Each hero action has a "Publish to" row showing integration icons (Slack, Notion, HubSpot, Google Docs) with a mock "Published" toast confirmation.

**Non-hero actions** remain as text bullets (current behavior).

### Data Model Changes

```typescript
// --- Enhanced Channel (Features 2, 3, 4) ---
export interface Channel {
  name: string
  icon: string
  fit: 'high' | 'medium'
  reason: string
  // NEW fields:
  roi: number              // expected ROI multiplier, e.g. 4.2
  cpa: string              // cost per acquisition, e.g. "$12"
  incrementality: number   // % of conversions that are incremental, 0-100
  efficiency: 'efficient' | 'diminishing' | 'saturated'
}

// --- Competitor Analysis (Feature 1) ---
export interface Competitor {
  name: string                    // "Booking.com", "Google Travel"
  positioning: string             // one-line positioning statement
  primaryChannels: string[]       // ["Paid Search", "TV", "Retargeting"]
  strength: string                // key competitive advantage
  gap: string                     // vulnerability to exploit
}

// --- Enhanced Launch Playbook Action (Feature 5) ---
export interface PlaybookAction {
  text: string                    // the action description
  heroType?: 'landing-page' | 'creator-list' | 'slack-message' | 'email-draft'
  heroContent?: {
    // For landing-page: reuses LandingPagePreview props (headline, cta, etc.)
    // For creator-list: array of creator profiles
    // For slack/email: { channel/recipient, subject?, body }
    [key: string]: unknown
  }
}

// --- Updated MarketingPlan ---
export interface MarketingPlan {
  // ... existing fields ...
  competitors: Competitor[]       // NEW: 3-4 competitors per product
  // channels already extended with roi/cpa/incrementality/efficiency
  // launchPlaybook phases now use PlaybookAction[] instead of string[]
}
```

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Launch Playbook hero actions | Simulated streaming, not real API | Demo reliability > authenticity. Existing AI button already proves the concept. |
| ROI + Incrementality location | Sub-views within Budget section | Avoids sidebar clutter. Three sections about money = one section with tabs. |
| Channel count | 6 per product (was 4) | 8 is too many cards to scroll through in a demo. 6 tells the story. |
| Competitor names | Real names (Booking.com, Expedia, etc.) | Internal demo for stakeholders, not public. Real names are more impactful. |
| Hero action count | 3-4 per product, remaining stay as text | 5 phases x 4 actions = 20 possible drill-downs is data explosion. 3-4 hero moments is tight. |
| New section navigation | Competitors between Overview and Channels | Natural flow: "here's the landscape" before "here's our channel strategy" |
| Budget section rename | "Budget Intelligence" | Signals analytical depth, not just allocation |
| Full mock data for all 6 products | Yes | Presenter might click any product. Inconsistency breaks the illusion. |

## Implementation

### Phase 1: Data Model + Channel Expansion (Features 2, 3, 4)

**File:** `src/data/marketing-plans.ts`

- [ ] Extend `Channel` interface with `roi`, `cpa`, `incrementality`, `efficiency` fields
- [ ] Add 2 new channels per product (PR & Press + one product-specific channel), totaling 6 per product
- [ ] Add ROI/CPA/incrementality/efficiency mock values for ALL channels (existing + new) across all 6 products
- [ ] Add `Competitor` interface
- [ ] Add `competitors` field to `MarketingPlan` interface
- [ ] Add 3-4 competitors per product with real names (Booking.com, Expedia, Google Travel, Hopper, Kayak, TripAdvisor — pick relevant ones per product)

**File:** `src/pages/MarketingPlanner.tsx`

- [ ] Update `ChannelsSection` to show 6 channels — compact layout for channels with `fit: 'medium'`
- [ ] Add ROI badge and incrementality indicator to each channel card
- [ ] Add `efficiency` status indicator (green/yellow/red dot)

### Phase 2: Budget Intelligence Sub-Views (Features 3, 4)

**File:** `src/pages/MarketingPlanner.tsx`

- [ ] Rename BudgetSection to BudgetIntelligenceSection
- [ ] Add internal tab state: `'allocation' | 'roi' | 'incrementality'`
- [ ] **Allocation tab**: existing percentage bars (no change)
- [ ] **ROI & Efficiency tab**: Table with Channel | Budget % | ROI | CPA | Efficiency status
- [ ] Add a small bar chart or visual showing ROI by channel (colored bars using product colors)
- [ ] **Incrementality tab**: Table with Channel | Total Conversions | Incremental % | Incremental Conversions
- [ ] Add AI Insight callout: "Reallocating 10% from [low-incrementality] to [high-incrementality] would generate X more incremental conversions"
- [ ] Update sidebar label from "Budget" to "Budget Intelligence"
- [ ] Update sidebar icon (keep PieChart or switch to TrendingUp)

### Phase 3: Competitor Analysis (Feature 1)

**File:** `src/pages/MarketingPlanner.tsx`

- [ ] Add `competitors` entry to `sections` array (between `overview` and `channels`, group: `'strategy'`)
- [ ] Add icon import for competitor section (e.g., `Swords` or `Users` — pick from Lucide)
- [ ] Build `CompetitorSection` component:
  - [ ] Comparison table: Your Product vs. top 2 competitors
  - [ ] Rows: Positioning, Primary Channels, Key Strength, Vulnerability
  - [ ] "Opportunity" callout per competitor: "They're ignoring [channel]. Your edge."
  - [ ] AI Reasoning callout connecting competitor gaps to recommended channels/tactics
- [ ] Add conditional render in PlanView content area

### Phase 4: Deeper Launch Playbook (Feature 5 — Hero Feature)

**File:** `src/data/marketing-plans.ts`

- [x] Create `PlaybookAction` interface with `text`, optional `heroType`, optional `heroContent`
- [x] Update `LaunchPhase.actions` from `string[]` to `PlaybookAction[]`
- [x] For each product, pick 3-4 actions across phases to be "hero" actions with rich content:
  - [x] At least 1 "landing-page" hero (reuses LP preview data)
  - [x] At least 1 "creator-list" hero (10 mock creator profiles with name, handle, followers, niche, relevance score)
  - [x] At least 1 "slack-message" or "email-draft" hero (channel/recipient, body text)
- [x] Convert remaining actions to `{ text: '...' }` format (no heroType)

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Update `LaunchPlaybookSection` to handle new `PlaybookAction` type
- [x] Hero actions render as expandable cards with a "View AI Output" button
- [x] Build inline output renderers per heroType:
  - [x] `landing-page`: Reuse existing `LandingPagePreview` component
  - [x] `creator-list`: Streaming table (rows appear one by one with delay)
  - [x] `slack-message`: Slack-styled block (gray bg, channel name, formatted text, avatar)
  - [x] `email-draft`: Email preview (To/Subject/Body with corporate email chrome)
- [x] Add "Publish to" integration row below each hero output:
  - [x] Row of icons: Slack, Notion, HubSpot, Google Docs (use Lucide icons or inline SVGs)
  - [x] Click triggers a success toast: "Published to Slack #marketing"
  - [x] Toast auto-dismisses after 3 seconds
- [x] Simulated streaming: Use `useState` + loading delay for reveal animation on hero content (NOT real API calls)
- [x] Non-hero actions remain as text bullets (backward-compatible)

### Phase 5: Polish + Verify

- [x] Build passes (`npm run build`)
- [x] All 6 products show 6 channels with ROI badges
- [x] Budget Intelligence has 3 working sub-tabs
- [x] Competitor section shows real competitor names and insights
- [x] 3-4 hero actions per product expand with animated outputs
- [x] "Publish to" integration row shows mock success toast
- [ ] Sidebar navigation works with new sections (no overflow issues)
- [ ] Landing Page Preview still works in Copy Studio
- [ ] AI generation still works for execution tabs

## References

- Current `Channel` interface: `src/data/marketing-plans.ts:1-6`
- Current `BudgetItem` interface: `src/data/marketing-plans.ts:24-28`
- Current `LaunchPhase` interface: `src/data/marketing-plans.ts:67-73`
- `ChannelsSection` component: `src/pages/MarketingPlanner.tsx:562-638`
- `BudgetSection` component: `src/pages/MarketingPlanner.tsx:751-789`
- `LaunchPlaybookSection` component: `src/pages/MarketingPlanner.tsx:1226-1351`
- `LandingPagePreview` component: `src/pages/MarketingPlanner.tsx:844-960`
- `AiGenerateBar` component: `src/pages/MarketingPlanner.tsx:222-282`
- Sidebar `sections` array: `src/pages/MarketingPlanner.tsx:286-295`
- BizApprovalFlow (fake Slack UI precedent): `src/components/business-travel/BizApprovalFlow.tsx:108-192`
- Streaming AI pattern: `docs/solutions/integration-issues/streaming-ai-api-vite-vercel.md`
- Multi-state demo architecture: `docs/solutions/patterns/multi-state-demo-page-architecture.md`
- Backpack design tokens: `src/index.css:4-68`
