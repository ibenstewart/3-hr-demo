---
title: "feat: Add Copy Studio, Content Calendar, and Launch Playbook to Marketing Planner"
type: feat
status: active
date: 2026-02-16
---

# feat: Add Copy Studio, Content Calendar, and Launch Playbook to Marketing Planner

## Overview

Extend the Marketing Planner demo with 3 new tabs that show AI doing **execution prep** (the tedious 80% of marketing work) rather than just strategy. The goal: make skeptical marketing team members say "I need this in my workflow" instead of "AI is going to replace me."

**Current state:** 5 tabs (Overview, Channels, 90-Day Plan, Top Tactics, Budget) showing pre-built mock strategy data for 6 products.

**Target state:** 8 tabs. The original 5 for strategy + 3 new "execution" tabs:
1. **Copy Studio** — AI-generated ad copy, email subjects, social posts per channel
2. **Content Calendar** — 12-week content plan with topic clusters and buyer stage mapping
3. **Launch Playbook** — Phased launch plan using the ORB framework (Owned/Rented/Borrowed)

Each tab shows pre-built mock data by default, with an optional "Generate with AI" button for live Claude API generation.

## Problem Statement / Motivation

The marketing team at Skyscanner/SkyVoyager is skeptical about AI changing their jobs. The current Marketing Planner shows AI doing **strategy** (what to do) — which is the high-value work marketers want to keep. What's missing is AI doing **execution scaffolding** — the copy variants, content calendars, and launch checklists that consume most of their week.

Research from 4 marketing skill frameworks (Copywriting, Content Strategy, Launch Strategy, Competitor Alternatives) confirms:
- Marketers spend ~2hrs/day writing copy variants across channels
- Content calendar planning sessions take half a day
- Launch playbook creation is high-stress, admin-heavy work

Showing AI handling these tasks positions it as "the clever colleague who does your first drafts" rather than a replacement.

## Proposed Solution

### Architecture

Extend the existing Marketing Planner page (`src/pages/MarketingPlanner.tsx`) following its established patterns:

- Add 3 entries to the `sections` array (line 207)
- Add 3 new section components inline (matching existing pattern)
- Extend `MarketingPlan` interface with 3 new data fields
- Add mock data to all 6 product entries
- Add a single new API endpoint `/api/marketing-generate` for live AI generation
- Add Vite dev proxy handler for local development

### Tab Ordering and Grouping

```
Strategy (existing)          Execution (new)
─────────────────           ──────────────────
Overview                     Copy Studio
Channels                     Content Calendar
90-Day Plan                  Launch Playbook
Top Tactics
Budget
```

Add a visual separator (subtle divider line or label) between the strategy and execution groups in both sidebar and mobile nav. On mobile, add a right-edge gradient fade to indicate scrollable content.

## Technical Approach

### New TypeScript Interfaces

Add to `src/data/marketing-plans.ts`:

```typescript
// --- Copy Studio ---
export interface CopyItem {
  type: 'headline' | 'description' | 'subject-line' | 'post' | 'cta'
  text: string
  variant?: string  // e.g., "Emotional", "Urgency", "Social proof"
}

export interface ChannelCopy {
  channel: 'google-ads' | 'linkedin' | 'email' | 'social' | 'landing-page'
  channelLabel: string
  icon: string
  items: CopyItem[]
}

// --- Content Calendar ---
export interface ContentPiece {
  week: number
  title: string
  format: 'blog' | 'video' | 'social' | 'email' | 'infographic'
  buyerStage: 'awareness' | 'consideration' | 'decision'
  type: 'searchable' | 'shareable' | 'both'
  pillar: string
  brief: string  // 1-2 sentence content brief
}

export interface ContentCalendarData {
  pillars: { name: string; color: string }[]
  pieces: ContentPiece[]
}

// --- Launch Playbook ---
export interface LaunchPhase {
  phase: string
  timeline: string
  channelType: 'owned' | 'rented' | 'borrowed'
  messaging: string
  actions: string[]
}

export interface ChecklistItem {
  label: string
  category: 'pre-launch' | 'launch-day' | 'post-launch'
}

export interface LaunchPlaybookData {
  phases: LaunchPhase[]
  checklist: ChecklistItem[]
  pressAngles: string[]
}
```

Extend `MarketingPlan`:

```typescript
export interface MarketingPlan {
  // ... existing fields ...
  copyStudio: ChannelCopy[]
  contentCalendar: ContentCalendarData
  launchPlaybook: LaunchPlaybookData
}
```

### Mock Data Structure

Write mock data for all 6 products. Each product gets:
- **Copy Studio**: 5 channels x 3-4 copy items each = ~20 items per product
- **Content Calendar**: 12 weeks x 2-3 pieces = ~30 items per product, across 3-4 content pillars
- **Launch Playbook**: 5 phases + 10-12 checklist items + 3 press angles per product

