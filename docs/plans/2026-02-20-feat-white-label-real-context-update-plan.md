---
title: "feat: Ground White-Label Demo in Real Skyscanner Context"
type: feat
status: completed
date: 2026-02-20
brainstorm: docs/brainstorms/2026-02-20-white-label-demo-real-context-update-brainstorm.md
---

# feat: Ground White-Label Demo in Real Skyscanner Context

## Overview

Update the White-Label Platform demo (Demo 8) to reflect real Skyscanner white-label history, architecture decisions, and commercial models. Replace the fictional "Meridian Bank" with a generic travel-adjacent partner, rewrite the onboarding wizard to mirror Skyscanner's actual WL setup process, add a 2020 decommission timeline to the admin dashboard, and position the demo as the "Option 3: Componentized" architecture vision.

## Problem Statement / Motivation

The current demo uses "Meridian Bank" as a fictional partner with a generic onboarding wizard. Internal stakeholders who know Skyscanner's actual WL history (2015 Microsoft partnership, 2020 decommission of Lonely Planet/MSN/Travel Super Market, active DDG/Opera interest) will see through this. Grounding the demo in real context makes it credible and resonant without naming specific partners.

## Proposed Solution

Six changes across four areas:

1. **Partner rebrand**: Replace "Meridian Bank" → "TravelConnect" throughout (name, colors, email, booking refs)
2. **Wizard rewrite**: 6 real steps — CNAME, Verticals, Branding, Languages, Widgets, Review
3. **Dashboard timeline**: New "Platform Evolution" section showing 2015→2020→2026 with "why this time is different"
4. **Revenue model**: Wizard step offers Revenue Share or Fixed Markup selection
5. **Architecture framing**: Subtle positioning as componentized approach in dashboard/wizard
6. **Marketing data**: Update marketing-plans.ts and geo-markets.ts references

## Technical Considerations

- **BrandConfig interface extension**: Add optional fields for new wizard data (verticals, languages, cname, revenueModel, widgets). Keep them optional so existing localStorage data doesn't break.
- **localStorage migration**: Old `white-label-config` may contain `name: 'Meridian Bank Travel'`. The BrandProvider should detect this and replace with new defaults on load. Simple: if `brand.name` includes "Meridian", reset to defaults.
- **Wizard steps are cosmetic**: Current steps 1-3 use uncontrolled inputs (defaultChecked, defaultValue). This is fine for a demo — the important thing is that the steps _look_ realistic. We keep this pattern.
- **No downstream vertical effects**: Selecting "Flights only" vs "Flights + Car Hire" in the wizard won't change the customer UI (it always shows flights). This is acceptable for a demo.

## Acceptance Criteria

### Phase 1: Partner Rebrand (TravelConnect)
- [x] Rename `defaultMeridianConfig` → `defaultPartnerConfig` in `src/data/white-label.ts:47`
- [x] Update default name to `'TravelConnect'`, new colors (teal/coral palette: primary `#0A6E72`, accent `#E85D3A`), and logo URL
- [x] Update all imports of `defaultMeridianConfig` in `src/components/white-label/WlBrandContext.tsx:4,30,62`
- [x] Replace `'meridianbank.co.uk'` email → `'travelconnect.com'` in `WlBookingFlow.tsx:100` and `WlConfirmation.tsx:73`
- [x] Replace `'MBT-'` booking prefix → `'TC-'` in `WlCustomerApp.tsx:47` and `WlMyTrips.tsx:19-20`
- [x] Update reset button text `'Reset to Meridian Defaults'` → `'Reset to TravelConnect Defaults'` in `WlBrandConfigurator.tsx:111`
- [x] Add localStorage migration: if stored config name includes "Meridian", replace with new defaults in `WlBrandContext.tsx`

### Phase 2: Wizard Rewrite (Real Setup Process)
- [x] Replace `wlWizardSteps` array in `src/data/white-label.ts:204-210` with 6 new steps:
  ```
  1. domain   — "Domain Setup"        — "Configure your CNAME and custom domain"    — Globe
  2. verticals — "Verticals"           — "Choose flights, car hire, or both"         — Layers
  3. brand    — "Brand Identity"       — "Upload your logo and set brand colours"    — Palette
  4. languages — "Languages & Markets" — "Set supported languages and default market" — Languages
  5. widgets  — "Widget Configuration" — "Choose which widgets to embed"             — LayoutGrid
  6. launch   — "Review & Launch"      — "Review your setup and go live"             — Rocket
  ```
- [x] Update `stepIcons` map in `WlOnboardingWizard.tsx:7` with new icon imports (Globe, Layers, Languages, LayoutGrid)
- [x] Update `activeStep < 4` boundary → `activeStep < 5` in wizard navigation (currently line ~316)
- [x] Rewrite step content panels for each of the 6 steps:
  - **Step 0 (Domain)**: Text input for subdomain (e.g., `travel.travelconnect.com`) with CNAME instruction text and a "verified" badge animation
  - **Step 1 (Verticals)**: Radio group — Flights Only / Car Hire Only / Flights + Car Hire (with car hire showing "coming soon" badge)
  - **Step 2 (Brand)**: Keep existing brand configurator content (logo, colors, fonts, radius)
  - **Step 3 (Languages)**: Checkbox grid of languages (English, Spanish, German, French, Arabic, Mandarin) + dropdown for default market/currency
  - **Step 4 (Widgets)**: Checkbox cards for widget types — Search Bar, Deal Cards, Price Alerts, Flight Score Badge
  - **Step 5 (Review & Launch)**: Summary of all selections + revenue model selection + launch button
