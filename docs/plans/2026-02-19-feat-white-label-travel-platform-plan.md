---
title: "feat: Add White-Label Travel Platform demo"
type: feat
status: completed
date: 2026-02-19
---

# feat: Add White-Label Travel Platform Demo

## Overview

Add a **White-Label Travel Platform** demo as Demo 8 — showing how Skyscanner's intelligence stack powers a fully branded travel product for a fictional UK bank ("Meridian Bank"). Two distinct halves: a **Partner Admin Dashboard** (onboarding wizard, brand configurator, analytics) and a **Customer-Facing Product** (search, results with Flight Score, booking, price freeze, alerts, My Trips) — all rendered in Meridian Bank's brand, not Skyscanner's.

## Problem Statement

The existing 7 demos show consumer, companion, ancillary, pricing, experiences, business travel, and marketing angles. Missing is the **B2B platform** story — how Skyscanner could enable partners (banks, airlines, retailers) to launch branded travel products powered by Skyscanner's data and booking engine. This is a key revenue diversification narrative for stakeholder conversations.

## Proposed Solution

A single new route family (`/white-label`, `/white-label/admin`, `/white-label/customer`) with two distinct brand scopes:

- **Admin side**: Uses existing Backpack tokens (sky-blue, haiti, etc.) — this is Skyscanner's internal tooling
- **Customer side**: Uses a dynamic brand system driven by CSS custom properties that update in real-time from the admin configurator — this is the partner's branded product

The centerpiece demo moment: change a color in the admin panel and watch the customer-facing product update instantly.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Brand system | CSS custom properties + React Context | Same pattern as existing BPK tokens; context shares brand config between admin and customer views without iframe complexity |
| Preview mechanism | Shared React Context (not iframe) | Simpler for same-app routing; avoids cross-origin/postMessage complexity; both views live in the same React tree |
| Persistence | localStorage (`white-label-config`) | Survives page refresh; same pattern as CSS Platform PoC (`css-created-sites`) |
| Default state | Pre-seeded Meridian Bank config | Wizard is available but demo can skip to configured state for faster stakeholder walkthroughs |
| State machine (customer) | `type CustomerState = 'landing' \| 'results' \| 'booking' \| 'confirmed' \| 'alerts' \| 'trips'` | Matches BusinessTravel 9-state pattern |
| Flight Score | 0-100 composite metric with breakdown tooltip | Differentiator; makes flights comparable beyond price |
| Timer pattern | `useState` for countdowns in effects, `useRef` for event handler timers | Known safe patterns from docs/solutions/ |
| Recharts colors | Raw RGB string constants (not CSS vars) | Recharts can't resolve CSS variables; documented in backpack-design-system-compliance-integration.md |
| Component extraction | `src/components/white-label/` subfolder with `Wl` prefix | Follows `Biz` prefix convention from business-travel |
| Routing | `/white-label` → landing, `/white-label/admin` → admin dashboard, `/white-label/customer` → customer product | Flat sub-routes, no nesting needed |
| Mobile | Desktop-only (1280px+ target) | 3-4 hour build; stakeholder demos are on large screens |
| Error states | Happy path only + generic ErrorBoundary | Mock data ensures search always returns results; forms have basic validation |

### Why Not Other Approaches

| Approach | Why Not |
|----------|---------|
| iframe for live preview | Cross-origin messaging complexity, double React mount, CSS variable sync issues |
| Separate apps (admin vs customer) | Doubles routing complexity; shared state is simpler in one React tree |
| Zustand/Jotai for brand state | Over-engineered for a demo; React Context + localStorage is sufficient |
| Server-rendered brand config | No backend in this project; all client-side |
| Dynamic route per partner (`/white-label/:partnerId`) | Only one partner (Meridian Bank) for demo; parameterized routes add complexity without value |

## Technical Approach

### Dual Brand Architecture

**Admin side** — Uses existing Backpack tokens directly:
```tsx
<button className="bg-sky-blue text-white rounded-lg px-4 py-2">Save</button>
```

