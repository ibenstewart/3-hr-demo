export interface Channel {
  name: string
  icon: string
  fit: 'high' | 'medium'
  reason: string
}

export interface TimelinePhase {
  phase: string
  weeks: string
  actions: string[]
}

export interface Tactic {
  id: number
  name: string
  category: string
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  description: string
  firstSteps: string[]
}

export interface BudgetItem {
  category: string
  percentage: number
  color: string
}

export interface KPI {
  metric: string
  target: string
  timeframe: string
}

// --- Copy Studio ---
export interface CopyItem {
  type: 'headline' | 'description' | 'subject-line' | 'post' | 'cta'
  text: string
  variant?: string
}

export interface ChannelCopy {
  channel: 'google-ads' | 'linkedin' | 'email' | 'social' | 'landing-page'
  channelLabel: string
  icon: string
  items: CopyItem[]
}

// --- Content Calendar ---
export interface ContentPiece {
  week: number
  title: string
  format: 'blog' | 'video' | 'social' | 'email' | 'infographic'
  buyerStage: 'awareness' | 'consideration' | 'decision'
  type: 'searchable' | 'shareable' | 'both'
  pillar: string
  brief: string
}

export interface ContentCalendarData {
  pillars: { name: string; color: string }[]
  pieces: ContentPiece[]
}

// --- Launch Playbook ---
export interface LaunchPhase {
  phase: string
  timeline: string
  channelType: 'owned' | 'rented' | 'borrowed'
  messaging: string
  actions: string[]
}

export interface ChecklistItem {
  label: string
  category: 'pre-launch' | 'launch-day' | 'post-launch'
}

export interface LaunchPlaybookData {
  phases: LaunchPhase[]
  checklist: ChecklistItem[]
  pressAngles: string[]
}

export interface MarketingPlan {
  productId: string
  productName: string
  tagline: string
  targetAudience: string
  positioning: string
  channels: Channel[]
  timeline: TimelinePhase[]
  tactics: Tactic[]
  budget: BudgetItem[]
  kpis: KPI[]
  copyStudio: ChannelCopy[]
  contentCalendar: ContentCalendarData
  launchPlaybook: LaunchPlaybookData
}

