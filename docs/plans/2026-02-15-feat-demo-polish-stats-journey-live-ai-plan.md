---
title: "feat: Stats Dashboard + Golden Thread Journey + Live AI"
type: feat
status: active
date: 2026-02-15
---

# Three Polish Features: Stats, Journey, Live AI

Three features that transform seven standalone demos into a cohesive, jaw-dropping showcase of what a two-slice team can build in an afternoon.

---

## Feature 1: "Built With" Stats Dashboard

**Route:** `/stats`
**Effort:** Low (1-2 hours)
**Purpose:** Make the velocity argument concrete. People don't just see demos — they see proof.

### What It Does

A visually rich page that tells the story of the build itself. Think "making-of featurette" energy. The numbers are real and they're impressive:

| Stat | Value |
|------|-------|
| Build time | ~3 hours |
| Demos shipped | 7 products |
| Lines of code | 8,341 |
| Components | 20 (9 shared + 11 business-travel) |
| Data files | 7 (3,278 lines of mock data) |
| Pages | 8 |
| Commits | 11 |
| Contributors | 1 person + Claude Code |

### Layout

```
┌─────────────────────────────────────────────────┐
│  Hero: "The Build"                              │
│  One engineer. One afternoon. The numbers.      │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              │
│  │8,341│ │  20 │ │  7  │ │  3h │              │
│  │lines│ │comps│ │demos│ │build│              │
│  └─────┘ └─────┘ └─────┘ └─────┘              │
│                                                 │
│  ── Build Timeline ──────────────────────────── │
│  10:52 ●━━━━━━━●━━━━━━━━━━━━●━━●━━● 16:32     │
│        5 demos  Biz Travel   Polish  Marketing  │
│                                                 │
│  ── Code Breakdown (Recharts) ───────────────── │
│  [Stacked bar: Pages | Components | Data | Inf] │
│                                                 │
│  ── Tech Stack ──────────────────────────────── │
│  React 19 · TypeScript · Vite 7 · Tailwind 4   │
│  Recharts · Lucide · React Router 7             │
│                                                 │
│  ── What Each Demo Proves ───────────────────── │
│  Trip Planner → state machines, streaming UI    │
│  Business Travel → 9-state flow, 11 components  │
│  ...etc                                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Implementation

**New files:**
- `src/pages/Stats.tsx` — the page itself
- `src/data/build-stats.ts` — static data for the stats (commit timeline, code breakdown, tech stack, per-demo stats)

**Modified files:**
- `src/App.tsx` — add `/stats` route
- `src/components/Nav.tsx` — add "Stats" nav link (or a special icon link)
- `src/pages/DemoHub.tsx` — add a "See how it was built" CTA card at the bottom of the grid

### Key Interactions

1. **Animated counters** — numbers count up from 0 on page load (use `useState` + `useEffect` with `requestAnimationFrame` or stepped increments). Same StrictMode-safe pattern as Marketing Planner.
2. **Build timeline** — horizontal timeline with commit dots, hover to see commit message. Use the real timestamps from git log (10:52 → 16:32).
3. **Code breakdown chart** — Recharts horizontal stacked bar or donut chart. Categories: Pages (2,701 lines), Biz Components (1,737), Data (3,278), Shared Components (366), Infrastructure (241).
4. **Tech stack badges** — simple styled chips/badges for each technology.
5. **"What each demo proves"** — grid of cards mapping each demo to the technical capability it demonstrates.

### Data Shape

```typescript
// src/data/build-stats.ts

