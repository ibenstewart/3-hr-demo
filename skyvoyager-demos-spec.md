# SkyVoyager Weekend Demos: Build Specs for Claude Code

## Purpose

These specs are for five functional web app demos that prove a single engineer with AI tools can build meaningful product prototypes in a weekend. The audience is SkyVoyager's senior leadership team (CEO, Strategy, Commercial, Product, M&A). The goal is to shift their mental model: these aren't 12-month roadmap items. They're weekend builds.

Each demo should look and feel like a real SkyVoyager product. They use mock data, but the UI, interactions, and flows should be polished enough that someone could mistake them for an internal prototype from an actual product team.

---

## Design System: Backpack-Inspired

Since we can't use the proprietary `@skyvoyager/backpack-web` npm package outside the SkyVoyager codebase, replicate the visual language using these tokens and principles.

### Colours

| Token | Hex | Usage |
|-------|-----|-------|
| Sky Blue (Primary) | `#0770E3` | Primary buttons, links, active states, accent |
| Dark Navy (Haiti) | `#121234` | Headers, hero sections, dark backgrounds |
| White | `#FFFFFF` | Page backgrounds, card backgrounds |
| Light Grey (Canvas) | `#F1F2F8` | Page canvas, section backgrounds |
| Mid Grey (Line) | `#C2C9CD` | Borders, dividers |
| Dark Grey (Text Primary) | `#111236` | Body text, headings |
| Text Secondary | `#68697F` | Secondary text, labels |
| Cabaret (Accent) | `#D1435B` | Warnings, price highlights, deals |
| Green (Status) | `#0C838A` | Success states, savings indicators |
| Coral Orange | `#FF7B59` | Warm accent for travel inspiration |

### Typography

Use `"SkyVoyager Relative", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` as the font stack. Since we don't have the proprietary font file, the system sans-serif fallback will look close enough.

| Style | Size | Weight | Line Height |
|-------|------|--------|-------------|
| Hero | 40px | 900 (Black) | 44px |
| Heading 1 | 30px | 700 | 36px |
| Heading 2 | 24px | 700 | 28px |
| Heading 3 | 20px | 700 | 24px |
| Body (Base) | 16px | 400 | 24px |
| Body Small | 14px | 400 | 20px |
| Caption | 12px | 400 | 16px |
| Label | 14px | 700 | 20px |

### Spacing (8px Grid)

All spacing should be multiples of 8px: `4, 8, 12, 16, 24, 32, 48, 64`.

### Components to Replicate

- **Cards**: White background, `border-radius: 12px`, subtle shadow (`0 1px 3px rgba(17,18,54,0.1)`), hover lift effect.
- **Buttons**: Primary = Sky Blue bg, white text, `border-radius: 8px`, `padding: 12px 24px`, `font-weight: 700`. Secondary = white bg, Sky Blue border and text.
- **Chips/Tags**: `border-radius: 20px`, `padding: 4px 12px`, light blue bg (`#E1F0FF`) with Sky Blue text for selected state. Grey bg for unselected.
- **Input Fields**: `border: 1px solid #C2C9CD`, `border-radius: 8px`, `padding: 12px 16px`. Focus state = Sky Blue border.
- **Navigation Bar**: Haiti background, white text, SkyVoyager sunrise logo (use an SVG of the SkyVoyager sunrise symbol or just text "SkyVoyager" in white, 700 weight).
- **Bottom Sheet / Drawer**: Slides up from bottom on mobile, `border-radius: 16px 16px 0 0` at top.

### General Rules

- Mobile-first responsive. Demo should look great on a laptop screen but also not break on mobile.
- Use CSS Grid or Flexbox. No heavy frameworks needed.
- Light mode only (no dark mode needed for demo).
- Subtle animations: 200ms ease transitions on hover/focus states. Card hover = translate Y -2px + shadow increase.
- No loading spinners unless demonstrating an AI response. For AI responses, use a pulsing dot animation.

---

## Tech Stack for All Demos

