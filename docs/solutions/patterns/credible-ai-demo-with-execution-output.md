---
title: "Credible AI Demo: From Generic Strategy Output to Execution Engine"
date: 2026-02-16
category: patterns
tags:
  - ai-demo-design
  - stakeholder-credibility
  - hero-actions
  - simulated-streaming
  - competitive-intelligence
  - marketing-planner
  - draft-and-publish-pattern
severity: medium
component: MarketingPlanner
problem_type: architecture-pattern
status: solved
related:
  - docs/solutions/patterns/multi-state-demo-page-architecture.md
  - docs/solutions/runtime-errors/react-strictmode-double-fire-closure-corruption.md
  - docs/solutions/ui-bugs/backpack-design-system-compliance-integration.md
  - docs/solutions/integration-issues/streaming-ai-api-vite-vercel.md
---

# Credible AI Demo: From Generic Strategy Output to Execution Engine

## Problem

Marketing team reviewed the Marketing Planner demo and dismissed it as "a nicer ChatGPT output." Four specific objections:

1. **"We already do this"** — channel selection and timeline planning aren't novel
2. **"You don't have our context"** — no competitive intelligence, generic recommendations
3. **"AI will replace us"** — tool suggests strategy but doesn't do any actual work
4. **"Where's the ROI?"** — no performance metrics or budget justification

The demo generated strategy text that any marketer could write themselves. It needed to show AI as an **executor** (doing tedious work they hate) and add **analytical depth** that proves the tool understands their domain.

## Root Cause

The interface showed text-based strategic recommendations but zero execution evidence. Users needed to see:
- AI drafting actual deliverables (Slack messages, emails, landing pages, creator shortlists)
- Competitive intelligence with real competitor names and strategic gaps
- ROI, CPA, and incrementality metrics backing channel recommendations
- "Publish to" integration flow showing workflow fit

Without these, the product felt like a generic consulting report, not a tool that does work.

## Solution

Five features transformed the demo from "strategy generator" to "execution engine":

| Feature | Objection Addressed | Key Pattern |
|---------|-------------------|-------------|
| Competitor Analysis | "You don't have our context" | Real names (Booking.com, Expedia) with gaps |
| Channel ROI Metrics | "Where's the ROI?" | ROI/CPA/incrementality per channel |
| Budget Intelligence Sub-tabs | "Where's the ROI?" | Allocation + ROI + Incrementality views |
| Expanded Channels (4 to 6) | "We already do this" | Added PR & Press + product-specific channels |
| Hero Launch Playbook Actions | "AI will replace us" | AI drafts content with "Publish to" integration |

### Pattern 1: PlaybookAction Union Type for Backward Compatibility

The launch playbook previously used `string[]` for actions. New hero actions needed rich data (Slack messages, creator profiles). A union type allows both:

```typescript
export interface PlaybookAction {
  text: string
  hero?: HeroOutput
  creators?: CreatorProfile[]
  slackMessage?: { channel: string; body: string }
  emailDraft?: { to: string; subject: string; body: string }
}

export interface LaunchPhase {
  actions: (string | PlaybookAction)[]  // Union — string OR rich object
}
```

Real data mixes both:
```typescript
actions: [
  'Recruit 100 internal testers',                              // Plain string
  {
    text: 'Send launch announcement to #product Slack channel',
    hero: { type: 'slack-message', label: 'View draft message' },
    slackMessage: { channel: '#product-launches', body: '...' }
  },
  'Fix top 5 usability issues from internal testing'           // Plain string
]
```

Rendering distinguishes with `typeof action === 'string'` — TypeScript narrows the union automatically.

### Pattern 2: Simulated AI Drafting with Loading Delay

Hero actions show a "Drafting..." spinner for 1.5s before revealing content. This creates the perception of AI "doing work" without real API calls — more reliable for demos.

```typescript
const [expandedHeroes, setExpandedHeroes] = useState<Set<string>>(new Set())
const [loadingHeroes, setLoadingHeroes] = useState<Set<string>>(new Set())

const toggleHero = (key: string) => {
  if (expandedHeroes.has(key)) {
    setExpandedHeroes(prev => { const next = new Set(prev); next.delete(key); return next })
  } else {
    setLoadingHeroes(prev => new Set(prev).add(key))
    setTimeout(() => {
      setLoadingHeroes(prev => { const next = new Set(prev); next.delete(key); return next })
      setExpandedHeroes(prev => new Set(prev).add(key))
    }, 1500)
  }
}
```

**Why `setTimeout` in event handler is safe:** React StrictMode only double-fires effects, not event handlers. The `setTimeout` runs once per click, so no StrictMode timer corruption (see related doc on StrictMode timers).

### Pattern 3: Authentic Third-Party UI Previews

Slack messages use Slack's actual dark theme (`#1a1d21`) — not Backpack tokens. Users instantly recognize "real Slack copy I'd send today" vs. a mockup.

```typescript
function formatSlackText(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(1, -1)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}
```

Four hero output types, each with authentic styling:
- **Slack message**: Dark `#1a1d21` background, bot avatar, APP badge, `*bold*` parsing
- **Email draft**: Light chrome with To/Subject fields, professional body text
- **Landing page**: Reuses existing `LandingPagePreview` component (browser chrome frame)
- **Creator list**: Table with staggered row animations, relevance progress bars

