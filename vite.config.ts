import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env.local into process.env for the API proxy plugin
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
  plugins: [
    react(),
    // Dev-only API proxy — handles /api/plan-trip locally so we don't need vercel dev
    {
      name: 'api-proxy',
      configureServer(server) {
        server.middlewares.use('/api/plan-trip', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method not allowed')
            return
          }

          // Read request body
          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(chunk as Buffer)
          }
          const body = JSON.parse(Buffer.concat(chunks).toString())

          // Load API key from .env.local (Vite loads it via dotenv)
          const apiKey = process.env.ANTHROPIC_API_KEY
          if (!apiKey) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env.local' }))
            return
          }

          try {
            const { default: Anthropic } = await import('@anthropic-ai/sdk')
            // Override corporate proxy — hit Anthropic directly
            const client = new Anthropic({
              apiKey,
              baseURL: 'https://api.anthropic.com',
              defaultHeaders: {},
            })

            const SYSTEM_PROMPT = `You are a travel planning AI for SkyVoyager. Given a trip request, return a JSON object with two keys: "summary" and "itinerary".

The "summary" object must match this shape:
{
  "destination": "Country or City name",
  "dates": "Flexible" or specific dates,
  "totalDays": number,
  "totalCost": number (estimated total in GBP),
  "tags": ["Tag1", "Tag2", ...] (3-5 travel style tags),
  "flights": { "route": "Origin → Destination (return)", "price": number },
  "hotels": { "nights": number, "avgPerNight": number, "total": number },
  "activities": { "total": number }
}

The "itinerary" array must contain one object per day, each matching:
{
  "day": number (1-indexed),
  "city": "City Name",
  "area": "Specific neighbourhood or area",
  "activities": [
    {
      "time": "HH:MM" (24hr format),
      "title": "Activity name",
      "description": "1-2 sentence description with specific real place names, costs in local currency with GBP equivalent",
      "type": "activity" | "transport" | "food" | "accommodation"
    }
  ],
  "accommodation": "Hotel name",
  "dailyCost": number (GBP),
  "mapImage": ""
}

Rules:
- Include 5-7 activities per day
- Use real restaurant names, real attractions, realistic costs
- First activity of day 1 should be arrival/transport
- Include at least one food activity per day
- Include accommodation check-in on first day
- Make the itinerary feel like a local wrote it — hidden gems mixed with must-sees
- All costs should be realistic for the destination in GBP
- Return ONLY valid JSON. No markdown, no backticks, no explanation.`

            const message = await client.messages.create({
              model: 'claude-sonnet-4-5-20250929',
              max_tokens: 8192,
              system: SYSTEM_PROMPT,
              messages: [{ role: 'user', content: body.query }],
            })

            const textBlock = message.content.find((b: { type: string }) => b.type === 'text')
            if (!textBlock || textBlock.type !== 'text') {
              throw new Error('No text response from AI')
            }

            // Strip markdown code fences if present
            let jsonText = textBlock.text.trim()
            if (jsonText.startsWith('```')) {
              jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
            }
            const parsed = JSON.parse(jsonText)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(parsed))
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error'
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: message }))
          }
        })

        // Marketing generate proxy
        server.middlewares.use('/api/marketing-generate', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method not allowed')
            return
          }

          const chunks: Buffer[] = []
          for await (const chunk of req) {
            chunks.push(chunk as Buffer)
          }
          const body = JSON.parse(Buffer.concat(chunks).toString())

          const apiKey = process.env.ANTHROPIC_API_KEY
          if (!apiKey) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env.local' }))
            return
          }

          const PROMPTS: Record<string, string> = {
            copy: 'You are an expert travel marketing copywriter for SkyVoyager. Generate ad copy for the given product. Return a JSON array of channel objects: [{ "channel": "google-ads"|"linkedin"|"email"|"social"|"landing-page", "channelLabel": string, "icon": "target"|"linkedin"|"mail"|"video"|"file-text", "items": [{ "type": "headline"|"description"|"subject-line"|"post"|"cta", "text": string, "variant": string }] }]. Google Ads: 3 headlines + 1 description. LinkedIn: 2 posts. Email: 4 subject lines. Social: 2 posts. Landing Page: 2 headlines + 2 CTAs. Be specific — name real places and numbers. Return ONLY valid JSON.',
            calendar: 'You are a content strategist for SkyVoyager. Generate a 12-week content calendar. Return JSON: { "pillars": [{ "name": string, "color": "bg-sky-blue"|"bg-coral"|"bg-berry"|"bg-eco" }], "pieces": [{ "week": number, "title": string, "format": "blog"|"video"|"social"|"email"|"infographic", "buyerStage": "awareness"|"consideration"|"decision", "type": "searchable"|"shareable"|"both", "pillar": string, "brief": string }] }. 12-18 pieces, mix formats, ~50% awareness. Return ONLY valid JSON.',
            launch: 'You are a launch strategist for SkyVoyager. Generate a 5-phase launch playbook using ORB framework. Return JSON: { "phases": [{ "phase": string, "timeline": string, "channelType": "owned"|"rented"|"borrowed", "messaging": string, "actions": string[] }], "checklist": [{ "label": string, "category": "pre-launch"|"launch-day"|"post-launch" }], "pressAngles": string[] }. 5 phases over 12 weeks, 10-12 checklist items, 3 press angles. Return ONLY valid JSON.',
          }

          try {
            const { default: Anthropic } = await import('@anthropic-ai/sdk')
            const client = new Anthropic({
              apiKey,
              baseURL: 'https://api.anthropic.com',
              defaultHeaders: {},
            })

            const userMessage = `Product: ${body.productName}\nTagline: ${body.productContext?.tagline ?? ''}\nTarget Audience: ${body.productContext?.targetAudience ?? ''}\nPositioning: ${body.productContext?.positioning ?? ''}\n\nGenerate the ${body.type === 'copy' ? 'marketing copy' : body.type === 'calendar' ? 'content calendar' : 'launch playbook'} for this product.`

            const message = await client.messages.create({
              model: 'claude-sonnet-4-5-20250929',
              max_tokens: 8192,
              system: PROMPTS[body.type] || PROMPTS.copy,
              messages: [{ role: 'user', content: userMessage }],
            })

            const textBlock = message.content.find((b: { type: string }) => b.type === 'text')
            if (!textBlock || textBlock.type !== 'text') {
              throw new Error('No text response from AI')
            }

            let jsonText = textBlock.text.trim()
            if (jsonText.startsWith('```')) {
              jsonText = jsonText.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '')
            }
            const parsed = JSON.parse(jsonText)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(parsed))
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error'
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: message }))
          }
        })
      },
    },
  ],
}})