- **Framework**: React (single-page app, Vite or Next.js, whichever is faster to scaffold)
- **Styling**: Tailwind CSS with custom config matching the Backpack tokens above, or plain CSS modules. Either is fine, just be consistent across all five demos.
- **AI Interactions**: Mock the AI responses with realistic delays (1-2 seconds) and streaming text effect. Use hardcoded mock data. No actual API calls needed.
- **Data**: All data is mock/hardcoded JSON. Make it realistic. Use real airline names, real city names, real-ish pricing (GBP).
- **Deployment**: Each demo should be a standalone app that runs with `npm run dev`. If it's easier, build all five as routes in one app.

---

## Demo 1: AI Trip Planner

### What It Proves

SkyVoyager can own the Discover and Plan phases of the traveller journey, not just search. This replaces the "10 browser tabs" experience of trip planning with a single conversational interface.

### The Flow

1. **Landing screen**: A clean search-style interface. Single text input (large, centered) with placeholder text: "Where do you want to go?" Below: a few suggested prompt chips like "10 days in Japan, cherry blossom season", "Weekend city break under £300", "Family beach holiday in August".

2. **User types or selects a prompt**: Input accepts natural language. Example: "10 days in Japan in April, budget £4,000, flying from Edinburgh"

3. **AI generates itinerary**: After a 1.5 second simulated delay with streaming text animation, the app shows a full itinerary view:
   - **Summary card** at top: destination, dates, total estimated cost, trip type tags (e.g. "Culture", "Food", "Nature")
   - **Day-by-day timeline**: Left sidebar with day numbers (Day 1, Day 2... Day 10). Each day card shows:
     - City/area for that day
     - 2-3 activities with time slots (e.g. "Morning: Fushimi Inari Shrine", "Afternoon: Nishiki Market")
     - Accommodation for the night
     - Estimated daily cost
   - **Right panel** (or below on mobile): Map with pins for each day's location. Use a static map image or a simple interactive map (Leaflet.js with OpenStreetMap tiles if easy, otherwise a styled placeholder).

4. **Editable**: Each day card has an "Edit" button. Clicking it opens an inline editor where the user can type "swap the shrine visit for a cooking class" and the AI "adjusts" (mock: just swap the content).

5. **Flight + Hotel summary**: At bottom, show a price breakdown card:
   - Flights: Edinburgh to Tokyo (return) - £680
   - Hotels: 10 nights average £95/night - £950
   - Activities: estimated £400
   - Total: ~£2,030
   - CTA button: "Search flights on SkyVoyager" (links nowhere, just styled correctly)

### Mock Data

Create a complete 10-day Japan itinerary with real places, real activities, realistic GBP pricing. Cover Tokyo (3 days), Hakone (1 day), Kyoto (3 days), Osaka (2 days), Nara (day trip). Include specific restaurant names, temple names, transport between cities (Shinkansen).

---

## Demo 2: In-Trip Companion

### What It Proves

SkyVoyager can exist beyond the booking moment. This shows a post-booking experience that keeps travellers engaged during their trip, opening up ground transport, dining, experiences, and insurance revenue streams.

### The Flow

1. **Home screen**: Shows the user's "current trip" card. Example: "Barcelona, 12-16 Feb 2026". Below: today's schedule timeline and a floating chat button.

2. **Today's timeline view**: A vertical timeline for the current day showing:
   - 06:30 - Alarm suggestion: "Your flight EZY8723 departs at 09:15. Leave for airport by 06:45."
   - 09:15 - Flight card: Edinburgh → Barcelona, EasyJet, Gate 14, On Time (green badge)
   - 12:30 - Arrival card: "Welcome to Barcelona! 18°C, Sunny." with transport options: "Aerobus to city centre - €7.75 | Taxi - ~€39 | Metro - €5.50"
   - 14:00 - Hotel check-in: "Hotel Neri, Gothic Quarter. Check-in from 14:00"
   - 15:30 - Suggestion card: "Explore the Gothic Quarter? 15 min walk from your hotel." with a mini map.
   - 20:00 - Dinner suggestion: "Can Culleretes (est. 1786) - Traditional Catalan, 8 min walk, avg €25pp. Book a table?"

