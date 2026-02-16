---
title: "Streaming AI API Integration: Vite Dev Proxy + Vercel Edge Functions + React Frontend"
date: 2026-02-16
category: integration-issues
tags:
  - claude-api
  - streaming
  - vercel-edge-functions
  - vite-dev-proxy
  - react
  - corporate-proxy
  - markdown-fence-stripping
severity: medium
component: MarketingPlanner, TripPlanner
problem_type: integration-pattern
status: solved
related:
  - docs/solutions/integration-issues/anthropic-api-proxy-vite-vercel-integration.md
  - docs/solutions/runtime-errors/react-strictmode-double-fire-closure-corruption.md
  - docs/solutions/patterns/multi-state-demo-page-architecture.md
---

# Streaming AI API Integration: Vite + Vercel + React

## Problem

Adding live AI generation to a Vite + React app deployed on Vercel requires solving three problems simultaneously:

1. **Local dev**: Vercel Edge Functions don't run during `npm run dev`, so API routes need a proxy
2. **Production**: Streaming responses from Claude's API through Vercel Edge Functions to the browser
3. **Frontend**: Reading streamed chunks, parsing JSON, and managing AI vs. mock data state

## Architecture

Three-layer streaming pipeline:

```
Browser (React)
  ↓ POST /api/marketing-generate
  ↓
[Local Dev]  Vite configureServer middleware → Claude API (non-streaming)
[Production] Vercel Edge Function → Claude API (streaming) → ReadableStream
  ↓
Browser accumulates chunks → strips markdown fences → JSON.parse()
```

## Solution

### Layer 1: Vercel Edge Function (Production)

`api/marketing-generate.ts` — streams text deltas from Claude to the browser:

```typescript
const stream = client.messages.stream({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 8192,
  system: PROMPTS[type],
  messages: [{ role: 'user', content: userMessage }],
})

const encoder = new TextEncoder()
const readable = new ReadableStream({
  async start(controller) {
    try {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(encoder.encode(event.delta.text))
        }
      }
      controller.close()
    } catch (err) {
      controller.error(err)
    }
  },
})

return new Response(readable, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked' },
})
```

### Layer 2: Vite Dev Proxy (Local Development)

`vite.config.ts` — `configureServer` middleware mirrors the Edge Function:

```typescript
{
  name: 'api-proxy',
  configureServer(server) {
    server.middlewares.use('/api/marketing-generate', async (req, res) => {
      // Read request body
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const body = JSON.parse(Buffer.concat(chunks).toString())

      const { default: Anthropic } = await import('@anthropic-ai/sdk')
      const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        baseURL: 'https://api.anthropic.com',  // Corporate proxy bypass
        defaultHeaders: {},                      // Clear proxy headers
      })

      const message = await client.messages.create({ /* ... */ })
      // Strip markdown fences, parse, return JSON
    })
  },
}
```

**Key difference**: Dev proxy uses non-streaming `.create()` (simpler), production uses streaming `.stream()` (better UX). Both strip markdown fences identically.

### Layer 3: Frontend Streaming Reader

```typescript
const generateAiContent = async (type: 'copy' | 'calendar' | 'launch') => {
  setAiLoading(type)
  setAiError(null)
  try {
    const res = await fetch('/api/marketing-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, productName, productContext }),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)

    // Read streaming response
    const reader = res.body?.getReader()
    if (!reader) throw new Error('No response body')

    let text = ''
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      text += decoder.decode(value, { stream: true })
    }

    // Strip markdown fences if present
    let jsonText = text.trim()
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
    }
    const parsed = JSON.parse(jsonText)
    setAiContent(prev => ({ ...prev, [key]: parsed }))
  } catch (err) {
    setAiError({ type, message: err instanceof Error ? err.message : 'Failed to generate' })
  } finally {
    setAiLoading(null)
  }
}
```

### Data Overlay Pattern

AI content overlays mock data without replacing it permanently:

```typescript
// Each section component uses this pattern
const data = aiData ?? plan.copyStudio  // AI wins if available, mock is fallback
```

### Reusable AiGenerateBar Component

4-state UI component shared across all execution tabs:

| State | UI |
|-------|-----|
| Idle | Dark gradient "Generate with AI" button |
| Loading | Spinner + "Generating..." + time estimate |
| Error | Coral error + Retry / Use demo data buttons |
| Success | Green "AI-generated" badge + Regenerate / Use demo data |

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Streaming vs. regular fetch | 10-20s generation time — streaming shows progress, avoids dead screen |
| `configureServer` vs. `vercel dev` | Instant startup, no Vercel CLI overhead, same API contract |
| `aiData ?? mockData` overlay | Fallback safety — demo always works, AI enhances when available |
| Markdown fence stripping | Claude wraps JSON in backticks despite explicit "no markdown" instructions |
| Explicit `baseURL` + empty `defaultHeaders` | Corporate proxy bypass — prevents header injection and routing through interceptors |

## Common Pitfalls

1. **Markdown fences**: Claude wraps JSON in triple backticks despite system prompt. Always strip with regex before `JSON.parse()`
2. **Streaming errors mid-stream**: Wrap `ReadableStream.start()` in try/catch. Frontend should handle partial JSON gracefully
3. **Vite proxy / Edge Function drift**: Keep prompts and fence-stripping logic identical in both. Add comment linking them
4. **StrictMode + streaming**: Never use mutable closure variables for state during async streaming reads. Use `useState` (see related doc)
5. **Stale AI state on product switch**: `PlanView` remounts on product change, naturally resetting `useState`. If lifting state higher, add explicit reset
6. **Corporate proxy**: Always set `baseURL: 'https://api.anthropic.com'` and `defaultHeaders: {}` — don't rely on SDK defaults behind corporate networks

## Prevention Checklist

- [ ] System prompt includes "Return ONLY valid JSON. No markdown, no backticks."
- [ ] Both Vite proxy and Vercel Edge Function strip markdown fences identically
- [ ] `baseURL` and `defaultHeaders` explicitly set on Anthropic client
- [ ] Frontend checks `res.ok` before reading stream
- [ ] `JSON.parse()` wrapped in try/catch with raw text logging on failure
- [ ] AI state resets when user context changes (product switch, navigation)
- [ ] `useState` used for all step counters in effects (never `let` in closures)

## Testing

**Local**: `npm run dev` then trigger "Generate with AI" on any Marketing Planner execution tab. Check Network tab for response format.

**Production**: Push branch, Vercel auto-deploys. Verify streaming works on preview URL.

**Without API key**: Click "Generate with AI" — should show error with "Use demo data" fallback button.

## Files

| File | Role |
|------|------|
| `api/marketing-generate.ts` | Vercel Edge Function (streaming) |
| `api/plan-trip.ts` | Vercel Edge Function (streaming, same pattern) |
| `vite.config.ts` | Dev proxy for both `/api/plan-trip` and `/api/marketing-generate` |
| `src/pages/MarketingPlanner.tsx` | Frontend: AiGenerateBar, generateAiContent, state management |
| `src/pages/TripPlanner.tsx` | Frontend: same streaming reader pattern |

## Cross-References

- [Anthropic API Proxy (original pattern)](../integration-issues/anthropic-api-proxy-vite-vercel-integration.md) — first implementation for Trip Planner
- [React StrictMode Timer Crash](../runtime-errors/react-strictmode-double-fire-closure-corruption.md) — related: never use mutable closures in effects
- [Multi-State Demo Architecture](../patterns/multi-state-demo-page-architecture.md) — state machine pattern used in parent component
