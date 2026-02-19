export interface GeoMarket {
  country: string
  flag: string
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America' | 'Middle East & Africa'
  tier: 'launch-now' | 'next-quarter' | 'watch'
  pmfScore: number
  dimensions: {
    demand: number
    competition: number
    position: number
    regulatory: number
  }
  insight: string
  playbook: GeoPlaybook
}

export interface GeoPlaybook {
  channels: { name: string; icon: string; budgetPct: number; note: string }[]
  competitors: { name: string; localStrength: string; angle: string }[]
  messaging: string[]
  regulatory: string[]
  contentBrief: string[]
  adVariants: { headline: string; description: string }[]
}

export interface GeoSignalInsight {
  text: string
  type: 'opportunity' | 'caution' | 'insight'
}

export const geoSignalInsightsByProduct: Record<string, GeoSignalInsight[]> = {
  'trip-planner': [
    { text: 'Japan scores highest on demand (92) but regulatory complexity around data residency drops it to Next Quarter despite strong overall signals.', type: 'caution' },
    { text: 'Australia and UK have nearly identical PMF profiles, but Australia has 40% less competition — making it the better early bet per marketing dollar.', type: 'opportunity' },
    { text: 'South Korea\'s high smartphone penetration (95%) means mobile-first trip planning resonates strongly — prioritize app store and social channels.', type: 'insight' },
  ],
  'companion': [
    { text: 'Spain and Italy have overlapping tourist demographics but Spain\'s digital ad market is 30% cheaper — test messaging in Spain first, then replicate in Italy.', type: 'opportunity' },
    { text: 'Thailand\'s tourism boom (40M visitors/year) creates massive demand, but LINE dominates messaging — traditional digital channels underperform.', type: 'caution' },
    { text: 'UAE\'s luxury travel segment has the highest willingness-to-pay for premium features — position Companion as a concierge, not just a guide.', type: 'insight' },
  ],
  'ancillaries': [
    { text: 'UAE and Singapore have the highest ancillary attach rates globally (3.2x and 2.8x average) — these markets monetize faster than any European market.', type: 'opportunity' },
    { text: 'Australia\'s strong consumer protection laws require clear cancellation policies on all ancillary products — factor in compliance before launch.', type: 'caution' },
    { text: 'Germany\'s preference for bundled packages over à la carte ancillaries suggests a "smart bundle" positioning will outperform individual upsells.', type: 'insight' },
  ],
  'prices': [
    { text: 'India has 4x the search volume for "cheap flights" compared to the US per capita — price sensitivity creates massive demand for intelligence tools.', type: 'opportunity' },
    { text: 'Brazil\'s complex tax structure (ICMS varies by state) means displayed prices must account for local taxation to maintain trust.', type: 'caution' },
    { text: 'Canada and US share media consumption patterns — creative assets built for US campaigns can be adapted for Canada with minimal localization cost.', type: 'insight' },
  ],
  'experiences': [
    { text: 'Mexico\'s experience market is 80% offline bookings — the digital gap represents the largest growth opportunity across all markets analyzed.', type: 'opportunity' },
    { text: 'Japan\'s experience market is heavily fragmented with local-only platforms (Jalan, Rakuten Travel) — partnerships beat direct competition.', type: 'caution' },
    { text: 'Thailand and Spain share a pattern: tourists book experiences after arrival. Mobile push notifications and geo-triggered offers outperform pre-trip marketing 3:1.', type: 'insight' },
  ],
  'business-travel': [
    { text: 'Singapore and Hong Kong together cover 70% of APAC corporate travel bookings — launching both simultaneously creates regional network effects.', type: 'opportunity' },
    { text: 'Netherlands has strict works council requirements for new enterprise software adoption — factor 3-6 months for procurement cycles.', type: 'caution' },
    { text: 'UAE\'s free zones have different corporate travel policies than mainland — segment by zone for more targeted enterprise sales.', type: 'insight' },
  ],
  'white-label': [
    { text: 'UK has the densest concentration of digital-first banks (Monzo, Starling, Revolut) — embedded travel is a natural extension of their super-app strategies.', type: 'opportunity' },
    { text: 'UAE banking regulations require foreign fintech platform providers to register with the Central Bank — factor 3-month approval process before partner launches.', type: 'caution' },
    { text: 'Germany\'s strong Hausbank tradition means white-label travel products positioned through established banks carry inherently higher trust than startup brands.', type: 'insight' },
  ],
}