3. **Disruption notification**: A prominent alert card (Cabaret/red accent) that appears: "Flight EZY8723 delayed by 45 minutes. New departure: 10:00. Your connection is not affected." With action buttons: "View alternatives" | "Notify hotel of late arrival"

4. **Chat interface**: Tapping the floating button opens a chat. Pre-populated with a few exchanges:
   - User: "What's the best way to get to Park Güell tomorrow?"
   - AI: "From your hotel, take Metro L3 (Liceu) to Vallcarca. It's about 25 minutes and costs €2.55. I'd suggest going first thing at 09:00 to avoid crowds. Want me to add it to tomorrow's schedule?"
   - User can type new messages (mock responses).

5. **Quick actions bar**: At bottom of home screen, icon buttons for: "Transport", "Eat", "See & Do", "Emergency", "Documents" (passport/boarding pass viewer).

### Mock Data

Full 4-day Barcelona trip. Real restaurants, real transport options with real prices in EUR. Real flight number format. Weather data. Include 2-3 "disruption" scenarios ready to show.

---

## Demo 3: Smart Ancillaries Engine

### What It Proves

SkyVoyager is leaving money on the table by ending the relationship at booking. This shows AI-powered, personalised upselling of ancillaries after a flight is booked, with a revenue model that's pure margin.

### The Flow

1. **Post-booking confirmation screen**: Clean card showing the booked flight:
   - Edinburgh → Barcelona, 12 Feb 2026
   - EasyJet EZY8723, 09:15-13:30
   - 2 passengers: Ben Stewart, Sarah Stewart
   - Booking ref: EZY-X7K9M2

2. **AI recommendation engine**: Below the booking card, a section titled "Get ready for Barcelona" with personalised recommendation cards. Each card has:
   - Icon + Title
   - Why it's relevant (short AI-generated explanation)
   - Price
   - "Add" CTA button

3. **Recommended items** (displayed as a scrollable card list):
   - **Seat Selection**: "You're travelling as a couple. Seats 14A & 14B have extra legroom and a window. £24 for both." [Add to trip]
   - **Bags**: "4-day city break? A 23kg hold bag for both should cover it. £38 for two bags." [Add to trip]
   - **Lounge Access**: "Early morning flight. Edinburgh Airport lounge opens at 05:30. Breakfast, coffee, and WiFi. £28pp." [Add to trip]
   - **Travel Insurance**: "Trip protection including flight delays, lost baggage, and medical cover in Spain. £18 for both." [Add to trip]
   - **Airport Parking**: "Edinburgh Airport long stay, 4 days. Pre-book for £32 vs £48 on the day. Saving £16." [Add to trip]
   - **eSIM**: "Stay connected in Spain. 5GB data for 5 days. No roaming charges. £8." [Add to trip]
   - **Airport Transfer**: "Private transfer Barcelona Airport to Gothic Quarter. Fixed price €35, meets you at arrivals." [Add to trip]

4. **Bundle builder**: At bottom, a "Your trip extras" summary that updates as items are added. Shows running total. Big CTA: "Complete your trip - £XX total" with a visual progress bar showing "Trip readiness: 40% → 85%".

5. **Savings callout**: Green accent badge showing "You're saving £23 vs buying separately" when 3+ items are added.

### Mock Data

Use the same Edinburgh → Barcelona trip as Demo 2 for continuity. Real-ish pricing for EasyJet ancillaries. Include the "AI reasoning" for each recommendation (e.g. "Based on your 4-day trip length..." or "Couples typically prefer...").

---

## Demo 4: Price Intelligence + Price Freeze

### What It Proves

SkyVoyager sits on years of pricing data and does almost nothing with it. This demo shows two fintech-adjacent features: predictive pricing guidance and a price lock mechanism, both of which create new revenue streams (price freeze fees) and deepen trust.

### The Flow

**Part A: Price Intelligence Dashboard**

1. **Route search**: Standard SkyVoyager-style origin/destination/date selector at top. Pre-filled: Edinburgh → New York, 15-22 June 2026.

