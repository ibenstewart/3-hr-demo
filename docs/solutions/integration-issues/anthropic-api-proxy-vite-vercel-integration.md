---
title: Corporate Proxy Interception & Vite Dev Server API Route Integration
date: 2026-02-15
category: integration-issues
tags: [anthropic-sdk, vite, vercel, corporate-proxy, portkey, environment-variables]
components: [vite.config.ts, api/plan-trip.ts, TripPlanner.tsx, .env.local]
severity: medium
root_cause: |
  Three layered issues: (1) Shell environment leaked corporate Anthropic proxy
  (ANTHROPIC_BASE_URL=Skyscanner Portkey gateway) into Anthropic SDK initialization,
  routing personal API key to corporate gateway. (2) Vite dev server has no mechanism
  to serve Vercel Edge Functions. (3) .env.local vars not available in Vite server plugins
  without explicit loadEnv() call.
symptoms:
  - 401 Portkey Error despite valid personal API key
  - /api/plan-trip returning 404 during local dev with npm run dev
  - process.env.ANTHROPIC_API_KEY undefined in vite.config.ts plugins
  - Claude returning markdown-fenced JSON breaking JSON.parse()
resolution_type: configuration
---

# Corporate Proxy Interception & Vite Dev Server API Route Integration

Four interrelated problems encountered while adding live AI (Anthropic Claude) to a Vite + Vercel React app in a corporate environment.

## Symptoms

1. `401 Portkey Error: Invalid API Key. Error Code: 03` — despite a valid personal Anthropic API key
2. `/api/plan-trip` returning 404 during local development
3. `process.env.ANTHROPIC_API_KEY` undefined inside Vite server plugin
4. `Unexpected token '\`'` — JSON.parse failing on Claude's response

## Investigation

Running `env | grep -i anthropic` revealed corporate shell variables:

```
ANTHROPIC_BASE_URL=https://modelops-gateway.cellsdev-1.skyscannerplatform.net
ANTHROPIC_AUTH_TOKEN=dummy
ANTHROPIC_CUSTOM_HEADERS=x-portkey-api-key: zGBu/OWc5IUhWZ07T25tyEg0JI1N
x-portkey-config: pc-claude-6c0482
```

The Anthropic SDK auto-reads these, silently routing all API calls through the corporate Portkey gateway.

## Solution

### Fix 1: Override Corporate Proxy in SDK Client

The Anthropic SDK reads `ANTHROPIC_BASE_URL` from the environment automatically. Override it explicitly:

```typescript
const client = new Anthropic({
  apiKey,
  baseURL: 'https://api.anthropic.com',
  defaultHeaders: {},
})
```

Setting `defaultHeaders: {}` clears the auto-injected Portkey headers. This must be done in both `vite.config.ts` (dev) and `api/plan-trip.ts` (production).

### Fix 2: Strip Markdown Fences from Claude JSON Responses

Despite the system prompt saying "Return ONLY valid JSON. No markdown, no backticks", Claude Sonnet wraps responses in ` ```json ` fences. Don't fight it — strip them:

```typescript
let jsonText = textBlock.text.trim()
if (jsonText.startsWith('```')) {
  jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
}
const parsed = JSON.parse(jsonText)
```

### Fix 3: Serve Vercel Edge Functions in Vite Dev

Vercel's `api/` directory only works with `vercel dev`, which requires CLI login. For frictionless local dev, add a Vite plugin:

```typescript
{
  name: 'api-proxy',
  configureServer(server) {
    server.middlewares.use('/api/plan-trip', async (req, res) => {
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const body = JSON.parse(Buffer.concat(chunks).toString())

      const { default: Anthropic } = await import('@anthropic-ai/sdk')
      const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        baseURL: 'https://api.anthropic.com',
        defaultHeaders: {},
      })
      // ... call API, return response
    })
  },
}
```

### Fix 4: Load .env.local for Vite Server Plugins

Vite only exposes `VITE_`-prefixed vars to client code. Server plugins don't get `.env.local` automatically. Use `loadEnv()` with an empty prefix:

```typescript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)
  return { plugins: [...] }
})
```

The third argument `''` (empty string) loads ALL env vars, not just `VITE_`-prefixed ones.

## Prevention

### Checklist: Adding LLM API Calls to a Vite + Vercel Project

- [ ] Create `.env.local` with API key (verify it's in `.gitignore`)
- [ ] Always set `baseURL` and `defaultHeaders` explicitly in SDK client — never rely on env auto-detection
- [ ] Use `loadEnv(mode, cwd, '')` in `vite.config.ts` to make env vars available to server plugins
- [ ] Add a Vite `configureServer` plugin to handle `/api/*` routes during dev
- [ ] Always strip markdown fences before `JSON.parse()` on LLM responses
- [ ] Validate parsed JSON against a schema (e.g., with zod) before using it
- [ ] Check for corporate proxy env vars: `env | grep -i anthropic`
- [ ] Set `ANTHROPIC_API_KEY` in Vercel project settings for production

### Common Gotchas

1. **SDK silently using corporate proxy** — no error until the gateway rejects your key. Always log the endpoint.
2. **Markdown fences appear inconsistently** — sometimes Claude returns raw JSON, sometimes fenced. Handle both.
3. **`vercel dev` vs `npm run dev`** — different capabilities. Document which to use in your README.
4. **Multiple .env files** — understand precedence: `.env.local` overrides `.env`, `.env.production.local` overrides `.env.production`.

## Related

- `docs/solutions/runtime-errors/react-strictmode-double-fire-closure-corruption.md` — timer patterns used in the same Trip Planner
- `docs/solutions/patterns/multi-state-demo-page-architecture.md` — state machine patterns for demo pages
- `vite.config.ts` — live implementation of all four fixes
- `api/plan-trip.ts` — Vercel Edge Function with same proxy override