**Customer side** — Uses dynamic brand tokens from Context:
```css
/* New tokens in :root, updateable via JS */
:root {
  --wl-primary: #1B3A5C;
  --wl-accent: #C9A84C;
  --wl-radius: 9999px;
  --wl-font: 'DM Sans', sans-serif;
}
```

```tsx
// BrandContext provides config + updater
const { brand } = useBrandContext()
// CSS vars updated via document.documentElement.style.setProperty()
```

**Tailwind mapping** in `@theme inline`:
```css
--color-wl-primary: var(--wl-primary);
--color-wl-accent: var(--wl-accent);
```

### Flight Score System

Composite metric (0-100) based on 5 weighted factors:
- **Price** (30%): Lower price = higher score
- **Duration** (25%): Shorter flight = higher score
- **Airline Rating** (20%): Based on airline reputation tier
- **Departure Convenience** (15%): Morning/evening preference scoring
- **Eco Rating** (10%): Fuel efficiency and carbon offset

Each flight in mock data has a pre-calculated `score` field plus `scoreBreakdown` object. UI shows:
- Large score number with color badge (80+ green, 60-79 amber, <60 red)
- Hoverable "i" icon with tooltip showing factor breakdown bars

## Implementation

### Phase 1: Data Model + Brand Context

**File:** `src/data/white-label.ts` (NEW)

- [ ] Create `BrandConfig` interface:
  ```typescript
  export interface BrandConfig {
    name: string
    logo: string           // URL
    primaryColor: string   // hex
    accentColor: string    // hex
    fontFamily: string
    buttonRadius: number   // px
  }
  ```
- [ ] Create `WlFlight` interface:
  ```typescript
  export interface WlFlight {
    id: string
    airline: string
    airlineLogo: string
    departure: { time: string; airport: string }
    arrival: { time: string; airport: string }
    duration: string
    stops: number
    stopCity?: string
    price: number
    cabinClass: 'economy' | 'business' | 'first'
    score: number
    scoreBreakdown: {
      price: number
      duration: number
      airline: number
      convenience: number
      eco: number
    }
    co2Kg: number
    baggage: { cabin: string; checked: string }
  }
  ```
- [ ] Create `WlAnalyticsDay` interface:
  ```typescript
  export interface WlAnalyticsDay {
    date: string
    clicks: number
    bookings: number
    revenue: number
  }
  ```
- [ ] Create `WlWizardStep` interface:
  ```typescript
  export interface WlWizardStep {
    id: string
    title: string
    description: string
    icon: string
  }
  ```
- [ ] Create `defaultMeridianConfig: BrandConfig` with Meridian Bank values:
  - name: "Meridian Bank Travel"
  - primaryColor: "#1B3A5C" (navy)
  - accentColor: "#C9A84C" (gold)
  - fontFamily: "DM Sans"
  - buttonRadius: 9999 (pill)
  - logo: Unsplash geometric/abstract image
- [ ] Create `wlFlights: WlFlight[]` — 8 flights LHR→JFK:
  1. British Airways direct, 7h30, £589, score 92
  2. Virgin Atlantic direct, 7h45, £545, score 88
  3. American Airlines direct, 7h50, £510, score 85
  4. Delta via Atlanta, 11h20, £425, score 76
  5. United direct, 8h05, £535, score 83
  6. Aer Lingus via Dublin, 10h40, £395, score 72
  7. Norwegian direct, 8h15, £465, score 80
  8. Icelandair via Reykjavik, 12h30, £345, score 65
- [ ] Create `wlAnalytics: WlAnalyticsDay[]` — 30 days of data with upward trend (new partner gaining traction)
- [ ] Create `wlWizardSteps: WlWizardStep[]` — 5 steps with icons
- [ ] Create `wlBooking` mock object for confirmation state

**File:** `src/components/white-label/WlBrandContext.tsx` (NEW)

- [ ] Create `BrandContextType` with `brand: BrandConfig` and `setBrand: (config: BrandConfig) => void`
- [ ] Create `BrandProvider` component:
  - Loads from localStorage (`white-label-config`) on mount, falls back to `defaultMeridianConfig`
  - On brand change: updates React state, persists to localStorage, updates CSS custom properties via `document.documentElement.style.setProperty()`
