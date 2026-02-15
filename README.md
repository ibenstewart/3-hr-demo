# Three Hour Build Challenge

**What if one engineer could build all of this in a few hours?**

Six interactive product demos exploring what SkyVoyager could look like as a travel operating system — consumer and business. Every demo was built from scratch with AI pair programming (Claude Code) in a single session.

## The Demos

### 1. AI Trip Planner
Conversational trip planning that replaces 10 browser tabs. Type a natural language query like "10 days in Japan, cherry blossom season" and get a full day-by-day itinerary with flights, hotels, and activities. Edit any day with AI assistance.

### 2. In-Trip Companion
A post-booking travel assistant for your Barcelona trip. Day-by-day schedule with weather, an AI chat overlay for real-time questions, and quick actions for common in-trip needs.

### 3. Smart Ancillaries
AI-powered personalised upselling after booking. Shows contextual add-ons (seats, bags, lounge, insurance) with a trip readiness score and running total.

### 4. Price Intelligence
Predictive pricing with a 90-day price history chart, AI-generated buy/wait verdicts, and a Price Freeze countdown timer.

### 5. Tours & Experiences
Activity metasearch for Barcelona — compare prices across Viator, GetYourGuide, and direct operators. Category filters, sort options, detail pages with reviews, availability calendar, and smart cross-sell suggestions.

### 6. Business Travel Agent
Full B2B business travel flow: natural language search, AI-curated flight/hotel options with policy compliance, Slack-based manager approval, automated booking, and real-time disruption handling with rebooking alternatives.

## Running Locally

```bash
npm install
npm run dev
```

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 with SkyVoyager Backpack design tokens
- React Router 7
- Recharts (price history chart)
- Lucide React (icons)
- All data is mock — no backend required

## Built With

Built entirely with [Claude Code](https://claude.com/claude-code) as an AI pair programming experiment.
