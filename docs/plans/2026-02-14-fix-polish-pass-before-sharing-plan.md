---
title: "fix: Polish pass before sharing"
type: fix
status: completed
date: 2026-02-14
---

# fix: Polish pass before sharing

Quick cleanup before putting the demo on GitHub.

## Changes

### 1. DemoHub hero text updates

**File:** `src/pages/DemoHub.tsx`

- [x] Change `"Weekend Build Challenge"` → `"Three Hour Build Challenge"`
- [x] Change `"in a weekend?"` → `"in a few hours?"`
- [x] Remove the subtitle paragraph ("Six product prototypes that tell the story of SkyVoyager...")

### 2. Remove Traveller Journey section

**File:** `src/pages/DemoHub.tsx`

- [x] Remove the entire "Narrative Arc" section (lines 110-132) — the journey pills + copy at the bottom of the hub

### 3. Fix broken Unsplash images on Experiences page

**File:** `src/data/experiences.ts`

Three Unsplash photo IDs are returning 404. They affect 5 experience cards + the Experiences page hero:

| Broken photo ID | Used by | Replacement |
|---|---|---|
| `photo-1583779457711-ab081bfca7a7` | sagrada-familia | `photo-1523531294919-4bcd7c65e216` |
| `photo-1583779457711-ab081bfca7a7` | casa-batllo | `photo-1562883676-8c7feb83f09b` |
| `photo-1583422409516-2895a77efed6` | gothic-quarter-walk | `photo-1539037116277-4db20889f2d4` |
| `photo-1583422409516-2895a77efed6` | bunkers-carmel | `photo-1546636889-ba9fdd63583e` |
| `photo-1558618666-fcd25c85f82e` | montserrat | `photo-1585208798174-6cedd86e019a` |
| `photo-1558618666-fcd25c85f82e` | bike-tour | `photo-1507525428034-b723cf961d3e` |

- [x] Replace sagrada-familia image
- [x] Replace casa-batllo image (now unique from sagrada-familia)
- [x] Replace gothic-quarter-walk image
- [x] Replace bunkers-carmel image
- [x] Replace montserrat image
- [x] Replace bike-tour image

**File:** `src/pages/Experiences.tsx`

- [x] Replace hero background image with `photo-1552832230-c0197dd311b5`

### 4. Verify all other image URLs still work

- [x] Confirmed remaining 10 Unsplash URLs return 200 (checked during research phase)

## Out of scope

- Trip Planner: looks good, no changes
- In-Trip Companion: no changes requested
- Smart Ancillaries / Price Intelligence: no changes requested
- Business Travel: working after timer fix
