---
title: "Vercel 404 on Direct Navigation to SPA Client-Side Routes"
date: 2026-02-17
category: deployment
tags:
  - vercel
  - react-router
  - spa
  - client-side-routing
  - vite
severity: low
component: Vercel deployment
problem_type: deployment-configuration
status: solved
related:
  - docs/solutions/integration-issues/streaming-ai-api-vite-vercel.md
  - docs/solutions/integration-issues/anthropic-api-proxy-vite-vercel-integration.md
---

# Vercel 404 on Direct Navigation to SPA Client-Side Routes

## Problem

Direct navigation to client-side routes (e.g., `https://app.vercel.app/marketing`) returns **404 Not Found** from Vercel. In-app navigation via React Router `<Link>` components works fine. Refreshing or bookmarking any non-root URL fails.

**Exact symptom:** Routes work in dev (`npm run dev`), load at `/` on Vercel, but return 404 at `/marketing`, `/trip-planner`, or any other client-side route.

## Root Cause

Vercel's static file server responds to HTTP requests by looking for a matching file on disk. For a Vite SPA build:

- Build output is `dist/index.html` plus JS bundles
- React Router 7 runs in the browser and handles routes like `/marketing` entirely in JavaScript
- When Vercel receives a request to `/marketing`, it finds no matching file and returns 404 **before React ever boots**

The root cause: Vercel never serves `index.html`, so React Router never loads to handle the client-side route.

## Solution

Create `vercel.json` in the project root:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

The regex `((?!api/).*)` is a negative lookahead that matches all paths EXCEPT those starting with `api/`, preserving Vercel serverless function routing while sending everything else to `index.html` for React Router to handle.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rewrite pattern | Negative lookahead `(?!api/)` | Preserves `/api/*` serverless function routing while catching all SPA routes |
| Config location | `vercel.json` (not vite.config.ts) | Vite doesn't control Vercel's file serving — only `vercel.json` matters for deployment routing |
| Approach | Rewrites, not redirects | Rewrites are invisible to the browser (URL stays the same); redirects would change the URL |

### Why Not Other Approaches

| Approach | Why Not |
|----------|---------|
| `"source": "/*"` (no exclusion) | Would rewrite `/api/*` requests to `index.html`, breaking serverless functions |
| Client-side error boundary | 404 happens before React loads — browser never executes any JS |
| Build-time pre-rendering | Defeats the purpose of an SPA; requires static HTML for every route |
| Fix in vite.config.ts | Vite dev server handles SPA fallback automatically; this is a deployment issue only |

## Prevention

### Checklist for SPA Deployments on Vercel

- [ ] `vercel.json` exists at project root with rewrites config
- [ ] API routes excluded from rewrite if you have serverless functions
- [ ] `vercel.json` is committed to git (not `.gitignore`d)
- [ ] Test direct URL navigation after first deploy, not just in-app links

### When This Applies

**You need this for:** Any SPA with client-side routing on Vercel (React Router, Vue Router, etc.)

**You don't need this for:** Next.js (handles automatically), static sites with no routing, server-rendered apps, or other hosts (Netlify uses `_redirects`, Cloudflare Pages uses `_redirects`).

### Symptoms Checklist

1. Routes work in dev but not on Vercel
2. Root `/` loads but all other routes 404
3. In-app `<Link>` navigation works, direct URL navigation fails
4. Page refresh on any non-root route returns 404

## Files

| File | What Changed |
|------|-------------|
| `vercel.json` | Created with SPA rewrite rule |

## Cross-References

- [Streaming AI API + Vercel Edge Functions](../integration-issues/streaming-ai-api-vite-vercel.md) — documents the full Vite + Vercel deployment architecture and how `/api/*` routes work
- [Anthropic API Proxy + Vite + Vercel](../integration-issues/anthropic-api-proxy-vite-vercel-integration.md) — covers complementary Vite dev proxy pattern and Vercel Edge Functions
- [CLAUDE.md deployment section](../../CLAUDE.md) — Vercel builds on push to main