export const buildStats = {
  headline: {
    timeHours: 3,
    demos: 7,
    linesOfCode: 8341,
    components: 20,
    pages: 8,
    commits: 11,
    dataLines: 3278,
  },
  timeline: [
    { time: '10:52', label: '5 demos built', hash: 'd83f36d' },
    { time: '10:55', label: 'Backpack compliance', hash: 'ade1528' },
    { time: '15:22', label: 'Business Travel Agent', hash: '3984c8a' },
    { time: '15:50', label: 'Polish pass', hash: 'c42ba0a' },
    { time: '16:09', label: 'Presentation polish', hash: 'dc8f3fc' },
    { time: '16:32', label: 'Marketing Planner', hash: '134892c' },
  ],
  codeBreakdown: [
    { category: 'Pages', lines: 2701, color: 'sky-blue' },
    { category: 'Biz Components', lines: 1737, color: 'coral' },
    { category: 'Mock Data', lines: 3278, color: 'eco' },
    { category: 'Shared Components', lines: 366, color: 'berry' },
    { category: 'Infrastructure', lines: 241, color: 'haiti' },
  ],
  techStack: [
    'React 19', 'TypeScript', 'Vite 7', 'Tailwind CSS 4',
    'Recharts', 'Lucide React', 'React Router 7', 'Claude Code',
  ],
  demoCapabilities: [
    { demo: 'Trip Planner', capability: 'Conversational UI, day-by-day state, inline editing' },
    { demo: 'Companion', capability: 'Real-time chat, contextual responses, timeline UI' },
    { demo: 'Ancillaries', capability: 'Dynamic pricing, bundle logic, progress tracking' },
    { demo: 'Price Intelligence', capability: 'Recharts integration, countdown timers, modals' },
    { demo: 'Experiences', capability: 'Filtering, sorting, nested routing, detail pages' },
    { demo: 'Business Travel', capability: '9-state machine, multi-leg booking, approval flow' },
    { demo: 'Marketing Planner', capability: 'AI generation simulation, tabbed sections, expandable cards' },
  ],
}
```

### Design Notes

- Hero: dark haiti background, white text, same energy as DemoHub hero
- Stat counters: large numbers (text-5xl font-bold), animate on scroll/load
- Timeline: horizontal on desktop, vertical on mobile
- Use existing Backpack tokens throughout — no new design language
- Stagger animations (`.stagger-1` through `.stagger-6`) for the stat cards

---

## Feature 2: "Golden Thread" — Cross-Demo Journey Mode

**Route:** `/journey` (and `/journey/:step`)
**Effort:** Medium (2-3 hours)
**Purpose:** Turn seven standalone demos into one continuous narrative. Stakeholders don't have to figure out what to click — they just follow the thread.

### What It Does

A guided walkthrough mode. Click "Start the Journey" on the DemoHub and it walks through all seven demos in sequence, with narrative transition screens between each that set context.

### Flow

```
DemoHub → "Start the Journey" button
  ↓
Transition 1: "Meet Sarah. She's planning a trip to Japan..."
  ↓
Trip Planner (full demo, with "Continue Journey →" button)
  ↓
Transition 2: "Sarah's in Barcelona now. Her flight's delayed..."
  ↓
Companion (full demo, with "Continue Journey →")
  ↓
Transition 3: "Before her next trip, Sarah wants to be prepared..."
  ↓
Ancillaries
  ↓
Transition 4: "Sarah's watching prices for her summer holiday..."
  ↓
Price Intelligence
  ↓
Transition 5: "She's booked! Now she wants to fill her days..."
  ↓
Experiences
  ↓
Transition 6: "Meanwhile, Sarah's company needs travel too..."
  ↓
Business Travel
  ↓
Transition 7: "Now the product team asks: how do we launch this?"
  ↓
Marketing Planner
  ↓
Finale: "7 products. 3 hours. 1 engineer. What could YOUR team build?"
  → Links to Stats page + back to DemoHub
