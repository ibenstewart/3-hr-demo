---
title: "feat: Add live landing page preview to Copy Studio"
type: feat
status: active
date: 2026-02-16
---

# feat: Add Live Landing Page Preview to Copy Studio

## Overview

When the user selects the "Landing Page" channel in Copy Studio, render a full landing page mockup below the copy items. The mockup uses the actual headlines and CTAs from the copy data (mock or AI-generated), giving marketers a "this is what your landing page looks like" moment.

## Proposed Solution

Add a `LandingPagePreview` component inside `CopyStudioSection` that conditionally renders when `activeChannel === 'landing-page'`. The preview is a static visual mockup (non-interactive) wrapped in a browser chrome frame.

### Preview Sections

```
+--[ Browser Chrome: skyvoyager.com/trip-planner ]--------+
|                                                          |
|  [Hero: gradient bg with product color]                  |
|    headline[0].text                                      |
|    plan.tagline (subtext)                                |
|    [CTA Button: ctas[0].text]                            |
|                                                          |
|  [Features: 3 cards on light bg]                         |
|    Derived from plan.positioning / hardcoded per product  |
|                                                          |
|  [Social Proof: stats bar]                               |
|    "100M+ travellers" | "4.8 star rating" | "52 markets" |
|                                                          |
|  [Footer CTA: dark bg]                                   |
|    headline[1].text (if exists)                           |
|    [CTA Button: ctas[1].text (if exists)]                |
|                                                          |
+----------------------------------------------------------+
```

### Data Flow

```typescript
// Inside CopyStudioSection, when activeChannel === 'landing-page'
const headlines = channelData.items.filter(i => i.type === 'headline')
const ctas = channelData.items.filter(i => i.type === 'cta')

// Product color for hero gradient
const productColor = productCards.find(p => p.id === plan.productId)?.color

<LandingPagePreview
  headlines={headlines}
  ctas={ctas}
  tagline={plan.tagline}
  productName={plan.productName}
  productId={plan.productId}
  color={productColor}
/>
```

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Features section data | Hardcode 3 features per product in a lookup map | No `features` field exists in data model; adding one is overkill for a demo |
| Social proof data | Static generic content ("100M+ travellers" etc.) | Same rationale — demo doesn't need per-product social proof |
| Products with <2 headlines/CTAs | Update mock data to 2+2 for all 6 products | We control mock data; ensures consistent preview |
| AI-generated variance | Defensive rendering — hide sections with missing data | AI may return 0-N items; degrade gracefully |
| Copy items + preview | Show both | Copy items for clipboard utility, preview for visual "wow" |
| Interactive vs static | Static mockup | Non-interactive; demo doesn't need editable previews |
| Mobile handling | CSS `transform: scale()` to shrink preview to fit | Avoids complex responsive logic inside the mockup itself |
| Color for gradients | CSS variable lookup map from productCards color classes | `bg-sky-blue` → `var(--color-sky-blue)` |

## Implementation

### Phase 1: Update mock data for consistency

**File:** `src/data/marketing-plans.ts`

- [ ] Add 2nd headline to In-Trip Companion landing-page channel
- [ ] Add 2nd headline to Smart Ancillaries landing-page channel
- [ ] Add 2nd CTA to Tours & Experiences landing-page channel

### Phase 2: Build LandingPagePreview component

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Add color lookup map: `productCards` color → CSS variable
- [x] Add hardcoded features lookup: `productId` → 3 feature objects `{ icon, title, description }`
- [x] Build `LandingPagePreview` component with sections:
  - [x] Browser chrome frame (rounded-xl, gray top bar with dots + URL)
  - [x] Hero section (gradient bg using product color, headline, tagline, CTA button)
  - [x] Features section (3 cards on light bg, icon + title + description)
  - [x] Social proof bar (3 stat badges)
  - [x] Footer CTA section (dark bg, second headline, second CTA button)
- [x] Defensive rendering: hide footer CTA if `headlines[1]` or `ctas[1]` missing
- [x] `animate-fade-in-up` entrance animation

### Phase 3: Wire into CopyStudioSection

**File:** `src/pages/MarketingPlanner.tsx`

- [x] Pass `plan.productId` into `CopyStudioSection` (currently only receives `plan`)
- [x] Add conditional render: `{activeChannel === 'landing-page' && headlines.length > 0 && <LandingPagePreview ... />}`
- [x] Position between copy items list and AI Reasoning callout
- [x] Add section label above preview: "Preview" with eye icon

### Phase 4: Mobile responsive scaling

- [ ] Wrap preview in a container that measures its width
- [ ] Apply `transform: scale()` when container < 768px
- [ ] Set `transform-origin: top left` and adjust container height to match scaled content
- [ ] Test on mobile viewport (375px)

### Phase 5: Verify

- [x] Build passes (`npm run build`)
- [ ] All 6 products render preview correctly on Landing Page channel
- [ ] AI-generated copy updates preview in real-time
- [x] Preview hidden on other channels (Google Ads, LinkedIn, etc.)
- [ ] Mobile preview scales down cleanly
- [x] Copy items still show above preview with working clipboard

## References

- `CopyStudioSection`: `src/pages/MarketingPlanner.tsx:794-911`
- `ChannelCopy` / `CopyItem` interfaces: `src/data/marketing-plans.ts:37-48`
- Landing page mock data: search for `channel: 'landing-page'` in `marketing-plans.ts`
- Browser mockup precedent: `BizApprovalFlow` (fake Slack UI): `src/components/business-travel/BizApprovalFlow.tsx:108-192`
- Backpack tokens: `src/index.css` `:root` block
- Related solution doc: `docs/solutions/ui-bugs/backpack-design-system-compliance-integration.md`