**Build order**: Write `trip-planner` mock data first, validate rendering, then populate the remaining 5 products.

### Component Design

#### CopyStudioSection

```
┌──────────────────────────────────────────────┐
│ Copy Studio                                   │
│ AI-generated copy across 5 channels           │
│                                               │
│ [Google Ads] [LinkedIn] [Email] [Social] [...] │  ← Channel tabs (chip-style)
│                                               │
│ ┌─────────────────────────────────────────┐  │
│ │ Headline                          [📋]  │  │  ← Copy item with clipboard button
│ │ "Stop planning. Start exploring."       │  │
│ │ Variant: Emotional                      │  │
│ ├─────────────────────────────────────────┤  │
│ │ Headline                          [📋]  │  │
│ │ "7 days in Japan. Zero tabs open."      │  │
│ │ Variant: Specificity                    │  │
│ └─────────────────────────────────────────┘  │
│                                               │
│ [✨ Generate with AI]                         │
│                                               │
│ ┌─ AI Reasoning ────────────────────────────┐ │
│ │ Copy emphasises specificity over vague    │ │
│ │ benefits. Travel copy converts when it... │ │
│ └───────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

- Default channel: first in list (Google Ads)
- Clipboard feedback: button icon changes to checkmark for 2 seconds
- AI reasoning callout at bottom (matches existing pattern)

#### ContentCalendarSection

```
┌──────────────────────────────────────────────┐
│ Content Calendar                              │
│ 12 weeks of content mapped to pillars         │
│                                               │
│ Pillars: [● SEO & Content] [● Social] [● PR] │  ← Legend with pillar colors
│                                               │
│ ─── Week 1-2: Foundation ───────────────────  │
│ ┌─────────────────────────────────────────┐  │
│ │ 📝 "10 Days in Japan: Complete Guide"   │  │
│ │ Blog · Awareness · Searchable           │  │
│ │ Pillar: SEO & Content                   │  │
│ │ Brief: Target "X days in Japan" keyword │  │
│ └─────────────────────────────────────────┘  │
│ ┌─────────────────────────────────────────┐  │
│ │ 🎬 "I Let AI Plan My Trip" Series      │  │
│ │ Video · Awareness · Shareable           │  │
│ └─────────────────────────────────────────┘  │
│                                               │
│ ─── Week 3-4: Expansion ───────────────────  │
│ ...                                           │
│                                               │
│ [✨ Generate with AI]                         │
└──────────────────────────────────────────────┘
```

- Display format: list grouped by week ranges (1-2, 3-4, 5-6, 7-8, 9-10, 11-12)
- Content pieces shown as cards with format icon, buyer stage badge, searchable/shareable tag
- Pillar color dot on each card

#### LaunchPlaybookSection

```
┌──────────────────────────────────────────────┐
│ Launch Playbook                               │
│ 5-phase launch using the ORB framework        │
│                                               │
│ ORB: [🟢 Owned] [🟡 Rented] [🔵 Borrowed]   │
│                                               │
│ ① Internal Launch · Weeks 1-2 · Owned        │
│ ┌─────────────────────────────────────────┐  │
│ │ Messaging: "AI that plans like a local" │  │
│ │ · Recruit 50 internal testers           │  │
│ │ · Collect feedback via Slack channel     │  │
│ │ · Fix top 3 usability issues            │  │
│ └─────────────────────────────────────────┘  │
│                                               │
│ ② Alpha Launch · Weeks 3-4 · Owned          │
│ ...                                           │
│                                               │
│ ─── Launch Day Checklist ─────────────────── │
│ Pre-launch:                                   │
│ □ Landing page live with clear CTA            │
│ □ Email capture / waitlist active             │
│ Launch day:                                   │
│ □ Announcement email to list                  │
│ □ Blog post published                         │
│ ...                                           │
│                                               │
│ [✨ Generate with AI]                         │
└──────────────────────────────────────────────┘
```

- Phases displayed as numbered cards with ORB channel type badge
- Checklist is static (read-only) — this is a demo, not an interactive tool
- Press angles shown as a separate callout box

### State Management for AI Generation

Add to parent component state:

```typescript
// Per-tab AI generation state
interface AiContent {
  copyStudio: ChannelCopy[] | null
  contentCalendar: ContentCalendarData | null
  launchPlaybook: LaunchPlaybookData | null
}

