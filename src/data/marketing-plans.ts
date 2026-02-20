export interface Channel {
  name: string
  icon: string
  fit: 'high' | 'medium'
  reason: string
  roi: number
  cpa: string
  incrementality: number
  efficiency: 'efficient' | 'diminishing' | 'saturated'
}

// --- Competitor Analysis ---
export interface Competitor {
  name: string
  positioning: string
  primaryChannels: string[]
  strength: string
  gap: string
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
export interface HeroOutput {
  type: 'landing-page' | 'creator-list' | 'slack-message' | 'email-draft'
  label: string
}

export interface CreatorProfile {
  name: string
  handle: string
  followers: string
  niche: string
  relevance: number
}

export interface PlaybookAction {
  text: string
  hero?: HeroOutput
  creators?: CreatorProfile[]
  slackMessage?: { channel: string; body: string }
  emailDraft?: { to: string; subject: string; body: string }
}

export interface LaunchPhase {
  phase: string
  timeline: string
  channelType: 'owned' | 'rented' | 'borrowed'
  messaging: string
  actions: (string | PlaybookAction)[]
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
  competitors: Competitor[]
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
    competitors: [
      { name: 'Google Travel', positioning: 'Integrated trip planning within Google ecosystem', primaryChannels: ['Search dominance', 'YouTube', 'Google Ads'], strength: 'Unbeatable distribution — baked into every Google search', gap: 'Generic recommendations, no AI conversation. Users still need 10 tabs.' },
      { name: 'TripAdvisor', positioning: 'User-generated reviews and crowd-sourced travel advice', primaryChannels: ['SEO', 'UGC Content', 'Display Ads'], strength: '500M+ reviews create trust and SEO dominance for destination queries', gap: 'Reviews ≠ planning. No personalised itinerary building. Feels dated.' },
      { name: 'Kayak', positioning: 'Price comparison and trip planning tools', primaryChannels: ['Programmatic SEO', 'App Store', 'Paid Search'], strength: 'Strong brand in price comparison with useful planning tools', gap: 'Planning tools are manual. No AI. No conversation. Just forms and filters.' },
    ],
    channels: [
      { name: 'SEO & Content', icon: 'search', fit: 'high', reason: 'Travellers start with Google. Programmatic SEO for "X days in Y" queries captures high-intent traffic at scale.', roi: 5.2, cpa: '$8', incrementality: 72, efficiency: 'efficient' },
      { name: 'Social Video', icon: 'video', fit: 'high', reason: 'Trip planning is inherently visual. Short-form video of AI-generated itineraries gets organic shares.', roi: 4.1, cpa: '$12', incrementality: 68, efficiency: 'efficient' },
      { name: 'Creator Partnerships', icon: 'users', fit: 'high', reason: 'Travel influencers using the tool creates authentic demo content their audience trusts.', roi: 3.8, cpa: '$18', incrementality: 81, efficiency: 'efficient' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'high', reason: 'AI trip planning is a story journalists want to tell. One feature in a major outlet drives 10x the traffic of paid ads.', roi: 7.4, cpa: '$3', incrementality: 85, efficiency: 'efficient' },
      { name: 'Product Hunt', icon: 'rocket', fit: 'medium', reason: 'AI + travel is trending. A well-timed launch captures early adopter mindshare.', roi: 2.1, cpa: '$22', incrementality: 45, efficiency: 'diminishing' },
      { name: 'Email Marketing', icon: 'mail', fit: 'medium', reason: 'Trip inspiration emails to existing SkyVoyager users. Low cost, high conversion from warm audience.', roi: 6.8, cpa: '$2', incrementality: 35, efficiency: 'saturated' },
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
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'AI that plans trips like a well-travelled friend', actions: ['Recruit 100 internal testers across Skyscanner offices', { text: 'Send launch announcement to #product Slack channel', hero: { type: 'slack-message', label: 'View draft message' }, slackMessage: { channel: '#product-launches', body: '🚀 *AI Trip Planner* is ready for internal testing!\n\nWe need 100 testers to try our new AI trip planner before we go public. It creates complete itineraries in 30 seconds.\n\n*What we need:* Plan a real trip and share your honest feedback.\n*Time commitment:* 15 minutes\n*Perk:* First 50 testers get early access for life\n\nSign up → skyvoyager.com/internal-beta\n\ncc @travel-team @product' } }, 'Fix top 5 usability issues from internal testing', 'Collect 10 internal testimonial quotes'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'The trip planner that actually plans your trip', actions: [{ text: 'Create landing page with early access signup', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Email existing SkyVoyager power users (top 1K)', 'Launch on internal blog and employee social channels', 'Target 500 alpha signups'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'rented', messaging: 'Stop researching. Start exploring.', actions: ['Send early access invites to alpha waitlist', 'Seed 5 hero demo videos on TikTok and Reels', 'Engage travel subreddits with authentic trip reports', 'Partner with 3 mid-tier travel creators for first reviews'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'borrowed', messaging: '30 seconds to your perfect itinerary', actions: ['Pitch exclusive preview to travel journalists', { text: 'Identify 10 travel creators for partnership programme', hero: { type: 'creator-list', label: 'View creator shortlist' }, creators: [{ name: 'Kara and Nate', handle: '@karaandnate', followers: '3.8M', niche: 'Budget travel vlogging', relevance: 95 }, { name: 'Hey Nadine', handle: '@heynadine', followers: '1.2M', niche: 'Solo female travel', relevance: 92 }, { name: 'Lost LeBlanc', handle: '@lostleblanc', followers: '2.1M', niche: 'Luxury travel cinematography', relevance: 88 }, { name: 'The Bucket List Family', handle: '@thebucketlistfamily', followers: '2.9M', niche: 'Family adventure travel', relevance: 85 }, { name: 'Sorelle Amore', handle: '@sorelleamore', followers: '890K', niche: 'Photography & slow travel', relevance: 82 }, { name: 'Drew Binsky', handle: '@drewbinsky', followers: '3.2M', niche: 'Every country challenge', relevance: 80 }, { name: 'Sailing La Vagabonde', handle: '@lavagabonde', followers: '1.8M', niche: 'Sailing & adventure', relevance: 75 }, { name: 'Mark Wiens', handle: '@markwiens', followers: '9.4M', niche: 'Food travel', relevance: 78 }] }, 'Publish "How We Built It" technical blog post for HN audience', 'Open beta to all waitlist signups'] },
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
    competitors: [
      { name: 'Google Maps', positioning: 'Default navigation and local discovery for travellers', primaryChannels: ['Pre-installed', 'Search', 'Local Ads'], strength: 'Already on every phone. Deep local data. Hard to compete on mapping.', gap: 'No trip context. Doesn\'t know you\'re on holiday or what you booked. No proactive alerts.' },
      { name: 'TripIt', positioning: 'Travel itinerary organiser from email confirmations', primaryChannels: ['Word of mouth', 'App Store', 'Concur integration'], strength: 'Automatic itinerary parsing from confirmation emails. Business traveller favourite.', gap: 'Organises but doesn\'t assist. No local tips, no real-time alerts, no AI recommendations.' },
      { name: 'Airbnb', positioning: 'Local experiences and accommodation platform', primaryChannels: ['SEO', 'Social', 'Email', 'App'], strength: 'Strong "live like a local" brand. Experiences marketplace is growing.', gap: 'Only covers Airbnb bookings. No flight info, no cross-platform trip view.' },
    ],
    channels: [
      { name: 'Email Onboarding', icon: 'mail', fit: 'high', reason: 'Every booking confirmation is a distribution channel. Introduce the companion at the moment of highest excitement.', roi: 8.2, cpa: '$1', incrementality: 42, efficiency: 'efficient' },
      { name: 'Push Notifications', icon: 'bell', fit: 'high', reason: 'Time-sensitive travel info (gate changes, weather, restaurant hours) makes push feel helpful, not spammy.', roi: 5.6, cpa: '$0', incrementality: 55, efficiency: 'efficient' },
      { name: 'App Store', icon: 'smartphone', fit: 'high', reason: 'App Store Optimization for "travel assistant" and "trip planner" keywords captures users actively looking.', roi: 3.4, cpa: '$14', incrementality: 78, efficiency: 'efficient' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'high', reason: 'AI travel companion stories get tech press coverage. "Your phone becomes your tour guide" is a headline that writes itself.', roi: 6.1, cpa: '$4', incrementality: 82, efficiency: 'efficient' },
      { name: 'Partnerships', icon: 'handshake', fit: 'medium', reason: 'Hotels and airlines can white-label the companion, expanding reach through existing touchpoints.', roi: 2.8, cpa: '$25', incrementality: 38, efficiency: 'diminishing' },
      { name: 'Social Video', icon: 'video', fit: 'medium', reason: '"My phone just told me my gate changed before the airport screen" — real-time companion moments make viral social content.', roi: 3.2, cpa: '$16', incrementality: 62, efficiency: 'diminishing' },
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
        { type: 'headline', text: 'Real-time tips, alerts, and local picks — right in your pocket', variant: 'Feature-led' },
        { type: 'cta', text: 'Get my trip guide', variant: 'Value-first' },
        { type: 'cta', text: 'See it in action — pick a destination', variant: 'Interactive' },
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
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Your trip doesn\'t end at booking', actions: ['Dog-food with upcoming business trips across the company', { text: 'Send beta recruitment message to #travel-team', hero: { type: 'slack-message', label: 'View draft message' }, slackMessage: { channel: '#travel-team', body: '📱 *In-Trip Companion* needs beta testers!\n\nGot an upcoming trip? We want you to try our AI companion that sends real-time alerts, local restaurant picks, and proactive disruption warnings.\n\n*How to join:*\n1. Book any trip through SkyVoyager\n2. Enable the Companion in your trip settings\n3. Share feedback in #companion-beta\n\n*What to test:* Push notifications, local recommendations, gate change alerts\n\nSignup: skyvoyager.com/companion-beta' } }, 'Collect feedback on recommendation quality'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Meet your in-trip AI assistant', actions: [{ text: 'Create landing page with companion feature showcase', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Launch to top 5% most active SkyVoyager bookers', 'Measure activation rate and daily usage'] },
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
    competitors: [
      { name: 'Amadeus', positioning: 'Legacy GDS with ancillary merchandising bolted on', primaryChannels: ['Enterprise Sales', 'Events', 'Partner Network'], strength: 'Installed base. Every airline already uses Amadeus for something.', gap: 'Generic rules engine, not ML. Same offers to everyone. Slow to deploy new models.' },
      { name: 'Travelport', positioning: 'GDS platform with ancillary retailing capabilities', primaryChannels: ['Enterprise Sales', 'Industry Events', 'Trade Press'], strength: 'Strong airline relationships and NDC-ready platform.', gap: 'Ancillary recommendations are rule-based, not personalised. Low attach rates.' },
      { name: 'PROS', positioning: 'AI-powered revenue management and pricing', primaryChannels: ['Enterprise Sales', 'Whitepapers', 'Conferences'], strength: 'Sophisticated pricing AI. Strong in airline revenue management.', gap: 'Focused on pricing, not ancillary product recommendations. Different problem.' },
    ],
    channels: [
      { name: 'B2B Sales', icon: 'briefcase', fit: 'high', reason: 'Revenue-generating products sell themselves in partner meetings. The demo is the pitch.', roi: 4.5, cpa: '$120', incrementality: 90, efficiency: 'efficient' },
      { name: 'Integration Marketing', icon: 'plug', fit: 'high', reason: 'Joint case studies with early partners prove ROI and attract new ones.', roi: 6.2, cpa: '$45', incrementality: 75, efficiency: 'efficient' },
      { name: 'Conference Speaking', icon: 'mic', fit: 'high', reason: 'Travel industry events (Phocuswright, WiT) are where buyers decide on technology partners.', roi: 3.8, cpa: '$85', incrementality: 70, efficiency: 'efficient' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'high', reason: 'Trade press coverage in Phocuswire, Skift, and TTG positions SkyVoyager as the innovation leader in ancillary revenue.', roi: 5.1, cpa: '$15', incrementality: 65, efficiency: 'efficient' },
      { name: 'Product-Led Growth', icon: 'zap', fit: 'medium', reason: 'Self-serve dashboard lets small OTAs onboard without a sales call.', roi: 2.4, cpa: '$65', incrementality: 52, efficiency: 'diminishing' },
      { name: 'Content Marketing', icon: 'file-text', fit: 'medium', reason: '"Ancillary Revenue Playbook" whitepaper and blog content captures B2B search demand from OTAs researching solutions.', roi: 3.1, cpa: '$35', incrementality: 48, efficiency: 'diminishing' },
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
        { type: 'headline', text: 'Turn every booking into a revenue opportunity', variant: 'Revenue angle' },
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
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Pure margin revenue, powered by intelligence', actions: ['Build interactive product demo with ROI calculator', 'Create ancillary revenue playbook whitepaper', { text: 'Draft partner outreach email to top 20 OTAs', hero: { type: 'email-draft', label: 'View draft email' }, emailDraft: { to: 'partnerships@[ota-partner].com', subject: 'AI ancillary recommendations: 30% revenue uplift in 6 weeks', body: 'Hi [Name],\n\nI\'m reaching out because [OTA Partner] processes millions of bookings where travellers don\'t add extras — and we think that\'s leaving significant revenue on the table.\n\nWe\'ve built an AI engine that recommends the right ancillary (baggage, insurance, lounge access, car hire) at the right moment in the booking flow. Early pilots show a 30% increase in ancillary attach rates.\n\nWould you be open to a 15-minute demo? I can show you projected revenue impact based on your booking volume.\n\nBest,\n[Name]\nHead of Partnerships, SkyVoyager' } }] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'AI recommendations that boost revenue 30%', actions: [{ text: 'Create product landing page for partner acquisition', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Set up partner dashboard for self-serve onboarding', 'Measure revenue uplift vs control group'] },
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
    competitors: [
      { name: 'Hopper', positioning: 'Mobile-first price prediction and freeze for flights and hotels', primaryChannels: ['App Store', 'Push Notifications', 'Social Media'], strength: 'Best-in-class mobile UX. Price freeze is a killer feature. Strong brand with young travellers.', gap: 'Mobile-only. No web presence. No embeddable tools. Walled garden approach.' },
      { name: 'Google Flights', positioning: 'Free flight search with basic price tracking', primaryChannels: ['Google Search integration', 'Chrome notifications'], strength: 'Infinite distribution. Built into every "flights to X" Google search.', gap: 'Basic price tracking, no prediction confidence scores. No price freeze. No alerts beyond email.' },
      { name: 'Kayak', positioning: 'Meta-search with price alerts and trends', primaryChannels: ['SEO', 'App Store', 'Display Ads'], strength: 'Strong SEO presence for price comparison queries. Good price trend data.', gap: 'Trends are descriptive, not predictive. No price freeze. Monetised by referral fees, not user trust.' },
    ],
    channels: [
      { name: 'Programmatic SEO', icon: 'search', fit: 'high', reason: '"Cheap flights to X" and "best time to book Y" searches represent massive volume with direct purchase intent.', roi: 6.8, cpa: '$5', incrementality: 75, efficiency: 'efficient' },
      { name: 'Email Marketing', icon: 'mail', fit: 'high', reason: 'Price alerts are the original growth loop. Smart alerts drive daily engagement and trust.', roi: 9.2, cpa: '$1', incrementality: 40, efficiency: 'saturated' },
      { name: 'Free Tools', icon: 'wrench', fit: 'high', reason: 'A free price prediction widget drives traffic, captures leads, and demonstrates the product before signup.', roi: 4.5, cpa: '$10', incrementality: 82, efficiency: 'efficient' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'high', reason: 'Price prediction stories get media coverage — journalists love "best time to book" data stories.', roi: 8.1, cpa: '$3', incrementality: 88, efficiency: 'efficient' },
      { name: 'Social Video', icon: 'video', fit: 'medium', reason: '"I saved £400 by waiting 3 days — here\'s how" content drives engagement and app downloads.', roi: 2.8, cpa: '$18', incrementality: 58, efficiency: 'diminishing' },
      { name: 'Google Ads', icon: 'target', fit: 'medium', reason: 'Capture "cheap flights" and "best flight deals" searches — high intent but competitive CPC.', roi: 1.9, cpa: '$28', incrementality: 32, efficiency: 'saturated' },
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
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Know when to book, not guess', actions: ['Launch price prediction pages for top 100 routes', 'Build free price prediction widget for embedding', { text: 'Announce beta to #data-science and #product teams', hero: { type: 'slack-message', label: 'View draft message' }, slackMessage: { channel: '#data-science', body: '📊 *Price Intelligence* beta is live!\n\nOur ML model can now predict flight price movements with 87% accuracy across 500+ routes.\n\n*What we need:*\n• Data scientists: Review prediction confidence methodology\n• Product: Test price alert UX on 3 routes\n• Everyone: Try freezing a price on a route you\'re interested in\n\nDashboard → skyvoyager.com/price-intel-beta\n\nFeedback in #price-intelligence-feedback 🙏' } }] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Flight prices, predicted by AI', actions: [{ text: 'Build landing page for price alerts signup', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Test price freeze conversion flow', 'Measure prediction accuracy against actual prices'] },
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
    competitors: [
      { name: 'Viator', positioning: 'TripAdvisor-owned marketplace for tours and activities', primaryChannels: ['SEO', 'TripAdvisor integration', 'Google Ads'], strength: 'Massive inventory. TripAdvisor integration gives built-in demand. Strong SEO.', gap: 'No price comparison. Walled garden — can\'t see if the same tour is cheaper elsewhere.' },
      { name: 'GetYourGuide', positioning: 'Curated experiences marketplace with strong European presence', primaryChannels: ['SEO', 'Paid Search', 'Creator Partnerships'], strength: 'Strong curation. Good mobile experience. Growing US presence.', gap: 'Single-provider pricing. No metasearch. Competes on curation, not value.' },
      { name: 'Airbnb Experiences', positioning: 'Local-hosted unique activities and experiences', primaryChannels: ['Airbnb platform', 'Social Media', 'PR'], strength: '"Live like a local" brand resonance. Unique inventory from individual hosts.', gap: 'Quality inconsistent. No professional tour operators. Limited inventory in many cities.' },
    ],
    channels: [
      { name: 'Content & SEO', icon: 'search', fit: 'high', reason: '"Things to do in [city]" and "[activity] in [city] price" queries have massive volume and direct commercial intent.', roi: 5.4, cpa: '$7', incrementality: 70, efficiency: 'efficient' },
      { name: 'Creator Marketing', icon: 'users', fit: 'high', reason: 'Travel and lifestyle creators naturally showcase experiences — authentic content that drives bookings.', roi: 4.2, cpa: '$15', incrementality: 76, efficiency: 'efficient' },
      { name: 'Google Ads', icon: 'target', fit: 'high', reason: 'High-intent "book [activity]" searches convert directly. Google Ads captures demand the moment it exists.', roi: 2.8, cpa: '$22', incrementality: 55, efficiency: 'diminishing' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'high', reason: '"The Skyscanner for experiences" is a story that travel press will pick up. First-mover advantage in experience metasearch.', roi: 6.5, cpa: '$4', incrementality: 84, efficiency: 'efficient' },
      { name: 'Cross-Sell', icon: 'repeat', fit: 'medium', reason: 'Flight bookers on SkyVoyager are already going somewhere — introduce experiences at the perfect moment.', roi: 7.1, cpa: '$2', incrementality: 28, efficiency: 'saturated' },
      { name: 'Social Media', icon: 'video', fit: 'medium', reason: 'Experience highlights and "top things to do" content drives engagement and discovery on TikTok and Instagram.', roi: 2.5, cpa: '$19', incrementality: 60, efficiency: 'diminishing' },
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
        { type: 'cta', text: 'Browse top-rated experiences', variant: 'Discovery' },
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
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Compare experiences, book the best deal', actions: ['Build "Things to do in [City]" SEO pages for top 50 destinations', { text: 'Send launch message to #marketplace and #partnerships', hero: { type: 'slack-message', label: 'View draft message' }, slackMessage: { channel: '#marketplace', body: '🎯 *Tours & Experiences* marketplace is entering internal beta!\n\nWe\'re building the "Skyscanner for things to do" — compare prices across Viator, GetYourGuide, and direct providers.\n\n*What we need:*\n• Test the booking flow for 5 experience categories\n• Compare our prices against booking direct\n• Report any data quality issues\n\nTry it → skyvoyager.com/experiences-beta\n\nWe want to go to alpha in 2 weeks. Every tester helps 🙌' } }, 'Test booking flow end-to-end with 5 providers'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'The metasearch for things to do', actions: [{ text: 'Create landing page for experiences marketplace', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Add experience recommendations to post-booking flight emails', 'Create comparison pages for top experience categories'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'borrowed', messaging: 'Stop overpaying for the same experience', actions: [{ text: 'Identify 10 travel & lifestyle creators for partnership', hero: { type: 'creator-list', label: 'View creator shortlist' }, creators: [{ name: 'Adventurous Kate', handle: '@adventurouskate', followers: '420K', niche: 'Solo adventure travel', relevance: 94 }, { name: 'Expert Vagabond', handle: '@expertvagabond', followers: '650K', niche: 'Adventure experiences', relevance: 91 }, { name: 'The Points Guy', handle: '@thepointsguy', followers: '1.5M', niche: 'Travel deals & reviews', relevance: 88 }, { name: 'Hand Luggage Only', handle: '@handluggageonly', followers: '890K', niche: 'European experiences', relevance: 86 }, { name: 'Nomadic Matt', handle: '@nomadicmatt', followers: '1.1M', niche: 'Budget travel & experiences', relevance: 84 }, { name: 'Alex in Wanderland', handle: '@alexinwanderland', followers: '280K', niche: 'Adventure tours', relevance: 80 }, { name: 'Travel Lemming', handle: '@travellemming', followers: '350K', niche: 'Unique experiences', relevance: 78 }, { name: 'Y Travel Blog', handle: '@ytravelblog', followers: '520K', niche: 'Family experiences', relevance: 75 }] }, 'Launch "Best Experiences" curated guides', 'A/B test cross-sell placement on flight confirmation page'] },
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
    competitors: [
      { name: 'Navan (TripActions)', positioning: 'Modern corporate travel platform for mid-market and enterprise', primaryChannels: ['Enterprise Sales', 'LinkedIn', 'Events'], strength: 'Strong product and brand. $9B+ valuation. Good traveller experience.', gap: 'Too expensive and complex for SMBs. Minimum 50+ travellers. No self-serve.' },
      { name: 'SAP Concur', positioning: 'Legacy enterprise travel and expense management', primaryChannels: ['Enterprise Sales', 'Partner Channel', 'Events'], strength: 'Installed base of 50,000+ companies. Deeply embedded in enterprise workflows.', gap: 'Terrible UX. Slow to innovate. SMBs can\'t afford it or use it effectively.' },
      { name: 'TravelPerk', positioning: 'Modern business travel platform for growing companies', primaryChannels: ['SEO', 'LinkedIn', 'Product-Led Growth'], strength: 'Good UI, flexible cancellation. Growing fast in European SMB market.', gap: 'No AI booking agent. Manual search and book. No natural language interface.' },
    ],
    channels: [
      { name: 'LinkedIn', icon: 'linkedin', fit: 'high', reason: 'SMB decision-makers live on LinkedIn. Thought leadership + targeted ads reach office managers and founders directly.', roi: 3.8, cpa: '$42', incrementality: 72, efficiency: 'efficient' },
      { name: 'Content Marketing', icon: 'file-text', fit: 'high', reason: '"Business travel policy template" and "manage company travel" content captures SMBs actively solving this problem.', roi: 5.1, cpa: '$15', incrementality: 68, efficiency: 'efficient' },
      { name: 'Product-Led Growth', icon: 'zap', fit: 'high', reason: 'Free tier for small teams (<5 travellers) creates a usage-based growth engine with natural upsell moments.', roi: 4.5, cpa: '$20', incrementality: 58, efficiency: 'efficient' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'high', reason: '"AI replaces the corporate travel agent" is a headline business and tech press will run. High-impact, low-cost awareness.', roi: 6.8, cpa: '$5', incrementality: 80, efficiency: 'efficient' },
      { name: 'Partnerships', icon: 'handshake', fit: 'medium', reason: 'Integrate with Slack, Xero, and HR tools. Each integration is a co-marketing opportunity and distribution channel.', roi: 2.9, cpa: '$35', incrementality: 45, efficiency: 'diminishing' },
      { name: 'Google Ads', icon: 'target', fit: 'medium', reason: 'Capture "business travel management tool" and "corporate travel booking" searches — high-intent B2B queries.', roi: 2.2, cpa: '$55', incrementality: 38, efficiency: 'saturated' },
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
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Business travel without the admin', actions: ['Build free tier for teams under 5 travellers', { text: 'Send launch announcement to #founders-network', hero: { type: 'slack-message', label: 'View draft message' }, slackMessage: { channel: '#founders-network', body: '✈️ *Business Travel Agent* needs its first 50 teams!\n\nWe\'ve built an AI that books business travel via natural language. Just type "Book me a flight to Berlin next Tuesday, economy, under £300" and it handles the rest.\n\n*For teams under 5 travellers:* Completely free\n*What we need:* Book a real business trip and tell us what broke\n\nTry it → skyvoyager.com/business/signup\n\nWe\'re targeting office managers and founders who are currently managing travel in spreadsheets. Know someone? Send them our way 🙏' } }, 'Launch founder LinkedIn content strategy (3 posts/week)'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Book business trips with a conversation', actions: [{ text: 'Create landing page for SMB business travel', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Launch on Slack App Directory', 'Publish first "building in public" blog post'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'rented', messaging: 'Enterprise tools, startup simplicity', actions: ['LinkedIn Ads targeting office managers at 10-200 person companies', { text: 'Draft customer outreach email for case study', hero: { type: 'email-draft', label: 'View draft email' }, emailDraft: { to: 'sarah@[alpha-customer].com', subject: 'Would you share your story? (Quick case study)', body: 'Hi Sarah,\n\nYour team has been one of our most active users since the alpha — 47 trips booked with an average saving of 28% vs your previous process.\n\nWould you be open to a 20-minute chat for a case study? We\'d cover:\n• What business travel looked like before (the pain)\n• How the AI booking agent changed things\n• The actual numbers (time saved, cost reduced)\n\nWe\'d feature you on our site and share it with our network (great for your brand too).\n\nHappy to work around your schedule.\n\nBest,\n[Name]\nHead of Marketing, SkyVoyager Business' } }, 'Launch Xero and QuickBooks integrations with co-marketing'] },
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
  {
    productId: 'white-label',
    productName: 'White-Label Platform',
    tagline: 'Your brand. Our intelligence. Their flights.',
    targetAudience: 'Banks, telecoms, loyalty programmes, and retailers who want to offer flights under their own brand without building the technology',
    positioning: 'The fastest way to launch a branded travel product — powered by Skyscanner data, your brand, your customers.',
    competitors: [
      { name: 'Travelport', positioning: 'Legacy GDS powering travel agencies and TMCs', primaryChannels: ['Enterprise Sales', 'Industry Events', 'Partner Channel'], strength: 'Deep airline relationships and established distribution contracts with major carriers', gap: 'Old-school integration. Months to launch. No modern API, no brand customisation, no analytics dashboard.' },
      { name: 'Amadeus', positioning: 'End-to-end travel technology for airlines, hotels, and agencies', primaryChannels: ['Enterprise Sales', 'Aviation Conferences', 'White Papers'], strength: 'Broadest airline content and most established name in travel tech infrastructure', gap: 'Built for travel companies, not banks or retailers. Integration takes 6+ months. No self-service.' },
      { name: 'Kiwi.com Tequila', positioning: 'White-label flight search API for affiliates and startups', primaryChannels: ['Developer Marketing', 'Affiliate Networks', 'Content'], strength: 'Fast API integration and virtual interlining creates unique routes competitors can\'t match', gap: 'No brand configurator. No analytics dashboard. No onboarding wizard. You get an API and good luck.' },
    ],
    channels: [
      { name: 'Enterprise Sales', icon: 'briefcase', fit: 'high', reason: 'B2B platform sales to banks and telecoms. High-touch, high-value deals with 6-figure annual contracts.', roi: 4.8, cpa: '£2,400', incrementality: 88, efficiency: 'efficient' },
      { name: 'LinkedIn Ads', icon: 'linkedin', fit: 'high', reason: 'Target heads of digital, product directors, and loyalty managers at banks and telecoms. Hyper-specific B2B audience.', roi: 3.2, cpa: '£180', incrementality: 72, efficiency: 'efficient' },
      { name: 'Industry Events', icon: 'mic', fit: 'high', reason: 'Travel tech and fintech conferences where partnership deals close. Speaking slots at WiT, Phocuswright, Money20/20.', roi: 5.1, cpa: '£1,800', incrementality: 82, efficiency: 'efficient' },
      { name: 'Content & Thought Leadership', icon: 'file-text', fit: 'high', reason: 'Case studies and white papers demonstrate ROI to enterprise buyers. "TravelConnect launched flights in 2 weeks" is the story.', roi: 3.8, cpa: '£45', incrementality: 65, efficiency: 'efficient' },
      { name: 'Partnership Channel', icon: 'handshake', fit: 'medium', reason: 'System integrators and consultancies who advise banks on digital transformation. They recommend you to their clients.', roi: 2.4, cpa: '£3,200', incrementality: 55, efficiency: 'diminishing' },
      { name: 'PR & Press', icon: 'newspaper', fit: 'medium', reason: 'Fintech and travel trade press. "Bank launches flights" stories generate inbound enterprise leads.', roi: 6.2, cpa: '£28', incrementality: 48, efficiency: 'diminishing' },
    ],
    timeline: [
      { phase: 'Foundation', weeks: 'Weeks 1–3', actions: ['Build demo environment with 3 sample brand configs (bank, airline, telco)', 'Create sales deck positioning platform value vs. build-from-scratch cost', 'Publish "Why Banks Are Launching Travel Products" thought leadership piece'] },
      { phase: 'Growth', weeks: 'Weeks 4–8', actions: ['Launch at Money20/20 with live demo of brand configurator', 'Run LinkedIn campaign targeting loyalty programme managers at top 50 UK banks', 'Sign 2 pilot partners with 90-day free trial of platform'] },
      { phase: 'Scale', weeks: 'Weeks 9–12', actions: ['Publish first partner case study with revenue metrics', 'Launch partner portal with self-service onboarding wizard', 'Expand to telecoms and retail verticals with vertical-specific positioning'] },
    ],
    tactics: [
      { id: 63, name: 'Integration Marketing', category: 'Partnerships', effort: 'high', impact: 'high', description: 'Build pre-configured integrations with major banking platforms (Temenos, FIS) and loyalty systems (Collinson, Points) to reduce partner time-to-launch.', firstSteps: ['Map the top 5 banking and loyalty platforms by market share', 'Build sandbox environments with pre-configured API connectors', 'Create "Launch in 2 weeks, not 6 months" positioning around integrations'] },
      { id: 104, name: 'Case Study Marketing', category: 'Content', effort: 'medium', impact: 'high', description: 'Document every pilot partner\'s journey from signup to revenue. Enterprise buyers need proof, not promises.', firstSteps: ['Interview TravelConnect pilot partner about launch experience', 'Quantify key metrics: time to launch, click-through rates, booking revenue', 'Create video case study + written case study + one-page PDF for sales'] },
      { id: 70, name: 'Conference Speaking', category: 'Events', effort: 'medium', impact: 'high', description: 'Secure speaking slots at travel tech and fintech conferences. Live demos of the brand configurator create "I need this" moments.', firstSteps: ['Apply to speak at Phocuswright, WiT, Money20/20, and Finovate', 'Build a 15-minute live demo showing brand config → customer experience', 'Set up a landing page for conference attendees with exclusive pilot offer'] },
      { id: 28, name: 'LinkedIn Thought Leadership', category: 'Social', effort: 'low', impact: 'medium', description: 'Regular LinkedIn posts from platform team about the future of embedded travel. Builds credibility with enterprise decision-makers.', firstSteps: ['Publish weekly LinkedIn posts about embedded finance + travel trends', 'Share partner success metrics (anonymised) to build social proof', 'Engage with fintech and loyalty programme leaders\' content'] },
    ],
    budget: [
      { category: 'Enterprise Sales', percentage: 35, color: 'bg-sky-blue' },
      { category: 'Events & Conferences', percentage: 25, color: 'bg-coral' },
      { category: 'Content & Thought Leadership', percentage: 20, color: 'bg-berry' },
      { category: 'LinkedIn Ads', percentage: 15, color: 'bg-eco' },
      { category: 'PR & Partner Channel', percentage: 5, color: 'bg-haiti' },
    ],
    kpis: [
      { metric: 'Partner pipeline value', target: '£2M ARR', timeframe: '90 days' },
      { metric: 'Pilot partners signed', target: '5', timeframe: '90 days' },
      { metric: 'Avg partner time-to-launch', target: '<14 days', timeframe: '60 days' },
      { metric: 'Partner booking volume', target: '10,000 bookings/mo', timeframe: '90 days' },
    ],
    copyStudio: [
      { channel: 'google-ads', channelLabel: 'Google Ads', icon: 'target', items: [
        { type: 'headline', text: 'Launch Branded Flights in 2 Weeks', variant: 'Speed' },
        { type: 'headline', text: 'Your Brand. Skyscanner Data. Zero Dev.', variant: 'Simplicity' },
        { type: 'headline', text: 'White-Label Flights for Banks & Telcos', variant: 'Direct' },
        { type: 'description', text: 'Add branded flight search to your app or website. Skyscanner content, your brand, full analytics. Live in days, not months. Book a demo.', variant: 'Benefit-led' },
      ]},
      { channel: 'linkedin', channelLabel: 'LinkedIn', icon: 'linkedin', items: [
        { type: 'post', text: 'Banks are launching travel products. Here\'s why.\n\nYour customers already book flights. They just do it somewhere else.\n\nWhat if "somewhere else" was your app?\n\n→ Branded flight search powered by Skyscanner data\n→ Revenue share on every booking\n→ Full analytics dashboard\n→ Live in 2 weeks, not 6 months\n\nTravelConnect launched last month. 12,000 searches in week one.\n\nThe embedded travel opportunity is here. Are you building or buying?', variant: 'Thought leadership' },
        { type: 'post', text: 'We just watched a bank launch a complete flight booking experience in 14 days.\n\nNo dev team. No API integration. No 6-month roadmap.\n\nThey uploaded their logo, picked their colours, set their markup, and went live.\n\nTheir customers now book flights inside their banking app — branded, seamless, earning the bank revenue on every transaction.\n\nThis is what "embedded travel" looks like in 2026.', variant: 'Case study tease' },
      ]},
      { channel: 'email', channelLabel: 'Email', icon: 'mail', items: [
        { type: 'subject-line', text: 'TravelConnect just launched flights. In 2 weeks.', variant: 'Social proof' },
        { type: 'subject-line', text: 'Your customers book flights. You should earn from it.', variant: 'Revenue angle' },
        { type: 'subject-line', text: 'White-label flights: demo in 15 minutes', variant: 'Low commitment' },
        { type: 'subject-line', text: 'The bank that added flights to their app (and what happened next)', variant: 'Curiosity' },
      ]},
      { channel: 'social', channelLabel: 'Social Media', icon: 'video', items: [
        { type: 'post', text: 'POV: You\'re a product director at a bank and you just launched a full flight booking experience inside your app — in 14 days, with zero engineering.\n\nYour brand. Skyscanner data. Revenue on every booking.\n\nThis is embedded travel. DM for a demo.', variant: 'LinkedIn/Twitter' },
        { type: 'post', text: 'Build a travel product from scratch: 18 months, £2M, 12 engineers\nLaunch with SkyVoyager: 2 weeks, £0 upfront, 0 engineers\n\nSame result. Your brand. Your customers. Your revenue.\n\nThe build vs. buy equation just changed.', variant: 'Build vs buy' },
      ]},
      { channel: 'landing-page', channelLabel: 'Landing Page', icon: 'file-text', items: [
        { type: 'headline', text: 'Launch branded flights in your app. In days, not months.', variant: 'Hero headline' },
        { type: 'headline', text: 'Your brand. Skyscanner intelligence. Revenue from day one.', variant: 'Value prop' },
        { type: 'cta', text: 'Book a platform demo', variant: 'Enterprise' },
        { type: 'cta', text: 'See a live partner example', variant: 'Social proof' },
      ]},
    ],
    contentCalendar: {
      pillars: [
        { name: 'Enterprise & B2B', color: 'bg-sky-blue' },
        { name: 'Case Studies & Proof', color: 'bg-coral' },
        { name: 'Thought Leadership', color: 'bg-berry' },
      ],
      pieces: [
        { week: 1, title: 'Why Banks Are Launching Travel Products in 2026', format: 'blog', buyerStage: 'awareness', type: 'shareable', pillar: 'Thought Leadership', brief: 'Trend piece on embedded travel. Banks, telecoms, and retailers adding flights to their platforms. Data on customer engagement and revenue uplift.' },
        { week: 2, title: 'TravelConnect Case Study: 14 Days to Live Flights', format: 'blog', buyerStage: 'consideration', type: 'both', pillar: 'Case Studies & Proof', brief: 'Deep dive into TravelConnect pilot. Timeline, setup process, launch metrics (12K searches week one, 3.2% conversion). Include screenshots of branded experience.' },
        { week: 3, title: 'Build vs Buy: The True Cost of a Travel Product', format: 'infographic', buyerStage: 'consideration', type: 'shareable', pillar: 'Enterprise & B2B', brief: 'Side-by-side comparison: building a flight search product from scratch (18 months, £2M, 12 engineers) vs launching on SkyVoyager (2 weeks, revenue share, 0 engineers).' },
        { week: 4, title: 'The Embedded Travel Playbook for Loyalty Programmes', format: 'blog', buyerStage: 'consideration', type: 'searchable', pillar: 'Enterprise & B2B', brief: 'How loyalty programmes can add flights as a redemption option. Positioning, integration approach, expected engagement lift. Target "loyalty programme flights" keywords.' },
        { week: 5, title: 'How SkyVoyager\'s Flight Score Powers Partner Brands', format: 'video', buyerStage: 'consideration', type: 'shareable', pillar: 'Case Studies & Proof', brief: 'Product demo video showing the Flight Score composite metric in action inside a partner-branded experience. Highlight transparency and trust.' },
        { week: 6, title: '5 Revenue Models for White-Label Travel', format: 'blog', buyerStage: 'awareness', type: 'searchable', pillar: 'Enterprise & B2B', brief: 'Target "white label travel revenue" keywords. Cover markup, commission, subscription, freemium, and hybrid models with pros/cons of each.' },
        { week: 7, title: 'Partner Spotlight: How a Telco Added Flights to Their Super-App', format: 'blog', buyerStage: 'decision', type: 'both', pillar: 'Case Studies & Proof', brief: 'Second case study showing a different vertical (telco). Emphasise the flexibility of the platform across industries.' },
        { week: 8, title: 'The API Economy Meets Travel: What Product Leaders Need to Know', format: 'blog', buyerStage: 'awareness', type: 'shareable', pillar: 'Thought Leadership', brief: 'LinkedIn-first thought piece on how APIs are unbundling travel. Position SkyVoyager as the platform layer that enables non-travel companies to offer travel.' },
        { week: 9, title: 'White-Label Travel Platform Comparison: SkyVoyager vs Amadeus vs Tequila', format: 'blog', buyerStage: 'consideration', type: 'searchable', pillar: 'Enterprise & B2B', brief: 'Honest comparison page. Target "white label flight API comparison" keywords. Highlight speed-to-launch, brand control, and analytics as differentiators.' },
        { week: 10, title: 'ROI Calculator: What Could Branded Flights Earn You?', format: 'blog', buyerStage: 'decision', type: 'searchable', pillar: 'Case Studies & Proof', brief: 'Interactive calculator using real partner data. Input: monthly traffic, conversion estimates. Output: projected booking revenue and customer engagement lift.' },
        { week: 11, title: 'The Future of Travel Distribution is White-Label', format: 'blog', buyerStage: 'awareness', type: 'shareable', pillar: 'Thought Leadership', brief: 'Keynote-style piece on how travel distribution is shifting from OTAs to embedded experiences. Pitch to Phocuswright and Skift for syndication.' },
        { week: 12, title: 'Partner Results: Q1 Platform Performance Report', format: 'infographic', buyerStage: 'decision', type: 'both', pillar: 'Case Studies & Proof', brief: 'Aggregate anonymised data from all partners: total bookings, average conversion rates, revenue generated. Builds trust for enterprise pipeline.' },
      ],
    },
    launchPlaybook: {
      phases: [
        { phase: 'Internal Launch', timeline: 'Weeks 1–2', channelType: 'owned', messaging: 'Skyscanner intelligence, partner brands, new revenue', actions: ['Build 3 demo brand configurations (bank, telco, retailer)', { text: 'Send announcement to partnerships and commercial teams', hero: { type: 'slack-message', label: 'View draft message' }, slackMessage: { channel: '#partnerships', body: '🚀 *White-Label Travel Platform* is ready for partner demos!\n\nWe can now offer any brand a fully-customised flight search and booking experience — powered by our data.\n\n*What\'s new:*\n→ Brand configurator: logo, colours, fonts — live in minutes\n→ Analytics dashboard: clicks, bookings, revenue — real-time\n→ Self-service onboarding: partners can launch without engineering\n\n*What we need:* 5 pilot partners to sign up this quarter.\n\nDemo environment → skyvoyager.com/white-label/demo\n\ncc @commercial @partnerships @product' } }, 'Train sales team on platform demo and pricing model', 'Collect internal feedback on onboarding wizard UX'] },
        { phase: 'Alpha Launch', timeline: 'Weeks 3–4', channelType: 'owned', messaging: 'Launch branded flights in days, not months', actions: [{ text: 'Create enterprise landing page with demo CTA', hero: { type: 'landing-page', label: 'View draft landing page' } }, 'Reach out to 10 warm leads from existing Skyscanner partnerships', 'Set up dedicated partner support channel and SLA', 'Target 3 signed pilot agreements'] },
        { phase: 'Beta Launch', timeline: 'Weeks 5–7', channelType: 'rented', messaging: 'Your brand. Our intelligence. Their flights.', actions: ['Launch LinkedIn campaign targeting product and digital leaders at banks', 'Publish "Why Banks Are Launching Travel Products" thought piece', 'Demo at first industry event (Money20/20 or WiT)', 'Onboard first paying pilot partner end-to-end'] },
        { phase: 'Early Access', timeline: 'Weeks 8–10', channelType: 'borrowed', messaging: 'TravelConnect launched flights in 14 days. You can too.', actions: ['Publish TravelConnect case study with real metrics', { text: 'Identify 10 fintech and travel tech journalists for press outreach', hero: { type: 'creator-list', label: 'View journalist shortlist' }, creators: [{ name: 'Sifted', handle: '@Sifted', followers: '180K', niche: 'European fintech and startups', relevance: 95 }, { name: 'Skift', handle: '@Skift', followers: '420K', niche: 'Travel industry intelligence', relevance: 94 }, { name: 'Phocuswire', handle: '@Phocuswire', followers: '85K', niche: 'Travel technology news', relevance: 92 }, { name: 'The Fintech Times', handle: '@TheFintechTimes', followers: '95K', niche: 'UK fintech news', relevance: 88 }, { name: 'TechCrunch', handle: '@TechCrunch', followers: '12M', niche: 'Technology startups', relevance: 82 }, { name: 'AltFi', handle: '@AltFi', followers: '45K', niche: 'Alternative finance and fintech', relevance: 80 }] }, 'Pitch exclusive story: "How a bank launched a flight booking product in 2 weeks"', 'Open self-service onboarding for approved partners'] },
        { phase: 'Full Launch', timeline: 'Weeks 11–12', channelType: 'owned', messaging: 'The platform powering the next generation of travel brands', actions: ['Launch self-service partner portal with onboarding wizard', 'Press embargo lifts — coordinate coverage across 5+ publications', { text: 'Send launch email to full enterprise prospect list', hero: { type: 'email-draft', label: 'View draft email' }, emailDraft: { to: 'enterprise-prospects@skyvoyager.com', subject: 'Branded flights for your customers — platform now open', body: 'Hi {{firstName}},\n\nWe\'ve quietly been powering branded flight experiences for banks and telecoms. Today, we\'re opening the platform to new partners.\n\nWhat you get:\n→ Your brand, your colours, your customer experience\n→ Skyscanner flight data and pricing intelligence\n→ Full analytics dashboard with real-time revenue tracking\n→ Live in 14 days or less — no engineering required\n\nTravelConnect launched last month: 12,000 searches in week one, 3.2% conversion rate.\n\nWant to see what it would look like with your brand? Book a 15-minute demo:\n\n[Book Demo →]\n\nBest,\nThe SkyVoyager Platform Team' } }, 'Announce at keynote slot with live demo of brand configurator'] },
      ],
      checklist: [
        { label: 'Demo environment with 3 brand configurations ready', category: 'pre-launch' },
        { label: 'Sales deck and pricing model finalised', category: 'pre-launch' },
        { label: 'Partner onboarding documentation complete', category: 'pre-launch' },
        { label: 'Enterprise landing page live with demo booking CTA', category: 'pre-launch' },
        { label: 'Press kit ready (screenshots, partner quotes, platform stats)', category: 'pre-launch' },
        { label: 'Case study published with real partner metrics', category: 'launch-day' },
        { label: 'LinkedIn Ads campaign activated targeting enterprise buyers', category: 'launch-day' },
        { label: 'Press embargo lifted — articles published', category: 'launch-day' },
        { label: 'Self-service partner portal open for signups', category: 'launch-day' },
        { label: 'Track partner pipeline and conversion weekly', category: 'post-launch' },
        { label: 'Collect first 5 partner testimonials', category: 'post-launch' },
        { label: 'Expand positioning to telecoms and retail verticals', category: 'post-launch' },
      ],
      pressAngles: [
        'Banks are becoming travel companies: How SkyVoyager is powering the embedded travel revolution',
        'A bank launched branded flights in 14 days. No engineers required. Here\'s how.',
        'The Shopify of travel: SkyVoyager\'s white-label platform lets any brand sell flights',
      ],
    },
  },
]

export function getPlanByProductId(productId: string): MarketingPlan | undefined {
  return marketingPlans.find(p => p.productId === productId)
}
