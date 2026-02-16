import Anthropic from '@anthropic-ai/sdk'

export const config = { runtime: 'edge' }

const COPY_PROMPT = `You are an expert travel marketing copywriter for SkyVoyager. Generate ad copy, email subjects, social posts, and landing page copy for the given product.

Return a JSON array of channel objects. Each channel object matches this schema:
{
  "channel": "google-ads" | "linkedin" | "email" | "social" | "landing-page",
  "channelLabel": "Google Ads" | "LinkedIn" | "Email" | "Social Media" | "Landing Page",
  "icon": "target" | "linkedin" | "mail" | "video" | "file-text",
  "items": [
    {
      "type": "headline" | "description" | "subject-line" | "post" | "cta",
      "text": "The actual copy text",
      "variant": "Short label for the approach, e.g. Emotional, Urgency, Specificity"
    }
  ]
}

Rules:
- Generate copy for all 5 channels
- Google Ads: 3 headlines + 1 description
- LinkedIn: 2 posts (thought leadership style, use line breaks)
- Email: 4 subject lines with different hooks
- Social: 2 posts (short-form, engaging)
- Landing Page: 2 headlines + 2 CTAs
- Travel copy should be specific (name real places, real numbers) not vague
- Match the product's positioning and target audience
- Return ONLY valid JSON. No markdown, no backticks, no explanation.`

const CALENDAR_PROMPT = `You are a content strategist for SkyVoyager. Generate a 12-week content calendar for the given product.

Return a JSON object with this schema:
{
  "pillars": [
    { "name": "Pillar Name", "color": "bg-sky-blue" | "bg-coral" | "bg-berry" | "bg-eco" | "bg-haiti" }
  ],
  "pieces": [
    {
      "week": number (1-12),
      "title": "Content piece title",
      "format": "blog" | "video" | "social" | "email" | "infographic",
      "buyerStage": "awareness" | "consideration" | "decision",
      "type": "searchable" | "shareable" | "both",
      "pillar": "Must match a pillar name",
      "brief": "1-2 sentence content brief describing what to create and why"
    }
  ]
}

Rules:
- Create 3-4 content pillars relevant to the product
- Generate 12-18 content pieces spread across 12 weeks
- Mix formats: mostly blog and video, some social, email, and infographic
- Buyer stage distribution: ~50% awareness, ~30% consideration, ~20% decision
- Every piece must be searchable, shareable, or both
- Make titles specific and compelling, not generic
- Briefs should explain the strategic rationale
- Return ONLY valid JSON. No markdown, no backticks, no explanation.`

const LAUNCH_PROMPT = `You are a product launch strategist for SkyVoyager. Generate a 5-phase launch playbook using the ORB framework (Owned, Rented, Borrowed channels).

Return a JSON object with this schema:
{
  "phases": [
    {
      "phase": "Phase Name",
      "timeline": "Weeks X-Y",
      "channelType": "owned" | "rented" | "borrowed",
      "messaging": "Key message for this phase",
      "actions": ["Action 1", "Action 2", "Action 3", "Action 4"]
    }
  ],
  "checklist": [
    {
      "label": "Checklist item text",
      "category": "pre-launch" | "launch-day" | "post-launch"
    }
  ],
  "pressAngles": ["Press angle 1", "Press angle 2", "Press angle 3"]
}

Rules:
- 5 phases: Internal Launch, Alpha Launch, Beta Launch, Early Access, Full Launch
- Phase timelines should span 12 weeks total
- ORB distribution: phases 1-2 owned, phase 3 rented, phase 4 borrowed, phase 5 owned
- 3-4 actions per phase
- 10-12 checklist items across pre-launch, launch-day, and post-launch
- 3 compelling press angles that a journalist would want to write about
- Be specific to the travel industry and the product
- Return ONLY valid JSON. No markdown, no backticks, no explanation.`

const PROMPTS: Record<string, string> = {
  copy: COPY_PROMPT,
  calendar: CALENDAR_PROMPT,
  launch: LAUNCH_PROMPT,
}

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
    const { type, productName, productContext } = await req.json()
    if (!type || !productName || !PROMPTS[type]) {
      return new Response(
        JSON.stringify({ error: 'Missing type, productName, or invalid type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const client = new Anthropic({
      apiKey,
      baseURL: 'https://api.anthropic.com',
      defaultHeaders: {},
    })

    const userMessage = `Product: ${productName}
Tagline: ${productContext?.tagline ?? ''}
Target Audience: ${productContext?.targetAudience ?? ''}
Positioning: ${productContext?.positioning ?? ''}

Generate the ${type === 'copy' ? 'marketing copy' : type === 'calendar' ? 'content calendar' : 'launch playbook'} for this product.`

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
