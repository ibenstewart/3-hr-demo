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
  },
  {
    productId: 'companion',
    productName: 'In-Trip Companion',
    tagline: 'Your trip doesn\'t end at booking — it starts there',
    targetAudience: 'Travellers who\'ve already booked and want a better in-trip experience',
    positioning: 'The post-booking assistant that turns Skyscanner from a search engine into a travel companion.',
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
      { id: 70, name: 'Conference Speaking', category: 'Events', effort: 'medium', impact: 'high', description: 'Speak at Phocuswright, WiT, and TravelTech on "The AI Ancillary Revolution" — position Skyscanner as thought leader.', firstSteps: ['Submit 3 conference talk proposals for upcoming events', 'Build talk deck with live product demo component', 'Follow up with every attendee who visits the booth'] },
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
      { id: 49, name: 'Monthly Newsletter', category: 'Email', effort: 'low', impact: 'medium', description: '"The Price Intelligence Report" — monthly email with pricing trends, best deals, and predictions for upcoming holiday periods.', firstSteps: ['Design newsletter template with data visualisations', 'Set up automated data pipeline for monthly pricing insights', 'Launch with existing Skyscanner email list segment'] },
      { id: 74, name: 'Press Coverage', category: 'PR', effort: 'low', impact: 'high', description: 'Pitch seasonal price predictions to travel journalists: "Skyscanner data shows summer flights 23% cheaper if you book by March."', firstSteps: ['Build press-ready data pack with seasonal price predictions', 'Identify 30 travel journalists who cover booking advice', 'Time pitches to coincide with booking seasons'] },
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
  },
  {
    productId: 'experiences',
    productName: 'Tours & Experiences',
    tagline: 'Activity metasearch — the booking.com for things to do',
    targetAudience: 'Travellers researching activities and tours at their destination, comparing across providers',
    positioning: 'Compare tour prices across Viator, GetYourGuide, and direct providers — like Skyscanner for flights, but for experiences.',
    channels: [
      { name: 'Content & SEO', icon: 'search', fit: 'high', reason: '"Things to do in [city]" and "[activity] in [city] price" queries have massive volume and direct commercial intent.' },
      { name: 'Creator Marketing', icon: 'users', fit: 'high', reason: 'Travel and lifestyle creators naturally showcase experiences — authentic content that drives bookings.' },
      { name: 'Google Ads', icon: 'target', fit: 'high', reason: 'High-intent "book [activity]" searches convert directly. Google Ads captures demand the moment it exists.' },
      { name: 'Cross-Sell', icon: 'repeat', fit: 'medium', reason: 'Flight bookers on Skyscanner are already going somewhere — introduce experiences at the perfect moment.' },
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
      { id: 87, name: 'Powered-By Marketing', category: 'Product-Led', effort: 'low', impact: 'medium', description: '"Powered by Skyscanner Business" badge on all booking confirmations and itineraries. Every business trip becomes a brand impression.', firstSteps: ['Design subtle "Powered by Skyscanner Business" badge', 'Add to all customer-facing outputs: confirmations, itineraries, reports', 'Track impressions and click-throughs from badge'] },
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
  },
]

export function getPlanByProductId(productId: string): MarketingPlan | undefined {
  return marketingPlans.find(p => p.productId === productId)
}