export const geoMarketsByProduct: Record<string, GeoMarket[]> = {
  'trip-planner': [
    {
      country: 'United States', flag: '🇺🇸', region: 'North America', tier: 'launch-now', pmfScore: 88,
      dimensions: { demand: 92, competition: 75, position: 90, regulatory: 95 },
      insight: 'Largest travel search market globally. SkyVoyager brand is strongest here.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: 'High-intent "trip planner" queries — $2.40 avg CPC' },
          { name: 'TikTok/Reels', icon: 'video', budgetPct: 25, note: 'AI trip planning demos go viral — 12% avg engagement rate' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 20, note: 'Programmatic "X days in Y" pages capture long-tail' },
          { name: 'Creator Partnerships', icon: 'users', budgetPct: 15, note: 'Travel YouTubers with 100K-500K subscribers' },
          { name: 'Email Marketing', icon: 'mail', budgetPct: 10, note: 'Existing SkyVoyager user base — highest conversion rate' },
        ],
        competitors: [
          { name: 'Google Travel', localStrength: 'Integrated into every Google search — unbeatable distribution', angle: 'Google lists options; SkyVoyager actually plans your trip with AI conversation' },
          { name: 'TripAdvisor', localStrength: '500M+ reviews create massive SEO moat for destination queries', angle: 'Reviews tell you where others went; SkyVoyager builds your personal itinerary' },
          { name: 'Kayak', localStrength: 'Strong brand in price comparison with useful planning tools', angle: 'Kayak compares prices; SkyVoyager plans the entire trip end-to-end' },
        ],
        messaging: [
          'Replace 10 browser tabs with one AI conversation that actually plans your trip',
          'From "I want to go to Japan" to a complete 7-day itinerary in 30 seconds',
          'The trip planner that knows about the hidden ramen shop locals love',
        ],
        regulatory: ['CCPA compliance required for California users', 'FTC guidelines on AI-generated travel recommendations'],
        contentBrief: ['SEO hub: "X days in Y" programmatic pages for top 50 US destinations', 'Video series: "I let AI plan my vacation" challenge with creators', 'Comparison content: SkyVoyager vs manual trip planning (time saved)'],
        adVariants: [
          { headline: 'Plan Your Dream Trip in 30 Seconds', description: 'Tell our AI where you want to go. Get a complete itinerary with flights, hotels, and hidden gems — instantly.' },
          { headline: 'Stop Googling. Start Traveling.', description: 'SkyVoyager\'s AI Trip Planner turns "I want to visit Japan" into a day-by-day itinerary you\'ll actually follow.' },
          { headline: '7 Days in Tokyo, Planned in 30 Seconds', description: 'AI-powered itineraries with local restaurants, optimal routes, and booking links. Try it free.' },
        ],
      },
    },
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 85,
      dimensions: { demand: 88, competition: 78, position: 88, regulatory: 86 },
      insight: 'Second-largest English-speaking travel market. Strong SkyVoyager brand recognition.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: 'Dominant search engine — £1.80 avg CPC for travel planning' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'UK travellers are highly social-media influenced' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 22, note: '"Holiday planning" and "city break" content hubs' },
          { name: 'PR & Press', icon: 'newspaper', budgetPct: 15, note: 'Travel sections in Guardian, Telegraph, Times' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Large existing UK user base for cross-sell' },
        ],
        competitors: [
          { name: 'Skyscanner', localStrength: 'Founded in Edinburgh — iconic UK travel brand with massive loyalty', angle: 'SkyVoyager goes beyond flights to plan the entire trip with AI' },
          { name: 'Booking.com', localStrength: 'Dominant in accommodation with aggressive UK TV advertising', angle: 'Booking shows rooms; SkyVoyager plans the experience around them' },
        ],
        messaging: [
          'Your next city break, planned by AI in 30 seconds',
          'From "bank holiday in Barcelona" to a full itinerary — just ask',
          'The trip planner that knows the best pub near every London hotel',
        ],
        regulatory: ['UK GDPR (post-Brexit data protection)', 'ASA guidelines on AI-generated claims'],
        contentBrief: ['Seasonal content: "Bank holiday getaway" and "half-term trip" planners', 'Comparison: AI trip planning vs travel agent (cost and time)', 'Destination guides for top UK outbound markets (Spain, France, Greece)'],
        adVariants: [
          { headline: 'Plan Your City Break in 30 Seconds', description: 'AI-powered itineraries for Barcelona, Paris, Rome and beyond. Flights, hotels, and hidden gems — sorted.' },
          { headline: 'Bank Holiday Sorted. AI-Planned.', description: 'Tell SkyVoyager where you fancy going. Get a complete trip plan with local tips and booking links.' },
          { headline: 'Better Than a Travel Agent. Free.', description: 'SkyVoyager\'s AI builds personalised itineraries in seconds. Real local tips, not generic tourist traps.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'launch-now', pmfScore: 79,
      dimensions: { demand: 85, competition: 70, position: 72, regulatory: 88 },
      insight: 'Europe\'s largest outbound travel market. Quality-focused travellers who plan meticulously.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: 'Germans research extensively — high search volume for trip planning' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 25, note: 'German-language content hub for "Reiseplanung" queries' },
          { name: 'YouTube', icon: 'video', budgetPct: 20, note: 'YouTube is the #2 search engine in Germany' },
          { name: 'PR & Press', icon: 'newspaper', budgetPct: 15, note: 'ADAC Reisemagazin, Geo Saison, Spiegel Reise' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'German users prefer email over social for travel deals' },
        ],
        competitors: [
          { name: 'CHECK24', localStrength: 'Germany\'s #1 comparison portal with TV advertising dominance', angle: 'CHECK24 compares prices; SkyVoyager plans the entire Reise with AI' },
          { name: 'HolidayCheck', localStrength: 'Trusted German review platform with 10M+ reviews', angle: 'Reviews show where others went; AI builds your personalised trip' },
        ],
        messaging: [
          'Ihre Traumreise, in 30 Sekunden geplant — KI macht es möglich',
          'Von der Idee zum kompletten Reiseplan — einfach fragen',
          'Reiseplanung war noch nie so schnell und persönlich',
        ],
        regulatory: ['Strict GDPR enforcement — DPA is aggressive', 'Pauschalreiserichtlinie (Package Travel Directive) compliance'],
        contentBrief: ['German-language SEO: "Reiseplanung" and "Urlaub planen" keyword clusters', 'Trust content: data privacy and AI transparency (critical for German users)', 'Comparison: AI vs Reisebüro (travel agency) for planning quality'],
        adVariants: [
          { headline: 'Reiseplanung in 30 Sekunden', description: 'SkyVoyager plant Ihre komplette Reise mit KI — Flüge, Hotels und Geheimtipps. Jetzt kostenlos testen.' },
          { headline: 'Schluss mit stundenlanger Reiseplanung', description: 'Sagen Sie unserer KI, wohin Sie möchten. Erhalten Sie einen personalisierten Reiseplan in Sekunden.' },
          { headline: 'Besser als ein Reisebüro. Kostenlos.', description: 'KI-gestützte Reisepläne mit lokalen Tipps, optimalen Routen und Buchungslinks. Probieren Sie es aus.' },
        ],
      },
    },
    {
      country: 'Japan', flag: '🇯🇵', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 72,
      dimensions: { demand: 92, competition: 65, position: 48, regulatory: 82 },
      insight: 'Massive travel demand but low SkyVoyager awareness. Requires local partnerships.',
      playbook: {
        channels: [
          { name: 'LINE Ads', icon: 'smartphone', budgetPct: 30, note: 'LINE has 95M MAU in Japan — dominant messaging platform' },
          { name: 'Yahoo! Japan', icon: 'search', budgetPct: 25, note: 'Yahoo Japan still holds ~25% search share' },
          { name: 'YouTube', icon: 'video', budgetPct: 20, note: 'Japan\'s #2 most-used platform after LINE' },
          { name: 'Instagram', icon: 'video', budgetPct: 15, note: 'Visual travel content performs well with 18-34 demographic' },
          { name: 'PR', icon: 'newspaper', budgetPct: 10, note: 'Travel Walker, AB-ROAD magazine features' },
        ],
        competitors: [
          { name: 'Jalan', localStrength: 'Recruit-owned — deeply integrated into Japanese travel booking', angle: 'Jalan is booking-focused; SkyVoyager adds AI planning layer' },
          { name: 'Rakuten Travel', localStrength: 'Part of Rakuten ecosystem with loyalty points integration', angle: 'Points are nice; AI-planned itineraries are transformative' },
        ],
        messaging: [
          'AIがあなただけの旅行プランを30秒で作成',
          'From dreaming to planning in seconds — AI travel planning arrives in Japan',
          '10個のブラウザタブを1つのAI会話に置き換えましょう',
        ],
        regulatory: ['APPI (Act on Protection of Personal Information) compliance', 'JTA (Japan Tourism Agency) guidelines for AI travel services'],
        contentBrief: ['Japanese-language content: 旅行計画 (travel planning) SEO cluster', 'Partnership content with Japanese travel influencers on YouTube', 'Cultural guide: how AI respects Japanese travel preferences (seasonal, group-oriented)'],
        adVariants: [
          { headline: 'AIが旅行プランを30秒で作成', description: '行きたい場所を伝えるだけ。フライト、ホテル、隠れた名所まで — 完璧な旅行プランをAIが作ります。' },
          { headline: 'Dream Trip, AI Planned', description: 'SkyVoyager builds your perfect Japan itinerary in seconds. Local gems, optimal routes, booking links included.' },
          { headline: '旅行計画をもっと簡単に', description: 'SkyVoyagerのAIトリッププランナーで、あなただけの旅行プランを瞬時に。無料でお試しください。' },
        ],
      },
    },
    {
      country: 'Australia', flag: '🇦🇺', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 74,
      dimensions: { demand: 78, competition: 82, position: 65, regulatory: 72 },
      insight: 'English-speaking market with high travel spend per capita. Less competition than US/UK.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: 'Google dominates Australian search — AUD $2.10 avg CPC' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'Aussies are early adopters of social travel content' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 20, note: '"Holiday planning" content for both domestic and outbound' },
          { name: 'Podcast Ads', icon: 'mic', budgetPct: 15, note: 'Travel podcasts have strong Australian listenership' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Growing SkyVoyager user base in APAC' },
        ],
        competitors: [
          { name: 'Webjet', localStrength: 'Australia\'s leading online travel agency with mass-market appeal', angle: 'Webjet books flights; SkyVoyager plans the whole trip with AI' },
          { name: 'Flight Centre', localStrength: 'Massive retail presence with 600+ stores across Australia', angle: 'AI-powered planning without the store visit — faster and free' },
        ],
        messaging: [
          'Plan your next overseas trip in 30 seconds flat',
          'AI trip planning that knows the difference between Bali and Bali',
          'Your holiday, planned by AI — not a 45-minute store visit',
        ],
        regulatory: ['Australian Privacy Act compliance', 'ACCC guidelines on AI-generated recommendations'],
        contentBrief: ['Destination content for top Aussie outbound markets (Bali, Japan, Europe)', 'Video: "AI vs Flight Centre" trip planning comparison', 'Seasonal: school holidays and peak travel period planning guides'],
        adVariants: [
          { headline: 'Plan Your Holiday in 30 Seconds', description: 'SkyVoyager\'s AI builds complete trip itineraries — flights, stays, and local tips. No store visit needed.' },
          { headline: 'Bali Trip? AI\'s Got You Sorted.', description: 'Tell our AI where you want to go. Get a personalised itinerary with hidden gems and booking links.' },
          { headline: 'Smarter Than a Travel Agent', description: 'AI-powered trip planning for your next overseas adventure. Complete itineraries in seconds. Try free.' },
        ],
      },
    },
    {
      country: 'France', flag: '🇫🇷', region: 'Europe', tier: 'next-quarter', pmfScore: 68,
      dimensions: { demand: 80, competition: 62, position: 45, regulatory: 85 },
      insight: 'World\'s most-visited country. French travellers plan carefully but adopt AI slowly.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: 'French travel searches peak 6-8 weeks before holidays' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 25, note: 'French-language "planifier voyage" content cluster' },
          { name: 'Instagram', icon: 'video', budgetPct: 20, note: 'Visual travel content strong with French 25-44 demographic' },
          { name: 'Partnerships', icon: 'handshake', budgetPct: 15, note: 'Partner with French travel bloggers and media' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Targeted campaigns around congés payés (paid holidays)' },
        ],
        competitors: [
          { name: 'Liligo', localStrength: 'French-born metasearch with strong local brand recognition', angle: 'Liligo compares; SkyVoyager plans your entire voyage with AI' },
          { name: 'SNCF Connect', localStrength: 'National railway platform expanding into full trip planning', angle: 'SNCF is trains; SkyVoyager plans the complete trip around them' },
        ],
        messaging: [
          'Planifiez votre voyage de rêve en 30 secondes grâce à l\'IA',
          'L\'IA qui connaît les meilleures terrasses cachées de chaque ville',
          'Un voyage sur mesure, planifié par l\'intelligence artificielle',
        ],
        regulatory: ['CNIL (French DPA) strict on AI transparency', 'Loi Hamon consumer protection for travel bookings'],
        contentBrief: ['French-language SEO: "planifier voyage" and "organiser vacances" clusters', 'Cultural content: how AI respects French travel style (gastronomy, culture)', 'Comparison guides for top French outbound destinations (Spain, Italy, Morocco)'],
        adVariants: [
          { headline: 'Planifiez Votre Voyage en 30s', description: 'L\'IA SkyVoyager crée votre itinéraire complet — vols, hébergements et bonnes adresses. Essai gratuit.' },
          { headline: 'Votre Prochain Voyage, Planifié par l\'IA', description: 'Dites-nous où vous rêvez d\'aller. Notre IA crée un plan de voyage personnalisé en quelques secondes.' },
          { headline: 'Mieux qu\'une Agence de Voyage', description: 'Itinéraires personnalisés par IA avec tips locaux, routes optimales et liens de réservation. Gratuit.' },
        ],
      },
    },
    {
      country: 'South Korea', flag: '🇰🇷', region: 'Asia Pacific', tier: 'watch', pmfScore: 52,
      dimensions: { demand: 75, competition: 42, position: 28, regulatory: 62 },
      insight: 'Tech-savvy market with high smartphone penetration but requires Naver/Kakao presence.',
      playbook: {
        channels: [
          { name: 'Naver Ads', icon: 'search', budgetPct: 35, note: 'Naver holds 55%+ search share — Google is secondary' },
          { name: 'KakaoTalk', icon: 'smartphone', budgetPct: 25, note: '49M users — essential for Korean market reach' },
          { name: 'YouTube', icon: 'video', budgetPct: 20, note: 'Korean travel vloggers have massive followings' },
          { name: 'Instagram', icon: 'video', budgetPct: 15, note: 'Visual travel content for 20-35 Korean demographic' },
          { name: 'Blog', icon: 'file-text', budgetPct: 5, note: 'Naver Blog posts are critical for SEO in Korea' },
        ],
        competitors: [
          { name: 'Naver Travel', localStrength: 'Integrated into Korea\'s dominant search/content platform', angle: 'Naver aggregates info; SkyVoyager builds a complete AI itinerary' },
          { name: 'Yanolja', localStrength: 'Korea\'s largest travel super-app with accommodation + experiences', angle: 'Yanolja books; SkyVoyager plans the trip that connects the bookings' },
        ],
        messaging: [
          'AI가 30초 만에 완벽한 여행 계획을 세워드립니다',
          'From Seoul to the world — AI-powered trip planning',
          '여행 계획, AI에게 맡기세요',
        ],
        regulatory: ['PIPA (Personal Information Protection Act) compliance', 'Korean AI Ethics guidelines'],
        contentBrief: ['Naver Blog SEO strategy for Korean travel planning queries', 'KakaoTalk channel with AI trip planning integration demo', 'Korean travel influencer partnerships on YouTube and Instagram'],
        adVariants: [
          { headline: 'AI 여행 플래너 — 30초 완성', description: '가고 싶은 곳만 말하세요. SkyVoyager AI가 항공편, 숙소, 현지 맛집까지 완벽한 여행 계획을 세워드립니다.' },
          { headline: 'Plan Your Trip in 30 Seconds', description: 'SkyVoyager\'s AI builds complete Korean travel itineraries with local tips and booking links. Try free.' },
          { headline: '여행 계획이 이렇게 쉬울 줄이야', description: 'AI가 만드는 맞춤 여행 일정 — 숨겨진 명소, 최적 루트, 예약 링크까지. 무료 체험.' },
        ],
      },
    },
  ],
  'companion': [
    {
      country: 'United States', flag: '🇺🇸', region: 'North America', tier: 'launch-now', pmfScore: 86,
      dimensions: { demand: 90, competition: 76, position: 88, regulatory: 90 },
      insight: 'Largest inbound/domestic travel market. High smartphone adoption makes real-time companion features immediately useful.',
      playbook: {
        channels: [
          { name: 'App Store Optimization', icon: 'smartphone', budgetPct: 30, note: '"Travel companion app" — 12K monthly searches in US App Store' },
          { name: 'Google Ads', icon: 'search', budgetPct: 25, note: '"What to do in [city] today" queries — real-time intent' },
          { name: 'TikTok/Reels', icon: 'video', budgetPct: 20, note: 'Live trip demos showing real-time translations and recommendations' },
          { name: 'Push Notifications', icon: 'bell', budgetPct: 15, note: 'Geo-triggered suggestions when travellers arrive at destinations' },
          { name: 'Creator Partnerships', icon: 'users', budgetPct: 10, note: 'Travel vloggers demo the app in real-time during trips' },
        ],
        competitors: [
          { name: 'Google Maps', localStrength: 'Default navigation and local discovery — installed on every phone', angle: 'Google Maps shows directions; Companion knows you\'re hungry, translates the menu, and books the table' },
          { name: 'TripAdvisor', localStrength: 'Massive review database for restaurants and attractions', angle: 'TripAdvisor shows reviews from last year; Companion gives real-time, personalised suggestions right now' },
          { name: 'Airbnb Experiences', localStrength: 'Curated local experiences with instant booking', angle: 'Airbnb lists experiences; Companion proactively suggests them based on your location and weather' },
        ],
        messaging: [
          'Your AI travel companion that knows what you need before you ask',
          'Lost in translation? Not anymore. Real-time help in 40+ languages.',
          'The travel app that gets smarter the more you explore',
        ],
        regulatory: ['CCPA compliance for location tracking', 'FCC guidelines on push notification frequency'],
        contentBrief: ['App Store feature story: "How AI changed my solo trip to NYC"', 'Video series: "48 hours with an AI companion" in top US cities', 'SEO hub: "What to do in [city] today" for top 30 US destinations'],
        adVariants: [
          { headline: 'Your AI Travel Companion', description: 'Real-time recommendations, instant translations, and local tips — all in one app. Never feel lost again.' },
          { headline: 'Explore Like a Local, Anywhere', description: 'SkyVoyager Companion gives you personalised suggestions based on where you are right now. Try it free.' },
          { headline: 'Lost in a New City? AI\'s Got You.', description: 'Translations, restaurant picks, emergency info, and hidden gems — your pocket travel companion for any trip.' },
        ],
      },
    },
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 83,
      dimensions: { demand: 86, competition: 74, position: 85, regulatory: 88 },
      insight: 'UK travellers take 4+ international trips/year. High demand for in-trip assistance especially in non-English-speaking destinations.',
      playbook: {
        channels: [
          { name: 'App Store Optimization', icon: 'smartphone', budgetPct: 28, note: '"Holiday companion app" and "travel translator" keywords' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'UK travellers share in-trip content heavily — demo reel potential' },
          { name: 'Google Ads', icon: 'search', budgetPct: 22, note: '"Things to do in Barcelona today" — UK tourists searching abroad' },
          { name: 'Email Cross-sell', icon: 'mail', budgetPct: 15, note: 'Post-booking email: "Download your trip companion before you fly"' },
          { name: 'PR & Press', icon: 'newspaper', budgetPct: 10, note: 'Travel sections: Guardian, Independent, Condé Nast Traveller' },
        ],
        competitors: [
          { name: 'Google Translate', localStrength: 'Default translation tool — instant camera translation', angle: 'Google translates words; Companion understands context and helps you order, navigate, and tip correctly' },
          { name: 'Citymapper', localStrength: 'Beloved UK transport app expanding into trip planning', angle: 'Citymapper does routes; Companion does your entire in-trip experience end-to-end' },
        ],
        messaging: [
          'The app that turns "I\'m lost in Madrid" into "I found the best tapas bar"',
          'Real-time travel help — translations, tips, and emergency info on tap',
          'Your holiday companion that speaks the language, even when you don\'t',
        ],
        regulatory: ['UK GDPR for location data processing', 'ICO guidance on geolocation tracking'],
        contentBrief: ['PR pitch: "The AI that saved my holiday" real user stories', 'Video: "UK tourists try AI companion in Europe" reaction content', 'Guide: "Essential travel apps for your city break" (SEO play)'],
        adVariants: [
          { headline: 'Your Holiday Companion, Sorted', description: 'Real-time translations, local tips, and restaurant picks — all in one app. Essential for your next city break.' },
          { headline: 'Lost in Europe? Not Anymore.', description: 'SkyVoyager Companion translates menus, finds hidden gems, and handles emergencies. Your pocket travel expert.' },
          { headline: 'Smarter Than a Guidebook', description: 'AI-powered recommendations based on where you are right now. Restaurants, attractions, and local tips — personalised.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'launch-now', pmfScore: 77,
      dimensions: { demand: 82, competition: 70, position: 68, regulatory: 88 },
      insight: 'Germans are Europe\'s top international travellers. High demand for reliable, data-efficient travel tools.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Reise-App" and "Übersetzer Urlaub" queries — €1.60 avg CPC' },
          { name: 'App Store', icon: 'smartphone', budgetPct: 25, note: 'German App Store keywords: "Reisebegleiter" and "Reise-Assistent"' },
          { name: 'YouTube', icon: 'video', budgetPct: 22, note: 'German travel YouTubers demo in-trip features' },
          { name: 'Email', icon: 'mail', budgetPct: 15, note: 'Pre-trip email with companion download and offline feature' },
          { name: 'SEO', icon: 'file-text', budgetPct: 10, note: '"Was tun in [Stadt]" content hub for popular destinations' },
        ],
        competitors: [
          { name: 'Google Maps/Translate', localStrength: 'Default tools for navigation and translation — deeply integrated into Android', angle: 'Google gives generic tools; Companion combines them intelligently for a seamless travel experience' },
          { name: 'ADAC Trips', localStrength: 'ADAC has 21M members — trusted for travel planning in Germany', angle: 'ADAC focuses on road trips; Companion covers any trip type with real-time AI' },
        ],
        messaging: [
          'Ihr KI-Reisebegleiter — Übersetzungen, Tipps und Notfallhilfe in Echtzeit',
          'Von der Speisekarte bis zum Notfall — Ihr persönlicher Reise-Assistent',
          'Reisen Sie entspannt — Companion kümmert sich um den Rest',
        ],
        regulatory: ['Strict GDPR enforcement for location tracking', 'Bundesdatenschutzgesetz — offline-capable mode recommended'],
        contentBrief: ['German-language App Store listing optimised for "Reisebegleiter"', 'Trust content: offline capabilities and data privacy features', 'Partnership pitch: ADAC or Lufthansa Magazine integration'],
        adVariants: [
          { headline: 'Ihr KI-Reisebegleiter', description: 'Echtzeit-Übersetzungen, lokale Tipps und Notfallhilfe — alles in einer App. Für entspanntes Reisen.' },
          { headline: 'Reise-App mit KI-Power', description: 'SkyVoyager Companion kennt die besten Restaurants, übersetzt Speisekarten und hilft im Notfall. Jetzt testen.' },
          { headline: 'Nie Wieder Lost im Urlaub', description: 'KI-gestützte Reisebegleitung mit Offline-Modus, Übersetzungen und personalisierten Empfehlungen.' },
        ],
      },
    },
    {
      country: 'Spain', flag: '🇪🇸', region: 'Europe', tier: 'next-quarter', pmfScore: 71,
      dimensions: { demand: 85, competition: 62, position: 52, regulatory: 84 },
      insight: '84M tourists/year — second most-visited country. Massive opportunity for in-trip companion targeting inbound tourists.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Things to do in Barcelona/Madrid" — target English, German, French speakers' },
          { name: 'Instagram', icon: 'video', budgetPct: 25, note: 'Spain is the #1 most-Instagrammed destination in Europe' },
          { name: 'App Store', icon: 'smartphone', budgetPct: 20, note: 'Multilingual ASO targeting tourists, not residents' },
          { name: 'Hotel Partnerships', icon: 'handshake', budgetPct: 15, note: 'Partner with hotel chains for check-in download prompts' },
          { name: 'Push Notifications', icon: 'bell', budgetPct: 10, note: 'Geo-triggered: arriving at airport, entering historic quarter, etc.' },
        ],
        competitors: [
          { name: 'GetYourGuide', localStrength: 'Dominant in Spain for tours and activities with instant booking', angle: 'GYG books experiences; Companion suggests them in real-time based on your location and mood' },
          { name: 'Civitatis', localStrength: 'Spain-native experiences platform with deep local supply', angle: 'Civitatis lists tours; Companion is your full trip assistant — not just experiences' },
        ],
        messaging: [
          'Your AI guide to Spain — tapas bars, flamenco, and hidden plazas locals love',
          'From "¿qué es esto?" to "esto está increíble" — real-time Spanish help',
          'Every cobblestone street in Barcelona has a story. Companion knows them all.',
        ],
        regulatory: ['RGPD (Spanish GDPR) compliance', 'Tourist tax integration requirements in Barcelona and Balearic Islands'],
        contentBrief: ['Multilingual landing pages targeting UK, German, and French tourists to Spain', 'Video: "24 hours in Barcelona with AI" showing real-time companion features', 'SEO: "Hidden gems in [Spanish city]" programmatic content'],
        adVariants: [
          { headline: 'Your AI Guide to Spain', description: 'Real-time restaurant picks, translations, and local tips as you explore. The smartest way to discover Spain.' },
          { headline: 'Barcelona Beyond the Guidebook', description: 'SkyVoyager Companion finds the tapas bar tourists miss and the plaza locals love. Personalised to you.' },
          { headline: 'Speak Spanish Without Speaking It', description: 'Real-time menu translation, ordering help, and local recommendations. Your AI companion for Spain.' },
        ],
      },
    },
    {
      country: 'Italy', flag: '🇮🇹', region: 'Europe', tier: 'next-quarter', pmfScore: 68,
      dimensions: { demand: 82, competition: 60, position: 48, regulatory: 82 },
      insight: 'Italy\'s tourism is spreading beyond Rome/Florence. AI companion can unlock smaller cities and regional experiences.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"What to do in Rome/Florence today" — multilingual targeting' },
          { name: 'Instagram', icon: 'video', budgetPct: 25, note: 'Italy is inherently visual — food, architecture, landscapes' },
          { name: 'App Store', icon: 'smartphone', budgetPct: 22, note: 'Target tourists arriving at FCO, MXP, VCE airports' },
          { name: 'Hotel/Airbnb', icon: 'handshake', budgetPct: 15, note: 'Check-in companion download via accommodation partners' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Pre-trip "Download your Italy companion" for existing bookers' },
        ],
        competitors: [
          { name: 'Google Maps', localStrength: 'Default navigation — well-mapped even in rural Italy', angle: 'Google Maps navigates; Companion recommends the trattoria at the end of the route' },
          { name: 'Musement', localStrength: 'Italian-native experiences platform acquired by TUI', angle: 'Musement books activities; Companion guides your entire day proactively' },
        ],
        messaging: [
          'AI that knows the difference between tourist-trap gelato and the real thing',
          'Navigate Italy\'s hidden trattorias, churches, and piazzas like a local',
          'Your personal Italian guide — no language barrier, no tourist traps',
        ],
        regulatory: ['Italian GDPR (Garante) compliance', 'Regional tourism regulations vary by comune'],
        contentBrief: ['Content: "Beyond the tourist trail" guides for Puglia, Cinque Terre, Sardinia', 'Video: "AI helped me find the best pasta in Rome" real user story', 'SEO: "Hidden gems in [Italian city]" for secondary destinations'],
        adVariants: [
          { headline: 'Italy Without Tourist Traps', description: 'SkyVoyager Companion finds the real Italy — authentic trattorias, quiet piazzas, and local favourites. AI-powered.' },
          { headline: 'Your AI Guide to Italy', description: 'Real-time translations, restaurant picks, and local insights. Navigate Rome, Florence, and beyond like a local.' },
          { headline: 'Speak Italian Food Fluently', description: 'Menu translations, dish recommendations, and the nearest great espresso — all from your AI travel companion.' },
        ],
      },
    },
    {
      country: 'Thailand', flag: '🇹🇭', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 65,
      dimensions: { demand: 80, competition: 55, position: 42, regulatory: 82 },
      insight: '40M tourists/year with complex local infrastructure. In-trip AI assistant is highly valuable for navigation and communication.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Things to do in Bangkok/Phuket" — target Western tourists' },
          { name: 'LINE', icon: 'smartphone', budgetPct: 25, note: 'LINE has 54M Thai users — chatbot integration for local engagement' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 22, note: 'Thailand travel content is massively popular on social' },
          { name: 'Hotel/Hostel', icon: 'handshake', budgetPct: 15, note: 'Koh San Road hostels to luxury Phuket resorts — QR code download' },
          { name: 'Push Notifications', icon: 'bell', budgetPct: 10, note: 'Geo-triggered: temple etiquette, tuk-tuk pricing, food court tips' },
        ],
        competitors: [
          { name: 'Grab', localStrength: 'Dominant super-app for transport, food, payments in Thailand', angle: 'Grab moves you around; Companion tells you where to go and what to do when you get there' },
          { name: 'Klook', localStrength: 'Major experiences platform with strong Bangkok/Phuket presence', angle: 'Klook lists activities; Companion proactively suggests them based on your real-time location' },
        ],
        messaging: [
          'Navigate Bangkok\'s chaos with AI — from street food to temples to tuk-tuks',
          'Your pocket guide to Thailand — real-time tips in English, no data plan needed',
          'Temple etiquette, fair tuk-tuk prices, and the best pad thai nearby — Companion knows',
        ],
        regulatory: ['PDPA (Thailand data protection act) compliance', 'TAT (Tourism Authority of Thailand) content guidelines'],
        contentBrief: ['Video: "Surviving Bangkok with only an AI companion" challenge content', 'Guide: "Thailand travel tips AI recommends" for first-time visitors', 'SEO: "Best street food in Bangkok/Chiang Mai" programmatic content'],
        adVariants: [
          { headline: 'Navigate Thailand Like a Pro', description: 'Real-time tips on tuk-tuk prices, temple etiquette, and the best street food. Your AI guide to Thailand.' },
          { headline: 'Bangkok Without the Confusion', description: 'SkyVoyager Companion handles translations, navigation, and local tips so you can enjoy Thailand stress-free.' },
          { headline: 'Your AI Guide to Thai Street Food', description: 'Companion finds the best pad thai, mango sticky rice, and local favourites near you. Real-time, personalised.' },
        ],
      },
    },
    {
      country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East & Africa', tier: 'watch', pmfScore: 54,
      dimensions: { demand: 70, competition: 48, position: 35, regulatory: 62 },
      insight: 'Growing tourism hub but small market size. Best approached as extension of broader MENA strategy.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Things to do in Dubai" — target English-speaking tourists' },
          { name: 'Instagram', icon: 'video', budgetPct: 28, note: 'Dubai/Abu Dhabi are top aspirational travel content' },
          { name: 'App Store', icon: 'smartphone', budgetPct: 22, note: 'Target tourists arriving at DXB — world\'s busiest international airport' },
          { name: 'Hotel Partnerships', icon: 'handshake', budgetPct: 12, note: 'Luxury hotel concierge integration — Jumeirah, Atlantis' },
          { name: 'Push Notifications', icon: 'bell', budgetPct: 8, note: 'Weather-aware: indoor activity suggestions during summer heat' },
        ],
        competitors: [
          { name: 'Visit Dubai App', localStrength: 'Government-backed official tourism app with comprehensive listings', angle: 'Visit Dubai lists everything; Companion personalises and prioritises based on your interests and real-time context' },
          { name: 'Careem', localStrength: 'Regional super-app (Uber subsidiary) with transport dominance', angle: 'Careem drives you there; Companion decides where "there" should be' },
        ],
        messaging: [
          'Discover Dubai beyond the malls — AI finds the souks, beaches, and hidden gems',
          'Your AI companion handles the heat — indoor suggestions when it\'s 45°C outside',
          'Navigate Dubai\'s luxury and culture with personalised AI recommendations',
        ],
        regulatory: ['UAE Federal Data Protection Law compliance', 'Dubai Tourism content standards and licensing'],
        contentBrief: ['Premium positioning: "AI concierge" for high-end Dubai travellers', 'Video: "Hidden Dubai" — AI finds experiences beyond the tourist strip', 'SEO: "Best things to do in Dubai today" seasonal content'],
        adVariants: [
          { headline: 'Your AI Guide to Dubai', description: 'Beyond the malls and skyscrapers — Companion finds the souks, beaches, and rooftop bars tourists miss.' },
          { headline: 'Dubai, Personalised by AI', description: 'Real-time restaurant picks, weather-smart suggestions, and local tips. Your pocket concierge for Dubai.' },
          { headline: 'Navigate Dubai Like an Insider', description: 'SkyVoyager Companion knows when to go indoors, where to eat, and what\'s happening nearby. Try free.' },
        ],
      },
    },
  ],
  'ancillaries': [
    {
      country: 'United States', flag: '🇺🇸', region: 'North America', tier: 'launch-now', pmfScore: 85,
      dimensions: { demand: 90, competition: 78, position: 88, regulatory: 84 },
      insight: 'Highest ancillary revenue per passenger globally. Travellers expect upsell flows and are comfortable adding extras at checkout.',
      playbook: {
        channels: [
          { name: 'In-Flow Prompts', icon: 'sparkles', budgetPct: 35, note: 'AI-timed upsell cards during booking — 18% avg attach rate' },
          { name: 'Email Drip', icon: 'mail', budgetPct: 25, note: 'Post-booking sequences for insurance, seats, lounge — $0.40 CPC' },
          { name: 'Push Notifications', icon: 'smartphone', budgetPct: 20, note: 'Day-of-travel prompts for WiFi, transfers, upgrades' },
          { name: 'Google Ads', icon: 'search', budgetPct: 12, note: '"Travel insurance" and "seat upgrade" queries — $3.10 avg CPC' },
          { name: 'Partner Co-Marketing', icon: 'handshake', budgetPct: 8, note: 'LoungeBuddy, Boingo WiFi, and Allianz co-branded placements' },
        ],
        competitors: [
          { name: 'Hopper', localStrength: 'Fintech-forward — insurance and "cancel for any reason" are core to their model', angle: 'Hopper sells one product at a time; SkyVoyager bundles the right add-ons contextually with AI' },
          { name: 'Google Flights', localStrength: 'Massive distribution but limited ancillary attach — no upsell layer', angle: 'Google shows the flight; SkyVoyager makes the whole trip seamless with smart add-ons' },
          { name: 'Expedia', localStrength: 'Full-stack OTA with bundled packages and loyalty programme', angle: 'Expedia bundles generically; SkyVoyager personalises add-ons to your trip with AI timing' },
        ],
        messaging: [
          'The right travel extras, suggested at the right moment — not a wall of checkboxes',
          'AI knows you need travel insurance for Bali but not for a weekend in Austin',
          'Stop overpaying for add-ons you don\'t need. Start getting ones you do.',
        ],
        regulatory: ['State-by-state insurance licensing requirements (esp. California, New York)', 'FTC disclosure rules for AI-recommended financial products'],
        contentBrief: ['SEO hub: "Is travel insurance worth it for X?" pages for top 30 US routes', 'Video series: "What I wish I\'d added to my booking" real traveller stories', 'Comparison calculator: ancillary bundle vs buying separately'],
        adVariants: [
          { headline: 'Smart Add-Ons, Not Spam', description: 'SkyVoyager\'s AI recommends only the travel extras that make sense for your trip. Insurance, seats, lounge — timed perfectly.' },
          { headline: 'Your Flight Needs More Than a Seat', description: 'AI-powered ancillary recommendations based on your destination, duration, and travel style. No guesswork.' },
          { headline: 'Save 30% on Travel Extras', description: 'SkyVoyager bundles insurance, WiFi, and lounge access at the optimal moment. Smarter than buying à la carte.' },
        ],
      },
    },
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 82,
      dimensions: { demand: 86, competition: 76, position: 85, regulatory: 80 },
      insight: 'UK travellers are accustomed to ancillary upsells from Ryanair/easyJet. High baseline attach rates but growing fatigue with dark patterns.',
      playbook: {
        channels: [
          { name: 'In-Flow Prompts', icon: 'sparkles', budgetPct: 35, note: 'AI-timed upsell during booking — position as "helpful" vs airline dark patterns' },
          { name: 'Email Drip', icon: 'mail', budgetPct: 25, note: 'Post-booking add-on sequences — UK open rates 22% for travel emails' },
          { name: 'Push Notifications', icon: 'smartphone', budgetPct: 18, note: 'Pre-departure prompts for lounge, fast-track, and transfers' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 14, note: '"Do I need travel insurance for Europe" — high-intent queries' },
          { name: 'Partnerships', icon: 'handshake', budgetPct: 8, note: 'Priority Pass, Revolut travel insurance cross-promotions' },
        ],
        competitors: [
          { name: 'Ryanair/easyJet', localStrength: 'Trained the UK market to expect ancillary upsells — 40%+ attach rates', angle: 'Airlines use dark patterns; SkyVoyager uses AI to recommend only what genuinely helps your trip' },
          { name: 'Skyscanner', localStrength: 'Beloved UK brand now expanding into post-search ancillary recommendations', angle: 'SkyVoyager goes further — AI times each add-on to the moment it\'s most relevant' },
        ],
        messaging: [
          'Travel extras without the guilt trip — AI recommends only what you actually need',
          'Ryanair wants to sell you everything. We just suggest what makes sense.',
          'Lounge access for your 6am Gatwick flight? Yeah, you probably need that one.',
        ],
        regulatory: ['FCA regulations on insurance distribution (IDD compliance)', 'CAA rules on transparent ancillary pricing for flights', 'UK GDPR — consent for personalised ancillary recommendations'],
        contentBrief: ['Guide: "Which travel add-ons are actually worth it?" for top UK routes', 'Calculator: "Build your perfect trip bundle" interactive tool', 'PR angle: "The anti-dark-pattern travel upsell" — ethical AI positioning'],
        adVariants: [
          { headline: 'Travel Extras Without Dark Patterns', description: 'SkyVoyager\'s AI recommends add-ons that genuinely improve your trip — insurance, lounges, transfers. Honest and transparent.' },
          { headline: '6am Gatwick Flight? You Need This.', description: 'AI-powered lounge access, fast-track security, and transfer suggestions — timed to when you actually need them.' },
          { headline: 'Stop Overpaying for Travel Add-Ons', description: 'SkyVoyager bundles the right extras for your trip. No hidden fees, no dark patterns. Just smarter travel.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'next-quarter', pmfScore: 73,
      dimensions: { demand: 80, competition: 68, position: 70, regulatory: 74 },
      insight: 'Germans prefer bundled "Pauschalreise" packages over à la carte add-ons. Smart bundles will outperform individual upsells.',
      playbook: {
        channels: [
          { name: 'In-Flow Bundles', icon: 'sparkles', budgetPct: 35, note: 'AI-curated bundles ("Sorglos-Paket") in booking flow — aligns with Pauschalreise mentality' },
          { name: 'Google Ads', icon: 'search', budgetPct: 25, note: '"Reiseversicherung" and "Sitzplatzreservierung" queries — €1.90 avg CPC' },
          { name: 'Email Sequences', icon: 'mail', budgetPct: 20, note: 'Post-booking bundles positioned as peace-of-mind ("Sorglos")' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 12, note: 'German-language guides on travel insurance comparison and seat selection' },
          { name: 'CHECK24 Integration', icon: 'handshake', budgetPct: 8, note: 'Germans trust comparison platforms — partner for ancillary bundles' },
        ],
        competitors: [
          { name: 'CHECK24', localStrength: 'Germany\'s go-to comparison site — now offers travel insurance bundles', angle: 'CHECK24 compares prices; SkyVoyager\'s AI builds personalised bundles based on your specific trip' },
          { name: 'TUI', localStrength: 'Largest tour operator — "all-inclusive" is their core promise', angle: 'TUI bundles everything upfront; SkyVoyager lets you customise with AI-recommended extras' },
          { name: 'HanseMerkur', localStrength: 'Germany\'s leading travel insurance provider with strong brand trust', angle: 'SkyVoyager integrates HanseMerkur and others — AI picks the best policy for your trip' },
        ],
        messaging: [
          'Das Sorglos-Paket für Ihre Reise — KI stellt Ihr perfektes Bundle zusammen',
          'Reiseversicherung, Sitzplatz, Lounge — alles in einem smarten Paket',
          'Keine einzelnen Add-ons mehr. Ein Bundle, das zu Ihrer Reise passt.',
        ],
        regulatory: ['Versicherungsvertriebsrichtlinie (IDD) — strict insurance distribution rules', 'Pauschalreiserichtlinie compliance for bundled travel products'],
        contentBrief: ['German SEO: "Reiseversicherung Vergleich" and "Reise-Extras" content hubs', 'Trust content: Datenschutz (data privacy) and transparency documentation for AI recommendations', 'Bundle calculator: "Sorglos-Paket Builder" for top German outbound routes'],
        adVariants: [
          { headline: 'Ihr Sorglos-Paket — KI-Empfohlen', description: 'SkyVoyager stellt das perfekte Reise-Bundle zusammen: Versicherung, Sitzplatz, Lounge. Alles passend zu Ihrer Reise.' },
          { headline: 'Reise-Extras Ohne Stress', description: 'Unsere KI empfiehlt nur die Add-ons, die zu Ihrer Reise passen. Kein Durchklicken, keine versteckten Kosten.' },
          { headline: 'Besser als Einzelbuchung', description: 'KI-kuratierte Reise-Bundles sparen bis zu 25% gegenüber Einzelbuchung. Versicherung, Transfers, Lounge — alles drin.' },
        ],
      },
    },
    {
      country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East & Africa', tier: 'launch-now', pmfScore: 78,
      dimensions: { demand: 82, competition: 60, position: 75, regulatory: 95 },
      insight: 'Highest ancillary attach rate globally (3.2x average). Luxury-oriented travellers readily pay for premium add-ons. Low regulatory friction.',
      playbook: {
        channels: [
          { name: 'In-Flow Prompts', icon: 'sparkles', budgetPct: 30, note: 'Premium-positioned upsells — lounge, fast-track, chauffeur transfers' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'UAE travellers are heavily influenced by social — aspirational add-on content' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Airport lounge Dubai" and "travel insurance UAE" — $2.80 avg CPC' },
          { name: 'Push Notifications', icon: 'smartphone', budgetPct: 15, note: 'Pre-travel premium upgrade prompts for high-value travellers' },
          { name: 'Partnerships', icon: 'handshake', budgetPct: 10, note: 'Emirates Skywards, Careem transfers, and Majid Al Futtaim lounges' },
        ],
        competitors: [
          { name: 'Emirates', localStrength: 'National carrier sets the gold standard for premium ancillary experience', angle: 'Emirates sells their own add-ons; SkyVoyager curates the best across all airlines and partners' },
          { name: 'Musafir', localStrength: 'Regional OTA with strong UAE brand and Arabic-language experience', angle: 'Musafir offers packages; SkyVoyager\'s AI personalises every add-on to your travel style' },
        ],
        messaging: [
          'Your journey deserves more — AI-curated premium travel extras',
          'Chauffeur transfer, lounge access, priority boarding — one tap, perfectly timed',
          'Travel like you mean it. AI ensures nothing is missing from your trip.',
        ],
        regulatory: ['UAE Insurance Authority (IA) — light-touch regulation for travel insurance distribution'],
        contentBrief: ['Premium positioning: "Elevate your journey" content for DXB and AUH routes', 'Social content: Instagram Reels showing premium add-on experiences at Dubai airports', 'Influencer partnerships: UAE-based luxury travel creators showcasing smart bundles'],
        adVariants: [
          { headline: 'Elevate Every Journey', description: 'SkyVoyager\'s AI curates premium travel extras — chauffeur transfers, lounge access, and insurance. All timed perfectly.' },
          { headline: 'Travel Smarter from Dubai', description: 'AI-powered add-ons for the discerning traveller. Lounge, fast-track, WiFi, and more — bundled and personalised.' },
          { headline: 'Premium Extras, Zero Hassle', description: 'Stop browsing add-ons manually. SkyVoyager\'s AI selects the premium extras that match your journey.' },
        ],
      },
    },
    {
      country: 'Singapore', flag: '🇸🇬', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 70,
      dimensions: { demand: 76, competition: 58, position: 68, regulatory: 78 },
      insight: 'Second-highest ancillary attach rate in APAC (2.8x average). Tech-savvy travellers comfortable with AI-driven recommendations.',
      playbook: {
        channels: [
          { name: 'In-Flow Prompts', icon: 'sparkles', budgetPct: 32, note: 'AI-timed upsells — Singaporeans respond well to data-driven recommendations' },
          { name: 'Google Ads', icon: 'search', budgetPct: 25, note: '"Travel insurance Singapore" and "Changi lounge" — SGD 2.50 avg CPC' },
          { name: 'Social Media', icon: 'video', budgetPct: 20, note: 'Instagram and TikTok — travel hack content resonates with 25-40 demo' },
          { name: 'Email Sequences', icon: 'mail', budgetPct: 15, note: 'Post-booking add-on prompts — high engagement from deal-savvy travellers' },
          { name: 'Partnerships', icon: 'handshake', budgetPct: 8, note: 'Changi Rewards, Grab transfers, and DBS/OCBC travel insurance tie-ins' },
        ],
        competitors: [
          { name: 'Klook', localStrength: 'APAC super-app for experiences and add-ons — strong Changi Airport presence', angle: 'Klook sells experiences; SkyVoyager bundles all add-ons intelligently across the entire journey' },
          { name: 'Trip.com', localStrength: 'Growing APAC presence with competitive ancillary pricing', angle: 'Trip.com offers add-ons at checkout; SkyVoyager\'s AI recommends them at the right moment throughout your trip' },
          { name: 'Singapore Airlines', localStrength: 'National carrier with premium KrisShop and lounge ecosystem', angle: 'SIA sells their add-ons; SkyVoyager curates the best options across all airlines for your route' },
        ],
        messaging: [
          'Smarter travel extras, recommended by AI — not a checkout upsell wall',
          'Changi lounge + travel insurance + WiFi — bundled for your exact trip',
          'The AI that knows you need travel insurance for Jakarta but not for KL',
        ],
        regulatory: ['MAS (Monetary Authority of Singapore) guidelines for insurance distribution', 'PDPA compliance for personalised ancillary recommendations'],
        contentBrief: ['SEO: "Best travel insurance Singapore" and "Changi Airport lounge" keyword clusters', 'Deal-comparison content: "Smart bundles vs buying add-ons separately" calculator', 'Social: "Travel hack" TikTok series showing AI-recommended add-ons saving money'],
        adVariants: [
          { headline: 'Smart Travel Extras for Singaporeans', description: 'SkyVoyager\'s AI recommends the right add-ons for your trip — insurance, lounges, transfers. No spam, just smart.' },
          { headline: 'Bundle & Save on Travel Add-Ons', description: 'AI curates your perfect travel bundle: Changi lounge, insurance, WiFi, and transfers. Save up to 25%.' },
          { headline: 'AI Knows What Your Trip Needs', description: 'Stop guessing which extras to buy. SkyVoyager\'s AI recommends add-ons based on your route, dates, and style.' },
        ],
      },
    },
    {
      country: 'Australia', flag: '🇦🇺', region: 'Asia Pacific', tier: 'watch', pmfScore: 54,
      dimensions: { demand: 65, competition: 55, position: 40, regulatory: 56 },
      insight: 'Strong consumer protection laws create compliance overhead. Moderate ancillary demand with growing interest in bundled insurance products.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Travel insurance Australia" dominates — AUD $3.20 avg CPC, high intent' },
          { name: 'In-Flow Prompts', icon: 'sparkles', budgetPct: 28, note: 'AI-timed upsells — must be clearly disclosed per ACCC rules' },
          { name: 'Email Drip', icon: 'mail', budgetPct: 20, note: 'Post-booking insurance and add-on sequences — trust-forward positioning' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 15, note: '"Compare travel insurance" guides — Australians research heavily before buying' },
          { name: 'Partnerships', icon: 'handshake', budgetPct: 7, note: 'Cover-More, Qantas Frequent Flyer, and Rex Lounge tie-ins' },
        ],
        competitors: [
          { name: 'Cover-More', localStrength: 'Australia\'s largest travel insurance provider — sold through every OTA and airline', angle: 'Cover-More is insurance only; SkyVoyager bundles insurance with seats, lounges, and transfers via AI' },
          { name: 'Webjet', localStrength: 'Leading Australian OTA with established ancillary upsell flows', angle: 'Webjet upsells generically at checkout; SkyVoyager\'s AI times each add-on to when it matters most' },
        ],
        messaging: [
          'Travel extras recommended by AI — transparent, fair, and tailored to your trip',
          'Insurance, lounge, transfers — bundled with full cancellation rights',
          'No hidden fees. No dark patterns. Just the add-ons your trip actually needs.',
        ],
        regulatory: ['ASIC financial services licensing for insurance distribution', 'ACCC consumer protection — clear cancellation and refund policies required', 'Australian Privacy Act — consent for personalised ancillary recommendations'],
        contentBrief: ['Trust-first content: "Your rights when buying travel extras" transparency guide', 'Comparison: "Is travel insurance worth it?" for top Australian outbound routes', 'Regulatory-compliant calculator: ancillary bundle builder with clear T&Cs'],
        adVariants: [
          { headline: 'Travel Extras You Can Trust', description: 'SkyVoyager\'s AI recommends add-ons transparently — full cancellation rights, clear pricing, no dark patterns.' },
          { headline: 'Heading Overseas? Don\'t Forget These.', description: 'AI-powered insurance, lounge access, and transfer recommendations for Aussie travellers. Clear pricing, easy cancellation.' },
          { headline: 'Smarter Add-Ons for Aussie Travellers', description: 'SkyVoyager bundles travel insurance, seats, and extras based on your destination. Transparent and fully refundable.' },
        ],
      },
    },
  ],
  'prices': [
    {
      country: 'United States', flag: '🇺🇸', region: 'North America', tier: 'launch-now', pmfScore: 87,
      dimensions: { demand: 94, competition: 80, position: 85, regulatory: 90 },
      insight: 'Highest flight search volume globally. Price-conscious consumers actively use alerts and tracking tools.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Cheap flights" and "flight price tracker" queries — $1.90 avg CPC with high purchase intent' },
          { name: 'App Store Optimization', icon: 'smartphone', budgetPct: 25, note: 'Price alert apps dominate travel category — ASO critical for discovery' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 20, note: 'Programmatic "cheapest time to fly to X" pages capture massive long-tail' },
          { name: 'Email/Push', icon: 'mail', budgetPct: 15, note: 'Price drop alerts drive highest re-engagement — 4.2x open rate vs standard' },
          { name: 'Social Proof', icon: 'users', budgetPct: 10, note: 'Reddit r/travel and Twitter deal accounts amplify savings stories organically' },
        ],
        competitors: [
          { name: 'Google Flights', localStrength: 'Built into search results with price tracking and calendar view — zero-click dominance', angle: 'Google shows current prices; SkyVoyager predicts where prices are going and tells you when to book' },
          { name: 'Hopper', localStrength: '100M+ downloads with price prediction as core feature — strong mobile-first brand', angle: 'Hopper locks you into their app; SkyVoyager gives predictions plus booking across all providers' },
          { name: 'Scott\'s Cheap Flights', localStrength: 'Cult following with 2M+ subscribers trusting their deal curation', angle: 'Scott\'s sends deals they find; SkyVoyager tracks your specific routes and predicts the best moment to buy' },
        ],
        messaging: [
          'Stop guessing when to book. AI knows when prices will drop.',
          'We tracked 2 billion flight prices so you don\'t have to — average savings of $142 per trip',
          'The price you see today isn\'t the price you should pay. Let AI find the right moment.',
        ],
        regulatory: ['FTC truth-in-advertising rules for price predictions and savings claims', 'DOT requirements for transparent fare display including all taxes and fees'],
        contentBrief: ['SEO hub: "Best time to book flights to X" for top 100 US routes', 'Interactive tool: historical price calendar showing cheapest booking windows', 'Weekly "Price Intelligence Report" email series with route-specific predictions'],
        adVariants: [
          { headline: 'Book Flights at the Perfect Moment', description: 'SkyVoyager\'s AI analyzes 2 billion prices to predict when your flight will be cheapest. Average savings: $142.' },
          { headline: 'Flight Prices Drop. We\'ll Tell You When.', description: 'AI-powered price predictions for every route. Get alerted the moment prices hit their lowest. Try free.' },
          { headline: 'Stop Overpaying for Flights', description: 'Our AI tracked prices on your route for 12 months. It knows when they\'ll drop. Set an alert in 10 seconds.' },
        ],
      },
    },
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 84,
      dimensions: { demand: 90, competition: 76, position: 86, regulatory: 84 },
      insight: 'Massive outbound travel market with price-savvy consumers. Flight deals culture is deeply embedded.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Cheap flights" is a top 10 travel search term in UK — £1.60 avg CPC' },
          { name: 'App Store/Push', icon: 'smartphone', budgetPct: 25, note: 'Price alert push notifications drive 38% of return visits in UK market' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 22, note: '"Cheapest time to fly to Malaga/Tenerife/Alicante" evergreen content' },
          { name: 'PR & Media', icon: 'newspaper', budgetPct: 15, note: 'The Sun, Daily Mail, and MoneySavingExpert amplify flight deal stories' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Route-specific price drop alerts to existing SkyVoyager users' },
        ],
        competitors: [
          { name: 'Skyscanner', localStrength: 'Edinburgh-born brand synonymous with cheap flights — massive UK loyalty', angle: 'Skyscanner shows today\'s prices; SkyVoyager predicts tomorrow\'s and tells you to wait or book now' },
          { name: 'Jack\'s Flight Club', localStrength: 'UK\'s most popular deal newsletter with 2M+ subscribers and media presence', angle: 'Jack\'s alerts on deals they find; SkyVoyager watches your specific routes 24/7 with AI predictions' },
          { name: 'Google Flights', localStrength: 'Integrated into every UK flight search with explore and tracking features', angle: 'Google tracks prices; SkyVoyager tells you the why — and predicts what happens next' },
        ],
        messaging: [
          'Stop refreshing flight prices. Our AI watches for you — and knows when they\'ll drop.',
          'The average UK family overspends £186 on flights. SkyVoyager fixes that.',
          'AI that\'s tracked every flight from Gatwick, Heathrow, and Manchester for the last year.',
        ],
        regulatory: ['UK GDPR for price alert personal data and notification consent', 'ASA rules on savings claims — must be verifiable and not misleading'],
        contentBrief: ['SEO hub: "Cheapest time to fly from [UK airport] to [destination]" for top 80 routes', 'MoneySavingExpert-style guide: "How flight pricing actually works — and how AI cracks the code"', 'Seasonal campaign: "Summer holiday prices — when to book, when to wait" interactive tracker'],
        adVariants: [
          { headline: 'Know When Flight Prices Will Drop', description: 'SkyVoyager AI tracks every route from UK airports. Get predictions, not just prices. Average saving: £186.' },
          { headline: 'Cheap Flights, Perfectly Timed', description: 'Our AI has watched your route for 12 months. It knows when the price dips. Set alerts in 10 seconds.' },
          { headline: 'The Price Tracker That Predicts', description: 'Don\'t just watch prices — know where they\'re heading. AI-powered flight price intelligence. Try free.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'launch-now', pmfScore: 76,
      dimensions: { demand: 82, competition: 68, position: 72, regulatory: 82 },
      insight: 'Europe\'s largest outbound market. Germans research obsessively and value data-driven decisions.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Flug Preisvergleich" and "günstige Flüge" — high volume, €1.40 avg CPC' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 25, note: 'German-language price comparison and booking guide content hubs' },
          { name: 'App Store', icon: 'smartphone', budgetPct: 20, note: 'German users prefer app-based alerts — high install-to-alert ratio' },
          { name: 'YouTube', icon: 'video', budgetPct: 15, note: 'Data-driven "how to find cheap flights" videos resonate with German audience' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Weekly Preis-Report emails with route analytics and booking windows' },
        ],
        competitors: [
          { name: 'CHECK24', localStrength: 'Germany\'s comparison juggernaut — TV omnipresent, trusted for everything from flights to insurance', angle: 'CHECK24 compares today\'s prices; SkyVoyager predicts tomorrow\'s and recommends the optimal booking moment' },
          { name: 'idealo Flüge', localStrength: 'Price comparison DNA — German consumers trust idealo\'s data-first approach', angle: 'idealo shows price history; SkyVoyager adds AI prediction and personalised alerts on top' },
          { name: 'Google Flights', localStrength: 'Integrated calendar and price tracking with German-language support', angle: 'Google shows data; SkyVoyager interprets it and gives you a clear buy-or-wait recommendation' },
        ],
        messaging: [
          'Schluss mit Raten — KI sagt Ihnen, wann Ihr Flug am günstigsten wird',
          'Wir haben 2 Milliarden Flugpreise analysiert. Durchschnittliche Ersparnis: 127 €.',
          'Datenbasierte Flugpreis-Prognosen statt Bauchgefühl — SkyVoyager Price Intelligence',
        ],
        regulatory: ['Strict GDPR enforcement by BfDI — explicit consent for price tracking and alerts', 'Preisangabenverordnung (PAngV) — all displayed prices must include taxes and fees'],
        contentBrief: ['German-language SEO: "Wann Flüge buchen" and "Flugpreis Entwicklung" keyword clusters', 'Data transparency page: how the AI prediction model works (critical for German trust)', 'Interactive tool: historical price charts for top 50 German outbound routes'],
        adVariants: [
          { headline: 'Flugpreise vorhersagen mit KI', description: 'SkyVoyager analysiert Milliarden Flugpreise und sagt Ihnen den optimalen Buchungszeitpunkt. Durchschnittlich 127 € sparen.' },
          { headline: 'Wann ist Ihr Flug am günstigsten?', description: 'Unsere KI kennt die Antwort. Preisalarme für Ihre Route — datenbasiert statt Zufall. Jetzt kostenlos testen.' },
          { headline: 'Nie wieder zu viel für Flüge zahlen', description: 'KI-gestützte Preisprognosen für alle Routen ab Deutschland. Buchen Sie zum perfekten Zeitpunkt.' },
        ],
      },
    },
    {
      country: 'India', flag: '🇮🇳', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 71,
      dimensions: { demand: 95, competition: 62, position: 55, regulatory: 72 },
      insight: 'World\'s fastest-growing aviation market. Extreme price sensitivity — even ₹200 difference changes booking decisions.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 25, note: '"Cheap flights India" has 4x per-capita search volume vs US — ₹18 avg CPC' },
          { name: 'App Store/Push', icon: 'smartphone', budgetPct: 30, note: 'Mobile-first market — 92% of flight searches on mobile. Push alerts essential.' },
          { name: 'YouTube', icon: 'video', budgetPct: 20, note: '"How to get cheap flights" is a massive genre — Hindi and English content' },
          { name: 'WhatsApp', icon: 'smartphone', budgetPct: 15, note: '500M+ Indian WhatsApp users — price alerts via WhatsApp have 95% open rate' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 10, note: 'Hindi + English bilingual content for "saste flight tickets" and "cheap flights"' },
        ],
        competitors: [
          { name: 'MakeMyTrip', localStrength: 'India\'s dominant OTA with deep payment integrations (UPI, EMI) and massive brand recall', angle: 'MakeMyTrip sells flights; SkyVoyager tells you when MakeMyTrip\'s prices will be lowest' },
          { name: 'ixigo', localStrength: 'Price prediction pioneer in India with train + flight tracking and fare alerts', angle: 'ixigo predicts; SkyVoyager\'s AI uses 10x more data signals for more accurate forecasts across all platforms' },
          { name: 'Google Flights', localStrength: 'Zero-cost entry point for price comparison — increasingly popular with Indian millennials', angle: 'Google shows prices; SkyVoyager turns price data into actionable "book now or wait" intelligence' },
        ],
        messaging: [
          'Stop checking flight prices 20 times. Our AI watches 24/7 and alerts you at the perfect moment.',
          'Average saving of ₹4,200 per booking — because AI knows when prices drop on your route',
          'Every rupee counts. SkyVoyager tracks prices so you book at the absolute lowest.',
        ],
        regulatory: ['DPDP Act 2023 compliance for personal data and notification consent', 'DGCA fare display rules — must show all-inclusive prices with taxes'],
        contentBrief: ['Bilingual SEO: "Cheap flights" (English) and "सस्ते फ्लाइट टिकट" (Hindi) content hubs', 'YouTube series: "I saved ₹15,000 on flights using AI" — creator collaborations in Hindi and English', 'Festival travel guides: Diwali, Holi, summer holiday price prediction calendars'],
        adVariants: [
          { headline: 'Save ₹4,200 on Every Flight', description: 'SkyVoyager AI tracks flight prices 24/7 and alerts you the moment they hit rock bottom. Join 1M+ smart travellers.' },
          { headline: 'When Will Your Flight Be Cheapest?', description: 'Our AI has analyzed crores of prices on Indian routes. It knows. Set a free price alert in 10 seconds.' },
          { headline: 'Stop Overpaying for Flights', description: 'AI-powered price predictions for every Indian domestic and international route. Average saving: ₹4,200.' },
        ],
      },
    },
    {
      country: 'Brazil', flag: '🇧🇷', region: 'Latin America', tier: 'next-quarter', pmfScore: 64,
      dimensions: { demand: 78, competition: 55, position: 48, regulatory: 75 },
      insight: 'Latin America\'s largest air travel market. Instalment culture (parcelamento) dominates — price intelligence must factor in total cost.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Passagens aéreas baratas" is a high-volume query — R$1.20 avg CPC' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'Brazil is world\'s 3rd largest social media market — deal content goes viral' },
          { name: 'App Store/Push', icon: 'smartphone', budgetPct: 22, note: 'Mobile-first: 85% of Brazilians access internet primarily via smartphone' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 15, note: 'Portuguese-language "quando comprar passagem" evergreen content' },
          { name: 'WhatsApp', icon: 'smartphone', budgetPct: 10, note: '165M Brazilian WhatsApp users — price alert delivery channel with near-100% read rate' },
        ],
        competitors: [
          { name: 'Decolar', localStrength: 'Despegar\'s Brazilian brand — largest OTA in LATAM with deep local payment integration', angle: 'Decolar sells at today\'s price; SkyVoyager tells you if tomorrow\'s will be lower' },
          { name: 'MaxMilhas', localStrength: 'Points marketplace with cult following — Brazilians trust them for deals', angle: 'MaxMilhas trades miles; SkyVoyager predicts cash price movements across all booking platforms' },
          { name: 'Google Flights', localStrength: 'Growing quickly in Brazil as default search integration', angle: 'Google shows the price; SkyVoyager tells you the trend and the optimal booking window' },
        ],
        messaging: [
          'Pare de adivinhar — a IA sabe quando sua passagem vai ficar mais barata',
          'Economia média de R$380 por viagem com alertas inteligentes de preço',
          'Preço de passagem muda todo dia. Nossa IA acompanha para você, 24 horas.',
        ],
        regulatory: ['LGPD (Lei Geral de Proteção de Dados) compliance for price tracking consent', 'ANAC fare transparency rules — prices must include ICMS and all applicable taxes by state'],
        contentBrief: ['Portuguese SEO: "Quando comprar passagem aérea" and "melhor época para comprar passagem" clusters', 'Instagram Reels series: "Economizei R$800 com IA" savings stories with real route examples', 'Interactive tool: price calendar for top Brazilian domestic routes (GRU-SSA, GIG-REC, CGH-CNF)'],
        adVariants: [
          { headline: 'Saiba Quando Sua Passagem Vai Baixar', description: 'A IA do SkyVoyager analisa bilhões de preços e avisa o momento certo de comprar. Economia média: R$380.' },
          { headline: 'Pare de Pagar Caro em Passagens', description: 'Alertas inteligentes de preço para todas as rotas do Brasil. IA que prevê quando o preço vai cair. Grátis.' },
          { headline: 'Passagens Aéreas pelo Melhor Preço', description: 'Nossa IA acompanha preços 24h e sabe quando vão cair. Configure um alerta em 10 segundos.' },
        ],
      },
    },
    {
      country: 'Japan', flag: '🇯🇵', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 67,
      dimensions: { demand: 80, competition: 58, position: 50, regulatory: 80 },
      insight: 'Methodical travel planners who value data precision. Domestic air market is massive — Tokyo-Osaka alone has 50M+ pax/year.',
      playbook: {
        channels: [
          { name: 'Yahoo! Japan', icon: 'search', budgetPct: 28, note: 'Yahoo Japan still commands ~25% search share — critical for travel queries' },
          { name: 'LINE Ads', icon: 'smartphone', budgetPct: 25, note: '95M LINE users — push-style price alerts via LINE Official Account' },
          { name: 'Google Ads', icon: 'search', budgetPct: 22, note: 'Growing search share in Japan — ¥180 avg CPC for flight price queries' },
          { name: 'YouTube', icon: 'video', budgetPct: 15, note: 'Japanese travel deal channels have dedicated followings — data-driven content performs well' },
          { name: 'App Store', icon: 'smartphone', budgetPct: 10, note: 'iOS dominant in Japan (65%+ share) — App Store featuring is high-impact' },
        ],
        competitors: [
          { name: 'Skyticket', localStrength: 'Japan\'s popular flight comparison tool with simple UX and domestic focus', angle: 'Skyticket compares current fares; SkyVoyager predicts future price movements and optimal booking timing' },
          { name: 'Suruga-ya Travel', localStrength: 'Deep integration with Japanese loyalty ecosystems and domestic airline deals', angle: 'Loyalty points are backwards-looking; AI price prediction is forward-looking' },
          { name: 'Google Flights', localStrength: 'Calendar view and tracking features gaining traction with younger Japanese travellers', angle: 'Google tracks; SkyVoyager predicts and sends you a LINE notification at the perfect moment' },
        ],
        messaging: [
          'AIが航空券の最安値タイミングを予測 — もう価格チェックに時間を使わない',
          'Average saving of ¥18,500 per booking — because AI knows when prices hit bottom',
          '20億件の価格データを分析。あなたのルートの最適な予約タイミングをお知らせします。',
        ],
        regulatory: ['APPI compliance for price tracking personal data and push notification consent', 'JATA guidelines on fare display accuracy for AI-generated price predictions'],
        contentBrief: ['Japanese SEO: "航空券 安い時期" (cheap flight timing) and "飛行機 価格推移" (price trends) clusters', 'LINE Official Account with weekly price intelligence digest for popular domestic routes', 'Trust content: how the AI prediction model works — data methodology transparency (essential for Japanese users)'],
        adVariants: [
          { headline: 'AIが最安値を予測します', description: '20億件のフライト価格を分析。あなたのルートが最安になるタイミングをAIが予測してお知らせ。平均18,500円お得。' },
          { headline: 'いつ航空券を買うべき？AIが答えます', description: 'SkyVoyagerの価格インテリジェンスが、最適な予約タイミングを教えてくれます。無料でアラート設定。' },
          { headline: 'Flight Prices, Predicted by AI', description: 'SkyVoyager tracks billions of prices on Japanese routes. Know when to book for maximum savings. Try free.' },
        ],
      },
    },
    {
      country: 'Canada', flag: '🇨🇦', region: 'North America', tier: 'watch', pmfScore: 53,
      dimensions: { demand: 68, competition: 72, position: 42, regulatory: 80 },
      insight: 'Price-sensitive market frustrated by high domestic fares. Small population limits scale but shares US media consumption patterns.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Cheap flights Canada" queries spike around school breaks — CAD $1.70 avg CPC' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 25, note: 'English + French bilingual content for "cheap flights" / "vols pas chers" queries' },
          { name: 'App Store/Push', icon: 'smartphone', budgetPct: 20, note: 'Push alerts for transborder US routes — highest engagement category' },
          { name: 'Reddit/Social', icon: 'users', budgetPct: 15, note: 'r/CanadianFlightDeals and YYZ Deals have massive engaged communities' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Route-specific price alerts with CAD pricing and tax transparency' },
        ],
        competitors: [
          { name: 'Google Flights', localStrength: 'Default price comparison for Canadian travellers with explore and tracking features', angle: 'Google tracks current prices; SkyVoyager predicts the trend and tells you the best day to book' },
          { name: 'YYZ Deals', localStrength: 'Cult-followed Canadian flight deal site with massive Reddit presence and newsletter', angle: 'YYZ Deals finds surprise deals; SkyVoyager watches your specific routes 24/7 with AI predictions' },
          { name: 'Hopper', localStrength: 'Montreal-founded app with strong Canadian brand affinity and price prediction', angle: 'Hopper predicts within their app; SkyVoyager gives predictions plus fare comparison across all booking platforms' },
        ],
        messaging: [
          'Canadian flights are expensive. AI helps you find the moments they\'re not.',
          'Stop refreshing YVR to YYZ prices — our AI tracks 24/7 and alerts you at the lowest point',
          'Average saving of $168 CAD per booking. Because timing beats searching.',
        ],
        regulatory: ['PIPEDA compliance for personal data collection and price alert consent', 'CTA (Canadian Transportation Agency) requirements for transparent all-in fare display including Air Travellers Security Charge'],
        contentBrief: ['Bilingual SEO: English "cheap flights Canada" and French "vols pas chers Canada" content hubs', 'Seasonal price guides: snowbird routes (YYZ/YVR to FLL/PHX/CUN) with historical price data', 'Reddit community engagement strategy: share route-specific price predictions on r/CanadianFlightDeals'],
        adVariants: [
          { headline: 'Know When Canadian Flights Drop', description: 'SkyVoyager AI tracks every route from YYZ, YVR, YUL and more. Get predictions, not just prices. Average saving: $168 CAD.' },
          { headline: 'Tired of Expensive Canadian Flights?', description: 'Our AI has tracked prices on your route for 12 months. It knows when they dip. Free alerts in 10 seconds.' },
          { headline: 'AI-Powered Flight Price Predictions', description: 'Stop guessing when to book. SkyVoyager watches prices 24/7 and tells you the perfect moment. Try free.' },
        ],
      },
    },
  ],
  'experiences': [
    {
      country: 'United States', flag: '🇺🇸', region: 'North America', tier: 'launch-now', pmfScore: 84,
      dimensions: { demand: 88, competition: 72, position: 86, regulatory: 90 },
      insight: 'Largest experiences market globally ($30B+). Fragmented supply creates aggregation opportunity.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Things to do in [city]" and "best tours [destination]" — high intent' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'Experience content is inherently shareable — demo reels perform well' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 22, note: 'Programmatic "best experiences in [city]" pages for top 100 US destinations' },
          { name: 'Creator Partnerships', icon: 'users', budgetPct: 15, note: 'Travel and food creators showcasing AI-curated experiences' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Post-booking: "Top experiences for your trip to [destination]"' },
        ],
        competitors: [
          { name: 'GetYourGuide', localStrength: 'Dominant tours/activities marketplace with strong US growth', angle: 'GYG lists thousands of tours; SkyVoyager curates the best ones for YOU with AI personalisation' },
          { name: 'Viator (TripAdvisor)', localStrength: 'Massive inventory backed by TripAdvisor review data', angle: 'Viator shows everything; SkyVoyager shows the right experiences based on your interests and schedule' },
          { name: 'Airbnb Experiences', localStrength: 'Curated local experiences with host storytelling', angle: 'Airbnb is one supply source; SkyVoyager aggregates across all platforms with AI ranking' },
        ],
        messaging: [
          'AI finds the food tour, sunset cruise, and hidden speakeasy your trip is missing',
          'Stop scrolling 500 tours. Tell AI what you love — get 5 perfect experiences.',
          'Experiences curated by AI, not algorithms. Because you\'re not average.',
        ],
        regulatory: ['State-level tour operator licensing varies', 'FTC guidelines on AI-curated recommendations and affiliate disclosure'],
        contentBrief: ['Programmatic SEO: "Best [type] experiences in [city]" for top 100 destinations', 'Video: "I let AI plan my weekend experiences" in NYC, LA, Miami', 'Content: "The insider\'s guide to [city]" co-created with local operators'],
        adVariants: [
          { headline: 'AI-Curated Experiences, Not Lists', description: 'Tell SkyVoyager what you love — get 5 perfect tours, tastings, and adventures. Not 500 generic results.' },
          { headline: 'Your Trip Is Missing Something', description: 'AI finds the food tour, sunset sail, and hidden speakeasy that make trips unforgettable. Discover now.' },
          { headline: 'Stop Scrolling. Start Experiencing.', description: 'SkyVoyager\'s AI matches you with local experiences based on your interests, schedule, and travel style.' },
        ],
      },
    },
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 81,
      dimensions: { demand: 84, competition: 74, position: 82, regulatory: 84 },
      insight: 'UK travellers spend £4.2B on experiences abroad. Strong demand for curated, authentic local activities.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Things to do in [holiday destination]" — UK tourists searching pre-trip' },
          { name: 'Instagram', icon: 'video', budgetPct: 25, note: 'UK travellers heavily influenced by visual experience content' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 22, note: '"Best day trips from [city]" and "unique experiences in [country]"' },
          { name: 'PR & Press', icon: 'newspaper', budgetPct: 15, note: 'Travel sections in Sunday papers drive experience bookings' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Pre-departure: "Don\'t miss these experiences in Spain"' },
        ],
        competitors: [
          { name: 'GetYourGuide', localStrength: 'Market leader in UK with strong brand and Google Ads presence', angle: 'GYG shows everything; SkyVoyager shows what\'s right for your specific trip' },
          { name: 'Klook', localStrength: 'Growing UK presence with competitive pricing on Asian experiences', angle: 'Klook lists by price; SkyVoyager ranks by personalised relevance using AI' },
        ],
        messaging: [
          'AI finds the experiences guidebooks don\'t mention — personalised to what you love',
          'Your holiday deserves better than "top 10 things to do in Barcelona"',
          'Cooking class in Tuscany, kayaking in Dubrovnik — AI knows what you\'ll love',
        ],
        regulatory: ['UK Package Travel Regulations for experience bundles', 'ATOL/ABTA considerations for combined travel + experience packages'],
        contentBrief: ['Content: "Best experiences in [country]" guides for top UK outbound markets', 'PR: "AI-curated holidays" angle for Sunday travel sections', 'Video: "I let AI choose my holiday activities" for social channels'],
        adVariants: [
          { headline: 'Experiences Worth Booking', description: 'AI-curated tours, tastings, and adventures matched to your travel style. Not a generic list — personalised to you.' },
          { headline: 'Your Holiday, Upgraded by AI', description: 'SkyVoyager finds the cooking class, boat trip, and sunset spot that make your trip unforgettable.' },
          { headline: 'Better Than "Top 10" Lists', description: 'Tell our AI what you love. Get experiences hand-picked for your trip — food tours, culture, adventure.' },
        ],
      },
    },
    {
      country: 'Spain', flag: '🇪🇸', region: 'Europe', tier: 'launch-now', pmfScore: 80,
      dimensions: { demand: 90, competition: 68, position: 70, regulatory: 92 },
      insight: 'World\'s second most-visited country. Fragmented local experience supply creates massive aggregation opportunity.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: 'Multilingual: "Things to do in Barcelona" in EN/DE/FR' },
          { name: 'Instagram', icon: 'video', budgetPct: 25, note: 'Spain is Europe\'s most-Instagrammed destination' },
          { name: 'Local Partnerships', icon: 'handshake', budgetPct: 22, note: 'Aggregate small operators in Barcelona, Madrid, Seville' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 15, note: '"Hidden experiences in [Spanish city]" multilingual content' },
          { name: 'Push Notifications', icon: 'bell', budgetPct: 10, note: 'Geo-triggered: "You\'re near La Boqueria — try this food tour"' },
        ],
        competitors: [
          { name: 'Civitatis', localStrength: 'Spain-native platform with 85K+ activities and deep local operator relationships', angle: 'Civitatis has supply; SkyVoyager adds AI curation so tourists find the RIGHT experience, not just any experience' },
          { name: 'GetYourGuide', localStrength: 'Strong Barcelona/Madrid presence with multilingual support', angle: 'GYG serves everyone the same results; SkyVoyager personalises based on interests and real-time context' },
        ],
        messaging: [
          'AI finds the flamenco show tourists miss and the tapas bar locals love',
          'Barcelona has 10,000 experiences. You have 3 days. Let AI choose wisely.',
          'Beyond La Sagrada Familia — AI unlocks the Spain locals experience',
        ],
        regulatory: ['Spanish tourism regulations are tourism-friendly', 'Catalonia and Balearic Islands have local tour licensing requirements'],
        contentBrief: ['Multilingual SEO: "Best experiences in Barcelona" in EN/DE/FR/IT', 'Local operator onboarding: aggregate fragmented supply in secondary cities', 'Video: "48 hours of AI-curated experiences in Spain" travel series'],
        adVariants: [
          { headline: 'Spain Beyond the Tourist Trail', description: 'AI-curated experiences in Barcelona, Madrid, Seville and beyond. Food tours, flamenco, and hidden gems.' },
          { headline: '3 Days, 10,000 Options. AI Picks 5.', description: 'SkyVoyager\'s AI finds the perfect experiences for YOUR trip to Spain. Not generic lists — personalised.' },
          { headline: 'Tapas, Flamenco, and Hidden Plazas', description: 'Discover the Spain locals love with AI-curated tours and experiences. Personalised to your interests.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'next-quarter', pmfScore: 72,
      dimensions: { demand: 78, competition: 65, position: 62, regulatory: 82 },
      insight: 'Germans are top outbound experience spenders. Focus on curating experiences in their destination countries.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Aktivitäten in [Stadt]" and "Ausflüge [Reiseziel]" queries' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 25, note: 'German-language experience guides for top outbound destinations' },
          { name: 'YouTube', icon: 'video', budgetPct: 20, note: 'German travel vloggers reviewing experiences abroad' },
          { name: 'Email', icon: 'mail', budgetPct: 15, note: 'Pre-trip: "Die besten Erlebnisse für Ihre Reise nach Mallorca"' },
          { name: 'Partnerships', icon: 'handshake', budgetPct: 10, note: 'ADAC and TUI partnership opportunities for experience add-ons' },
        ],
        competitors: [
          { name: 'GetYourGuide', localStrength: 'German-founded company — strong brand trust and local presence', angle: 'GYG is great; SkyVoyager adds AI layer to find experiences that match YOUR interests specifically' },
          { name: 'TUI Musement', localStrength: 'Integrated into TUI package holidays — massive distribution', angle: 'TUI bundles generically; SkyVoyager personalises with AI based on individual preferences' },
        ],
        messaging: [
          'KI findet die besten Erlebnisse für Ihre Reise — personalisiert, nicht pauschal',
          'Kochkurs in Rom, Kayak in Kroatien — KI weiß, was Ihnen gefällt',
          'Ihre Reise verdient mehr als "Top 10 Sehenswürdigkeiten"',
        ],
        regulatory: ['German consumer protection for experience package bookings', 'DSGVO compliance for personalised recommendations'],
        contentBrief: ['German SEO: "Beste Erlebnisse in [Reiseziel]" for top outbound destinations', 'Video: "KI plant meine Urlaubsaktivitäten" with German travel creators', 'Guide: "Geheimtipps für [Land]" beyond the standard tourist attractions'],
        adVariants: [
          { headline: 'KI-Kuratierte Erlebnisse', description: 'SkyVoyager findet die perfekten Touren und Aktivitäten für Ihre Reise. Personalisiert, nicht pauschal.' },
          { headline: 'Mehr als Top 10 Listen', description: 'Sagen Sie unserer KI, was Sie mögen — erhalten Sie 5 perfekte Erlebnisse für Ihr Reiseziel.' },
          { headline: 'Urlaubserlebnisse mit KI', description: 'Kochkurse, Bootstouren, Geheimtipps — personalisiert für Ihre Interessen und Ihren Reiseplan.' },
        ],
      },
    },
    {
      country: 'Italy', flag: '🇮🇹', region: 'Europe', tier: 'next-quarter', pmfScore: 74,
      dimensions: { demand: 88, competition: 65, position: 58, regulatory: 85 },
      insight: 'Italy\'s experience economy is booming beyond Rome/Venice. AI can surface hidden gems in Puglia, Sardinia, and the Dolomites.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: 'Multilingual targeting: tourists searching "experiences in [Italian city]"' },
          { name: 'Instagram', icon: 'video', budgetPct: 25, note: 'Italian food, wine, and landscape content is the most shared travel category' },
          { name: 'Local Operators', icon: 'handshake', budgetPct: 22, note: 'Aggregate small family-run operators — cooking classes, truffle hunts, wine tours' },
          { name: 'SEO Content', icon: 'file-text', budgetPct: 15, note: '"Hidden experiences in Puglia/Sardinia/Amalfi" content plays' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: 'Pre-trip experience recommendations for Italy bookers' },
        ],
        competitors: [
          { name: 'GetYourGuide', localStrength: 'Strong Rome/Florence/Venice presence with skip-the-line products', angle: 'GYG covers major attractions; SkyVoyager finds the truffle hunt in Umbria you didn\'t know existed' },
          { name: 'Airbnb Experiences', localStrength: 'Authentic local experiences with personal host stories', angle: 'Airbnb is one source; SkyVoyager aggregates across all platforms and adds AI curation' },
        ],
        messaging: [
          'AI finds the cooking class in Nonna\'s kitchen, not the tourist factory',
          'Italy has 8,000 comuni — each with experiences worth discovering. AI helps you find them.',
          'Truffle hunting in Umbria, wine tasting in Chianti — AI matches experiences to your passions',
        ],
        regulatory: ['Italian tourism licensing requirements vary by region', 'EU Package Travel Directive for combined bookings'],
        contentBrief: ['Content: "Beyond Rome and Venice" — AI-curated experiences in secondary Italian destinations', 'Video: "AI found me the best cooking class in Italy" creator series', 'Local operator content: highlight family-run experience providers'],
        adVariants: [
          { headline: 'Italy Beyond the Tourist Trail', description: 'AI finds the cooking class, wine tour, and hidden piazza that make your Italian trip unforgettable.' },
          { headline: 'Truffle Hunting, AI-Curated', description: 'SkyVoyager discovers experiences in Umbria, Puglia, and the Dolomites — the Italy tourists miss.' },
          { headline: 'Your Perfect Italian Experience', description: 'Tell our AI what you love — food, wine, art, nature. Get 5 experiences hand-picked for your trip.' },
        ],
      },
    },
    {
      country: 'Thailand', flag: '🇹🇭', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 69,
      dimensions: { demand: 85, competition: 58, position: 50, regulatory: 82 },
      insight: '40M visitors/year seeking authentic local experiences. Massive gap between tourist traps and authentic options.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Best things to do in Bangkok/Phuket/Chiang Mai" — English speakers' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'Thailand experience content goes viral — cooking, elephants, temples' },
          { name: 'Local Operators', icon: 'handshake', budgetPct: 22, note: 'Aggregate ethical operators — elephant sanctuaries, cooking schools' },
          { name: 'LINE', icon: 'smartphone', budgetPct: 15, note: 'LINE Official Account for experience recommendations and booking' },
          { name: 'Hostel/Hotel', icon: 'handshake', budgetPct: 10, note: 'QR code partnerships at accommodation check-in desks' },
        ],
        competitors: [
          { name: 'Klook', localStrength: 'Dominant APAC experiences platform with deep Thailand inventory', angle: 'Klook lists everything; SkyVoyager AI filters for ethical, authentic experiences that match your style' },
          { name: 'GetYourGuide', localStrength: 'Growing Thailand presence with focus on premium experiences', angle: 'GYG shows popular choices; SkyVoyager finds the hidden cooking class in Chiang Mai\'s old quarter' },
        ],
        messaging: [
          'AI finds ethical elephant sanctuaries, not tourist rides — because how you experience matters',
          'The cooking class that\'s not in any guidebook — AI discovers it for you',
          'Thailand has 77 provinces. You\'re visiting 3. Let AI find the best experiences in each.',
        ],
        regulatory: ['TAT ethical tourism guidelines — especially for animal experiences', 'Thai tour operator licensing requirements'],
        contentBrief: ['Ethics-first content: "Ethical experiences in Thailand" — animal sanctuaries, community tourism', 'Video: "AI found me the best cooking class in Chiang Mai" creator content', 'SEO: "Authentic things to do in [Thai destination]" beyond tourist traps'],
        adVariants: [
          { headline: 'Authentic Thailand, AI-Found', description: 'Ethical elephant sanctuaries, local cooking classes, and hidden temples — AI curates Thailand experiences you can feel good about.' },
          { headline: 'Thailand Beyond the Tourist Trail', description: 'SkyVoyager\'s AI finds authentic experiences in Bangkok, Chiang Mai, and the islands. Not tourist traps.' },
          { headline: 'Your Perfect Thai Experience', description: 'Cooking class, temple tour, or island adventure? Tell AI what you love and get personalised picks.' },
        ],
      },
    },
    {
      country: 'Japan', flag: '🇯🇵', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 66,
      dimensions: { demand: 88, competition: 55, position: 40, regulatory: 80 },
      insight: 'Japan\'s experience market is exploding post-COVID. Highly fragmented local-only platforms create opportunity for English-language aggregation.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 28, note: '"Things to do in Tokyo/Kyoto/Osaka" — English-speaking tourists' },
          { name: 'YouTube', icon: 'video', budgetPct: 25, note: 'Japan travel content is YouTube\'s top travel category' },
          { name: 'Local Partnerships', icon: 'handshake', budgetPct: 22, note: 'Bridge language gap: aggregate Jalan/Rakuten experiences in English' },
          { name: 'Instagram', icon: 'video', budgetPct: 15, note: 'Japanese aesthetic content (temples, food, seasons) drives discovery' },
          { name: 'Email', icon: 'mail', budgetPct: 10, note: '"Your Japan experience guide" for pre-arrival tourists' },
        ],
        competitors: [
          { name: 'Klook', localStrength: 'Top English-language experiences platform for Japan with instant booking', angle: 'Klook lists popular attractions; SkyVoyager AI discovers experiences locals know about but tourists can\'t find' },
          { name: 'Viator', localStrength: 'Growing Japan inventory with TripAdvisor review backing', angle: 'Viator relies on reviews; SkyVoyager uses AI to match experiences to your specific interests and schedule' },
        ],
        messaging: [
          'AI unlocks Japan\'s hidden experiences — tea ceremonies, izakaya tours, and onsen towns tourists miss',
          'The sushi-making class in Tsukiji that doesn\'t show up on Google — AI found it for you',
          'Japan has 47 prefectures of experiences. AI makes sure you don\'t just see Tokyo.',
        ],
        regulatory: ['JATA (Japan Association of Travel Agents) guidelines', 'Translated experience descriptions must meet accuracy standards'],
        contentBrief: ['Content: "Hidden Japan experiences" for destinations beyond Tokyo/Kyoto/Osaka', 'Video: "AI planned my Japan experiences" with travel YouTubers', 'SEO: "Best [type] experiences in [Japanese city]" multilingual pages'],
        adVariants: [
          { headline: 'Japan Experiences, AI-Curated', description: 'Tea ceremonies, sushi classes, temple stays — AI finds the authentic Japan experiences tourists miss.' },
          { headline: 'Beyond Tokyo and Kyoto', description: 'SkyVoyager\'s AI discovers experiences across 47 prefectures. Hidden onsens, local festivals, and artisan workshops.' },
          { headline: 'Your Perfect Japan Experience', description: 'Tell our AI what fascinates you about Japan. Get personalised experience recommendations beyond the guidebook.' },
        ],
      },
    },
    {
      country: 'Mexico', flag: '🇲🇽', region: 'Latin America', tier: 'watch', pmfScore: 51,
      dimensions: { demand: 72, competition: 48, position: 22, regulatory: 62 },
      insight: '80% of Mexico\'s experience market is offline bookings. The digital gap is the largest growth opportunity across all markets.',
      playbook: {
        channels: [
          { name: 'Google Ads', icon: 'search', budgetPct: 30, note: '"Things to do in Cancun/CDMX/Playa del Carmen" — US tourists' },
          { name: 'Instagram/TikTok', icon: 'video', budgetPct: 25, note: 'Mexico Riviera Maya content performs exceptionally on social' },
          { name: 'Local Operators', icon: 'handshake', budgetPct: 25, note: 'Digitize offline operators — cenote tours, ruins guides, food walks' },
          { name: 'Hotel/Resort', icon: 'handshake', budgetPct: 12, note: 'All-inclusive resort partnerships for off-property experience bookings' },
          { name: 'Email', icon: 'mail', budgetPct: 8, note: 'Post-booking: "Experiences waiting for you in Mexico"' },
        ],
        competitors: [
          { name: 'Viator', localStrength: 'Largest English-language inventory for Mexico tourist experiences', angle: 'Viator lists popular tours; SkyVoyager AI finds authentic local experiences most tourists never discover' },
          { name: 'Local hotel desks', localStrength: '60%+ of Mexico experience bookings happen at hotel concierge desks', angle: 'Hotel desks sell what pays commission; SkyVoyager recommends what matches your interests' },
        ],
        messaging: [
          'Mexico beyond the resort — AI finds cenotes, street food tours, and Mayan ruins most tourists miss',
          'Your all-inclusive doesn\'t include the best parts of Mexico. AI does.',
          'Cenote adventures, mezcal tastings, and street art walks — AI curates your Mexican experience',
        ],
        regulatory: ['SECTUR (Mexican Tourism Secretariat) tour operator licensing', 'Environmental regulations for cenote and archaeological site tours'],
        contentBrief: ['Content: "Beyond the resort" guides for Riviera Maya, CDMX, Oaxaca', 'Operator onboarding: digitize offline experience providers in top Mexican destinations', 'Video: "AI found me the best taco tour in Mexico City" creator content'],
        adVariants: [
          { headline: 'Mexico Beyond the Resort', description: 'AI finds the cenotes, street food tours, and Mayan experiences your all-inclusive doesn\'t include.' },
          { headline: 'Discover Real Mexico', description: 'SkyVoyager\'s AI curates authentic local experiences in Cancun, CDMX, and Oaxaca. Not tourist traps.' },
          { headline: 'Your Mexico, AI-Curated', description: 'Cenote diving, mezcal tasting, cooking classes — tell AI what you love and discover the real Mexico.' },
        ],
      },
    },
  ],
  'business-travel': [
    {
      country: 'United States', flag: '🇺🇸', region: 'North America', tier: 'launch-now', pmfScore: 86,
      dimensions: { demand: 94, competition: 72, position: 88, regulatory: 90 },
      insight: 'World\'s largest corporate travel market ($350B+). Strong demand for AI-powered policy compliance and approval automation.',
      playbook: {
        channels: [
          { name: 'LinkedIn Ads', icon: 'briefcase', budgetPct: 30, note: 'Decision-makers in procurement and travel management — $8.50 avg CPC' },
          { name: 'Google Ads', icon: 'search', budgetPct: 25, note: 'High-intent "corporate travel management" queries — $12 avg CPC' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 20, note: 'GBTA Convention, Phocuswright — demo-driven pipeline' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'Whitepapers on travel policy ROI and duty of care benchmarks' },
          { name: 'ABM Outbound', icon: 'target', budgetPct: 10, note: 'Account-based campaigns targeting Fortune 1000 travel managers' },
        ],
        competitors: [
          { name: 'SAP Concur', localStrength: 'Embedded in 70% of Fortune 500 expense workflows — switching costs are massive', angle: 'Concur is an expense tool that bolted on travel; SkyVoyager is AI-first travel that integrates expense tracking' },
          { name: 'Navan (TripActions)', localStrength: 'Modern UX and strong Series D momentum with tech-forward companies', angle: 'Navan rebuilt the booking tool; SkyVoyager adds AI policy compliance and real-time duty of care' },
          { name: 'Amex GBT', localStrength: 'Largest TMC globally with deep enterprise relationships and negotiated rates', angle: 'GBT offers human agents; SkyVoyager delivers instant AI-powered approvals and 24/7 traveller support' },
        ],
        messaging: [
          'Corporate travel that manages itself — AI handles policy, approvals, and duty of care so your team doesn\'t have to',
          'From booking to expense report in one platform — no more reconciling three systems',
          'Cut travel policy violations by 60% while giving employees the booking freedom they want',
        ],
        regulatory: ['SOC 2 Type II certification expected by enterprise buyers', 'US DOT duty of care obligations for employer-sponsored travel'],
        contentBrief: ['Whitepaper: "The $4.2B Problem — How Policy Violations Drain Corporate Travel Budgets"', 'ROI calculator: AI travel management vs. legacy TMC cost comparison', 'Case study template: "How [Company] Cut Travel Costs 23% While Improving Traveller Satisfaction"'],
        adVariants: [
          { headline: 'Corporate Travel That Manages Itself', description: 'AI handles policy compliance, approvals, and duty of care automatically. Cut violations 60% while employees book freely.' },
          { headline: 'Your TMC Costs $2M/Year. We Cost 80% Less.', description: 'SkyVoyager replaces manual travel management with AI — instant approvals, automatic policy checks, real-time duty of care.' },
          { headline: 'Stop Chasing Receipts. Start Managing Travel.', description: 'One AI platform for booking, policy compliance, approvals, and expense tracking. See why 200+ companies switched.' },
        ],
      },
    },
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 84,
      dimensions: { demand: 90, competition: 74, position: 86, regulatory: 86 },
      insight: 'Europe\'s largest corporate travel market. London is the global HQ hub — win London, win enterprise credibility.',
      playbook: {
        channels: [
          { name: 'LinkedIn Ads', icon: 'briefcase', budgetPct: 30, note: 'UK travel managers and procurement leads — £7.20 avg CPC' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 25, note: 'Business Travel Show Europe (London), ITM conferences' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Business travel management" and "corporate booking tool" queries' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'Thought leadership in BTN Europe and Business Traveller UK' },
          { name: 'Partner Channel', icon: 'handshake', budgetPct: 10, note: 'TMC partnerships for mid-market referrals' },
        ],
        competitors: [
          { name: 'SAP Concur', localStrength: 'Dominant in UK enterprise with deep HMRC-compliant expense workflows', angle: 'Concur makes you fill in forms; SkyVoyager\'s AI auto-completes expense reports from booking data' },
          { name: 'TravelPerk', localStrength: 'Barcelona-based but strong UK presence — popular with scale-ups for flexible booking', angle: 'TravelPerk modernised booking; SkyVoyager adds AI-driven policy compliance and duty of care' },
          { name: 'Reed & Mackay', localStrength: 'Premium TMC with white-glove service for C-suite and VIP travellers', angle: 'White-glove service at scale — AI delivers Reed & Mackay-level care to every employee, not just execs' },
        ],
        messaging: [
          'AI-powered corporate travel that keeps your team compliant, safe, and productive — without the admin burden',
          'From London to anywhere — one platform for booking, approvals, policy, and duty of care',
          'Give every employee VIP travel management without the VIP price tag',
        ],
        regulatory: ['UK GDPR compliance for employee travel data processing', 'HMRC guidelines on business travel expense reporting and per diem rates'],
        contentBrief: ['Report: "State of UK Corporate Travel 2026 — AI Adoption Benchmarks"', 'Guide: HMRC-compliant expense management with AI auto-categorisation', 'Webinar series: "Duty of Care in the Age of Distributed Workforces"'],
        adVariants: [
          { headline: 'Corporate Travel, Sorted by AI', description: 'Policy compliance, instant approvals, and duty of care — all automated. Cut your travel admin time by 70%.' },
          { headline: 'Ditch the TMC. Keep the Service.', description: 'SkyVoyager\'s AI delivers premium travel management at a fraction of the cost. HMRC-compliant expenses included.' },
          { headline: 'Your Travel Policy, Enforced Automatically', description: 'AI checks every booking against your policy in real-time. No more violations, no more manual reviews. Try free.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'launch-now', pmfScore: 78,
      dimensions: { demand: 86, competition: 68, position: 72, regulatory: 85 },
      insight: 'Europe\'s largest economy with rigorous compliance culture. German enterprises expect Datenschutz-first platforms.',
      playbook: {
        channels: [
          { name: 'LinkedIn/XING', icon: 'briefcase', budgetPct: 30, note: 'XING still significant for DACH enterprise — split budget 60/40 LinkedIn/XING' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 25, note: 'ITB Berlin (business travel track), VDR TravelCom' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Geschäftsreise-Management" and "Dienstreise buchen" queries' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'German-language whitepapers on compliance and Reisekostenabrechnung' },
          { name: 'Direct Sales', icon: 'phone', budgetPct: 10, note: 'Enterprise accounts in Frankfurt, Munich, Hamburg — German buyers prefer personal relationships' },
        ],
        competitors: [
          { name: 'SAP Concur', localStrength: 'SAP is a German national champion — deep trust and integration with SAP ERP ecosystems', angle: 'Concur is legacy ERP-era software; SkyVoyager is the AI-native alternative that still integrates with SAP' },
          { name: 'Comtravo (TravelPerk)', localStrength: 'Acquired by TravelPerk — strong German mid-market presence with local support', angle: 'Comtravo modernised booking in Germany; SkyVoyager adds AI policy engine and duty of care' },
        ],
        messaging: [
          'KI-gestütztes Geschäftsreise-Management — Richtlinien, Genehmigungen und Fürsorgepflicht automatisiert',
          'Reisekostenabrechnung in Sekunden statt Stunden — KI erledigt die Arbeit',
          'Deutsche Datenschutzstandards. Globale Reise-KI. Endlich beides in einem System.',
        ],
        regulatory: ['Strict GDPR/BDSG compliance — German DPA actively enforces', 'Betriebsrat (works council) approval often required for employee monitoring tools', 'German tax law requirements for Reisekostenabrechnung (travel expense reporting)'],
        contentBrief: ['Whitepaper: "DSGVO-konforme KI im Geschäftsreise-Management" (GDPR-compliant AI in travel management)', 'Calculator: Reisekosten-ROI — legacy TMC vs. AI-powered management', 'Guide: Betriebsrat-Zustimmung für KI-Tools — navigating works council approval'],
        adVariants: [
          { headline: 'Geschäftsreisen per KI verwalten', description: 'Richtlinien-Compliance, Genehmigungen und Fürsorgepflicht — automatisch. DSGVO-konform. Jetzt testen.' },
          { headline: 'Reisekosten in Sekunden abrechnen', description: 'SkyVoyager-KI erstellt Reisekostenabrechnungen automatisch aus Buchungsdaten. Steuerkonform. Zeitsparend.' },
          { headline: 'SAP-Integration. KI-Power. Deutsche Standards.', description: 'Das KI-Reisemanagement, das sich in Ihre SAP-Landschaft einfügt. Compliance automatisch, Mitarbeiter zufrieden.' },
        ],
      },
    },
    {
      country: 'Singapore', flag: '🇸🇬', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 72,
      dimensions: { demand: 82, competition: 60, position: 68, regulatory: 78 },
      insight: 'APAC\'s corporate travel hub — 40% of APAC regional HQs are based here. Win Singapore, build APAC credibility.',
      playbook: {
        channels: [
          { name: 'LinkedIn Ads', icon: 'briefcase', budgetPct: 30, note: 'APAC regional HQ decision-makers concentrated in Singapore — SGD $10 avg CPC' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 25, note: 'ITB Asia, Corporate Travel World Asia Pacific' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Corporate travel management Asia" and "business travel platform" queries' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'APAC travel compliance guides and duty of care benchmarks' },
          { name: 'Partner Channel', icon: 'handshake', budgetPct: 10, note: 'Regional TMC partnerships for enterprise warm introductions' },
        ],
        competitors: [
          { name: 'SAP Concur', localStrength: 'Dominant enterprise solution — most MNCs in Singapore already use Concur globally', angle: 'Concur was designed for expense reports, not AI travel management — SkyVoyager is purpose-built for modern corporate travel' },
          { name: 'CWT (Carlson Wagonlit)', localStrength: 'Large APAC TMC presence with established enterprise accounts', angle: 'CWT charges per-transaction; SkyVoyager\'s AI handles bookings, compliance, and duty of care for a flat fee' },
        ],
        messaging: [
          'The AI travel platform built for APAC corporate complexity — multi-currency, multi-policy, multi-country',
          'From Singapore to any APAC destination — AI handles compliance across every jurisdiction',
          'Manage 10 country travel policies from one AI-powered dashboard',
        ],
        regulatory: ['PDPA (Personal Data Protection Act) compliance for employee data', 'Singapore corporate governance requirements for duty of care documentation'],
        contentBrief: ['Guide: "Managing Corporate Travel Across APAC — Compliance in 10 Jurisdictions"', 'Report: "APAC Business Travel Recovery 2026 — Where AI Fills the TMC Gap"', 'ROI study: AI travel management for APAC regional headquarters'],
        adVariants: [
          { headline: 'APAC Corporate Travel, AI-Managed', description: 'Multi-country policies, multi-currency expenses, and duty of care across Asia Pacific — one AI platform.' },
          { headline: 'Your APAC Travel Policy, One Dashboard', description: 'SkyVoyager AI enforces travel policies across 10+ APAC countries automatically. See violations before they happen.' },
          { headline: 'Cut APAC Travel Costs 25% With AI', description: 'AI-powered booking, policy compliance, and expense management for regional headquarters. Request a demo.' },
        ],
      },
    },
    {
      country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East & Africa', tier: 'next-quarter', pmfScore: 68,
      dimensions: { demand: 78, competition: 55, position: 62, regulatory: 76 },
      insight: 'Dubai and Abu Dhabi are major corporate travel hubs. Free zone enterprises adopt tech aggressively.',
      playbook: {
        channels: [
          { name: 'LinkedIn Ads', icon: 'briefcase', budgetPct: 30, note: 'UAE business leaders are highly active on LinkedIn — AED 35 avg CPC' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 25, note: 'Arabian Travel Market (ATM), GITEX Global for enterprise tech' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Corporate travel UAE" and "business travel management Dubai" queries' },
          { name: 'Direct Sales', icon: 'phone', budgetPct: 15, note: 'Enterprise sales targeting DIFC and ADGM-based companies' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 10, note: 'Arabian Business, Gulf Business thought leadership' },
        ],
        competitors: [
          { name: 'Musafir Business', localStrength: 'Local TMC with deep UAE corporate relationships and Arabic-language support', angle: 'Musafir offers human agents; SkyVoyager offers 24/7 AI in English and Arabic with instant policy checks' },
          { name: 'SAP Concur', localStrength: 'Standard for MNCs operating in UAE — integrated with regional ERP deployments', angle: 'Concur doesn\'t understand free zone vs. mainland policies; SkyVoyager AI handles UAE-specific compliance' },
          { name: 'CWT', localStrength: 'Established Middle East TMC operations with negotiated airline rates', angle: 'CWT\'s per-booking fees add up; SkyVoyager\'s AI delivers better rates with predictable flat pricing' },
        ],
        messaging: [
          'Corporate travel built for the Gulf — AI that understands free zones, visa requirements, and regional compliance',
          'From DIFC to Doha in one click — AI handles the booking, policy check, and expense report',
          'Duty of care across the Middle East — real-time traveller tracking and risk alerts powered by AI',
        ],
        regulatory: ['UAE Federal Data Protection Law compliance', 'Free zone-specific corporate travel policies (DIFC, ADGM, DMCC)', 'VAT reporting requirements for corporate travel expenses'],
        contentBrief: ['Guide: "Corporate Travel Compliance Across UAE Free Zones — DIFC, ADGM, DMCC"', 'Report: "Middle East Business Travel 2026 — The AI Opportunity"', 'Webinar: Duty of care for employees travelling across GCC countries'],
        adVariants: [
          { headline: 'Corporate Travel Built for the Gulf', description: 'AI that handles free zone policies, visa requirements, and GCC compliance. Arabic and English support. Request demo.' },
          { headline: 'AI Travel Management for UAE Enterprise', description: 'Policy compliance, instant approvals, and duty of care — automated for the Gulf\'s unique business environment.' },
          { headline: 'DIFC to Anywhere. AI-Managed.', description: 'SkyVoyager handles bookings, policy checks, and VAT-compliant expense reports for UAE businesses. Try free.' },
        ],
      },
    },
    {
      country: 'Hong Kong', flag: '🇭🇰', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 65,
      dimensions: { demand: 76, competition: 58, position: 55, regulatory: 72 },
      insight: 'Asia\'s financial hub with massive corporate travel volume. Combined with Singapore, covers APAC corporate travel.',
      playbook: {
        channels: [
          { name: 'LinkedIn Ads', icon: 'briefcase', budgetPct: 30, note: 'Financial services and professional services decision-makers — HKD $65 avg CPC' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 25, note: 'HKITP travel trade shows, FinTech Festival (corporate travel track)' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Corporate travel Hong Kong" and "business travel management" queries' },
          { name: 'Direct Sales', icon: 'phone', budgetPct: 15, note: 'Central district enterprise accounts — banking, legal, and consulting firms' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 10, note: 'South China Morning Post and Hong Kong Business thought pieces' },
        ],
        competitors: [
          { name: 'Amex GBT', localStrength: 'Dominant TMC for Hong Kong\'s banking and finance sector', angle: 'GBT charges premium fees for human agents; SkyVoyager\'s AI delivers the same service 24/7 at a fraction of the cost' },
          { name: 'FCM Travel', localStrength: 'Strong APAC presence with Hong Kong corporate accounts in financial services', angle: 'FCM is a traditional TMC; SkyVoyager adds AI policy automation that saves finance teams hours per week' },
        ],
        messaging: [
          'Corporate travel that moves at Hong Kong speed — AI approvals in seconds, not hours',
          'From Central to anywhere — AI manages bookings, compliance, and expenses across Greater China and APAC',
          'Give your finance team back 10 hours a week — AI handles travel expense reconciliation',
        ],
        regulatory: ['PDPO (Personal Data Privacy Ordinance) compliance', 'Hong Kong Companies Ordinance requirements for corporate travel expense documentation'],
        contentBrief: ['Guide: "Corporate Travel in Greater China — Compliance Across HK, Mainland, and Macau"', 'Case study: AI travel management for Hong Kong financial services firms', 'Report: "The Hidden Cost of Manual Travel Management in Asia\'s Financial Hub"'],
        adVariants: [
          { headline: 'Corporate Travel at Hong Kong Speed', description: 'AI approvals in seconds, automatic policy compliance, and expense reports that write themselves. Built for finance.' },
          { headline: 'Your TMC Bill Is Too High', description: 'SkyVoyager\'s AI replaces manual travel management for Hong Kong enterprises. Same service, 70% lower cost.' },
          { headline: 'Central to Anywhere. AI-Managed.', description: 'Bookings, policy checks, duty of care, and APAC-wide compliance — one AI platform for Hong Kong business.' },
        ],
      },
    },
    {
      country: 'Netherlands', flag: '🇳🇱', region: 'Europe', tier: 'watch', pmfScore: 53,
      dimensions: { demand: 65, competition: 48, position: 38, regulatory: 60 },
      insight: 'Amsterdam is a European HQ hub for multinationals. Strong sustainability focus in corporate travel.',
      playbook: {
        channels: [
          { name: 'LinkedIn Ads', icon: 'briefcase', budgetPct: 30, note: 'Dutch corporate decision-makers and Zuidas business district targets — EUR 9 avg CPC' },
          { name: 'Industry Events', icon: 'calendar', budgetPct: 25, note: 'Business Travel Show Netherlands, ACTE Amsterdam chapter events' },
          { name: 'Google Ads', icon: 'search', budgetPct: 20, note: '"Zakelijk reizen" (business travel) and "reis management" queries — Dutch and English' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'Sustainability-focused content for Dutch ESG-conscious enterprises' },
          { name: 'Partner Channel', icon: 'handshake', budgetPct: 10, note: 'Dutch TMC and travel management consulting partnerships' },
        ],
        competitors: [
          { name: 'BCD Travel', localStrength: 'Dutch-founded TMC (Utrecht HQ) — national champion with deep local enterprise ties', angle: 'BCD is a traditional TMC; SkyVoyager adds AI that cuts their manual processes and adds CO2 tracking' },
          { name: 'TravelPerk', localStrength: 'Growing Benelux presence with modern booking UX and GreenPerk carbon offsetting', angle: 'TravelPerk offsets carbon; SkyVoyager\'s AI actively optimises for lower-emission itineraries' },
          { name: 'SAP Concur', localStrength: 'Standard for Dutch multinationals already on SAP — high switching costs', angle: 'Concur is expense-first; SkyVoyager is travel-first with AI that reduces both costs and carbon footprint' },
        ],
        messaging: [
          'Duurzaam zakelijk reizen met AI — lagere kosten, lagere uitstoot, betere ervaring',
          'AI that plans the greenest route, enforces your travel policy, and files the expense report',
          'The sustainable corporate travel platform that Dutch multinationals are switching to',
        ],
        regulatory: ['Dutch GDPR implementation (UAVG) — strict on employee data processing', 'Works council (ondernemingsraad) approval required for enterprise software', 'CSRD sustainability reporting requirements for corporate travel emissions'],
        contentBrief: ['Report: "Sustainable Corporate Travel in the Netherlands — AI\'s Role in Cutting Scope 3 Emissions"', 'Guide: Ondernemingsraad approval process for AI travel management tools', 'Calculator: CO2 savings from AI-optimised business travel itineraries'],
        adVariants: [
          { headline: 'Duurzaam Zakelijk Reizen met AI', description: 'Lagere kosten, lagere CO2-uitstoot en automatische compliance. Het AI-reisplatform voor Nederlandse ondernemingen.' },
          { headline: 'Cut Travel Emissions 30% With AI', description: 'SkyVoyager optimises routes for lowest carbon, enforces policy automatically, and tracks Scope 3 emissions. Demo today.' },
          { headline: 'BCD Costs Too Much. AI Costs Less.', description: 'Replace manual travel management with AI — Dutch multinationals save 40% while cutting carbon. GDPR compliant.' },
        ],
      },
    },
  ],
  'white-label': [
    {
      country: 'United Kingdom', flag: '🇬🇧', region: 'Europe', tier: 'launch-now', pmfScore: 92,
      dimensions: { demand: 95, competition: 70, position: 92, regulatory: 88 },
      insight: 'Densest market of digital-first banks and fintechs globally. Monzo, Starling, Revolut all exploring super-app strategies where embedded travel fits perfectly.',
      playbook: {
        channels: [
          { name: 'Enterprise Sales', icon: 'briefcase', budgetPct: 35, note: 'Direct outreach to Head of Product at top 20 UK neobanks and fintechs' },
          { name: 'Industry Events', icon: 'mic', budgetPct: 25, note: 'Money20/20 Europe, Finovate London, WiT Europe — demo-driven selling' },
          { name: 'LinkedIn Ads', icon: 'linkedin', budgetPct: 20, note: 'Target product directors and digital transformation leads at UK banks' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'Case studies + "Why banks are launching travel" thought leadership' },
          { name: 'PR & Press', icon: 'newspaper', budgetPct: 5, note: 'Sifted, AltFi, The Fintech Times — embedded travel angle' },
        ],
        competitors: [
          { name: 'Amadeus', localStrength: 'Established travel tech infrastructure with deep airline relationships', angle: 'Amadeus is built for travel companies; SkyVoyager is built for any brand that wants to offer travel' },
          { name: 'Travelport', localStrength: 'Legacy GDS contracts with major UK travel agencies and TMCs', angle: 'Travelport takes months; SkyVoyager launches in days with full brand control and self-service' },
          { name: 'Kiwi.com Tequila', localStrength: 'Developer-friendly API with virtual interlining for unique routes', angle: 'Tequila gives you an API; SkyVoyager gives you a complete branded product with analytics and onboarding' },
        ],
        messaging: [
          'Your customers already book flights — they just do it somewhere else. What if they did it in your app?',
          'Meridian Bank launched branded flights in 14 days. Your brand could be next.',
          'Embedded travel for UK fintechs: your brand, Skyscanner intelligence, revenue from day one',
        ],
        regulatory: ['FCA considerations for financial services firms offering travel products', 'UK GDPR and data processing for travel booking PII', 'Consumer Duty requirements for fair product presentation'],
        contentBrief: ['Case study: "How a UK bank launched flights in 14 days"', 'White paper: "The Embedded Travel Opportunity for UK Fintechs"', 'Comparison: Build vs buy — the true cost of a travel product'],
        adVariants: [
          { headline: 'Your Customers Book Flights. You Should Earn From It.', description: 'Add branded flight search to your banking app. Skyscanner data, your brand, revenue on every booking. Live in 14 days.' },
          { headline: 'Launch Branded Flights in 2 Weeks', description: 'No engineering required. Full brand control. Real-time analytics. The white-label platform UK fintechs are choosing.' },
          { headline: 'The Shopify of Travel — For Banks', description: 'SkyVoyager\'s platform lets any brand sell flights under their own name. 5 partners live. Yours could be next.' },
        ],
      },
    },
    {
      country: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East & Africa', tier: 'launch-now', pmfScore: 87,
      dimensions: { demand: 90, competition: 65, position: 85, regulatory: 78 },
      insight: 'UAE banks and telecoms aggressively pursuing super-app strategies. Emirates NBD, FAB, and du/e& all investing in digital ecosystems where embedded travel is a killer feature.',
      playbook: {
        channels: [
          { name: 'Enterprise Sales', icon: 'briefcase', budgetPct: 40, note: 'Relationship-driven market. Target C-suite at top 10 UAE banks and telecoms' },
          { name: 'Industry Events', icon: 'mic', budgetPct: 25, note: 'GITEX, Arabian Travel Market, Dubai Fintech Summit — demo booths drive pipeline' },
          { name: 'LinkedIn Ads', icon: 'linkedin', budgetPct: 15, note: 'Target CDOs and SVP Digital at UAE financial institutions' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'Arabic + English thought leadership on embedded finance and travel' },
          { name: 'Partner Channel', icon: 'handshake', budgetPct: 5, note: 'Big 4 consulting firms advising UAE banks on digital transformation' },
        ],
        competitors: [
          { name: 'Amadeus', localStrength: 'Deep relationships with Gulf carriers (Emirates, Etihad, Qatar Airways)', angle: 'Amadeus powers airlines; SkyVoyager empowers non-travel brands to launch travel products independently' },
          { name: 'Wego', localStrength: 'Regional MENA travel search leader with strong Arabic-language presence', angle: 'Wego is a consumer brand; SkyVoyager is the platform that powers brands like yours' },
          { name: 'Cleartrip (Flipkart)', localStrength: 'Growing MENA presence backed by Walmart/Flipkart investment', angle: 'Cleartrip competes with your brand; SkyVoyager enhances it with embedded travel' },
        ],
        messaging: [
          'UAE banks are building super-apps. Travel is the missing piece. We provide it.',
          'Branded flight booking for Emirates NBD, FAB, and every bank in between — live in 14 days',
          'Your customers fly 4x per year. Each flight is revenue you\'re leaving on the table.',
        ],
        regulatory: ['Central Bank of UAE fintech registration for foreign platform providers', 'DIFC and ADGM data protection regulations', 'Arabic language requirements for consumer-facing financial products'],
        contentBrief: ['Report: "The Super-App Race in UAE Banking — Where Travel Fits"', 'Case study: Embedded travel pilot with UAE financial institution', 'Guide: Regulatory pathway for travel platform partnerships in UAE'],
        adVariants: [
          { headline: 'UAE Banks: Add Flights to Your Super-App', description: 'Branded flight search powered by Skyscanner. Your customers book, you earn. Live in 14 days. Central Bank compliant.' },
          { headline: 'Embedded Travel for Gulf Financial Institutions', description: 'Your customers fly 4x/year. Each flight is revenue you\'re missing. SkyVoyager\'s platform changes that. Book a demo.' },
          { headline: 'Launch a Travel Product Without Building One', description: 'Skyscanner data. Your brand. Full analytics. The fastest path to embedded travel for UAE banks and telecoms.' },
        ],
      },
    },
    {
      country: 'Germany', flag: '🇩🇪', region: 'Europe', tier: 'launch-now', pmfScore: 84,
      dimensions: { demand: 85, competition: 72, position: 82, regulatory: 80 },
      insight: 'Europe\'s largest banking market with strong Hausbank tradition. White-label travel through a trusted bank brand carries higher inherent trust than any startup.',
      playbook: {
        channels: [
          { name: 'Enterprise Sales', icon: 'briefcase', budgetPct: 35, note: 'Target digital banking teams at Deutsche Bank, Commerzbank, N26, and Sparkassen network' },
          { name: 'Industry Events', icon: 'mic', budgetPct: 25, note: 'ITB Berlin, Bits & Pretzels, Banking Exchange — travel meets fintech' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 20, note: 'German-language case studies and white papers. "Eingebettetes Reisen" positioning.' },
          { name: 'LinkedIn Ads', icon: 'linkedin', budgetPct: 15, note: 'Target Leiter Digitale Produkte and Produktmanager at German banks' },
          { name: 'Partner Channel', icon: 'handshake', budgetPct: 5, note: 'German IT consultancies (Accenture DACH, Capgemini) advising on digital transformation' },
        ],
        competitors: [
          { name: 'Amadeus', localStrength: 'Munich HQ gives strong local enterprise relationships across DACH', angle: 'Amadeus sells to travel companies; SkyVoyager lets banks become travel companies overnight' },
          { name: 'Peakwork', localStrength: 'German travel tech company with dynamic packaging for tour operators', angle: 'Peakwork serves tour operators; SkyVoyager serves any brand wanting to add flights — simpler, faster, branded' },
          { name: 'Travelport', localStrength: 'Established GDS relationships with German travel agencies (DER Touristik)', angle: 'Travelport is agency infrastructure; SkyVoyager is brand infrastructure — self-service and live in days' },
        ],
        messaging: [
          'Deutsche Banken können jetzt Flugreisen anbieten — in 14 Tagen, ohne Entwicklerteam',
          'Embedded travel for German banks: your brand, Skyscanner data, revenue from day one',
          'The Hausbank advantage: customers trust their bank. Now their bank offers flights.',
        ],
        regulatory: ['BaFin oversight for financial institutions offering ancillary products', 'DSGVO (German GDPR) with stricter interpretation than EU baseline', 'Pauschalreiserichtlinie (Package Travel Directive) implications for bundled offerings'],
        contentBrief: ['White paper: "Eingebettetes Reisen — Die nächste Chance für deutsche Banken"', 'Calculator: Revenue potential from embedded flights based on customer base size', 'Guide: BaFin and regulatory considerations for banks offering travel products'],
        adVariants: [
          { headline: 'Flugreisen in Ihrer Banking-App — In 14 Tagen Live', description: 'SkyVoyager ermöglicht deutschen Banken, Flugreisen unter eigener Marke anzubieten. Skyscanner-Daten. Ihre Marke. Sofort Umsatz.' },
          { headline: 'Embedded Travel for German Banks', description: 'Your customers fly 3x/year. Each flight is revenue your bank is missing. SkyVoyager launches your branded travel product in days.' },
          { headline: 'N26 bietet Reisen an. Ihre Bank auch?', description: 'White-Label-Flugsuche für Banken und Fintechs. Volle Markenkontrolle, Echtzeit-Analytics, DSGVO-konform.' },
        ],
      },
    },
    {
      country: 'Singapore', flag: '🇸🇬', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 81,
      dimensions: { demand: 82, competition: 68, position: 78, regulatory: 85 },
      insight: 'APAC fintech hub with DBS, OCBC, and Grab all building super-apps. Singapore is the beachhead for APAC embedded travel expansion.',
      playbook: {
        channels: [
          { name: 'Enterprise Sales', icon: 'briefcase', budgetPct: 40, note: 'Direct outreach to DBS, OCBC, UOB, and Grab digital teams' },
          { name: 'Industry Events', icon: 'mic', budgetPct: 25, note: 'Singapore Fintech Festival, WiT Singapore, Travel Tech Asia' },
          { name: 'LinkedIn Ads', icon: 'linkedin', budgetPct: 20, note: 'Target VP Digital at APAC banks headquartered in Singapore' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 15, note: 'APAC-focused case studies. Position as the embedded travel platform for super-apps.' },
        ],
        competitors: [
          { name: 'Amadeus', localStrength: 'Strong APAC HQ in Singapore with local airline relationships (SIA, Scoot)', angle: 'Amadeus is airline infrastructure; SkyVoyager is brand infrastructure for non-travel companies' },
          { name: 'Traveloka', localStrength: 'Southeast Asian super-app with flights, hotels, and financial products', angle: 'Traveloka competes with your brand; SkyVoyager powers your brand to compete with Traveloka' },
          { name: 'Agoda', localStrength: 'Booking Holdings-backed OTA with strong APAC presence and affiliate programme', angle: 'Agoda is an affiliate link; SkyVoyager is your own branded product — better UX, better data, better margins' },
        ],
        messaging: [
          'APAC super-apps need travel. SkyVoyager provides the platform to launch it under your brand.',
          'DBS has a super-app. Grab has a super-app. Your embedded travel starts here.',
          'Branded flights for Singapore banks: live in 14 days, revenue from week one',
        ],
        regulatory: ['MAS (Monetary Authority of Singapore) guidelines for financial institution partnerships', 'PDPA compliance for customer travel booking data', 'Singapore Competition Act considerations for platform partnerships'],
        contentBrief: ['Report: "Embedded Travel in APAC Super-Apps — The Next Frontier"', 'Case study: White-label pilot with Singapore financial institution', 'Comparison: Building vs buying a travel product in the APAC regulatory environment'],
        adVariants: [
          { headline: 'Embedded Travel for APAC Super-Apps', description: 'Add branded flights to your banking or super-app. Skyscanner data, your brand, APAC content. Live in 14 days.' },
          { headline: 'Your Super-App Needs Flights. We Power Them.', description: 'SkyVoyager\'s white-label platform lets Singapore banks and fintechs launch branded travel instantly. MAS-ready.' },
          { headline: 'DBS, Grab, and Now You — Offer Flights in Your App', description: 'The embedded travel platform APAC banks are choosing. Your brand. Skyscanner intelligence. Book a demo today.' },
        ],
      },
    },
    {
      country: 'Australia', flag: '🇦🇺', region: 'Asia Pacific', tier: 'next-quarter', pmfScore: 79,
      dimensions: { demand: 80, competition: 62, position: 80, regulatory: 82 },
      insight: 'High-travel-frequency market with strong fintech scene (Afterpay, Zip). Banks like CBA and ANZ investing heavily in digital ecosystems.',
      playbook: {
        channels: [
          { name: 'Enterprise Sales', icon: 'briefcase', budgetPct: 35, note: 'Target Big Four banks (CBA, Westpac, ANZ, NAB) and fintech leaders' },
          { name: 'Industry Events', icon: 'mic', budgetPct: 25, note: 'Sibos APAC, Intersekt (fintech festival), CAPA Aviation Summit' },
          { name: 'LinkedIn Ads', icon: 'linkedin', budgetPct: 20, note: 'Target GM Digital at Australian banks and loyalty programme managers at Qantas FF and Velocity' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 20, note: 'Loyalty programme + embedded travel positioning for Australian market' },
        ],
        competitors: [
          { name: 'Amadeus', localStrength: 'Powers Qantas distribution and major Australian travel agencies', angle: 'Amadeus serves airlines; SkyVoyager serves the banks and retailers that want to offer travel alongside their core products' },
          { name: 'Webjet', localStrength: 'Dominant Australian OTA with B2B division (WebBeds) for wholesale distribution', angle: 'Webjet is a competing brand; SkyVoyager enhances your brand — customers stay in your ecosystem' },
          { name: 'Flight Centre TTV', localStrength: 'Largest Australian travel retail network with corporate and leisure arms', angle: 'Flight Centre is a travel agency; SkyVoyager lets you become your own travel brand without the overhead' },
        ],
        messaging: [
          'Australians fly more than almost any other nationality. Your bank should be earning from every trip.',
          'CBA customers book 8 flights a year. Imagine if they booked through the CommBank app.',
          'White-label flights for Australian banks: Skyscanner data, your brand, Qantas FF integration-ready',
        ],
        regulatory: ['APRA prudential standards for banking partnerships', 'Australian Consumer Law requirements for travel product transparency', 'Privacy Act 1988 and Australian Privacy Principles for booking data'],
        contentBrief: ['Report: "The Embedded Travel Opportunity for Australian Banks"', 'Case study: Loyalty programme integration with white-label flights', 'Calculator: Revenue from embedded flights based on Australian bank customer base size'],
        adVariants: [
          { headline: 'Australian Banks: Add Flights to Your App', description: 'Your customers fly 8x/year. Each flight is revenue you\'re missing. SkyVoyager launches branded travel in 14 days.' },
          { headline: 'Embedded Travel for CBA, ANZ, and Beyond', description: 'Branded flight search powered by Skyscanner. Your app, your brand, your revenue. Qantas FF integration-ready.' },
          { headline: 'Loyalty Points + Flights = Your Super-App', description: 'SkyVoyager\'s white-label platform connects flights to your loyalty programme. Live in 14 days. Book a demo.' },
        ],
      },
    },
    {
      country: 'Brazil', flag: '🇧🇷', region: 'Latin America', tier: 'watch', pmfScore: 68,
      dimensions: { demand: 78, competition: 55, position: 62, regulatory: 58 },
      insight: 'Latin America\'s largest fintech market (Nubank, PicPay). Massive domestic travel market with growing international demand. Regulatory complexity is the main barrier.',
      playbook: {
        channels: [
          { name: 'Enterprise Sales', icon: 'briefcase', budgetPct: 40, note: 'Target Nubank, Itaú, Bradesco, and PicPay digital teams' },
          { name: 'Industry Events', icon: 'mic', budgetPct: 25, note: 'Fintech Conference LATAM, WTM Latin America, ABAV Expo' },
          { name: 'Content Marketing', icon: 'file-text', budgetPct: 20, note: 'Portuguese-language content. Position around PIX-enabled travel payments.' },
          { name: 'LinkedIn Ads', icon: 'linkedin', budgetPct: 15, note: 'Target Diretor de Produtos Digitais at Brazilian banks and fintechs' },
        ],
        competitors: [
          { name: 'Decolar (Despegar)', localStrength: 'Largest LATAM OTA with deep local airline content and instalment payments', angle: 'Decolar is a competing consumer brand; SkyVoyager powers your own brand to offer flights natively' },
          { name: 'MaxMilhas', localStrength: 'Brazilian miles marketplace — strong loyalty programme integration', angle: 'MaxMilhas monetises existing miles; SkyVoyager creates new travel revenue streams for your platform' },
          { name: 'Amadeus', localStrength: 'Powers Gol, LATAM, and Azul distribution infrastructure', angle: 'Amadeus is airline infrastructure; SkyVoyager is platform infrastructure for any Brazilian brand' },
        ],
        messaging: [
          'Nubank tem 90 milhões de clientes. E se cada um reservasse voos pelo app?',
          'Brazilian fintechs are becoming super-apps. Embedded travel is the next feature your users want.',
          'White-label flights with PIX payments and parcelamento — designed for the Brazilian market',
        ],
        regulatory: ['BACEN (Central Bank of Brazil) requirements for financial institution partnerships', 'LGPD (Brazilian data protection) compliance for travel booking data', 'ANAC regulations for travel distribution and consumer protection', 'Complex state-level tax (ICMS) implications for displayed prices'],
        contentBrief: ['Report: "Viagens Embutidas — A Oportunidade para Fintechs Brasileiras"', 'Case study: Embedded travel pilot with Brazilian digital bank', 'Guide: Navigating BACEN and LGPD for travel platform partnerships in Brazil'],
        adVariants: [
          { headline: 'Voos no Seu App — Em 14 Dias', description: 'Plataforma white-label de viagens para bancos e fintechs brasileiros. Dados Skyscanner, sua marca, pagamento via PIX.' },
          { headline: 'Brazilian Fintechs: Add Flights to Your Super-App', description: 'SkyVoyager\'s platform lets any brand sell flights. Skyscanner data, your brand, PIX-ready. Book a demo.' },
          { headline: '90M Nubank Users Book Flights Somewhere Else', description: 'What if they booked through your app? SkyVoyager\'s white-label platform launches branded travel in days.' },
        ],
      },
    },
  ],
}
