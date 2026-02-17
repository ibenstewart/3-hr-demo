---
title: "feat: Add Run the World running routes to In-Trip Companion"
type: feat
status: completed
date: 2026-02-17
---

# feat: Add Run the World Running Routes to In-Trip Companion

## Overview

Add an **"Under Armour x Skyscanner Run the World"** feature to the In-Trip Companion demo. Users tap a "Find a run" quick action, browse 4-5 curated running routes in Barcelona via a bottom sheet, view route details with an interactive Leaflet map and elevation chart, and save routes to their daily itinerary. AI route generation works through the existing chat panel.

## Problem Statement

The In-Trip Companion demo currently helps travelers with logistics (flights, hotels, transport, food) but has no "active lifestyle" angle. Adding running routes:
- **Differentiates** Skyscanner as a platform for active/adventurous travelers
- **Demonstrates sponsorship integration** (Under Armour co-branding) as a revenue model
- **Adds visual impact** with interactive maps — the first map-based feature in the demo
- **Mirrors real Skyscanner content**: the existing [Run the World guide](https://www.skyscanner.net/news/run-the-world) + [Explore Everywhere](https://www.skyscanner.net/transport/flights-from/uk/) feature

## Proposed Solution

### Entry Point

New **"Find a run"** quick action button (Footprints icon) in the Companion's quick action grid. Grid changes from `grid-cols-5` (5 items) to `grid-cols-3` (2 rows of 3) to accommodate the 6th item cleanly on mobile.

### Route Browse (Bottom Sheet)

Tapping "Find a run" opens the existing `BottomSheet` component with:
- **Co-branded header**: "Under Armour x Skyscanner — Run the World"
- **Route cards**: 4-5 curated Barcelona routes, each showing name, distance, difficulty badge, thumbnail image, and a "UA Tested" badge
- **"Generate custom route"** link at bottom → closes sheet, opens chat with pre-filled running prompt

### Route Detail (Bottom Sheet Content Swap)

Tapping a route card **replaces** the bottom sheet content with a detail view:
- **Back button** to return to route list
- **Interactive Leaflet map** with route polyline + start/end markers (~200px height)
- **Stats row**: distance, elevation gain, estimated time, difficulty, surface
- **Elevation profile chart** (Recharts Area chart, ~150px height)
- **Under Armour gear recommendations**: 2-3 product cards (shoes, apparel)
- **"Save to itinerary"** button → adds route as a timeline item in the active day

### AI Route Generation (Chat)

"Generate custom route" in the bottom sheet → closes sheet → opens existing chat panel with auto-sent message "Find me a running route in Barcelona". The AI responds with a text summary (name, distance, difficulty, key highlights) plus a "View route" button that opens the route detail in the bottom sheet.

### Save to Itinerary

Saving a route adds a new `TimelineItem` of type `'run'` to the active day's timeline at 07:00 (morning slot). The `tripDays` data is lifted into `useState` on mount to support mutation. A toast confirms "Route added to Day X". The new timeline item shows the route name, distance, and a running icon with eco-green dot color.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Route detail architecture | Bottom sheet content swap (list ↔ detail) | Avoids new routes, keeps everything contained in the BottomSheet component |
| Quick action grid | `grid-cols-3` (2 rows of 3) | Adding a 6th item to `grid-cols-5` is cramped on mobile; 3-col is cleaner |
| Map library | Leaflet + OpenStreetMap (react-leaflet v5) | No API key, free, ~50KB gzipped, v5 supports React 19 |
| Elevation chart | Recharts Area chart | Already installed, matches PriceIntelligence pattern |
| Save mechanism | Copy `tripDays` into `useState` on mount | Allows mutation while keeping source data file unchanged |
| Saved route time | 07:00 default on active day | Morning runs are the natural use case |
| Timeline type | New `'run'` type with eco-green color | Distinguishes runs from general activities |
| AI chat response | Text + "View route" button | Keeps chat simple; rich card in chat is over-engineered for a demo |
| UA branding | Text lockup "Under Armour x Skyscanner" + accent color (#1D1D1D) | No logo SVG needed; text is sufficient for demo |
| UA gear data | Static per-route recommendations with Unsplash images | Simple, no external API |
| Marker icons | `L.divIcon` with Tailwind classes | Avoids the Vite default marker icon path bug entirely |
| Map interaction | Zoom + pan enabled, fitBounds on load | Basic interactivity, auto-centers on route |
| Bundle optimization | Lazy-load RouteMap with `React.lazy` | Keeps Leaflet out of main bundle; only loads on Companion page |

### Why Not Other Approaches

| Approach | Why Not |
|----------|---------|
| Standalone demo page at `/running` | Feature is contextual ("I'm in Barcelona, where do I run?") — belongs in Companion |
| Mapbox GL JS | Requires API key management; overkill for a demo |
| GPS tracking simulation | Adds complexity without demonstrating the core value (route discovery) |
| Day-specific routes | Same 4-5 routes work for any day; day-specific adds data work for minimal demo impact |
| New route in React Router | Bottom sheet content swap is simpler and keeps the Companion as a single-page experience |
| Accordion expansion in route list | Map + elevation chart don't fit well in a card expansion; full sheet content swap is cleaner |

## Implementation

### Phase 1: Dependencies + Data Model

**Install dependencies:**

```bash
npm install react-leaflet leaflet && npm install -D @types/leaflet
```

**File:** `src/data/running-routes.ts` (NEW)

- [x] Create `RunningRoute` interface:
  ```typescript
  export interface RunningRoute {
    id: string
    name: string
    description: string
    distanceKm: number
    elevationGainM: number
    estimatedMinutes: number
    difficulty: 'easy' | 'moderate' | 'hard'
    surface: 'road' | 'trail' | 'mixed'
    image: string  // Unsplash URL
    coordinates: [number, number][]  // [lat, lng] for Leaflet polyline
    elevationProfile: { distanceKm: number; elevationM: number }[]
    highlights: string[]
    uaGear: { name: string; type: string; image: string }[]
  }
  ```
- [x] Create `barcelonaRoutes: RunningRoute[]` with 4-5 routes:
  1. **Barceloneta Boardwalk** — 5K, flat, easy, beachfront
  2. **Parc de la Ciutadella Loop** — 3K, flat, easy, park trail
  3. **Montjuic Hill Climb** — 8K, 180m elevation, hard, mixed terrain
  4. **Diagonal Mar Coastal Path** — 7K, flat, moderate, road
  5. **Carretera de les Aigues Ridge** — 10K, 120m elevation, moderate, trail
- [x] Each route needs: 8-12 coordinate points (real Barcelona GPS), 10-15 elevation profile points, 3-4 highlights, 2-3 UA gear items
- [x] Create `runningChatResponse` object with pre-built AI response text and a route ID reference

### Phase 2: Leaflet Map Component

**File:** `src/components/RouteMap.tsx` (NEW)

- [x] Import `MapContainer`, `TileLayer`, `Polyline`, `Marker`, `Popup`, `useMap` from `react-leaflet`
- [x] Import `leaflet/dist/leaflet.css`
- [x] Create `FitBounds` helper component (auto-fits map to route bounds with padding)
- [x] Create `divIcon` markers for start (green) and end (red) points — avoids Vite marker icon bug
- [x] `RouteMap` component props: `coordinates: [number, number][]`, `height?: string`
- [x] OpenStreetMap tile layer with attribution
- [x] Route polyline in sky-blue (`#0062E3`) with weight 4
- [x] Export as `default` for lazy loading

### Phase 3: Section Scaffolding

**File:** `src/pages/InTripCompanion.tsx`

- [x] Add Leaflet CSS import: `import 'leaflet/dist/leaflet.css'`
- [x] Add imports: `barcelonaRoutes`, `RunningRoute` type, `BottomSheet`, lazy `RouteMap`
- [x] Lift `tripDays` into `useState`: `const [days, setDays] = useState(tripDays)`
- [x] Replace all `tripDays` references with `days`
- [x] Add state:
  - `runSheetOpen: boolean` — bottom sheet visibility
  - `selectedRoute: RunningRoute | null` — detail view (null = list view)
  - `toast: string | null` — save confirmation
- [x] Add "Find a run" to `quickActions` array in `barcelona-trip.ts`:
  ```typescript
  { id: 'running', icon: 'Footprints', label: 'Run', items: [] }
  ```
- [x] Change quick action grid from `grid-cols-5` to `grid-cols-3`
- [x] Wire "Find a run" quick action to open bottom sheet (`setRunSheetOpen(true)`)
- [x] Add `BottomSheet` render with `isOpen={runSheetOpen}` and `onClose`

### Phase 4: Route Browse UI

**File:** `src/pages/InTripCompanion.tsx`

- [x] Build route list view inside BottomSheet:
  - Co-branded header: "Under Armour x Skyscanner" text lockup + "Run the World" subtitle
  - Route cards: `barcelonaRoutes.map()` with staggered `animate-fade-in-up`
  - Each card: image thumbnail (h-24, rounded), name, distance + difficulty badge, "UA Tested" chip
  - Difficulty badge colors: easy = eco, moderate = coral, hard = danger
  - Card tap → `setSelectedRoute(route)`
- [x] "Generate custom route" link at bottom → close sheet + open chat with running prompt
- [x] Add running keywords to chat `sendMessage()` function:
  - Keywords: `run`, `running`, `jog`, `5k`, `10k`, `exercise`
  - Response: text summary of a route + "I've added a route suggestion to your running routes."

### Phase 5: Route Detail UI

**File:** `src/pages/InTripCompanion.tsx`

- [x] Build route detail view (shown when `selectedRoute !== null`):
  - **Back button**: arrow-left icon + "Back to routes" → `setSelectedRoute(null)`
  - **Route hero**: name, difficulty badge, distance/time stats row
  - **Leaflet map**: `<Suspense>` wrapper with skeleton fallback, lazy-loaded `RouteMap` component, h-[200px]
  - **Elevation profile**: Recharts `AreaChart` with `ResponsiveContainer`, h-[150px]
    - X axis: distance (km), Y axis: elevation (m)
    - Filled area in sky-blue with 0.3 opacity
    - Reuse BPK color constants from PriceIntelligence
  - **Highlights**: pill badges listing points of interest along route
  - **UA Gear section**: "Recommended Gear" header with 2-3 product cards
    - Each card: image, product name, product type
    - Styled with UA dark accent (#1D1D1D) border
  - **"Save to itinerary" button**: full-width, primary style
    - On tap: add new `TimelineItem` to active day, show toast, close sheet after 1s delay

### Phase 6: Save to Itinerary

**File:** `src/pages/InTripCompanion.tsx`

- [x] `handleSaveRoute(route: RunningRoute)` function:
  1. Create new `TimelineItem`:
     ```typescript
     {
       id: `run-${route.id}`,
       time: '07:00',
       type: 'run',
       title: `Morning Run: ${route.name}`,
       description: `${route.distanceKm}km ${route.difficulty} run — ${route.highlights[0]}`,
       icon: 'Footprints',
       details: {
         'Distance': `${route.distanceKm} km`,
         'Elevation': `${route.elevationGainM}m gain`,
         'Est. Time': `${route.estimatedMinutes} min`,
         'Surface': route.surface,
       },
       actions: [{ label: 'View Route', variant: 'primary' }],
     }
     ```
  2. Update `days` state: insert item at position 0 of active day's items array (morning = first)
  3. Show toast: `"Route added to Day ${activeDay + 1}"`
  4. Auto-dismiss toast after 3s
  5. Close bottom sheet after 1s delay
- [x] Add `'run'` to timeline type color mapping: `item.type === 'run' ? 'bg-eco' : ...`
- [x] Update `TimelineItem.type` union in `barcelona-trip.ts` to include `'run'`
- [x] Toast rendering: position at `bottom-24 right-6` to avoid chat FAB collision

### Phase 7: Polish + Verify

- [x] Build passes (`npm run build`)
- [x] Quick action grid layout is clean on mobile (3-col, 2 rows)
- [x] Bottom sheet opens with route list, staggered card animations
- [x] Route card tap → detail view with map, elevation, gear
- [x] Map renders correctly inside bottom sheet (fitBounds works)
- [x] Elevation chart renders with correct data
- [x] "Save to itinerary" adds run to timeline with correct icon/color
- [x] Toast appears and auto-dismisses without colliding with chat FAB
- [x] "Generate custom route" opens chat with running prompt
- [x] Chat recognizes running keywords and responds appropriately
- [x] Back button in detail view returns to route list
- [x] Bottom sheet dismiss resets to list view (not stuck on detail)
- [x] UA branding appears in header and gear section
- [x] Existing Companion features still work (no regressions)
- [x] Lazy-loaded RouteMap doesn't block initial page load

## Dependencies & Risks

| Risk | Mitigation |
|------|-----------|
| Leaflet map doesn't size correctly in animated bottom sheet | Call `map.invalidateSize()` after sheet animation via `useMap()` hook in a `useEffect` |
| Bundle size increase (~50KB gzipped) | Lazy-load RouteMap with `React.lazy` + `Suspense` |
| Leaflet default marker icons broken in Vite | Use `L.divIcon` with Tailwind classes instead of default markers |
| Quick action grid layout change breaks mobile | Test on small viewport (375px); `grid-cols-3` is actually friendlier than `grid-cols-5` on mobile |
| Chat keyword conflicts with existing matchers | Add running keywords after existing matchers; use specific terms (`run`, `jog`) not generic ones |
| Network-dependent map tiles at conferences | Accept risk — OSM tiles are fast and reliable; no offline fallback needed for a demo |

## References

### Internal

- Brainstorm: `docs/brainstorms/2026-02-17-run-the-world-companion-brainstorm.md`
- InTripCompanion component: `src/pages/InTripCompanion.tsx`
- Barcelona trip data: `src/data/barcelona-trip.ts`
- BottomSheet component: `src/components/BottomSheet.tsx`
- Recharts usage: `src/pages/PriceIntelligence.tsx:94-133`
- Quick actions grid: `src/pages/InTripCompanion.tsx:192-215`
- Chat keyword matching: `src/pages/InTripCompanion.tsx:34-47`
- Timeline color mapping: `src/pages/InTripCompanion.tsx:122-127`
- Safe timer pattern: `src/components/business-travel/BizThinkingState.tsx:15-29`
- Staggered animations: `src/index.css:159-181`
- Toast pattern: `src/pages/MarketingPlanner.tsx:2410-2415`

### External

- react-leaflet v5 docs: https://react-leaflet.js.org/docs/start-installation/
- Leaflet polyline API: https://leafletjs.com/reference.html#polyline
- Skyscanner Run the World: https://www.skyscanner.net/news/run-the-world
- Explore Everywhere: https://www.skyscanner.net/transport/flights-from/uk/