2. **Price history chart**: A clean line chart (use Recharts or Chart.js) showing:
   - X axis: last 12 months of price data for this route
   - Y axis: price in GBP
   - Current price highlighted: £487
   - Historical average line: £520
   - Best price seen: £389 (marked with a dot)
   - Predicted price range for next 30 days: shaded confidence band showing £470-£540

3. **AI price verdict**: A prominent card with a verdict:
   - Large text: "Buy now" or "Wait" or "Good deal"
   - Confidence indicator: "78% confidence"
   - Explanation: "Prices for Edinburgh to New York in June typically rise 15-20% from March onwards. The current price of £487 is £33 below the seasonal average. Our model predicts prices will increase to £520-£540 over the next 4 weeks."
   - Visual: Simple gauge or traffic light (green = buy, amber = fair, red = wait)

4. **Price comparison cards**: Below the chart, show the best current options:
   - Card 1: British Airways, Direct, £487, Depart 08:30
   - Card 2: KLM via Amsterdam, £432, Depart 06:15
   - Card 3: Norwegian, Direct, £459, Depart 11:40
   Each card has a "Freeze this price" button.

**Part B: Price Freeze**

5. **Freeze modal**: Clicking "Freeze this price" opens a modal:
   - "Lock the price of £487 for 72 hours"
   - "Freeze fee: £5 per passenger"
   - "If the price drops, you pay the lower price. If it rises, you're protected."
   - How it works: 3-step visual (1. Freeze today → 2. Decide within 72 hours → 3. Book at frozen price or walk away)
   - CTA: "Freeze for £10" (2 passengers)

6. **Frozen state**: After "freezing", the card updates to show a countdown timer (71:59:32 remaining), the locked price with a blue shield icon, and a "Book now at £487" primary CTA.

### Mock Data

12 months of realistic price data for EDI-JFK route. Should show seasonal patterns (summer peak, January dip, gradual rise from March). Include 5-6 flight options from real airlines with realistic schedules and pricing. The prediction model explanation should reference seasonality, demand patterns, and booking window.

---

## Demo 5: Tours & Experiences Meta

### What It Proves

The most obvious adjacent vertical. SkyVoyager's metasearch model (compare across providers, don't hold inventory) extends naturally to activities and experiences. This captures revenue from the Trip phase and keeps users in the SkyVoyager ecosystem.

### The Flow

1. **Destination landing page**: Header with a hero image of Barcelona. Title: "Things to do in Barcelona". Subtitle: "Compare prices across Viator, GetYourGuide, and direct operators."

2. **Filter/sort bar**: Horizontal filter chips: "All", "Culture", "Food & Drink", "Outdoors", "Tours", "Nightlife", "Family". Sort dropdown: "Recommended", "Price: low to high", "Rating", "Most popular".

3. **Experience cards**: A grid (2-3 columns on desktop, 1 on mobile) of experience cards. Each card:
   - Hero image (use placeholder travel images or solid colour blocks with icons)
   - Title: e.g. "Skip-the-Line Sagrada Família Tour"
   - Rating: 4.8 stars (1,247 reviews)
   - Duration: 1.5 hours
   - **Price comparison row**: This is the key differentiator. Show:
     - Viator: £38
     - GetYourGuide: £42
     - Direct: £35
     - Best price highlighted in green with "Save £7 vs highest"
   - CTA: "View deal" (goes to a detail page)

4. **Experience detail page** (single example is fine): Expanded view with:
   - Large image carousel (placeholder)
   - Full description
   - What's included / What's not
   - Meeting point with mini map
   - Availability calendar (simple date picker showing available slots)
   - Full price comparison table across all providers, including what each includes (e.g. Viator includes audio guide, direct booking includes skip-the-line)
   - Reviews section (3-4 mock reviews)
   - "Book on [Provider]" CTA that opens in new tab (mock link)

5. **Smart suggestions**: Below the main grid, a section: "Based on your Barcelona trip" showing 3-4 cards:
   - "Since you're visiting Park Güell on Day 2, you might like: Gaudí Walking Tour (combines 3 sites, saves 2 hours vs visiting separately)"
   - This ties back to Demo 2's trip data, showing cross-demo integration potential.

