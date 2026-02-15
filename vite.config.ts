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
      },
    },
  ],
}})