```

### Implementation

**New files:**
- `src/pages/Journey.tsx` — the journey orchestrator page
- `src/data/journey-narrative.ts` — transition screen content (titles, descriptions, character context)

**Modified files:**
- `src/App.tsx` — add `/journey` and `/journey/:step` routes
- `src/pages/DemoHub.tsx` — add "Start the Journey" hero CTA button (secondary to the grid, above it or as a banner)

### Architecture

The Journey page is a wrapper that:
1. Tracks current step (0-14: 7 transitions + 7 demos + 1 finale)
2. Even steps (0, 2, 4...) = transition screens
3. Odd steps (1, 3, 5...) = actual demo pages (rendered inline or navigated to)
4. A persistent progress bar at the top shows position in the journey

**Two approaches — recommend Option A:**

**Option A: Transition-then-redirect**
- Journey page shows transition screens only
- "Enter Demo →" navigates to the actual demo page (e.g., `/trip-planner`)
- Each demo page gets a "Continue Journey →" floating button when `?journey=true` query param is present
- Button links back to `/journey?step=N` for the next transition
- Progress bar appears on demo pages when in journey mode

**Option B: Inline embedding**
- Journey page renders demo components inline
- More seamless but requires refactoring each demo page to accept a `journeyMode` prop
- Higher effort, more coupling

**Recommend Option A** because it reuses existing pages without modification, and the transition screens are the real value.

### Journey Query Param Pattern

```typescript
// In any demo page, detect journey mode:
const [searchParams] = useSearchParams()
const journeyMode = searchParams.get('journey') === 'true'
const journeyStep = searchParams.get('step')

// Show "Continue Journey" floating button when in journey mode:
{journeyMode && (
  <Link
    to={`/journey?step=${Number(journeyStep) + 1}`}
    className="fixed bottom-6 right-6 z-50 ..."
  >
    Continue Journey →
  </Link>
)}
```

This means each demo page needs a small addition (~5 lines) to detect journey mode and render the floating button. Minimal coupling.

### Transition Screen Design

```
┌─────────────────────────────────────────────┐
│                                             │
│  ── Progress: ●●●○○○○ Step 3 of 7 ──────── │
│                                             │
│         ✈️ (or relevant Lucide icon)        │
│                                             │
│  "Sarah's watching prices for               │
│   her summer holiday..."                    │
│                                             │
│  She found a great fare to Lisbon, but      │
│  she's not ready to book yet. What if       │
│  she could freeze that price?               │
│                                             │
│  ┌──────────────────────┐                   │
│  │   Enter Demo →       │                   │
│  └──────────────────────┘                   │
│                                             │
│  ← Back                          Skip →     │
│                                             │
└─────────────────────────────────────────────┘
```

### Data Shape

```typescript
// src/data/journey-narrative.ts

export interface JourneyStep {
  id: number
  type: 'transition' | 'finale'
  title: string
  description: string
  demoRoute?: string        // e.g., '/trip-planner'
  demoTitle?: string        // e.g., 'AI Trip Planner'
  icon: string              // Lucide icon name
}

