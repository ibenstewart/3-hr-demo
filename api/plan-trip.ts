import Anthropic from '@anthropic-ai/sdk'

export const config = { runtime: 'edge' }

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

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const { query } = await req.json()
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing query' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const client = new Anthropic({
      apiKey,
      baseURL: 'https://api.anthropic.com',
      defaultHeaders: {},
    })

    // Stream the response so Vercel sees data within 25s
    const stream = client.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: query }],
    })

    // Pipe text chunks to a ReadableStream
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
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