const [aiContent, setAiContent] = useState<AiContent>({
  copyStudio: null,
  contentCalendar: null,
  launchPlaybook: null,
})
const [aiLoading, setAiLoading] = useState<string | null>(null)  // 'copy' | 'calendar' | 'launch' | null
const [aiError, setAiError] = useState<string | null>(null)
```

**Rules:**
- AI content persists across tab switches within the same product
- AI content is cleared when switching products (in `handleSelectProduct`)
- Each tab renders `aiContent[type] ?? plan[type]` (AI if available, mock otherwise)
- "Generate with AI" button changes to "Regenerate" when AI content exists
- Error state shows inline with "Use demo data instead" button that clears the error

### API Endpoint

**Single endpoint:** `POST /api/marketing-generate`

**Request:**
```json
{
  "type": "copy" | "calendar" | "launch",
  "productName": "AI Trip Planner",
  "productContext": {
    "tagline": "Replace 10 browser tabs with one conversation",
    "targetAudience": "Millennial & Gen-Z leisure travellers...",
    "positioning": "The first trip planner that actually plans your trip..."
  }
}
```

**Response:** Streaming text (same pattern as `/api/plan-trip`). The frontend accumulates chunks, strips markdown fences, parses JSON.

**System prompts** (one per type):
- **Copy**: "You are a travel marketing copywriter. Given a product, generate ad copy for 5 channels. Return JSON matching this schema: ..."
- **Calendar**: "You are a content strategist. Given a product, generate a 12-week content calendar. Return JSON matching this schema: ..."
- **Launch**: "You are a product launch strategist. Given a product, generate a 5-phase launch playbook using the ORB framework. Return JSON matching this schema: ..."

Each prompt includes the exact TypeScript interface as the schema definition and ends with "Return ONLY valid JSON. No markdown, no backticks, no explanation."

**Vite dev proxy**: Add `/api/marketing-generate` handler in `vite.config.ts` alongside the existing `/api/plan-trip` handler. Same pattern: read body, call Anthropic SDK (non-streaming for dev), strip markdown fences, return JSON.

**Vercel Edge Function**: Create `api/marketing-generate.ts` with streaming response (same pattern as `api/plan-trip.ts`).

### Mobile Navigation Fix

Before adding 3 new tabs, fix the 8-tab mobile overflow:

```typescript
// Add gradient fade indicator for scrollable tabs
<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-line z-40">
  <div className="relative">
    {/* Fade indicator on right edge */}
    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
    <div className="overflow-x-auto px-4 py-2 flex gap-1">
      {sections.map(section => (...))}
    </div>
  </div>
