---
title: White-Label Demo — Ground in Real Skyscanner WL Context
date: 2026-02-20
topic: white-label-real-context
status: complete
---

# White-Label Demo: Ground in Real Skyscanner WL Context

## What We're Building

An update to the existing White-Label Platform demo (Demo 8) that grounds it in real Skyscanner white-label history, architecture decisions, and commercial models. The current demo uses a fictional "Meridian Bank" partner and generic onboarding. The updated version should feel informed by real internal context without naming specific partners.

## Why This Update

Internal Confluence docs, Slack threads, and the active business case work (Piero/Nedra) reveal that:

1. **Skyscanner had a WL product before** — decommissioned in 2020, losing Lonely Planet, Travel Super Market, and MSN
2. **Three architecture approaches** are being debated internally (configurable consumer site, SMP-hosted separate WL, componentized consumer site reuse)
3. **Active partner interest** exists (Opera, DDG, and others)
4. **Real setup process** is documented: CNAME, verticals, themes, languages, widgets
5. **Revenue model** is revenue share / CPA, not fixed markup

The demo should resonate with internal stakeholders who know this history while still working as a general showcase.

## Key Decisions

### 1. Audience: Both internal and external
The demo is part of the 8-demo showcase. Needs to work for anyone but should feel informed by real context.

### 2. Acknowledge the 2020 decommission
Add a "lessons learned" or timeline element showing why this iteration is different (componentized architecture, self-serve onboarding, analytics dashboard, clear lifecycle ownership). Makes the pitch credible, not naive.

### 3. Architecture: Show Option 3 (componentized) as the vision
Don't present all 3 options as a decision framework. The demo IS the vision of what a componentized, self-serve white-label looks like. The admin dashboard, brand configurator, and customer experience together show what this approach delivers.

### 4. Partner: Generic but realistic
Replace "Meridian Bank" with a travel/fintech-adjacent partner name (e.g., "TravelConnect" or "FlyDirect"). Avoids internal politics while feeling more realistic than a bank example.

### 5. Onboarding wizard: Mirror real Skyscanner checklist
Replace current wizard steps with the actual WL setup process:
- CNAME / domain configuration
- Verticals (Flights / Car Hire / Both)
- Brand theming (logo, colors, fonts — keep existing)
- Languages and default market/currency
- Widget configuration
- Review and launch

### 6. Revenue model: Show both options
Wizard offers "Revenue Share" or "Fixed Markup" as commercial models. Shows flexibility and matches how Skyscanner actually thinks about WL monetization.

## What Changes

| Area | Current | Updated |
|------|---------|---------|
| Partner name | Meridian Bank (navy/gold) | TravelConnect or similar (new palette TBD) |
| Onboarding wizard | Brand, Flights, Pricing, Integrations, Launch | CNAME, Verticals, Branding, Languages, Widgets, Review |
| Revenue model | Markup type + percentage slider | Revenue Share OR Fixed Markup selection |
| Dashboard | Analytics only | Analytics + "WL History" timeline or lessons section |
| Architecture framing | None | Positioned as "Option 3: Componentized" approach |
| Real context | None | 2020 decommission acknowledged, "why this time is different" narrative |

## What Stays the Same

- Customer-facing flight search, Flight Score, booking flow, My Trips
- Admin dashboard charts (Recharts)
- Brand configurator with live preview
- Dual CSS theming architecture (Backpack admin + dynamic customer)
- React Context + localStorage persistence

## Open Questions

None — all key decisions resolved through brainstorm dialogue.

## Source Material

- **White Label Search** (Confluence) — architecture options, partner opportunity, decommission history
- **Setting up a new White Label** (Confluence) — operational checklist, CNAME, themes, languages
- **Domain: Partner Solutions** (Confluence) — B2B context, Microsoft 2015 partnership
- **Slack threads** — Piero Sierra on DDG interest and WL scoping, active business case work