- [ ] Export `useBrandContext()` hook

### Phase 2: Admin Dashboard

**File:** `src/pages/WhiteLabel.tsx` (NEW — main page)

- [ ] Import `BrandProvider` wrapper
- [ ] Create `type AdminView = 'dashboard' | 'wizard' | 'configure'`
- [ ] Default view: `dashboard` (shows analytics + quick-config + preview)
- [ ] Add ESC key handler to return to dashboard (follows BusinessTravel pattern)

**Admin Dashboard layout:**
- [ ] Left panel (60%): Analytics charts + KPI cards
- [ ] Right panel (40%): Live customer preview (embedded component, not iframe)
- [ ] Tab bar at top: "Dashboard" | "Configure Brand" | "Onboarding Wizard"

**KPI Cards Row:**
- [ ] 4 metric cards: Total Clicks (with trend), Bookings This Month, Revenue (£), Conversion Rate (%)
- [ ] Each card: large number, trend arrow (up/down), percentage change, sparkline

**Analytics Charts:**
- [ ] Line chart: Daily clicks (30 days) — BPK_SKY_BLUE stroke
- [ ] Bar chart: Daily bookings — BPK_ECO_GREEN fill
- [ ] Area chart: Daily revenue (£) — BPK_BERRY fill with 0.3 opacity
- [ ] Time range pills: "7 Days" | "30 Days" (default) | "90 Days" — filter data array
- [ ] Hover tooltips with exact values and formatted currencies
- [ ] Define chart color constants at file top (raw RGB strings, not CSS vars):
  ```typescript
  const BPK_SKY_BLUE = 'rgb(0, 98, 227)'
  const BPK_ECO = 'rgb(15, 161, 169)'
  const BPK_BERRY = 'rgb(231, 8, 102)'
  const BPK_TEXT_SECONDARY = 'rgb(98, 105, 113)'
  const BPK_LINE = 'rgb(193, 199, 207)'
  ```

**Live Preview Panel (right side):**
- [ ] Renders `WlCustomerPreview` component directly (not iframe)
- [ ] Shows a miniaturized customer landing page with current brand config
- [ ] Updates instantly when brand config changes via Context
- [ ] "Open Full Preview" link → navigates to `/white-label/customer`

### Phase 3: Onboarding Wizard

**File:** `src/components/white-label/WlOnboardingWizard.tsx` (NEW)

- [ ] 5-step wizard with progress bar at top (numbered circles connected by lines)
- [ ] State: `activeStep: number` (0-4)
- [ ] Each step renders a form section with specific inputs:

**Step 1 — Brand Identity:**
- [ ] Logo URL input (text field — paste Unsplash URL for demo simplicity)
- [ ] Primary color picker (hex input + color swatch)
- [ ] Secondary/accent color picker
- [ ] Font family dropdown: "DM Sans" | "Inter" | "Poppins" | "Source Sans Pro"
- [ ] Button radius slider: 0px (square) to 24px (pill) with live preview button below
- [ ] Preview: Small card showing button + text in selected brand

**Step 2 — Flight Configuration:**
- [ ] Default cabin class: Radio buttons (Economy | Business | First)
- [ ] Include baggage: Toggle (Yes/No) with "Checked bag included" label
- [ ] Max connections: Radio buttons (Direct only | 1 stop | Any)
- [ ] Preferred airlines: Multi-select chips (BA, Virgin, AA, Delta, United)

**Step 3 — Pricing & Margin:**
- [ ] Markup type: Radio buttons (Percentage | Fixed Amount)
- [ ] Markup value: Number input (default 5%) with "Your margin per booking" label
- [ ] Currency: Dropdown (GBP £ | EUR € | USD $)
- [ ] Preview: "Customer sees: £420 → You earn: £21 per booking"

