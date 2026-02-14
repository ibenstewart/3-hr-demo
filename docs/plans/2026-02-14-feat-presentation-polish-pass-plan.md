---
title: "feat: Presentation polish pass"
type: feat
status: completed
date: 2026-02-14
---

# feat: Presentation polish pass

Polish the demos for stakeholder presentation. Focus on narrative clarity, cross-demo threading, and credibility details. Feedback from review session.

## Changes

### 1. Hero headline — statement, not question

**File:** `src/pages/DemoHub.tsx`

- [x] Change hero to confident statement: "One engineer. Three hours. Six products."
- [x] Subtitle underneath: "Six product demos exploring Skyscanner as a travel operating system."
- [x] Swapped styling — punchy line is the big `h1`, description is smaller `<p>`

### 2. Strategy subtitle below hero

**File:** `src/pages/DemoHub.tsx`

- [x] Added strategy line between hero and demo cards connecting to New Ideas long list
- [x] Styled subtly as `text-text-secondary text-sm`

### 3. Fix the nav logo

**File:** `src/components/Nav.tsx`

- [x] Replaced generic SVG with text-only "Skyscanner" (Option A)

### 4. Contextual AI chat responses in InTripCompanion

**File:** `src/pages/InTripCompanion.tsx`

- [x] Restaurant/food keywords → Can Culleretes recommendation in Gothic Quarter
- [x] Weather keywords → Barcelona February forecast (16°C, partly cloudy)
- [x] Transport keywords → Metro advice, T-Casual card pricing, taxi info
- [x] Help keywords → Capability summary
- [x] Cancel/change keywords → Schedule adjustment response
- [x] Default fallback → Warmer contextual response referencing the trip

### 5. Cross-demo threading banners

- [x] Experiences: "Based on your Barcelona trip · Feb 12–16, 2026" banner with link to Companion
- [x] Ancillaries: "Your trip companion activates on Feb 12" banner with link to Companion
- [x] InTripCompanion: Added ancillaries cross-link ("Need travel insurance or airport transfer?")

### 6. Make Trip Planner cost breakdown more visible

**File:** `src/pages/TripPlanner.tsx`

- [x] Added persistent "Trip total" card in sidebar (sticky, always visible) with "View breakdown →" link that navigates to Day 10

### 7. Guard empty search on Trip Planner

**File:** `src/pages/TripPlanner.tsx`

- [x] Empty Enter or button click auto-fills first chip suggestion and triggers search
- [x] Removed `disabled` state from search button (always clickable)

## Acceptance Criteria

- [x] Hero lands as a confident statement, not a question
- [x] Strategy line connects demos to New Ideas long list
- [x] Logo is clean text-only "Skyscanner"
- [x] InTripCompanion chat responds contextually to 5 keyword patterns + default
- [x] 3 cross-demo connection points visible without clicking
- [x] Trip cost visible from any day via persistent sidebar card
- [x] Empty search auto-fills first suggestion