</div>
```

Also: programmatically scroll the active tab into view when `activeSection` changes.

## Implementation Phases

### Phase 1: Data Layer + Mock Data (Copy Studio only)

**Files:**
- `src/data/marketing-plans.ts` — Add interfaces, add `copyStudio` field to `MarketingPlan`, write mock data for `trip-planner` product only

**Acceptance:**
- [ ] TypeScript interfaces compile
- [ ] Mock data validates against interfaces
- [ ] Existing functionality unchanged

### Phase 2: Copy Studio Tab (Mock Data)

**Files:**
- `src/pages/MarketingPlanner.tsx` — Add section to `sections[]`, add `CopyStudioSection` component, add conditional render

**Acceptance:**
- [ ] Tab appears in sidebar and mobile nav
- [ ] Channel selector filters copy items
- [ ] Copy-to-clipboard works with feedback
- [ ] AI reasoning callout matches existing style
- [ ] Mobile nav scrolls correctly with 6 tabs

### Phase 3: Content Calendar Tab (Mock Data)

**Files:**
- `src/data/marketing-plans.ts` — Add `contentCalendar` mock data for `trip-planner`
- `src/pages/MarketingPlanner.tsx` — Add `ContentCalendarSection` component

**Acceptance:**
- [ ] Week-grouped display renders correctly
- [ ] Format icons, buyer stage badges, pillar colors all visible
- [ ] Searchable/Shareable tags display correctly

### Phase 4: Launch Playbook Tab (Mock Data)

**Files:**
- `src/data/marketing-plans.ts` — Add `launchPlaybook` mock data for `trip-planner`
- `src/pages/MarketingPlanner.tsx` — Add `LaunchPlaybookSection` component

**Acceptance:**
- [ ] 5 phases with ORB badges render
- [ ] Checklist displays (read-only)
- [ ] Press angles callout renders

### Phase 5: Populate Mock Data for Remaining 5 Products

**Files:**
- `src/data/marketing-plans.ts` — Add mock data for companion, ancillaries, prices, experiences, business-travel

**Acceptance:**
- [ ] All 6 products show content on all 3 new tabs
- [ ] No TypeScript errors
- [ ] Build passes (`npm run build`)

### Phase 6: Mobile Navigation Fix

**Files:**
- `src/pages/MarketingPlanner.tsx` — Update mobile bottom bar with gradient fade and scroll-into-view

**Acceptance:**
- [ ] Gradient fade visible on right edge when tabs overflow
- [ ] Active tab scrolls into view on tab change
- [ ] 8 tabs usable on mobile viewport

### Phase 7: "Generate with AI" Integration

**Files:**
- `api/marketing-generate.ts` — New Vercel Edge Function
- `vite.config.ts` — Add dev proxy for `/api/marketing-generate`
- `src/pages/MarketingPlanner.tsx` — Add AI state, loading UI, fetch logic, error handling

**Acceptance:**
- [ ] "Generate with AI" button visible on each new tab
- [ ] Inline loading animation (not full-screen)
- [ ] AI-generated content replaces mock data
- [ ] Content persists across tab switches
- [ ] Content clears on product switch
- [ ] Error shows with "Use demo data instead" fallback
- [ ] "Regenerate" button appears after successful generation
- [ ] Works locally via Vite dev proxy
- [ ] Works on Vercel via Edge Function

### Phase 8: Visual Polish

- [ ] Tab separator between strategy and execution groups
- [ ] Stagger animations on new tab content
- [ ] "AI-generated" badge when viewing live content
- [ ] Generating step messages per tab type

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| All sections in one file | Yes | Matches existing pattern (604 lines). Extract to `components/marketing/` only if it exceeds ~1000 lines |
| Single API endpoint | Yes | One endpoint with `type` param rather than 3 separate endpoints. Reduces API surface and proxy config |
| Streaming response | Yes | Matches existing pattern, avoids Vercel 25s Edge Function timeout |
| Mock data first, AI optional | Yes | Demo must work without API key. AI is an enhancement, not a requirement |
| Read-only checklist | Yes | Interactive checkboxes add state complexity for zero demo value |
| Week ranges not individual weeks | Yes | 6 groups (1-2, 3-4, ...) is scannable. 12 individual weeks is overwhelming |

## Dependencies & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| File gets too long (>1000 lines) | Medium | Low | Extract section components to separate files if needed |
| AI response doesn't match interface | Medium | Medium | Strict JSON schema in prompt + validation + markdown fence stripping |
| Mobile nav UX with 8 tabs | High | Medium | Gradient fade + scroll-into-view (Phase 6) |
| Slow AI generation for calendar (lots of data) | Medium | Low | Streaming + skeleton loader. Mock data as instant fallback |
| Corporate proxy intercepts new endpoint | Low | High | Already solved: explicit `baseURL` + `defaultHeaders: {}` in Anthropic client |

## Gotchas from docs/solutions/

1. **Corporate proxy** — Always set `baseURL: 'https://api.anthropic.com'` and `defaultHeaders: {}` on Anthropic client
2. **Markdown fences** — Always strip ` ```json ` wrappers before `JSON.parse()`
3. **Vite env loading** — `loadEnv(mode, cwd, '')` already configured in `vite.config.ts`
4. **StrictMode timers** — If adding loading animations, use `useState` for step tracking, never mutable `let` variables in `useEffect`
5. **Unused imports** — `noUnusedLocals: true` will fail the build. Clean up imports after each phase
6. **Type imports** — Always `import type { Foo }` for type-only imports

## Success Metrics

For the demo audience (internal marketing team):
- Marketing team members say "I want to try this" after seeing Copy Studio
- Demo flows smoothly through all 8 tabs without loading delays (mock data)
- "Generate with AI" produces visibly different, high-quality content each time
- The narrative lands: "AI handles the scaffolding, you handle the creative judgment"

## References

### Internal
- `src/pages/MarketingPlanner.tsx` — Existing page (604 lines, all patterns to follow)
- `src/data/marketing-plans.ts` — Existing data layer (6 products, interfaces)
- `src/pages/TripPlanner.tsx` — Live AI integration pattern (streaming, error handling)
- `api/plan-trip.ts` — Vercel Edge Function pattern (streaming)
- `vite.config.ts` — Dev proxy pattern
- `docs/solutions/integration-issues/anthropic-api-proxy-vite-vercel-integration.md` — API integration gotchas
- `docs/solutions/runtime-errors/react-strictmode-double-fire-closure-corruption.md` — Timer safety

### External Frameworks Used
- **Copywriting**: Headline formulas ("Never {pain} again", "The {category} for {audience}"), channel-specific patterns, CTA frameworks
- **Content Strategy**: Searchable vs Shareable content, Hub & Spoke model, Buyer Stage keyword mapping, Content pillar scoring
- **Launch Strategy**: ORB Framework (Owned/Rented/Borrowed), 5-phase launch approach, Product Hunt strategy, post-launch marketing
- **Competitor Alternatives**: Positioning frameworks for vs/alternative pages (deferred to v2)