export const journeySteps: JourneyStep[] = [
  {
    id: 0,
    type: 'transition',
    title: 'Meet Sarah',
    description: "She's planning a 10-day trip to Japan. Usually that means 23 browser tabs, 4 spreadsheets, and a group chat nobody reads. What if there was a better way?",
    demoRoute: '/trip-planner',
    demoTitle: 'AI Trip Planner',
    icon: 'map',
  },
  // ... 6 more transitions + finale
]
```

### Key Details

- **Progress bar**: thin horizontal bar at top of page, fills proportionally. Persists across transition screens and demo pages (when in journey mode).
- **Keyboard navigation**: left/right arrows to move between transitions (not within demos).
- **Deep linking**: `/journey?step=4` jumps to transition 4 directly. Good for "let me show you THIS part."
- **Finale screen**: bigger, more celebratory. Links to Stats page + DemoHub. Maybe animated confetti or a simple "7 products. 3 hours. What could your team build?" with the stats numbers.

---

## Feature 3: Live AI — Real LLM on Trip Planner

**Route:** `/trip-planner` (enhanced, not new route)
**Effort:** Medium (2-3 hours)
**Purpose:** Bridge the gap between "nice mockup" and "this could ship." One real interaction is worth ten simulated ones.

### What It Does

Enhance the Trip Planner so that when someone types their own query, it calls a real LLM (Claude) and streams back a real itinerary. The existing mock Japan itinerary remains as the default/demo path. The live AI is the "try it yourself" path.

### Approach

**Keep it simple:**
1. User lands on Trip Planner → sees same landing UI with input + 3 suggestions
2. Clicking a suggestion → loads mock Japan data (existing behavior, instant)
3. Typing a custom query → calls Claude API → streams real response
4. Response is parsed into the same itinerary UI structure

**Why Trip Planner and not Marketing Planner?**
- Trip planning is universally relatable — everyone's planned a holiday
- The output structure (days → activities → costs) is well-defined and parseable
- "Plan me a trip to [anywhere]" is a natural prompt anyone would try

### Architecture

```
Browser                          Vite Dev Server / Vercel Edge
  │                                     │
  │  POST /api/plan-trip                │
  │  { query: "5 days in Tokyo" }       │
  │ ──────────────────────────────────► │
  │                                     │  POST api.anthropic.com/messages
  │                                     │  { system prompt, user query }
  │                                     │ ──────────────────────────►
  │                                     │
  │  SSE stream: chunks of JSON         │  SSE stream: Claude response
  │ ◄────────────────────────────────── │ ◄────────────────────────────
  │                                     │
  │  Parse into Itinerary type          │
  │  Render in existing UI              │
```

### Backend: Vercel Edge Function

**New file:** `api/plan-trip.ts` (Vercel serverless function)

This is a thin proxy that:
1. Receives the user's query
2. Calls Claude API with a structured prompt
3. Streams the response back

```typescript
// api/plan-trip.ts (Vercel Edge Function)
import Anthropic from '@anthropic-ai/sdk'

export const config = { runtime: 'edge' }

export default async function handler(req: Request) {
  const { query } = await req.json()

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4096,
    system: TRIP_PLANNER_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: query }],
  })

  // Return as SSE stream
  return new Response(stream.toReadableStream(), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })
}

const TRIP_PLANNER_SYSTEM_PROMPT = `You are a travel planning AI for SkyVoyager.
Given a trip request, return a JSON itinerary matching this exact TypeScript interface:

{
  destination: string
  duration: string          // e.g., "5 days"
  dates: string             // e.g., "Flexible"
  totalCost: number         // estimated total in GBP
  currency: "GBP"
  days: Array<{
    day: number
    title: string           // e.g., "Arrival & Shibuya"
    date: string
    activities: Array<{
      time: string          // e.g., "09:00"
      title: string
      description: string
      type: "transport" | "food" | "accommodation" | "activity"
      cost: number
      location: string
    }>
    dailyCost: number
  }>
}

Return ONLY valid JSON. No markdown, no explanation. Be creative and specific with
real restaurant names, real attractions, realistic costs. Aim for 4-6 activities per day.`
```

### Frontend Changes

**Modified file:** `src/pages/TripPlanner.tsx`

The key change: detect whether the user typed a custom query or clicked a suggestion.

```typescript
// New state
const [isLiveAI, setIsLiveAI] = useState(false)
const [streamedResponse, setStreamedResponse] = useState('')
const [isStreaming, setIsStreaming] = useState(false)