**Step 4 — Integrations:**
- [ ] Checkboxes with logos/icons (visual only, non-functional for demo):
  - Payment: Stripe (checked), PayPal, Apple Pay
  - Analytics: Google Analytics (checked), Mixpanel
  - CRM: Salesforce, HubSpot
  - Notifications: Email (checked), SMS, Push
- [ ] Each shows a green checkmark when "connected"

**Step 5 — Review & Launch:**
- [ ] Read-only summary of all 4 previous steps with "Edit" links
- [ ] Brand preview card showing logo, colors, button sample
- [ ] "Launch Your Travel Platform" button (primary, full-width)
- [ ] On click: confetti animation (CSS keyframes) → toast "Platform is live!" → redirect to dashboard after 2s

**Navigation:**
- [ ] "Back" and "Next" buttons at bottom of each step
- [ ] Step 1: no Back button
- [ ] Step 5: "Next" replaced by "Launch" button
- [ ] Steps are clickable in progress bar to jump (if already completed)
- [ ] All config changes update BrandContext in real-time

### Phase 4: Brand Configurator

**File:** `src/components/white-label/WlBrandConfigurator.tsx` (NEW)

- [ ] Full-screen two-column layout:
  - Left (50%): Configuration controls (same as wizard Step 1, but standalone)
  - Right (50%): Live customer preview component
- [ ] Color picker changes debounced at 150ms (update CSS vars via `document.documentElement.style.setProperty`)
- [ ] Slider changes debounced at 100ms
- [ ] Logo/font changes immediate (discrete selections)
- [ ] "Reset to Meridian Defaults" button at bottom
- [ ] "Save Configuration" button → persists to localStorage → toast "Brand saved"

### Phase 5: Customer-Facing Product

**File:** `src/components/white-label/WlCustomerApp.tsx` (NEW — state machine root)

- [ ] Create `type CustomerState = 'landing' | 'results' | 'booking' | 'confirmed' | 'alerts' | 'trips'`
- [ ] Wrap in `useBrandContext()` — all child components use brand tokens
- [ ] Customer-side header: partner logo (from brand config) + nav links + "Powered by Skyscanner" small badge
- [ ] ESC key: return to landing state

**File:** `src/components/white-label/WlLandingPage.tsx` (NEW)

- [ ] Hero section with search form:
  - "From" / "To" airport inputs (pre-filled LHR → JFK for demo)
  - Date picker (text input showing "15 Mar 2026")
  - Passengers dropdown (default: 1 Adult)
  - "Search Flights" button in `wl-primary` color with `wl-radius` border radius
- [ ] Featured routes section: 3 cards (London→NYC, London→Dubai, London→Tokyo) with prices
- [ ] "Powered by Skyscanner" badge in bottom-right of hero
- [ ] All colors use `text-wl-primary`, `bg-wl-primary`, `text-wl-accent` etc.

**File:** `src/components/white-label/WlFlightResults.tsx` (NEW)

- [ ] Header: "London → New York" with date and passenger count
- [ ] Filter bar: Sort by (Score | Price | Duration), Stops (Any | Direct | 1 Stop), Airlines (multi-select)
- [ ] Flight cards (8 results from mock data):
  - Left: Airline logo + name
  - Center: Departure time → Duration bar → Arrival time, stops info
  - Right: Flight Score badge (color-coded) + Price (large)
  - Score tooltip on hover: shows 5-factor breakdown with mini bar chart
- [ ] "Freeze Price" button on each card → adds to frozen list, shows toast
- [ ] "Set Alert" button → opens alert config modal
- [ ] Card click → transitions to `booking` state with selected flight

**File:** `src/components/white-label/WlBookingFlow.tsx` (NEW)

- [ ] Selected flight summary at top (airline, times, price, score)
- [ ] Two-section form:
  - **Passenger Details**: Full name, Email, Phone (pre-filled for demo: "James Mitchell", "j.mitchell@meridianbank.co.uk")
  - **Payment**: Card number (pre-filled: "•••• •••• •••• 4242"), Expiry, CVV