Precedent: `BizApprovalFlow` component (`src/components/business-travel/BizApprovalFlow.tsx:108-192`) established the Slack-style dark UI pattern.

### Pattern 4: "Publish to" Integration Row with Toast

Each hero output shows integration targets (Slack, Notion, HubSpot, Google Docs). Clicking triggers a success toast that auto-dismisses:

```typescript
const handlePublish = (service: string) => {
  setToast(`Published to ${service}`)
  setTimeout(() => setToast(null), 3000)
}
```

This signals workflow integration — the AI doesn't just draft, it publishes. Context-aware: Slack message heroes exclude "Publish to Slack" (redundant).

### Pattern 5: Budget Intelligence Sub-tabs

Three related metrics (allocation, ROI, incrementality) live within one section using internal tab state, avoiding sidebar clutter:

```typescript
const [budgetTab, setBudgetTab] = useState<'allocation' | 'roi' | 'incrementality'>('allocation')
```

Each tab renders its own table/chart with `animate-fade-in` transitions. The ROI tab sorts channels by ROI multiplier and shows efficiency badges (green/yellow/red). The Incrementality tab shows reallocation opportunities with AI insight callouts.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Simulated streaming vs real API | Simulated (1.5s delay) | Demo reliability > authenticity. Existing AI button proves real API works. |
| Union type vs all-objects | `(string \| PlaybookAction)[]` | Backward compatible — old string actions still render as bullets |
| Sub-tabs vs separate sections | Internal tabs within Budget Intelligence | 3 money-related views = 1 section. Keeps sidebar at 9 items. |
| Competitor names | Real (Booking.com, Google Travel, Kayak) | Internal demo for stakeholders — real names are more impactful |
| Third-party UI styling | Authentic (Slack dark, email chrome) | Users spot inauthenticity. Don't Backpack-ify Slack previews. |

## Stakeholder Demo Checklist

Before showing an AI demo to skeptical domain experts:

- [ ] Does it show AI doing tedious work they hate? (drafting, researching, calculating)
- [ ] Does it include their domain context? (real competitor names, realistic metrics)
- [ ] Can they "publish" outputs to their real tools? (Slack, email, Notion)
- [ ] Is the data realistic enough to survive scrutiny? (ROI ranges, not "up to 10x")
- [ ] Are ROI/efficiency metrics backing every recommendation?
- [ ] Is the demo reliable? (simulated data, no external API failures)
- [ ] Are third-party UI previews authentic? (Slack looks like Slack, not your design system)

## Anti-Patterns

| Anti-pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Generic strategy text | Reads like ChatGPT | Draft the actual Slack message, show the landing page |
| Missing competitive intelligence | No domain credibility | Display real competitor names with strengths and gaps |
| No ROI metrics | "Trust me" doesn't convince | Surface ROI, CPA, incrementality per channel |
| AI that only suggests | Feels like a brainstorm tool | Add "Publish to" flow — make the next step obvious |
| Live API calls in demos | Network failures kill credibility | Simulated streaming + delays feels the same, more reliable |

## Prevention

When building similar AI demo features:

1. **Union types** for evolving data models — add rich objects alongside existing simple types
2. **`setTimeout` in event handlers** (not effects) for simulated loading — safe with React StrictMode
3. **Reuse existing components** in new contexts (LandingPagePreview in both Copy Studio and Launch Playbook)
4. **Authentic third-party styling** — Slack dark theme, email chrome, browser frames
5. **Auto-dismiss toasts** — feedback without blocking workflow
6. **`aiData ?? mockData` overlay** — demo always works, AI enhances when available

## Files

| File | What Changed |
|------|-------------|
| `src/data/marketing-plans.ts` | `PlaybookAction`, `HeroOutput`, `CreatorProfile` interfaces; union type on `LaunchPhase.actions`; 6 channels per product with ROI data; 3 competitors per product; 2-3 hero actions per product |
| `src/pages/MarketingPlanner.tsx` | `SlackMessagePreview`, `EmailDraftPreview`, `CreatorListPreview`, `PublishToRow`, `formatSlackText` components; `CompetitorSection`; `BudgetIntelligenceSection` with 3 sub-tabs; updated `LaunchPlaybookSection` with expandable hero actions and toast |

## Cross-References

- [Multi-State Demo Page Architecture](./multi-state-demo-page-architecture.md) — state machine pattern, third-party UI styling exception
- [React StrictMode Timer Crash](../runtime-errors/react-strictmode-double-fire-closure-corruption.md) — why `useState` for step tracking, never `let` in effects
- [Backpack Design System Compliance](../ui-bugs/backpack-design-system-compliance-integration.md) — CSS animations, stagger delays, token mapping
- [Streaming AI API Integration](../integration-issues/streaming-ai-api-vite-vercel.md) — `aiData ?? mockData` overlay, AiGenerateBar states
- [Marketing Planner Credibility Plan](../../plans/2026-02-16-feat-marketing-planner-credibility-execution-plan.md) — implementation plan for all 5 features
- [Copy Studio Landing Page Preview Plan](../../plans/2026-02-16-feat-copy-studio-landing-page-preview-plan.md) — browser chrome frame pattern