const handleSubmit = async (query: string) => {
  const isSuggestion = suggestions.includes(query)

  if (isSuggestion) {
    // Existing behavior: use mock data
    setView('loading')
    setTimeout(() => setView('results'), 1800)
    return
  }

  // Live AI path
  setIsLiveAI(true)
  setIsStreaming(true)
  setView('loading')

  const response = await fetch('/api/plan-trip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })

  // Read SSE stream, accumulate JSON
  const reader = response.body.getReader()
  let fullText = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    fullText += new TextDecoder().decode(value)
    setStreamedResponse(fullText)
  }

  // Parse the complete JSON into Itinerary type
  const itinerary = JSON.parse(fullText)
  setLiveItinerary(itinerary)
  setIsStreaming(false)
  setView('results')
}
```

### Environment & Security

- **API key**: stored as `ANTHROPIC_API_KEY` Vercel environment variable. Never exposed to the browser.
- **Rate limiting**: add a simple in-memory counter in the edge function (or just accept the risk for a demo — it's your API key).
- **Fallback**: if the API call fails, show a friendly error and offer to load the mock Japan itinerary instead.
- **Cost**: Claude Sonnet at ~$3/1M input tokens. A trip plan is ~500 tokens in, ~2000 out. Negligible cost for demo usage.

### New Dependencies

```bash
npm install @anthropic-ai/sdk
```

### Loading State Enhancement

While streaming, show a richer loading state than the current "Planning your trip..." — show the query the user typed and a step-by-step "thinking" animation (similar to Marketing Planner's generating state):

```
"Planning your trip to Tokyo..."

✓ Understanding your preferences
✓ Finding best destinations
● Crafting your day-by-day plan...
○ Estimating costs
○ Adding local recommendations
```

This runs on timers (cosmetic, not tied to actual API progress) while the stream completes in the background.

### What Success Looks Like

Someone at a stakeholder demo types "3 days in Lisbon, budget-friendly, loves street food" and 8 seconds later sees a full, personalized itinerary rendered in the same beautiful UI as the Japan mock. That's the "wait, this is real?" moment.

---

## Build Order & Dependencies

```
Feature 1: Stats Dashboard        (standalone, no dependencies)
    ↓
Feature 2: Golden Thread          (references Stats page in finale)
    ↓
Feature 3: Live AI                (standalone, but journey mode can showcase it)
```

**Recommended build sequence:**
1. **Stats first** — quickest win, builds confidence, and Feature 2's finale links to it
2. **Golden Thread second** — transforms the whole experience, references Stats
3. **Live AI third** — most technically novel, highest "wow factor" payoff

## Files Changed Summary

| Feature | New Files | Modified Files |
|---------|-----------|----------------|
| Stats | `src/pages/Stats.tsx`, `src/data/build-stats.ts` | `App.tsx`, `Nav.tsx`, `DemoHub.tsx` |
| Journey | `src/pages/Journey.tsx`, `src/data/journey-narrative.ts` | `App.tsx`, `DemoHub.tsx`, all 7 demo pages (5-line addition each) |
| Live AI | `api/plan-trip.ts` | `src/pages/TripPlanner.tsx`, `package.json` |

## Acceptance Criteria

### Stats Dashboard
- [ ] `/stats` route loads with animated number counters
- [ ] Build timeline shows real commit timestamps
- [ ] Code breakdown chart renders (Recharts)
- [ ] Tech stack badges display
- [ ] Per-demo capability cards are present
- [ ] Navigation from DemoHub and Nav works
- [ ] Stagger animations on load

### Golden Thread
- [ ] "Start the Journey" CTA visible on DemoHub
- [ ] Transition screens render with narrative text
- [ ] Progress bar shows current position
- [ ] "Enter Demo" links to actual demo page with `?journey=true`
- [ ] "Continue Journey" floating button appears on demo pages in journey mode
- [ ] Finale screen links to Stats and DemoHub
- [ ] Back/Skip navigation works
- [ ] Deep linking to specific steps works

### Live AI
- [ ] Custom typed queries hit the Claude API
- [ ] Suggestion clicks still use mock data (no API call)
- [ ] Streaming response parses into itinerary UI
- [ ] Loading state shows step-by-step animation
- [ ] Error fallback offers mock data
- [ ] API key is server-side only (not in browser bundle)
- [ ] Works on Vercel deployment