export const marketingPlans: MarketingPlan[] = [
  {
    productId: 'trip-planner',
    productName: 'AI Trip Planner',
    tagline: 'Replace 10 browser tabs with one conversation',
    targetAudience: 'Millennial & Gen-Z leisure travellers who research trips across multiple sites',
    positioning: 'The first trip planner that actually plans your trip — not just lists options.',
    channels: [
      { name: 'SEO & Content', icon: 'search', fit: 'high', reason: 'Travellers start with Google. Programmatic SEO for "X days in Y" queries captures high-intent traffic at scale.' },
      { name: 'Social Video', icon: 'video', fit: 'high', reason: 'Trip planning is inherently visual. Short-form video of AI-generated itineraries gets organic shares.' },
      { name: 'Creator Partnerships', icon: 'users', fit: 'high', reason: 'Travel influencers using the tool creates authentic demo content their audience trusts.' },
      { name: 'Product Hunt', icon: 'rocket', fit: 'medium', reason: 'AI + travel is trending. A well-timed launch captures early adopter mindshare.' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Launch SEO content hub targeting "X days in Y country" queries', 'Create 5 hero demo videos showing AI planning trips', 'Set up analytics and conversion tracking'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Partner with 10 mid-tier travel creators for authentic demos', 'Launch TikTok/Reels series: "I let AI plan my trip"', 'Product Hunt launch with pre-built community support'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Retarget engaged visitors with Google/Meta ads', 'Launch user-generated itinerary sharing (viral loop)', 'Publish "State of AI Travel Planning" proprietary data report'] },
    ],
    tactics: [
      { id: 4, name: 'Programmatic SEO', category: 'Content & SEO', effort: 'medium', impact: 'high', description: 'Build template pages targeting "X days in [destination]" patterns. Each AI-generated itinerary becomes an SEO-optimized page.', firstSteps: ['Identify top 500 destination + duration keyword combinations', 'Build page template with itinerary preview + CTA', 'Generate and index first 100 pages'] },
      { id: 42, name: 'Short-Form Video', category: 'Social', effort: 'low', impact: 'high', description: 'Record screen captures of the AI building itineraries in real-time. The "wow factor" of watching a trip come together drives shares.', firstSteps: ['Record 10 screen-capture videos of AI planning diverse trips', 'Post to TikTok and Reels with "I let AI plan my trip" hook', 'Test different destination/style hooks to find what resonates'] },
      { id: 93, name: 'Viral Loops', category: 'Product-Led', effort: 'medium', impact: 'high', description: 'Let users share itineraries with friends who can fork and customize them. Each shared itinerary becomes an acquisition channel.', firstSteps: ['Add "Share itinerary" button generating a public link', 'Recipients see the full itinerary with "Create your own" CTA', 'Track viral coefficient: shares per user, signups per share'] },
      { id: 6, name: 'Proprietary Data Content', category: 'Content & SEO', effort: 'medium', impact: 'medium', description: 'Publish "2026 Travel Planning Report" using aggregate anonymised data — most popular destinations, average trip lengths, trending activities.', firstSteps: ['Aggregate anonymised planning data by destination and season', 'Design shareable infographics with key findings', 'Pitch report to travel journalists for earned media'] },
    ],
    budget: [
      { category: 'Content & SEO', percentage: 35, color: 'bg-sky-blue' },
      { category: 'Creator Partnerships', percentage: 25, color: 'bg-coral' },
      { category: 'Paid Social', percentage: 20, color: 'bg-berry' },
      { category: 'Product-Led Growth', percentage: 15, color: 'bg-eco' },
      { category: 'PR & Launch', percentage: 5, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Monthly itineraries created', target: '50,000', timeframe: '90 days' },
      { metric: 'Organic search traffic', target: '200K visits/mo', timeframe: '90 days' },
      { metric: 'Viral coefficient', target: '1.3+', timeframe: '60 days' },
      { metric: 'Creator partnership reach', target: '2M impressions', timeframe: '90 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: '7 Days in Japan. Zero Tabs Open.', variant: 'Specificity' },
        { type: 'headline', text: 'Stop Researching. Start Exploring.', variant: 'Emotional' },
        { type: 'headline', text: 'AI Plans Your Trip in 30 Seconds', variant: 'Speed' },
        { type: 'description', text: 'Tell us where you want to go. Our AI builds a day-by-day itinerary with real restaurants, hidden gems, and realistic costs. No more 10 browser tabs.', variant: 'Benefit-led' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'We built an AI that plans trips like a well-travelled friend.\n\nNot a list of TripAdvisor links. An actual itinerary:\n\n→ Day-by-day schedule\n→ Real restaurant names\n→ Hidden gems mixed with must-sees\n→ Realistic costs in your currency\n\nTell it "10 days in Japan with a food focus" and watch it work.\n\nThe future of travel planning isn\'t search. It\'s conversation.', variant: 'Thought leadership' },
        { type: 'post', text: 'I used to spend 6 hours planning a week-long trip.\n\nNow I describe what I want in one sentence and get a complete itinerary in 30 seconds.\n\nThe hidden gems are actually hidden. The restaurants are actually good. The costs are actually realistic.\n\nThis is what happens when AI meets local knowledge.', variant: 'Personal story' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: 'Your Japan trip, planned in 30 seconds', variant: 'Specificity' },
        { type: 'subject-line', text: 'Stop googling. Start exploring.', variant: 'Pain point' },
        { type: 'subject-line', text: 'The AI travel planner that actually plans', variant: 'Differentiation' },
        { type: 'subject-line', text: '10 days in Bali — here\'s what AI suggests', variant: 'Curiosity' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: 'POV: You tell AI "10 days in Japan, street food focus" and it builds your entire trip in 30 seconds 🇯🇵✨\n\nDay 1: Arrive Shinjuku, ramen at Fuunji, Golden Gai bar hop\nDay 2: Tsukiji outer market, Teamlab Borderless, Shibuya sunset\n...\n\nThis is real. Link in bio.', variant: 'TikTok/Reels hook' },
        { type: 'post', text: 'Trip planning in 2024: 10 tabs, 3 hours, decision fatigue\nTrip planning in 2026: one sentence, 30 seconds, done\n\nThe AI Trip Planner is live. Try it free.', variant: 'Before/after' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'Your next trip, planned by AI in 30 seconds', variant: 'Hero headline' },
        { type: 'headline', text: 'Replace 10 browser tabs with one conversation', variant: 'Pain point' },
        { type: 'cta', text: 'Plan my trip free', variant: 'Action + free' },
        { type: 'cta', text: 'Try it — tell AI where you want to go', variant: 'Conversational' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'SEO & Search', color: 'bg-sky-blue' },
        { name: 'Social & Video', color: 'bg-coral' },
        { name: 'Data & PR', color: 'bg-berry' },
      ],
      pieces: [
        { week: 1, title: '10 Days in Japan: Complete AI-Planned Itinerary', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SEO & Search', brief: 'Target "10 days in Japan itinerary" keyword. Showcase AI output as the page content with CTA to plan your own.' },
        { week: 1, title: 'I Let AI Plan My Japan Trip (Full Reveal)', format: 'video', buyerStage: 'awareness', type: 'shareable', pillar: 'Social & Video', brief: 'Screen recording of AI building a Japan itinerary in real-time. Hook: "Watch AI plan a trip in 30 seconds."' },
        { week: 2, title: '7 Days in Bali on a Budget: AI Itinerary', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SEO & Search', brief: 'Target "Bali budget itinerary" keyword cluster. Include realistic daily costs.' },
        { week: 3, title: 'AI vs Human: Who Plans the Better Trip?', format: 'video', buyerStage: 'consideration', type: 'shareable', pillar: 'Social & Video', brief: 'Side-by-side comparison of AI-planned vs manually-planned trip to same destination. Engaging debate format.' },
        { week: 3, title: 'Best Time to Visit Thailand: AI Analysis', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SEO & Search', brief: 'Programmatic SEO template for "best time to visit [destination]" queries using AI price + weather data.' },
        { week: 4, title: 'How We Built an AI That Plans Like a Local', format: 'blog', buyerStage: 'consideration', type: 'shareable', pillar: 'Data & PR', brief: 'Behind-the-scenes technical story. Share on Hacker News and dev communities. Builds credibility.' },
        { week: 5, title: '5 Days in Portugal: Hidden Gems Edition', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SEO & Search', brief: 'Target "Portugal off the beaten path" queries. Emphasise AI finding hidden gems vs tourist traps.' },
        { week: 5, title: 'Travellers Are Ditching Google for AI Planners', format: 'social', buyerStage: 'awareness', type: 'shareable', pillar: 'Social & Video', brief: 'LinkedIn thought piece on the shift from search-based to conversation-based travel planning.' },
        { week: 6, title: 'SkyVoyager Trip Planning Trends Report', format: 'infographic', buyerStage: 'awareness', type: 'shareable', pillar: 'Data & PR', brief: 'Aggregate anonymised data: most popular destinations, avg trip lengths, trending activities. Pitch to journalists.' },
        { week: 7, title: 'Family Trip to Disney World: AI Itinerary', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SEO & Search', brief: 'Target family travel keywords. Show AI handling complex multi-age-group logistics.' },
        { week: 8, title: 'AI Trip Planner vs TripAdvisor vs Google Trips', format: 'blog', buyerStage: 'consideration', type: 'both', pillar: 'SEO & Search', brief: 'Comparison page targeting "[competitor] alternative" searches. Honest comparison with clear differentiators.' },
        { week: 9, title: '"I Saved 6 Hours Planning My Honeymoon"', format: 'video', buyerStage: 'decision', type: 'shareable', pillar: 'Social & Video', brief: 'Customer testimonial video. Real couple using AI planner for their honeymoon. Emotional + practical.' },
        { week: 10, title: 'Weekend Getaways from London: 10 AI Itineraries', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SEO & Search', brief: 'Listicle targeting "weekend breaks from London" with AI-generated mini-itineraries for each destination.' },
        { week: 11, title: 'State of AI Travel Planning 2026', format: 'blog', buyerStage: 'consideration', type: 'both', pillar: 'Data & PR', brief: 'Annual report with proprietary data. Designed to earn backlinks and press mentions.' },
        { week: 12, title: 'Share Your AI Itinerary — Win a Trip', format: 'social', buyerStage: 'decision', type: 'shareable', pillar: 'Social & Video', brief: 'User-generated content campaign. Share your AI itinerary on social with hashtag for chance to win flights.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'AI that plans trips like a well-travelled friend', actions: ['Recruit 100 internal testers across Skyscanner offices', 'Set up feedback Slack channel #ai-trip-planner-beta', 'Fix top 5 usability issues from internal testing', 'Collect 10 internal testimonial quotes'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'The trip planner that actually plans your trip', actions: ['Create landing page with early access signup', 'Email existing SkyVoyager power users (top 1K)', 'Launch on internal blog and employee social channels', 'Target 500 alpha signups'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'rented', messaging: 'Stop researching. Start exploring.', actions: ['Send early access invites to alpha waitlist', 'Seed 5 hero demo videos on TikTok and Reels', 'Engage travel subreddits with authentic trip reports', 'Partner with 3 mid-tier travel creators for first reviews'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'borrowed', messaging: '30 seconds to your perfect itinerary', actions: ['Pitch exclusive preview to travel journalists (Condé Nast Traveller, Lonely Planet)', 'Launch Creator Partnership programme (10 travel influencers)', 'Publish "How We Built It" technical blog post for HN/dev audience', 'Open beta to all waitlist signups'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'Your next trip, planned by AI', actions: ['Product Hunt launch (Tuesday, coordinated upvote campaign)', 'Launch blog post + email blast to full SkyVoyager user base', 'Press embargo lifts — coordinate reviews from 5+ publications', 'Enable viral sharing: "Share your itinerary" feature goes live'] },
      ],
      checklist: [
        { label: 'Landing page live with clear value prop and CTA', category: 'pre-launch' },
        { label: 'Email capture / waitlist active and tested', category: 'pre-launch' },
        { label: 'Analytics and conversion tracking configured', category: 'pre-launch' },
        { label: 'Press kit ready (screenshots, founder quotes, data points)', category: 'pre-launch' },
        { label: 'Creator partnerships confirmed and briefed', category: 'pre-launch' },
        { label: 'Announcement email sent to full list', category: 'launch-day' },
        { label: 'Blog post published and shared on all social channels', category: 'launch-day' },
        { label: 'Product Hunt listing live by 00:01 PST', category: 'launch-day' },
        { label: 'Team monitoring and responding to all comments/mentions', category: 'launch-day' },
        { label: 'Follow up with every engaged prospect within 48hrs', category: 'post-launch' },
        { label: 'Publish roundup email with launch results and social proof', category: 'post-launch' },
        { label: 'Comparison pages live (vs TripAdvisor, vs Google Trips)', category: 'post-launch' },
      ],
      pressAngles: [
        'AI replaces 10 browser tabs: How one tool is changing how millennials plan trips',
        'The end of travel research? SkyVoyager\'s AI plans trips in 30 seconds',
        'SkyVoyager data reveals: AI-planned trips include 40% more hidden gems than manually-planned ones',
      ],
    },
  },
  {
    productId: 'companion',
    productName: 'In-Trip Companion',
    tagline: 'Your trip doesn\'t end at booking — it starts there',
    targetAudience: 'Travellers who\'ve already booked and want a better in-trip experience',
    positioning: 'The post-booking assistant that turns SkyVoyager from a search engine into a travel companion.',
    channels: [
      { name: 'Email Onboarding', icon: 'mail', fit: 'high', reason: 'Every booking confirmation is a distribution channel. Introduce the companion at the moment of highest excitement.' },
      { name: 'Push Notifications', icon: 'bell', fit: 'high', reason: 'Time-sensitive travel info (gate changes, weather, restaurant hours) makes push feel helpful, not spammy.' },
      { name: 'App Store', icon: 'smartphone', fit: 'high', reason: 'App Store Optimization for "travel assistant" and "trip planner" keywords captures users actively looking.' },
      { name: 'Partnerships', icon: 'handshake', fit: 'medium', reason: 'Hotels and airlines can white-label the companion, expanding reach through existing touchpoints.' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Integrate companion CTA into booking confirmation emails', 'Optimise App Store listing with travel assistant keywords', 'Create "trip countdown" email sequence for booked travellers'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Launch "Day in [City]" content series across social channels', 'A/B test push notification timing and messaging', 'Partner with 3 hotel chains for white-label pilot'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Launch in-trip sharing features (photo journals, recommendations)', 'Measure and optimise retention through trip lifecycle', 'Expand to post-trip review collection driving SEO'] },
    ],
    tactics: [
      { id: 51, name: 'Onboarding Emails', category: 'Email', effort: 'low', impact: 'high', description: 'Post-booking email sequence introducing companion features timed to trip milestones: booking, 1 week before, day before, during trip.', firstSteps: ['Map the traveller timeline: booking → pre-trip → in-trip → post-trip', 'Design 5-email sequence with companion feature highlights', 'Set up trigger automation based on departure date'] },
      { id: 124, name: 'App Store Optimization', category: 'Platforms', effort: 'low', impact: 'medium', description: 'Optimise app listing for "travel assistant", "trip planner", "travel companion" keywords with compelling screenshots.', firstSteps: ['Research top 20 travel assistant keywords by volume', 'Create app store screenshots showing real companion interactions', 'A/B test app store listing description and visuals'] },
      { id: 93, name: 'Viral Loops', category: 'Product-Led', effort: 'medium', impact: 'high', description: 'In-trip sharing: travellers share restaurant finds, activity photos, or itinerary days with friends who then discover the companion.', firstSteps: ['Add "Share this recommendation" to all companion suggestions', 'Create shareable trip highlights card with companion branding', 'Track share-to-install conversion rate'] },
      { id: 63, name: 'Integration Marketing', category: 'Partnerships', effort: 'high', impact: 'high', description: 'Partner with airlines and hotels to embed companion features in their apps, reaching travellers through existing trusted channels.', firstSteps: ['Identify 5 airline and hotel partners with strong app presence', 'Build lightweight SDK for companion widget embedding', 'Pilot with one partner measuring activation rates'] },
    ],
    budget: [
      { category: 'Email & CRM', percentage: 30, color: 'bg-sky-blue' },
      { category: 'App Store & Mobile', percentage: 25, color: 'bg-coral' },
      { category: 'Partnership Dev', percentage: 25, color: 'bg-berry' },
      { category: 'Content & Social', percentage: 15, color: 'bg-eco' },
      { category: 'Paid Acquisition', percentage: 5, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Post-booking activation rate', target: '40%', timeframe: '90 days' },
      { metric: 'In-trip daily active users', target: '25K', timeframe: '90 days' },
      { metric: 'Push notification opt-in', target: '65%', timeframe: '60 days' },
      { metric: 'NPS score', target: '60+', timeframe: '90 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: 'Your Trip Starts After Booking', variant: 'Reframe' },
        { type: 'headline', text: 'Gate Change? Weather Alert? We\'ve Got You.', variant: 'Utility' },
        { type: 'description', text: 'SkyVoyager Companion gives you real-time updates, local restaurant recs, and a day-by-day guide — all personalised to your trip. Download free.', variant: 'Feature stack' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: '🎒 Your Barcelona trip starts in 3 days — here\'s your guide', variant: 'Countdown' },
        { type: 'subject-line', text: 'Gate B7, not B12 — your flight update', variant: 'Utility hook' },
        { type: 'subject-line', text: 'The locals eat here (not where TripAdvisor says)', variant: 'Insider' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: 'You just booked your flight. Now what?\n\nMost travel apps disappear after checkout. SkyVoyager Companion shows up:\n\n📍 Local restaurant recs (not tourist traps)\n⚡ Real-time gate & delay alerts\n🗺️ Day-by-day personalised guide\n\nYour trip doesn\'t end at booking. It starts there.', variant: 'Feature reveal' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'The travel industry has a $40B post-booking gap.\n\nAfter someone books a flight, most OTAs go silent until check-in. That\'s weeks of disengagement — and missed revenue.\n\nSkyVoyager Companion fills that gap:\n→ Pre-trip excitement emails\n→ In-trip real-time assistance\n→ Post-trip review collection\n\nThe result? 40% higher engagement and 3x ancillary attach rate.', variant: 'B2B angle' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'Your trip doesn\'t end at booking — it starts there', variant: 'Hero' },
        { type: 'cta', text: 'Get my trip guide', variant: 'Value-first' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'Post-Booking Experience', color: 'bg-coral' },
        { name: 'Destination Guides', color: 'bg-sky-blue' },
        { name: 'Product Stories', color: 'bg-eco' },
      ],
      pieces: [
        { week: 1, title: 'The Post-Booking Gap: Why Travellers Feel Abandoned', format: 'blog', buyerStage: 'awareness', type: 'shareable', pillar: 'Post-Booking Experience', brief: 'Thought piece on the gap between booking and travel. Sets up the Companion as the solution.' },
        { week: 2, title: 'Barcelona Like a Local: Your In-Trip AI Guide', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Destination Guides', brief: 'Target "Barcelona local tips" keywords. Show Companion recommendations as the content.' },
        { week: 3, title: 'How Push Notifications Can Feel Helpful (Not Spammy)', format: 'blog', buyerStage: 'consideration', type: 'shareable', pillar: 'Product Stories', brief: 'Behind-the-scenes on notification design. Builds trust that Companion won\'t spam users.' },
        { week: 5, title: 'Day in Tokyo: What the Companion Recommends', format: 'video', buyerStage: 'awareness', type: 'both', pillar: 'Destination Guides', brief: 'Video walkthrough of a day using Companion in Tokyo. Real locations, real recommendations.' },
        { week: 7, title: 'From Booking to Boarding: The Full Trip Timeline', format: 'infographic', buyerStage: 'consideration', type: 'shareable', pillar: 'Post-Booking Experience', brief: 'Visual timeline showing every Companion touchpoint from booking confirmation to post-trip review.' },
        { week: 9, title: '"It Told Me My Gate Changed Before the Airport Screen"', format: 'social', buyerStage: 'decision', type: 'shareable', pillar: 'Product Stories', brief: 'Customer story about real-time utility. High emotional impact, great for social sharing.' },
        { week: 11, title: 'Partner Integration: Embedding Companion in Your App', format: 'blog', buyerStage: 'decision', type: 'searchable', pillar: 'Product Stories', brief: 'B2B content targeting hotel and airline partners interested in white-labelling.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Your trip doesn\'t end at booking', actions: ['Dog-food with upcoming business trips across the company', 'Test push notification timing with internal users', 'Collect feedback on recommendation quality'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Meet your in-trip AI assistant', actions: ['Add Companion CTA to booking confirmation emails', 'Launch to top 5% most active SkyVoyager bookers', 'Measure activation rate and daily usage'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'rented', messaging: 'Travel smarter, not harder', actions: ['App Store listing optimization for "travel assistant"', 'Launch "Day in [City]" video series', 'A/B test push notification opt-in flow'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'borrowed', messaging: 'The travel companion that knows before you do', actions: ['Partner with 3 hotel chains for white-label pilot', 'Pitch travel journalists on "post-booking revolution" angle', 'Launch in-trip photo journal sharing feature'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'Never travel alone again', actions: ['Roll out to all SkyVoyager bookers', 'Email blast: "Your next trip comes with a free AI guide"', 'Launch post-trip review collection driving SEO'] },
      ],
      checklist: [
        { label: 'Booking confirmation email CTA integrated', category: 'pre-launch' },
        { label: 'App Store listing optimised with travel assistant keywords', category: 'pre-launch' },
        { label: 'Push notification permission flow tested', category: 'pre-launch' },
        { label: 'Destination data seeded for top 50 cities', category: 'pre-launch' },
        { label: 'Email sequence triggered for all new bookers', category: 'launch-day' },
        { label: 'App Store featured placement secured (if possible)', category: 'launch-day' },
        { label: 'Internal comms sent: "Tell your friends about Companion"', category: 'launch-day' },
        { label: 'Monitor activation funnel: email → download → first open', category: 'post-launch' },
        { label: 'Collect and publish first 50 user reviews', category: 'post-launch' },
        { label: 'Measure NPS at 7 days post-trip', category: 'post-launch' },
      ],
      pressAngles: [
        'The travel app that knows your gate changed before the airport screen does',
        'SkyVoyager says the post-booking experience is a $40B blind spot — here\'s their fix',
        'From search engine to travel companion: SkyVoyager\'s biggest bet since price alerts',
      ],
    },
  },
  {
    productId: 'ancillaries',
    productName: 'Smart Ancillaries',
    tagline: 'Pure margin revenue, powered by intelligence',
    targetAudience: 'B2B: Airline and OTA partners looking to boost ancillary revenue. B2C: Travellers who\'ve just booked.',
    positioning: 'AI that knows what your travellers need before they do — and recommends it at exactly the right moment.',
    channels: [
      { name: 'B2B Sales', icon: 'briefcase', fit: 'high', reason: 'Revenue-generating products sell themselves in partner meetings. The demo is the pitch.' },
      { name: 'Integration Marketing', icon: 'plug', fit: 'high', reason: 'Joint case studies with early partners prove ROI and attract new ones.' },
      { name: 'Conference Speaking', icon: 'mic', fit: 'high', reason: 'Travel industry events (Phocuswright, WiT) are where buyers decide on technology partners.' },
      { name: 'Product-Led Growth', icon: 'zap', fit: 'medium', reason: 'Self-serve dashboard lets small OTAs onboard without a sales call.' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Build interactive product demo with ROI calculator', 'Create "Ancillary Revenue Playbook" gated whitepaper', 'Identify 20 target OTA partners and build account plans'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Launch pilot with 3 OTA partners measuring revenue uplift', 'Submit CFPs for Phocuswright and WiT conferences', 'Publish first case study with pilot partner results'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Launch self-serve partner dashboard for long-tail OTAs', 'Scale outbound with proven case study and ROI data', 'Host "Ancillary Revenue Summit" virtual event'] },
    ],
    tactics: [
      { id: 18, name: 'Calculator Marketing', category: 'Free Tools', effort: 'medium', impact: 'high', description: 'Build an "Ancillary Revenue Calculator" — partners input their booking volume and see projected revenue uplift from AI recommendations.', firstSteps: ['Define revenue model inputs: bookings, basket size, conversion rate', 'Build calculator with real uplift data from pilots', 'Gate results behind email capture for sales follow-up'] },
      { id: 70, name: 'Conference Speaking', category: 'Events', effort: 'medium', impact: 'high', description: 'Speak at Phocuswright, WiT, and TravelTech on "The AI Ancillary Revolution" — position SkyVoyager as thought leader.', firstSteps: ['Submit 3 conference talk proposals for upcoming events', 'Build talk deck with live product demo component', 'Follow up with every attendee who visits the booth'] },
      { id: 63, name: 'Integration Marketing', category: 'Partnerships', effort: 'medium', impact: 'high', description: 'Co-market with pilot partners. Joint press releases, case studies, and webinars demonstrate real-world results.', firstSteps: ['Agree joint marketing commitment with first pilot partner', 'Produce case study template: problem → solution → results', 'Co-host webinar: "How [Partner] increased ancillary revenue 40%"'] },
      { id: 109, name: 'Public Demos', category: 'Content', effort: 'low', impact: 'medium', description: 'Record and publish product demo videos showing the AI recommendation engine in action across different scenarios.', firstSteps: ['Script 3 demo scenarios: family trip, business trip, backpacker', 'Record polished product walkthroughs under 3 minutes', 'Distribute via LinkedIn, YouTube, and sales outreach'] },
    ],
    budget: [
      { category: 'B2B Sales & Outbound', percentage: 35, color: 'bg-sky-blue' },
      { category: 'Events & Speaking', percentage: 25, color: 'bg-coral' },
      { category: 'Content & Case Studies', percentage: 20, color: 'bg-berry' },
      { category: 'Product-Led (Dashboard)', percentage: 15, color: 'bg-eco' },
      { category: 'Paid (LinkedIn Ads)', percentage: 5, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Partner pipeline value', target: '£2M', timeframe: '90 days' },
      { metric: 'Pilot partner revenue uplift', target: '30%+', timeframe: '60 days' },
      { metric: 'Qualified leads from calculator', target: '200', timeframe: '90 days' },
      { metric: 'Conference speaking slots', target: '4', timeframe: '90 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: 'Boost Ancillary Revenue 30% with AI', variant: 'Result' },
        { type: 'headline', text: 'Your Travellers Need More Than a Seat', variant: 'Insight' },
        { type: 'description', text: 'AI-powered recommendations that know what your travellers need before they do. Lounge access, extra bags, travel insurance — served at exactly the right moment.', variant: 'B2B benefit' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'Every traveller who books a flight also needs:\n\n✈️ Extra baggage (28% buy)\n🛡️ Travel insurance (41% buy)\n🍽️ Lounge access (12% buy)\n🚗 Airport transfer (33% buy)\n\nBut most OTAs still show generic upsells after checkout.\n\nSmart Ancillaries uses AI to recommend the right add-on at the right moment. Early partners see 30% revenue uplift.\n\nThe demo is the pitch →', variant: 'Data-led' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: 'Your ancillary revenue is leaving £2M on the table', variant: 'Loss aversion' },
        { type: 'subject-line', text: 'How [Partner] increased ancillary attach rate by 30%', variant: 'Case study' },
        { type: 'subject-line', text: 'See the AI recommendation engine in action (3-min demo)', variant: 'Low commitment' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: '3-minute demo: Watch AI recommend the perfect ancillaries for 3 different traveller profiles.\n\n👔 Business traveller → Lounge + fast-track\n👨‍👩‍👧‍👦 Family → Extra bags + car seat + insurance\n🎒 Backpacker → Flexible dates + hostel bundle\n\nEach recommendation is contextual, not generic.', variant: 'Demo teaser' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'AI that knows what your travellers need before they do', variant: 'Hero' },
        { type: 'cta', text: 'Calculate your revenue uplift', variant: 'Calculator CTA' },
        { type: 'cta', text: 'See the 3-minute demo', variant: 'Low commitment' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'Revenue Intelligence', color: 'bg-sky-blue' },
        { name: 'Partner Success', color: 'bg-coral' },
        { name: 'Industry Events', color: 'bg-haiti' },
      ],
      pieces: [
        { week: 1, title: 'The Ancillary Revenue Playbook (Gated Whitepaper)', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Revenue Intelligence', brief: 'Comprehensive guide to ancillary revenue optimisation. Gate behind email for lead generation.' },
        { week: 3, title: 'Ancillary Revenue Calculator: How Much Are You Missing?', format: 'infographic', buyerStage: 'consideration', type: 'both', pillar: 'Revenue Intelligence', brief: 'Interactive calculator tool. Input booking volume, get projected uplift. Lead magnet.' },
        { week: 5, title: 'Case Study: How [Partner] Increased Revenue 30%', format: 'blog', buyerStage: 'decision', type: 'searchable', pillar: 'Partner Success', brief: 'Detailed case study with real numbers from first pilot partner.' },
        { week: 7, title: 'The AI Ancillary Revolution (Conference Talk)', format: 'video', buyerStage: 'awareness', type: 'shareable', pillar: 'Industry Events', brief: 'Record and publish conference talk for those who couldn\'t attend.' },
        { week: 9, title: 'Generic Upsells Are Leaving Money on the Table', format: 'social', buyerStage: 'awareness', type: 'shareable', pillar: 'Revenue Intelligence', brief: 'LinkedIn thought piece with data on contextual vs generic recommendation performance.' },
        { week: 11, title: 'Ancillary Revenue Summit Recap', format: 'email', buyerStage: 'decision', type: 'shareable', pillar: 'Industry Events', brief: 'Post-event roundup email to all registrants and leads with key takeaways.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Pure margin revenue, powered by intelligence', actions: ['Build interactive product demo with ROI calculator', 'Create ancillary revenue playbook whitepaper', 'Identify 20 target OTA partners'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'AI recommendations that boost revenue 30%', actions: ['Launch pilot with 3 OTA partners', 'Set up partner dashboard for self-serve onboarding', 'Measure revenue uplift vs control group'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'borrowed', messaging: 'The demo is the pitch', actions: ['Submit conference proposals to Phocuswright and WiT', 'Publish first case study with pilot results', 'Launch LinkedIn ad campaign targeting OTA decision-makers'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'rented', messaging: 'Join the partners already seeing 30% uplift', actions: ['Open self-serve dashboard for long-tail OTAs', 'Host "Ancillary Revenue Summit" virtual event', 'Scale outbound with proven ROI data'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'The smartest ancillary engine in travel', actions: ['General availability announcement', 'Press coverage coordinated with partner testimonials', 'Launch affiliate programme for technology consultants'] },
      ],
      checklist: [
        { label: 'ROI calculator tested with realistic data', category: 'pre-launch' },
        { label: 'Partner dashboard self-serve flow working', category: 'pre-launch' },
        { label: 'At least 1 case study with real revenue data', category: 'pre-launch' },
        { label: 'Conference talk proposals submitted', category: 'pre-launch' },
        { label: 'Pilot partners briefed on launch timeline', category: 'launch-day' },
        { label: 'Press release distributed', category: 'launch-day' },
        { label: 'LinkedIn campaign activated', category: 'launch-day' },
        { label: 'Track partner signup rate and activation', category: 'post-launch' },
        { label: 'Collect and publish additional case studies', category: 'post-launch' },
      ],
      pressAngles: [
        'AI recommendation engine boosts travel ancillary revenue 30% in first pilot',
        'SkyVoyager brings Amazon-style "customers also bought" intelligence to airlines',
        'The $40B ancillary opportunity: How AI is transforming post-booking revenue',
      ],
    },
  },
  {
    productId: 'prices',
    productName: 'Price Intelligence',
    tagline: 'Fintech meets travel — predict, freeze, save',
    targetAudience: 'Price-sensitive leisure travellers who track flight prices and want certainty',
    positioning: 'Stop guessing when to book. Price Intelligence gives you the data and the safety net.',
    channels: [
      { name: 'Programmatic SEO', icon: 'search', fit: 'high', reason: '"Cheap flights to X" and "best time to book Y" searches represent massive volume with direct purchase intent.' },
      { name: 'Email Marketing', icon: 'mail', fit: 'high', reason: 'Price alerts are the original growth loop. Smart alerts drive daily engagement and trust.' },
      { name: 'Free Tools', icon: 'wrench', fit: 'high', reason: 'A free price prediction widget drives traffic, captures leads, and demonstrates the product before signup.' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'medium', reason: 'Price prediction stories get media coverage — journalists love "best time to book" data stories.' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Launch "Best Time to Book" programmatic SEO pages for top 100 routes', 'Build free price prediction widget for embedding on travel blogs', 'Set up smart price alert email sequences'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Pitch "summer travel price predictions" to travel journalists', 'Launch price freeze feature with limited-time promotion', 'Create "Price Intelligence Index" monthly data report'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Scale programmatic SEO to 1,000+ route pages', 'Launch affiliate program for travel bloggers embedding the widget', 'Retarget price alert users with price freeze upsell'] },
    ],
    tactics: [
      { id: 4, name: 'Programmatic SEO', category: 'Content & SEO', effort: 'medium', impact: 'high', description: 'Build "Best time to fly [route]" and "Flight price trends [route]" pages at scale. Each route page shows predictions and captures email signups.', firstSteps: ['Identify top 100 routes by search volume', 'Build template with price chart, prediction, and alert CTA', 'Generate and index first batch, measure organic traffic'] },
      { id: 15, name: 'Engineering as Marketing', category: 'Free Tools', effort: 'medium', impact: 'high', description: 'Build an embeddable "Price Prediction Widget" that travel blogs can add to their sites. Every embed is a backlink and lead source.', firstSteps: ['Build lightweight embed script with route selector and price chart', 'Create landing page for bloggers to grab the embed code', 'Reach out to 50 travel blogs offering the free widget'] },
      { id: 49, name: 'Monthly Newsletter', category: 'Email', effort: 'low', impact: 'medium', description: '"The Price Intelligence Report" — monthly email with pricing trends, best deals, and predictions for upcoming holiday periods.', firstSteps: ['Design newsletter template with data visualisations', 'Set up automated data pipeline for monthly pricing insights', 'Launch with existing SkyVoyager email list segment'] },
      { id: 74, name: 'Press Coverage', category: 'PR', effort: 'low', impact: 'high', description: 'Pitch seasonal price predictions to travel journalists: "SkyVoyager data shows summer flights 23% cheaper if you book by March."', firstSteps: ['Build press-ready data pack with seasonal price predictions', 'Identify 30 travel journalists who cover booking advice', 'Time pitches to coincide with booking seasons'] },
    ],
    budget: [
      { category: 'SEO & Content', percentage: 40, color: 'bg-sky-blue' },
      { category: 'Email & CRM', percentage: 20, color: 'bg-coral' },
      { category: 'Free Tools & Widgets', percentage: 20, color: 'bg-berry' },
      { category: 'PR & Media', percentage: 15, color: 'bg-eco' },
      { category: 'Paid Ads', percentage: 5, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Organic traffic from route pages', target: '500K visits/mo', timeframe: '90 days' },
      { metric: 'Price alert subscribers', target: '100K', timeframe: '90 days' },
      { metric: 'Price freeze conversions', target: '10K', timeframe: '60 days' },
      { metric: 'Press mentions', target: '15', timeframe: '90 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: 'London to Paris: Book When Prices Drop', variant: 'Route-specific' },
        { type: 'headline', text: 'We Predict Flight Prices. You Save Money.', variant: 'Direct benefit' },
        { type: 'description', text: 'SkyVoyager\'s AI analyses millions of fares to predict when prices will drop. Set an alert and we\'ll tell you the best time to book. Or freeze today\'s price for 48 hours.', variant: 'Feature explanation' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: '📉 London→Barcelona just dropped 23%', variant: 'Price drop alert' },
        { type: 'subject-line', text: 'Our AI says: book your summer flights this week', variant: 'Prediction' },
        { type: 'subject-line', text: 'Freeze this price for 48 hours (before it goes up)', variant: 'Urgency' },
        { type: 'subject-line', text: 'The Price Intelligence Report: February 2026', variant: 'Newsletter' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: 'Flight prices to Bali are 31% below average right now.\n\nOur AI analysed 2 years of fare data and says: book before March 15.\n\nAfter that? Prices historically jump 40% for summer.\n\nSet a free price alert → link in bio', variant: 'Data hook' },
        { type: 'post', text: 'Stop guessing when to book.\n\n2024: "Should I book now or wait?" 😰\n2026: "AI says book Thursday. Price freezes at £347." 😌\n\nPrice Intelligence is free to try.', variant: 'Before/after' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'We analysed 100M+ fare records to answer the question every traveller asks:\n\n"Should I book now or wait?"\n\nThe answer isn\'t simple. It depends on route, seasonality, day of week, airline, and demand signals.\n\nSo we built an AI that weighs all of these factors and gives a confidence score.\n\nThe result: users who follow our predictions save an average of £127 per booking.', variant: 'Data story' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'Stop guessing when to book. Start knowing.', variant: 'Hero' },
        { type: 'headline', text: 'AI-powered flight price predictions — free', variant: 'Value + free' },
        { type: 'cta', text: 'Set a free price alert', variant: 'Low commitment' },
        { type: 'cta', text: 'Check my route', variant: 'Action-oriented' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'Price Predictions', color: 'bg-sky-blue' },
        { name: 'Route Guides', color: 'bg-eco' },
        { name: 'Data Stories', color: 'bg-berry' },
      ],
      pieces: [
        { week: 1, title: 'Best Time to Book London to New York (2026)', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Route Guides', brief: 'Programmatic SEO template for "best time to book [route]" queries. Show prediction chart + alert CTA.' },
        { week: 2, title: 'How SkyVoyager Predicts Flight Prices', format: 'blog', buyerStage: 'consideration', type: 'shareable', pillar: 'Price Predictions', brief: 'Technical explainer building trust in the prediction model. Share on HN and tech communities.' },
        { week: 4, title: 'Summer 2026 Flight Price Forecast', format: 'infographic', buyerStage: 'awareness', type: 'both', pillar: 'Data Stories', brief: 'Seasonal prediction report. Pitch to travel journalists for press coverage.' },
        { week: 6, title: 'Flight Price Trends by Day of Week', format: 'social', buyerStage: 'awareness', type: 'shareable', pillar: 'Data Stories', brief: 'Counter-intuitive data insight (e.g., "Tuesday bookings are a myth"). Viral potential on social.' },
        { week: 8, title: 'Price Freeze vs Price Alert: When to Use Each', format: 'blog', buyerStage: 'consideration', type: 'searchable', pillar: 'Price Predictions', brief: 'Feature comparison guide. Targets users evaluating the product features.' },
        { week: 10, title: 'The Price Intelligence Report: Q1 2026', format: 'email', buyerStage: 'decision', type: 'shareable', pillar: 'Data Stories', brief: 'Quarterly data report to newsletter subscribers. Builds habit and authority.' },
        { week: 12, title: 'Top 10 Routes With Biggest Price Drops This Month', format: 'blog', buyerStage: 'awareness', type: 'both', pillar: 'Route Guides', brief: 'Monthly roundup of best deals found by the AI. Recurring content with built-in freshness.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Know when to book, not guess', actions: ['Launch price prediction pages for top 100 routes', 'Build free price prediction widget for embedding', 'Set up smart price alert email sequences'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Flight prices, predicted by AI', actions: ['Email top SkyVoyager users about price alerts', 'Test price freeze conversion flow', 'Measure prediction accuracy against actual prices'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'borrowed', messaging: 'Stop overpaying for flights', actions: ['Pitch summer travel predictions to journalists', 'Launch price freeze with limited-time promotion', 'Reach out to 50 travel blogs offering free widget'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'rented', messaging: 'AI says: book now (or wait)', actions: ['Scale programmatic SEO to 500+ route pages', 'Launch "Price Intelligence Index" monthly report', 'Affiliate programme for travel bloggers embedding widget'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'Your flight price crystal ball', actions: ['GA launch with press coordination', 'Retarget alert users with price freeze upsell', 'Publish year-end "State of Flight Prices" report'] },
      ],
      checklist: [
        { label: 'Price prediction model validated on historical data', category: 'pre-launch' },
        { label: 'Top 100 route pages indexed and ranking', category: 'pre-launch' },
        { label: 'Price alert email flow tested end-to-end', category: 'pre-launch' },
        { label: 'Embeddable widget ready for partner blogs', category: 'pre-launch' },
        { label: 'Summer price prediction press pack ready', category: 'launch-day' },
        { label: 'Price freeze promotional pricing live', category: 'launch-day' },
        { label: 'Social campaign launched with data visualisations', category: 'launch-day' },
        { label: 'Monitor prediction accuracy weekly', category: 'post-launch' },
        { label: 'Track widget embed adoption', category: 'post-launch' },
        { label: 'Publish first monthly Price Intelligence Report', category: 'post-launch' },
      ],
      pressAngles: [
        'SkyVoyager AI predicts: book summer flights before March 15 to save 23%',
        'The fintech-ification of travel: SkyVoyager lets you freeze flight prices like a stock option',
        'AI analyses 100M fares to answer: when should you really book your flight?',
      ],
    },
  },
  {
    productId: 'experiences',
    productName: 'Tours & Experiences',
    tagline: 'Activity metasearch — the booking.com for things to do',
    targetAudience: 'Travellers researching activities and tours at their destination, comparing across providers',
    positioning: 'Compare tour prices across Viator, GetYourGuide, and direct providers — like SkyVoyager for flights, but for experiences.',
    channels: [
      { name: 'Content & SEO', icon: 'search', fit: 'high', reason: '"Things to do in [city]" and "[activity] in [city] price" queries have massive volume and direct commercial intent.' },
      { name: 'Creator Marketing', icon: 'users', fit: 'high', reason: 'Travel and lifestyle creators naturally showcase experiences — authentic content that drives bookings.' },
      { name: 'Google Ads', icon: 'target', fit: 'high', reason: 'High-intent "book [activity]" searches convert directly. Google Ads captures demand the moment it exists.' },
      { name: 'Cross-Sell', icon: 'repeat', fit: 'medium', reason: 'Flight bookers on SkyVoyager are already going somewhere — introduce experiences at the perfect moment.' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Build "Things to do in [City]" SEO pages for top 50 destinations', 'Launch Google Ads for "book [activity] [city]" queries', 'Create experience comparison content: "Viator vs GetYourGuide vs Direct"'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Partner with 20 travel creators for experience review content', 'Launch post-booking experience recommendations for flight customers', 'Build "Best Experiences" curated guides for trending destinations'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Scale SEO to 500+ destination experience pages', 'Launch experience bundles: "Tokyo food tour + cooking class"', 'Introduce user reviews and photo content for social proof'] },
    ],
    tactics: [
      { id: 1, name: 'Easy Keyword Ranking', category: 'Content & SEO', effort: 'low', impact: 'high', description: 'Target long-tail experience queries like "best cooking class in Barcelona price comparison". Less competition than broad destination terms.', firstSteps: ['Research 200 long-tail experience + city keyword combinations', 'Build comparison page template: price, reviews, booking links', 'Publish first 50 pages and track ranking progress'] },
      { id: 11, name: 'Competitor Comparison Pages', category: 'Competitor', effort: 'low', impact: 'high', description: 'Create "Viator vs GetYourGuide vs [Your Product]" comparison pages. Searchers comparing providers are ready to buy.', firstSteps: ['Build template comparing price, cancellation policy, reviews', 'Create pages for top 10 experience categories', 'Add structured data for rich snippets in search results'] },
      { id: 55, name: 'Influencer Whitelisting', category: 'Partnerships', effort: 'medium', impact: 'high', description: 'Run paid ads through travel creator accounts showing their authentic experience reviews. Creator trust + ad targeting = high conversion.', firstSteps: ['Identify 10 travel creators with engaged audiences in target destinations', 'Negotiate whitelisting agreements for their experience content', 'Launch ads through their accounts targeting experience searchers'] },
      { id: 91, name: 'In-App Upsells', category: 'Product-Led', effort: 'low', impact: 'high', description: 'Recommend experiences to travellers who just booked flights. "You\'re going to Barcelona — here are the top experiences" at the moment of highest intent.', firstSteps: ['Build post-booking recommendation module for top destinations', 'Test placement: confirmation page, email, and app notification', 'Measure click-through and booking rates by channel'] },
    ],
    budget: [
      { category: 'SEO & Content', percentage: 30, color: 'bg-sky-blue' },
      { category: 'Google Ads', percentage: 25, color: 'bg-coral' },
      { category: 'Creator Partnerships', percentage: 25, color: 'bg-berry' },
      { category: 'Cross-Sell (Internal)', percentage: 15, color: 'bg-eco' },
      { category: 'PR & Earned Media', percentage: 5, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Monthly experience comparisons', target: '200K', timeframe: '90 days' },
      { metric: 'Booking conversion rate', target: '4.5%', timeframe: '90 days' },
      { metric: 'Cross-sell click-through', target: '15%', timeframe: '60 days' },
      { metric: 'SEO traffic from experience pages', target: '300K visits/mo', timeframe: '90 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: 'Compare Tours Across Viator & GetYourGuide', variant: 'Metasearch' },
        { type: 'headline', text: 'Book Experiences. Save Up to 30%.', variant: 'Savings' },
        { type: 'description', text: 'Compare prices for tours, activities, and experiences across Viator, GetYourGuide, and direct providers. Like SkyVoyager for flights — but for things to do.', variant: 'Analogy' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: 'You\'re going to Barcelona — here are the top experiences', variant: 'Cross-sell' },
        { type: 'subject-line', text: 'Cooking class in Barcelona: Viator vs GetYourGuide vs Direct', variant: 'Comparison' },
        { type: 'subject-line', text: 'The hidden experiences tourists miss (but locals love)', variant: 'Insider' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: 'You\'re booking a cooking class in Barcelona.\n\nViator: £65\nGetYourGuide: £58\nDirect booking: £42\n\nSame class. Three prices.\n\nSkyVoyager Experiences compares them all in one search. Stop overpaying for the same experience.', variant: 'Price comparison' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'The "things to do" market is where flights were 15 years ago.\n\nFragmented. Opaque pricing. No comparison tools.\n\nViator, GetYourGuide, Klook, and thousands of local operators — all with different prices for the same experience.\n\nWe built the metasearch for activities. Compare prices, read reviews, book the best deal.\n\nIt\'s what SkyVoyager does for flights — now for everything after you land.', variant: 'Market opportunity' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'Compare experiences. Book the best deal.', variant: 'Hero' },
        { type: 'headline', text: 'Like SkyVoyager for flights — but for things to do', variant: 'Analogy' },
        { type: 'cta', text: 'Search experiences in your destination', variant: 'Action' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'Destination Experiences', color: 'bg-sky-blue' },
        { name: 'Price Comparisons', color: 'bg-coral' },
        { name: 'Creator Content', color: 'bg-berry' },
      ],
      pieces: [
        { week: 1, title: 'Top 20 Experiences in Barcelona (Compared)', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Destination Experiences', brief: 'Target "things to do in Barcelona" keywords. Compare prices across providers for each experience.' },
        { week: 2, title: 'Viator vs GetYourGuide: Full Comparison', format: 'blog', buyerStage: 'consideration', type: 'searchable', pillar: 'Price Comparisons', brief: 'Competitor comparison page targeting "[competitor] vs [competitor]" searches. Position SkyVoyager as third option.' },
        { week: 4, title: 'I Booked the Same Tour on 3 Platforms (Price Reveal)', format: 'video', buyerStage: 'awareness', type: 'shareable', pillar: 'Price Comparisons', brief: 'Video comparing the booking experience and price of the same tour across different platforms.' },
        { week: 6, title: 'Best Cooking Classes in Europe: AI-Curated Guide', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Destination Experiences', brief: 'Category-specific guide targeting "cooking class [city]" keyword cluster.' },
        { week: 8, title: 'You Booked a Flight — Now What?', format: 'email', buyerStage: 'decision', type: 'searchable', pillar: 'Destination Experiences', brief: 'Cross-sell email triggered post-flight-booking with curated experiences at destination.' },
        { week: 10, title: 'Creator Reviews: "I Tried 5 Food Tours in Tokyo"', format: 'video', buyerStage: 'consideration', type: 'shareable', pillar: 'Creator Content', brief: 'Influencer whitelisted content — authentic review driving comparison searches.' },
        { week: 12, title: 'Experience Bundles: Save 20% on Multi-Day Passes', format: 'social', buyerStage: 'decision', type: 'shareable', pillar: 'Price Comparisons', brief: 'Promote bundled experiences with savings. Drive urgency with limited-time pricing.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Compare experiences, book the best deal', actions: ['Build "Things to do in [City]" SEO pages for top 50 destinations', 'Set up price comparison data pipeline', 'Test booking flow end-to-end with 5 providers'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'The metasearch for things to do', actions: ['Launch Google Ads for "book [activity] [city]" queries', 'Add experience recommendations to post-booking flight emails', 'Create comparison pages for top experience categories'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'borrowed', messaging: 'Stop overpaying for the same experience', actions: ['Partner with 10 travel creators for experience review content', 'Launch "Best Experiences" curated guides', 'A/B test cross-sell placement on flight confirmation page'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'rented', messaging: 'Everything you\'ll do on your trip, in one place', actions: ['Scale SEO to 500+ destination experience pages', 'Launch experience bundles with promotional pricing', 'Run influencer whitelisting ads through creator accounts'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'Your trip. Your experiences. Best prices.', actions: ['Full launch announcement across all channels', 'User review and photo sharing feature goes live', 'Press coordination with "travel metasearch expands" angle'] },
      ],
      checklist: [
        { label: 'Top 50 destination experience pages live', category: 'pre-launch' },
        { label: 'Price comparison API connected to 3+ providers', category: 'pre-launch' },
        { label: 'Cross-sell module integrated in flight booking flow', category: 'pre-launch' },
        { label: 'Creator partnerships confirmed for launch content', category: 'pre-launch' },
        { label: 'Google Ads campaigns activated', category: 'launch-day' },
        { label: 'Cross-sell emails triggered for recent bookers', category: 'launch-day' },
        { label: 'Social campaign launched with price comparison content', category: 'launch-day' },
        { label: 'Monitor booking conversion rate by provider', category: 'post-launch' },
        { label: 'Track cross-sell click-through rate', category: 'post-launch' },
        { label: 'Scale to 500+ destination pages', category: 'post-launch' },
      ],
      pressAngles: [
        'SkyVoyager applies its flight comparison model to tours and experiences',
        'Same cooking class, three prices: The experience comparison gap SkyVoyager wants to fix',
        'Post-booking is the new battleground: SkyVoyager cross-sells experiences to flight customers',
      ],
    },
  },
  {
    productId: 'business-travel',
    productName: 'Business Travel Agent',
    tagline: 'AI-powered SMB travel management that actually works',
    targetAudience: 'SMB office managers and founders who manage business travel without a dedicated travel team',
    positioning: 'Enterprise travel management, minus the enterprise complexity. Natural language booking with built-in policy compliance.',
    channels: [
      { name: 'LinkedIn', icon: 'linkedin', fit: 'high', reason: 'SMB decision-makers live on LinkedIn. Thought leadership + targeted ads reach office managers and founders directly.' },
      { name: 'Content Marketing', icon: 'file-text', fit: 'high', reason: '"Business travel policy template" and "manage company travel" content captures SMBs actively solving this problem.' },
      { name: 'Product-Led Growth', icon: 'zap', fit: 'high', reason: 'Free tier for small teams (<5 travellers) creates a usage-based growth engine with natural upsell moments.' },
      { name: 'Partnerships', icon: 'handshake', fit: 'medium', reason: 'Integrate with Slack, Xero, and HR tools. Each integration is a co-marketing opportunity and distribution channel.' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Launch LinkedIn content strategy: founder-led posts on business travel pain points', 'Create "Business Travel Policy Template" as lead magnet', 'Build free tier for teams under 5 travellers'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Launch LinkedIn Ads targeting office managers at 10-200 person companies', 'Publish Slack integration and co-market in Slack App Directory', 'Create customer case study: "How [Company] saved 30% on business travel"'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Launch referral programme: "Give £50, get £50" for business accounts', 'Host webinar: "SMB Travel Management in the AI Era"', 'Expand integrations to Xero and QuickBooks for expense automation'] },
    ],
    tactics: [
      { id: 39, name: 'LinkedIn Audience', category: 'Social', effort: 'low', impact: 'high', description: 'Build a founder-led LinkedIn presence sharing business travel insights, pain points, and product development stories. Authentic B2B content.', firstSteps: ['Commit to 3 posts per week on business travel challenges', 'Share "building in public" stories about the product', 'Engage with comments from target SMB audience'] },
      { id: 98, name: 'Template Marketing', category: 'Content', effort: 'low', impact: 'high', description: 'Offer free business travel policy templates, expense report templates, and booking request forms. Practical tools that capture leads.', firstSteps: ['Create 5 downloadable templates: travel policy, expense report, approval form, itinerary, cost comparison', 'Build landing page with email gate', 'Promote templates in LinkedIn posts and SEO content'] },
      { id: 87, name: 'Powered-By Marketing', category: 'Product-Led', effort: 'low', impact: 'medium', description: '"Powered by SkyVoyager Business" badge on all booking confirmations and itineraries. Every business trip becomes a brand impression.', firstSteps: ['Design subtle "Powered by SkyVoyager Business" badge', 'Add to all customer-facing outputs: confirmations, itineraries, reports', 'Track impressions and click-throughs from badge'] },
      { id: 137, name: 'Two-Sided Referrals', category: 'Growth', effort: 'medium', impact: 'high', description: 'Referral programme where both referrer and new team get account credit. SMB founders talk to each other — leverage that network.', firstSteps: ['Design "Give £50, get £50" referral programme', 'Add referral prompt after positive booking experiences', 'Build referral dashboard and tracking'] },
    ],
    budget: [
      { category: 'LinkedIn & Social', percentage: 30, color: 'bg-sky-blue' },
      { category: 'Content & SEO', percentage: 25, color: 'bg-coral' },
      { category: 'Product-Led Growth', percentage: 20, color: 'bg-berry' },
      { category: 'Partnerships', percentage: 15, color: 'bg-eco' },
      { category: 'Paid Ads (Google)', percentage: 10, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Free tier signups', target: '1,000 teams', timeframe: '90 days' },
      { metric: 'Free-to-paid conversion', target: '12%', timeframe: '90 days' },
      { metric: 'LinkedIn post impressions', target: '500K', timeframe: '90 days' },
      { metric: 'Referral-driven signups', target: '20%', timeframe: '60 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: 'Business Travel Without the Admin', variant: 'Pain relief' },
        { type: 'headline', text: 'SMB Travel Management That Actually Works', variant: 'Direct' },
        { type: 'description', text: 'Book business trips with natural language. Built-in policy compliance, auto-receipt collection, and approval workflows. Free for teams under 5.', variant: 'Feature stack' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'How do SMBs manage business travel today?\n\nMostly like this:\n1. Employee googles flights\n2. Screenshots options to Slack\n3. Manager approves via emoji\n4. Employee books on personal card\n5. Submits receipt 3 weeks later\n6. Finance chases it up\n\nWe built an AI that handles all 6 steps in one conversation.\n\n"Book Sarah London to Berlin next Tuesday, under £300, aisle seat."\n\nDone. Policy-checked. Receipt captured. Expense filed.', variant: 'Problem story' },
        { type: 'post', text: 'We used to spend 4 hours/week managing business travel for a 30-person team.\n\nNow it takes 20 minutes.\n\nThe AI handles policy checks, booking, receipts, and expense filing. My team just says what they need in plain English.\n\nHere\'s what we learned building it →', variant: 'Founder story' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: 'The business travel policy template you actually need', variant: 'Template hook' },
        { type: 'subject-line', text: 'You\'re spending 4 hrs/week on travel admin. Here\'s how to fix it.', variant: 'Pain point' },
        { type: 'subject-line', text: 'Free for teams under 5 — business travel, simplified', variant: 'Free tier' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: 'SMB business travel in 2024: screenshots, Slack, personal cards, lost receipts.\n\nSMB business travel in 2026: "Book me to Berlin next Tuesday, under £300."\n\nThe AI agent checks policy, finds options, books, captures receipts, and files expenses.\n\nFree for teams under 5.', variant: 'Before/after' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'Business travel management that doesn\'t feel like management', variant: 'Hero' },
        { type: 'headline', text: 'Enterprise travel tools. Startup simplicity.', variant: 'Contrast' },
        { type: 'cta', text: 'Start free — teams under 5', variant: 'Free tier' },
        { type: 'cta', text: 'See how it works in 2 minutes', variant: 'Demo' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'SMB Travel Ops', color: 'bg-sky-blue' },
        { name: 'Templates & Tools', color: 'bg-coral' },
        { name: 'Building in Public', color: 'bg-eco' },
      ],
      pieces: [
        { week: 1, title: 'The Complete SMB Business Travel Policy Template', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Templates & Tools', brief: 'Free downloadable template. Gate behind email. Target "business travel policy template" keywords.' },
        { week: 2, title: 'Why We Built an AI Business Travel Agent', format: 'blog', buyerStage: 'consideration', type: 'shareable', pillar: 'Building in Public', brief: 'Founder-led LinkedIn post and blog. Authentic story about the problem and why AI is the right solution.' },
        { week: 4, title: 'Business Travel Expense Report Template (Free)', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Templates & Tools', brief: 'Free template targeting "business travel expense template" keywords. CTA to automate with the product.' },
        { week: 5, title: 'How [Company] Saved 30% on Business Travel', format: 'blog', buyerStage: 'decision', type: 'both', pillar: 'SMB Travel Ops', brief: 'First customer case study. Real company, real numbers, real quotes.' },
        { week: 7, title: 'AI Travel Agent Demo: Book a Trip in 60 Seconds', format: 'video', buyerStage: 'consideration', type: 'shareable', pillar: 'Building in Public', brief: 'Screen recording of natural language booking flow. LinkedIn native video for engagement.' },
        { week: 9, title: 'SMB Travel Management: The Complete Guide', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'SMB Travel Ops', brief: 'Hub page targeting "SMB travel management" keyword cluster. Comprehensive guide with product CTA.' },
        { week: 11, title: 'Integrating with Slack, Xero, and QuickBooks', format: 'blog', buyerStage: 'decision', type: 'searchable', pillar: 'Templates & Tools', brief: 'Integration marketing content. Co-market in partner app directories.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Business travel without the admin', actions: ['Build free tier for teams under 5 travellers', 'Create business travel policy template lead magnet', 'Launch founder LinkedIn content strategy (3 posts/week)'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Book business trips with a conversation', actions: ['Invite 50 SMB founders from personal network', 'Launch on Slack App Directory', 'Publish first "building in public" blog post'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'rented', messaging: 'Enterprise tools, startup simplicity', actions: ['LinkedIn Ads targeting office managers at 10-200 person companies', 'Create customer case study from alpha users', 'Launch Xero and QuickBooks integrations with co-marketing'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'borrowed', messaging: 'Join 500 teams already saving 30% on travel', actions: ['Guest on 3 SMB/startup podcasts', 'Host webinar: "SMB Travel Management in the AI Era"', 'Launch referral programme: "Give £50, get £50"'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'The AI travel agent for growing teams', actions: ['Full launch announcement across all channels', 'Product Hunt launch (Tuesday, targeted at SMB audience)', 'Press pitch: "The Concur killer for startups"'] },
      ],
      checklist: [
        { label: 'Free tier flow tested end-to-end', category: 'pre-launch' },
        { label: 'Slack App Directory listing live', category: 'pre-launch' },
        { label: 'Template lead magnets published and promoted', category: 'pre-launch' },
        { label: 'LinkedIn content calendar populated for 4 weeks', category: 'pre-launch' },
        { label: 'Founder LinkedIn post announcing launch', category: 'launch-day' },
        { label: 'LinkedIn Ads campaign activated', category: 'launch-day' },
        { label: 'Email blast to template download leads', category: 'launch-day' },
        { label: 'Referral programme live and tested', category: 'launch-day' },
        { label: 'Track free-to-paid conversion rate weekly', category: 'post-launch' },
        { label: 'Collect first 10 customer testimonials', category: 'post-launch' },
        { label: 'Expand to additional accounting integrations', category: 'post-launch' },
      ],
      pressAngles: [
        'The "Concur killer": An AI travel agent for companies that don\'t have a travel department',
        'SMB founders are managing business travel via Slack emoji reactions. This startup wants to fix that.',
        'Natural language business travel: Book, comply, expense — all in one sentence',
      ],
    },
  },
]

export function getPlanByProductId(productId: string): MarketingPlan | undefined {
  return marketingPlans.find(p => p.productId === productId)
}
