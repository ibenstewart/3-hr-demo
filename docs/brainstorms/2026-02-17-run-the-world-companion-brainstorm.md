---
title: "Run the World: Under Armour x Skyscanner In-Trip Running Feature"
date: 2026-02-17
topic: run-the-world-companion
status: active
---

# Run the World: Under Armour x Skyscanner In-Trip Running Feature

## What We're Building

An **"Under Armour x Skyscanner Run the World"** feature embedded in the In-Trip Companion demo that helps active travelers discover and generate running routes in the city they're visiting. Combines curated route browsing with AI-generated custom routes, displayed on interactive maps with Under Armour co-branding.

**Entry point**: New quick action button in the In-Trip Companion ("Find a run" with Footprints icon). Opens a bottom sheet with two sections:

1. **Curated routes** — 3-5 famous or recommended running routes near the traveler's current location (e.g., "Barceloneta Beach 5K", "Gothic Quarter Loop", "Montjuic Hill Climb"). Shown as cards with distance, elevation, difficulty, and thumbnail map.

2. **"Generate custom route"** — Opens AI chat to create personalized routes based on natural language ("5k loop near my hotel", "scenic trail with elevation"). AI responds with a full route card.

Both curated and AI-generated routes open a **full-screen route detail page** with:
- Interactive map (Leaflet + OpenStreetMap) with route polyline overlay
- Waypoints with turn-by-turn directions
- Elevation profile chart (reuse Recharts from PriceIntelligence)
- Stats: distance, elevation gain, estimated time, difficulty, surface type
- Under Armour gear recommendations per route
- "Save to itinerary" button (adds route as a timeline item in the Companion's daily schedule)

## Why This Approach

**Approach C (Hybrid) was chosen over two simpler alternatives:**

| Approach | What | Rejected Because |
|----------|------|-----------------|
| A: Quick Action + AI Chat | AI-only route generation via chat, static maps | Limited discoverability, no browsing, less visual impact |
| B: Dedicated Tab + Interactive Map | Curated routes only with interactive maps, no AI | No AI generation, doesn't showcase the AI story |
| **C: Hybrid (chosen)** | **Browse curated + AI generate, interactive maps** | **Best of both: shows editorial quality + AI capability** |

**Why hybrid wins for this demo:**
- Curated routes prove Skyscanner can be an authoritative source for running content (editorial)
- AI generation proves the technology angle (personalization at scale)
- Together they demonstrate that AI enhances human-curated content rather than replacing it
- Under Armour sponsorship fits naturally in both curated ("UA Tested") and AI ("Recommended gear") contexts

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Integration point | In-Trip Companion quick action + bottom sheet | User is already in-trip, contextually relevant ("I'm in Barcelona, where should I run?") |
| Map library | Leaflet + OpenStreetMap | No API key needed, open source, good enough for a demo |
| Elevation chart | Recharts (already installed) | Reuse existing dependency, consistent with PriceIntelligence demo |
| Sponsorship model | Co-branded throughout | "Under Armour x Skyscanner Run the World" — UA branding on route cards, gear recommendations, co-branded header |
| Audience | Broad (runners + walkers + explorers) | "5K jog" to "half marathon" range; difficulty labels help all levels self-select |
| Demo city | Barcelona (existing Companion data) | Already have hotel location, daily itinerary, activity locations — routes can reference these |
| Route data | Pre-generated mock data + simulated AI responses | Frontend-only constraint; AI generation is simulated like other demos |
| GPS tracking | None | Focus on route discovery, not tracking — skip "Start run" simulation |
| Route context | General list for Barcelona | Same 3-5 routes regardless of day — simpler, less data work |
| AI chat UX | Reuse existing Companion chat | "Find a run" pre-populates the existing chat panel — minimal new code |
| Save behavior | Add to timeline | Saved route appears as a new activity item in the day's schedule — shows deep integration |
| Primary goal | Brand differentiation | Position Skyscanner as the platform for active/adventurous travelers |

## Under Armour Sponsorship Integration

The sponsorship should feel native, not like an ad banner:

- **Route cards**: "UA Tested" badge on curated routes (implies Under Armour athletes vetted these)
- **Gear recommendations**: Per-route gear tips ("Trail shoes recommended" with UA product link)
- **Co-branded header**: "Under Armour x Skyscanner" logo lockup at top of bottom sheet
- **Challenge integration**: "UA Run the World Challenge — Run in 5 cities to earn your badge"
- **Color accent**: UA's red (#EA553D) as an accent color alongside Skyscanner sky-blue

## Resolved Questions

1. **Map library** — Leaflet + OpenStreetMap. No API key needed, simpler setup for a demo.
2. **Route context** — General list for Barcelona. Same 3-5 routes regardless of which day. Simpler, less data.
3. **AI chat UX** — Reuse existing Companion chat panel. "Find a run" quick action pre-populates the chat with a running prompt.
4. **GPS tracking** — None. Focus on route discovery, not tracking simulation.
5. **Save to itinerary** — Yes, adds route as a new timeline item in the Companion's daily schedule.

## References

- Existing Companion demo: `src/pages/InTripCompanion.tsx`
- Companion data (Barcelona): `src/data/barcelona-trip.ts`
- Quick actions grid: In-Trip Companion quick action buttons
- Chat UI pattern: In-Trip Companion chat panel
- Elevation chart pattern: `src/pages/PriceIntelligence.tsx` (Recharts)
- BottomSheet component: `src/components/BottomSheet.tsx`
- Skyscanner Run the World guide: https://www.skyscanner.net/news/run-the-world
- Explore Everywhere: https://www.skyscanner.net/transport/flights-from/uk/