- [ ] "Confirm Booking" button in `wl-primary` color
- [ ] On confirm: 1.5s thinking animation → transitions to `confirmed` state

**File:** `src/components/white-label/WlConfirmation.tsx` (NEW)

- [ ] Success checkmark animation (CSS scale + fade-in)
- [ ] Booking reference: "MBT-" + random 6 chars
- [ ] Flight details summary
- [ ] "A confirmation email has been sent to j.mitchell@meridianbank.co.uk"
- [ ] Two CTAs: "View My Trips" → trips state, "Search More Flights" → landing state
- [ ] Branded in partner colors with Meridian logo

**File:** `src/components/white-label/WlPriceFreeze.tsx` (NEW — banner component)

- [ ] Persistent banner below customer header when frozen flights exist
- [ ] Shows: "1 flight frozen | 47h 38m remaining" with countdown
- [ ] Click → opens modal listing frozen flights with individual timers
- [ ] Each frozen flight: airline, route, frozen price, countdown, "Book Now" CTA
- [ ] Timer uses `useState` for seconds + `useEffect` with `setTimeout` (StrictMode-safe pattern)
- [ ] Timer stored in state, not mutable closure variable

**File:** `src/components/white-label/WlMyTrips.tsx` (NEW)

- [ ] Two tabs: "Upcoming" (default) | "Past"
- [ ] Trip cards: Destination, date, airline logo, booking ref, status badge
- [ ] Detail modal on card click: full flight info, passenger name, seat "14A" (mock), "Download Ticket" button (shows toast)
- [ ] Empty state (Upcoming): "No upcoming trips yet" with "Search Flights" CTA
- [ ] Past tab: 1-2 pre-seeded past trips for demo richness

### Phase 6: Routing + DemoHub Registration

**File:** `src/App.tsx`

- [ ] Import `WhiteLabel` page component
- [ ] Add routes:
  ```tsx
  <Route path="/white-label" element={<WhiteLabel />} />
  <Route path="/white-label/admin" element={<WhiteLabel />} />
  <Route path="/white-label/customer" element={<WhiteLabel />} />
  ```
- [ ] WhiteLabel component reads `location.pathname` to determine which view to show

**File:** `src/pages/DemoHub.tsx`

- [ ] Add 8th demo to `demos` array:
  ```typescript
  {
    to: '/white-label',
    icon: Palette, // from lucide-react
    title: 'White-Label Platform',
    description: 'Partner-branded travel products powered by Skyscanner intelligence',
    phase: 'B2B Platform',
    color: 'bg-eco',
  }
  ```
- [ ] Update hero text: "Seven products" → "Eight products"
- [ ] Import `Palette` from lucide-react

**File:** `src/index.css`

- [ ] Add Meridian default tokens in `:root`:
  ```css
  /* White-Label brand tokens (updatable via JS) */
  --wl-primary: #1B3A5C;
  --wl-accent: #C9A84C;
  --wl-radius: 9999px;
  --wl-font: 'DM Sans', sans-serif;
  ```
- [ ] Add to `@theme inline` block:
  ```css
  --color-wl-primary: var(--wl-primary);
  --color-wl-accent: var(--wl-accent);
  ```