6. **Trip integration callout**: Banner at bottom: "Planning a trip? Our AI Trip Planner can add experiences to your itinerary automatically. Try it →" (links to Demo 1)

### Mock Data

15-20 Barcelona experiences with realistic data. Use real activity names (Sagrada Família, Park Güell, La Boqueria food tour, Gothic Quarter walking tour, Montjuïc cable car, Camp Nou tour, flamenco show, cooking class, wine tasting, kayaking on Barceloneta, day trip to Montserrat, etc.). Real-ish pricing across three providers with meaningful price differences. Real ratings and review counts.

---

## Cross-Demo Integration Points

When presenting these demos, the narrative should connect them:

1. **Trip Planner** generates the itinerary (Discover + Plan)
2. **In-Trip Companion** takes over once you're travelling (Manage + Trip)
3. **Smart Ancillaries** monetises the gap between booking and travel (Book → Prepare)
4. **Price Intelligence** makes SkyVoyager the trusted advisor, not just a search box (Plan + Book)
5. **Tours & Experiences** extends metasearch into the Trip phase (Trip)

Together, they tell the story: SkyVoyager can be a travel operating system, not just a flight comparison site. And a single person built all five in a weekend.

---

## File Structure Suggestion

```
skyvoyager-demos/
├── package.json
├── vite.config.js (or next.config.js)
├── tailwind.config.js
├── src/
│   ├── styles/
│   │   └── backpack.css          # Backpack-inspired design tokens as CSS custom properties
│   ├── components/
│   │   ├── Nav.jsx               # Shared SkyVoyager nav bar
│   │   ├── Card.jsx              # Reusable card component
│   │   ├── Button.jsx            # Primary/Secondary button
│   │   ├── Chip.jsx              # Filter chips
│   │   ├── PriceTag.jsx          # Price display with currency
│   │   ├── Rating.jsx            # Star rating display
│   │   ├── Timeline.jsx          # Vertical timeline component
│   │   ├── ChatBubble.jsx        # Chat message bubble
│   │   └── StreamingText.jsx     # AI response streaming animation
│   ├── data/
│   │   ├── japan-itinerary.json  # Demo 1 mock data
│   │   ├── barcelona-trip.json   # Demo 2 mock data
│   │   ├── ancillaries.json      # Demo 3 mock data
│   │   ├── price-history.json    # Demo 4 mock data
│   │   └── experiences.json      # Demo 5 mock data
│   ├── pages/
│   │   ├── TripPlanner.jsx       # Demo 1
│   │   ├── InTripCompanion.jsx   # Demo 2
│   │   ├── Ancillaries.jsx       # Demo 3
│   │   ├── PriceIntelligence.jsx # Demo 4
│   │   └── Experiences.jsx       # Demo 5
│   ├── App.jsx                   # Router with demo selector
│   └── main.jsx
└── public/
    └── skyvoyager-logo.svg       # SkyVoyager sunrise logo
```

---

## Build Order Recommendation

Build in this order for maximum reuse:

1. **Shared components + design tokens first** (Nav, Card, Button, Chip, CSS variables). Get the SkyVoyager look locked in.
2. **Demo 5: Tours & Experiences** - simplest to build, mostly cards and filters. Good for proving the design system works.
3. **Demo 3: Smart Ancillaries** - similar card-based layout, adds interactive "add to cart" state.
4. **Demo 4: Price Intelligence** - introduces charting. Medium complexity.
5. **Demo 1: Trip Planner** - most complex UI (timeline, map, chat-like input). Build on components from earlier demos.
6. **Demo 2: In-Trip Companion** - most complex interactions (timeline, chat, disruption alerts, multiple states). Uses Timeline from Demo 1.

---

## Presentation Notes

When demoing to Bryan and the working group:

- Open each demo full screen in a browser. No code visible.
- Frame each with: "This is what [idea from the long list] could look like as a product."
- After showing all five: "I built all of these last weekend. One person. The technology is not the bottleneck. The question is whether we have the strategic conviction to pursue them."
- Let Kirsten's earlier point land: "Kirsten said in the last session that these could be built by a small team with AI. She was right. Here's the proof."