- [x] Add revenue model selection to Review step: Radio group — "Revenue Share (recommended)" or "Fixed Markup" with brief descriptions

### Phase 3: Dashboard Timeline
- [x] Add "Platform Evolution" section to `WlAdminDashboard.tsx` after the analytics charts grid (after line ~168)
- [x] Timeline shows 3 entries:
  - **2015**: "Microsoft / Bing partnership — first white-label at scale"
  - **2020**: "Platform decommissioned — Lonely Planet, MSN, Travel Super Market offboarded. Lessons: needed self-serve onboarding, better analytics, clear lifecycle ownership"
  - **2026**: "Componentized relaunch — self-serve setup, real-time analytics, brand-native experiences. Built on reusable consumer components."
- [x] Visual: vertical timeline with dots, short cards, and a subtle "Why this time is different" callout below listing 4 improvements (self-serve onboarding, analytics dashboard, componentized architecture, clear lifecycle ownership)

### Phase 4: Marketing Data Updates
- [x] Replace all "Meridian Bank" references in `src/data/marketing-plans.ts` (~lines 829, 840, 865, 869, 893, 911-912) with "TravelConnect"
- [x] Replace "Meridian Bank" reference in `src/data/geo-markets.ts` (~line 1379) with "TravelConnect"
- [x] Update email subjects/copy that reference the partner name

### Quality Gates
- [x] `npm run build` passes with zero errors
- [x] All 8 demos still accessible from nav and DemoHub
- [x] White-label wizard completes all 6 steps and launches to dashboard
- [x] Brand configurator still updates customer-facing app in real time
- [x] Dashboard timeline renders correctly
- [x] localStorage migration works (old Meridian config replaced on load)

## Implementation Notes

### Partner: TravelConnect
- **Name**: TravelConnect
- **Tagline**: "Your gateway to smarter travel"
- **Palette**: Teal primary (`#0A6E72`), coral accent (`#E85D3A`)
- **Font**: Keep DM Sans (clean, modern)
- **Logo**: Use a travel-themed Unsplash image (compass or globe)
- **Email domain**: `travelconnect.com`
- **Booking prefix**: `TC-`

### New BrandConfig Fields (optional, extend interface)
```typescript
export interface BrandConfig {
  name: string
  logo: string
  primaryColor: string
  accentColor: string
  fontFamily: string
  buttonRadius: number
  // New optional fields for wizard persistence (demo only)
  cname?: string
  verticals?: ('flights' | 'car-hire')[]
  languages?: string[]
  defaultMarket?: string
  defaultCurrency?: string
  revenueModel?: 'revenue-share' | 'fixed-markup'
  widgets?: string[]
}
```

### Files to Modify

| # | File | Changes |
|---|------|---------|
| 1 | `src/data/white-label.ts` | Rename config, update defaults, extend interface, rewrite wizard steps |
| 2 | `src/components/white-label/WlBrandContext.tsx` | Update imports, add localStorage migration |
| 3 | `src/components/white-label/WlOnboardingWizard.tsx` | New icons, 6 step content panels, navigation boundary |
| 4 | `src/components/white-label/WlAdminDashboard.tsx` | Add Platform Evolution timeline section |
| 5 | `src/components/white-label/WlBrandConfigurator.tsx` | Update reset button text |
| 6 | `src/components/white-label/WlBookingFlow.tsx` | Update email |
| 7 | `src/components/white-label/WlConfirmation.tsx` | Update email |
| 8 | `src/components/white-label/WlCustomerApp.tsx` | Update booking prefix |
| 9 | `src/components/white-label/WlMyTrips.tsx` | Update booking refs |
| 10 | `src/data/marketing-plans.ts` | Replace Meridian → TravelConnect in copy |
| 11 | `src/data/geo-markets.ts` | Replace Meridian → TravelConnect in copy |

### What Stays the Same
- Customer-facing flight search, Flight Score, booking flow, My Trips
- Admin dashboard charts (Recharts with raw RGB constants)
- Brand configurator with live preview
- Dual CSS theming architecture (Backpack admin + dynamic customer)
- React Context + localStorage persistence pattern
- DemoHub card, Nav link, Marketing Planner integration

## Dependencies & Risks

| Risk | Mitigation |
|------|-----------|
| Old localStorage breaks on rebrand | Migration logic in BrandProvider — detect "Meridian" and reset |
| 6-step wizard feels long | Each step is minimal UI (1-2 inputs). Review step provides satisfying summary |
| Timeline feels preachy | Keep it factual and brief. 3 entries, no editorializing |
| New colors clash with existing UI | Teal/coral is warm and travel-appropriate. Test against Backpack admin palette |

## References & Research

### Internal References
- Brainstorm: `docs/brainstorms/2026-02-20-white-label-demo-real-context-update-brainstorm.md`
- Solution doc: `docs/solutions/integration-issues/white-label-platform-css-theming-recharts-workaround.md`
- Original plan: `docs/plans/2026-02-19-feat-white-label-travel-platform-plan.md`

### Source Material
- White Label Search (Confluence) — architecture options, decommission history
- Setting up a new White Label (Confluence) — CNAME, themes, languages, widget checklist
- Domain: Partner Solutions (Confluence) — Microsoft 2015 partnership context
- Slack threads — DDG interest, active business case work (Piero/Nedra)