- [ ] Add Google Fonts import for DM Sans at top of file:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
  ```

### Phase 7: Polish + Verify

- [ ] Build passes (`npm run build`) — no unused imports, no type errors
- [ ] DemoHub shows 8th card with correct icon, title, description
- [ ] Admin dashboard: analytics charts render with tooltips, time range filter works
- [ ] KPI cards show formatted numbers with trend arrows
- [ ] Onboarding wizard: all 5 steps navigable, brand preview updates live
- [ ] Brand configurator: color/font/radius changes update customer preview instantly
- [ ] Customer landing: search form styled in Meridian brand, "Powered by Skyscanner" visible
- [ ] Flight results: 8 cards with scores, sort/filter works, Score tooltip shows breakdown
- [ ] Price Freeze: countdown timer ticks, frozen flights banner appears
- [ ] Booking flow: form pre-filled, confirmation shows with booking ref
- [ ] My Trips: shows booked flight, detail modal opens
- [ ] ESC key resets both admin and customer views
- [ ] Page refresh preserves brand config (localStorage)
- [ ] No console errors or warnings
- [ ] Font loads correctly (DM Sans on customer side)

## Presentation Flow (Recommended Demo Script)

1. **Start at DemoHub** — click White-Label Platform card
2. **Admin Dashboard** — show analytics charts, hover for tooltips, switch time ranges
3. **Brand Configurator** — change primary color from navy to teal → watch preview update instantly
4. **Reset to Meridian** — click "Reset to Defaults"
5. **Quick Wizard walkthrough** — click through 5 steps (pre-filled values), hit "Launch"
6. **Switch to Customer View** — click "Open Full Preview" or navigate to `/white-label/customer`
7. **Customer Landing** — point out Meridian branding, "Powered by Skyscanner" badge
8. **Search Flights** — click "Search Flights" with pre-filled LHR→JFK
9. **Flight Results** — hover Flight Score for breakdown, sort by different criteria
10. **Freeze a Price** — click "Freeze Price" on a flight, show countdown banner
11. **Book a Flight** — click top-scored flight, confirm booking with pre-filled form
12. **Confirmation** — show booking ref, Meridian branding throughout
13. **My Trips** — navigate to trips, show saved booking

**Key talking points:**
- "Every color, font, and button you see is configurable by the partner"
- "Flight Score brings Skyscanner's intelligence to the partner's brand"
- "Price Freeze and Alerts are Skyscanner features the partner can offer as their own"
- "The partner sees analytics; the customer sees their trusted bank's brand"

## Dependencies & Risks

| Risk | Mitigation |
|------|------------|
| Build time exceeds 3-4 hours | Phase 5 components can be simplified (fewer features, simpler layouts) |
| DM Sans font fails to load | Fallback chain: `'DM Sans', 'Inter', system-ui, sans-serif` |
| Recharts can't use CSS variables | Use raw RGB string constants (documented pattern) |
| StrictMode double-fires timer effects | Use `useState` for countdown step, single `setTimeout` per render cycle |
| localStorage quota exceeded | Unlikely for config object; add try/catch around setItem |
| Color picker flicker on rapid drag | Debounce CSS property updates at 150ms |
| Customer components too large for one file | Extract to `src/components/white-label/` with `Wl` prefix |
| Too many unused imports failing build | Clean up imports before each `npm run build` |

## References

### Internal

- Multi-state demo pattern: `src/pages/BusinessTravel.tsx:23-108`
- Recharts usage: `src/pages/PriceIntelligence.tsx:8-11` (color constants), `:95-132` (chart structure)
- DemoHub registration: `src/pages/DemoHub.tsx:4-61`
- Routing: `src/App.tsx:22-34`
- BPK tokens: `src/index.css:4-99`
- Timer safe pattern: `src/pages/TripPlanner.tsx:41-48`
- Component extraction: `src/components/business-travel/` (11 sub-components)
- Tab navigation: `src/components/business-travel/BizMultiCityTabs.tsx:46-68`
- Data file convention: `src/data/business-travel.ts` (complex interfaces + exports)
- CSS Platform localStorage: `pocs/css-flight-site/` (used `css-created-sites` key)

### Past Solutions (docs/solutions/)

- `docs/solutions/runtime-errors/react-strictmode-double-fire-closure-corruption.md` — CRITICAL: timer pattern
- `docs/solutions/patterns/multi-state-demo-page-architecture.md` — state machine pattern
- `docs/solutions/ui-bugs/backpack-design-system-compliance-integration.md` — Recharts + BPK tokens
- `docs/solutions/ui-bugs/leaflet-map-rerender-and-timer-race-fixes.md` — useRef for event handler timers
- `docs/solutions/deployment/vercel-spa-client-side-routing-404.md` — SPA routing on Vercel (already configured)

### External

- DM Sans font: Google Fonts
- Recharts docs: https://recharts.org/en-US/api
- react-leaflet (not needed — no maps in this demo)
