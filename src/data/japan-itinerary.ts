export interface ItineraryDay {
  day: number
  city: string
  area: string
  activities: {
    time: string
    title: string
    description: string
    type: 'activity' | 'transport' | 'food' | 'accommodation'
  }[]
  accommodation: string
  dailyCost: number
  mapImage: string
}

export interface TripSummary {
  destination: string
  dates: string
  totalDays: number
  totalCost: number
  tags: string[]
  flights: { route: string; price: number }
  hotels: { nights: number; avgPerNight: number; total: number }
  activities: { total: number }
}

export const tripSummary: TripSummary = {
  destination: 'Japan',
  dates: '15-24 April 2026',
  totalDays: 10,
  totalCost: 2030,
  tags: ['Culture', 'Food', 'Temples', 'Nature', 'City'],
  flights: { route: 'Edinburgh → Tokyo (return)', price: 680 },
  hotels: { nights: 9, avgPerNight: 95, total: 855 },
  activities: { total: 495 },
}

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    city: 'Tokyo',
    area: 'Asakusa & Ueno',
    activities: [
      {
        time: '10:30',
        title: 'Arrive Narita Airport',
        description:
          'Land at Narita International Airport. Take the Narita Express (N\'EX) to Tokyo Station (60 min, ¥3,070 / ~£16). Transfer to hotel in Asakusa.',
        type: 'transport',
      },
      {
        time: '13:00',
        title: 'Check in — WIRED Hotel Asakusa',
        description:
          'Boutique hotel in a converted warehouse, 5 minutes from Senso-ji. Design-forward rooms with tatami elements. Great common area and cafe on the ground floor.',
        type: 'accommodation',
      },
      {
        time: '14:00',
        title: 'Senso-ji Temple',
        description:
          'Tokyo\'s oldest temple (founded 645 AD). Walk through the iconic Kaminarimon (Thunder Gate) and browse the Nakamise-dori shopping street for traditional snacks and souvenirs.',
        type: 'activity',
      },
      {
        time: '16:00',
        title: 'Ueno Park & Ameyoko Market',
        description:
          'Stroll through Ueno Park — cherry blossoms should be finishing in mid-April. Then explore Ameyoko, the bustling market street under the train tracks selling everything from fresh fish to trainers.',
        type: 'activity',
      },
      {
        time: '19:00',
        title: 'Dinner — Sometaro',
        description:
          'DIY okonomiyaki (savoury pancake) restaurant in a beautiful old wooden house in Asakusa. You cook your own on a hotplate at your table. Authentic and fun.',
        type: 'food',
      },
    ],
    accommodation: 'WIRED Hotel Asakusa',
    dailyCost: 145,
    mapImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
  },
  {
    day: 2,
    city: 'Tokyo',
    area: 'Shibuya & Harajuku',
    activities: [
      {
        time: '08:00',
        title: 'Tsukiji Outer Market',
        description:
          'The inner wholesale market moved to Toyosu, but the outer market is still thriving. Queue for tamagoyaki (sweet omelette), try fresh uni (sea urchin) on rice, and pick up a Japanese knife.',
        type: 'food',
      },
      {
        time: '10:30',
        title: 'Meiji Shrine',
        description:
          'Shinto shrine set in a 170-acre forest in the middle of Tokyo. Walk through the towering torii gates and the barrel wall of sake and wine offerings. Serene even on busy days.',
        type: 'activity',
      },
      {
        time: '12:30',
        title: 'Harajuku & Takeshita Street',
        description:
          'Tokyo\'s youth culture epicentre. Takeshita Street is wall-to-wall fashion, crepes, and colour. Nearby Cat Street has more curated boutiques and streetwear.',
        type: 'activity',
      },
      {
        time: '14:00',
        title: 'Lunch — Afuri Ramen, Harajuku',
        description:
          'Famous for their yuzu shio (citrus salt) ramen — light, fragrant, and utterly addictive. Order from the ticket machine, grab a counter seat, and slurp away.',
        type: 'food',
      },
      {
        time: '16:00',
        title: 'Shibuya Crossing & Sky',
        description:
          'See the world\'s busiest pedestrian crossing from above at Shibuya Sky observation deck (230m up). Book a sunset slot for incredible views of Tokyo\'s sprawl.',
        type: 'activity',
      },
      {
        time: '19:30',
        title: 'Dinner — Omoide Yokocho',
        description:
          'Atmospheric alley of tiny yakitori bars near Shinjuku Station. "Memory Lane" (also called Piss Alley) seats maybe 6-8 people per bar. Point at what you want on the grill.',
        type: 'food',
      },
    ],
    accommodation: 'WIRED Hotel Asakusa',
    dailyCost: 165,
    mapImage: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop',
  },
  {
    day: 3,
    city: 'Tokyo',
    area: 'Akihabara & Ginza',
    activities: [
      {
        time: '09:00',
        title: 'teamLab Borderless (Azabudai Hills)',
        description:
          'Immersive digital art museum — rooms of flowing projections, infinity mirror rooms, and interactive light installations. Pre-book a morning slot to avoid the worst crowds.',
        type: 'activity',
      },
      {
        time: '12:00',
        title: 'Lunch — Tonkatsu Maisen, Omotesando',
        description:
          'Possibly Tokyo\'s best tonkatsu (breaded pork cutlet), housed in a converted bathhouse. The kurobuta (black pork) set is extraordinary. Expect a 20-minute queue.',
        type: 'food',
      },
      {
        time: '14:00',
        title: 'Akihabara',
        description:
          'Electric Town — multi-storey arcades, anime shops, retro game stores, and maid cafes. Even if you\'re not into anime, the sensory overload is worth experiencing.',
        type: 'activity',
      },
      {
        time: '16:30',
        title: 'Ginza District',
        description:
          'Tokyo\'s upscale shopping district. Browse the stunning architecture of the Ginza Six mall, visit the rooftop garden, and explore the backstreets for independent galleries.',
        type: 'activity',
      },
      {
        time: '19:00',
        title: 'Dinner — Sushi Dai alternative (Toyosu)',
        description:
          'If you\'re up for it, head to Toyosu Market for sushi at one of the restaurants. Otherwise, Ginza has incredible mid-range sushi — try Sushi Aoki for an omakase without the Michelin price.',
        type: 'food',
      },
    ],
    accommodation: 'WIRED Hotel Asakusa',
    dailyCost: 185,
    mapImage: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
  },
  {
    day: 4,
    city: 'Hakone',
    area: 'Hakone Loop',
    activities: [
      {
        time: '08:30',
        title: 'Shinkansen to Odawara + Hakone',
        description:
          'Bullet train from Tokyo to Odawara (35 min), then Hakone Tozan Railway into the mountains. Buy the Hakone Free Pass (¥6,100 / ~£32) for unlimited transport on the loop.',
        type: 'transport',
      },
      {
        time: '10:30',
        title: 'Hakone Open-Air Museum',
        description:
          'Stunning sculpture park set against mountain and valley backdrops. Picasso collection, a stained glass tower you can climb inside, and outdoor works by Henry Moore and Rodin.',
        type: 'activity',
      },
      {
        time: '13:00',
        title: 'Lunch at the museum cafe',
        description: 'The museum restaurant has surprisingly good Japanese curry and soba noodles with mountain views.',
        type: 'food',
      },
      {
        time: '14:30',
        title: 'Owakudani Valley',
        description:
          'Take the Hakone Ropeway over volcanic vents and steaming sulphur springs. At the top, eat the famous black eggs — boiled in sulphurous water, said to add 7 years to your life.',
        type: 'activity',
      },
      {
        time: '16:00',
        title: 'Lake Ashi Cruise',
        description:
          'Pirate ship cruise across Lake Ashi with views of Mount Fuji (weather permitting — April has about 40% clear days). The Togendai to Hakone-machi route is the most scenic.',
        type: 'activity',
      },
      {
        time: '18:00',
        title: 'Ryokan — Hakone Yuryo',
        description:
          'Traditional Japanese inn with onsen (hot spring baths). Includes kaiseki dinner — a multi-course Japanese meal that\'s an art form. Private outdoor bath available.',
        type: 'accommodation',
      },
    ],
    accommodation: 'Hakone Yuryo',
    dailyCost: 280,
    mapImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
  },
  {
    day: 5,
    city: 'Kyoto',
    area: 'Higashiyama',
    activities: [
      {
        time: '08:00',
        title: 'Shinkansen to Kyoto',
        description:
          'Return to Odawara, then Shinkansen to Kyoto (2 hours). Store luggage in station coin lockers (¥700 for large bags) and explore immediately.',
        type: 'transport',
      },
      {
        time: '11:00',
        title: 'Fushimi Inari Shrine',
        description:
          'Thousands of vermillion torii gates snake up the mountainside. The full loop takes 2-3 hours, but the first 30 minutes to the Yotsutsuji intersection gives you the best photos and city views.',
        type: 'activity',
      },
      {
        time: '13:30',
        title: 'Lunch — Nishiki Market',
        description:
          'Kyoto\'s "Kitchen" — a 5-block covered market with 130+ stalls. Graze on dashi-rolled omelette, mochi, pickles, matcha everything, and fresh tofu. Go stall by stall.',
        type: 'food',
      },
      {
        time: '15:00',
        title: 'Check in — Piece Hostel Sanjo',
        description:
          'Design-led hostel in central Kyoto with private rooms. Minimalist Japanese aesthetic, great common kitchen. Right between Nishiki Market and the Higashiyama temples.',
        type: 'accommodation',
      },
      {
        time: '16:00',
        title: 'Higashiyama Walking Route',
        description:
          'Walk from Kiyomizu-dera temple (hilltop views) down through the preserved streets of Ninenzaka and Sannenzaka. Traditional wooden machiya houses, pottery shops, and tea houses.',
        type: 'activity',
      },
      {
        time: '19:00',
        title: 'Dinner — Gion Kappa',
        description:
          'Intimate kappo-style restaurant in the geisha district. Counter seating, seasonal Kyoto cuisine. Friendly owner who speaks some English. Reservation essential.',
        type: 'food',
      },
    ],
    accommodation: 'Piece Hostel Sanjo',
    dailyCost: 175,
    mapImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
  },
  {
    day: 6,
    city: 'Kyoto',
    area: 'Arashiyama & Temples',
    activities: [
      {
        time: '07:30',
        title: 'Arashiyama Bamboo Grove',
        description:
          'Go at dawn before the crowds. Walking through towering bamboo stalks with dappled light filtering through is genuinely magical. The path from Tenryu-ji temple is the most atmospheric entry.',
        type: 'activity',
      },
      {
        time: '09:00',
        title: 'Tenryu-ji Temple Garden',
        description:
          'UNESCO World Heritage Zen temple with a 14th-century garden designed around a pond reflecting the Arashiyama mountains. One of Kyoto\'s finest gardens.',
        type: 'activity',
      },
      {
        time: '10:30',
        title: 'Monkey Park Iwatayama',
        description:
          'Hike 20 minutes up the hill to a park where 120 macaques roam free. You feed them from inside an enclosure (they\'re outside). Panoramic views of Kyoto from the top.',
        type: 'activity',
      },
      {
        time: '12:30',
        title: 'Lunch — Arashiyama Yoshimura',
        description: 'Soba noodle restaurant overlooking the Togetsukyo Bridge. Handmade buckwheat noodles served hot or cold with mountain vegetables.',
        type: 'food',
      },
      {
        time: '14:30',
        title: 'Kinkaku-ji (Golden Pavilion)',
        description:
          'The gold-leaf-covered pavilion reflected in a mirror pond is one of Japan\'s most iconic images. It\'s always busy, but the gardens around it offer moments of tranquility.',
        type: 'activity',
      },
      {
        time: '16:30',
        title: 'Ryoan-ji Temple',
        description:
          'Home to Japan\'s most famous Zen rock garden — 15 stones arranged so you can never see all of them at once from any angle. Sit on the viewing platform and just be still.',
        type: 'activity',
      },
      {
        time: '19:00',
        title: 'Dinner — Pontocho Alley',
        description:
          'Narrow atmospheric alley along the Kamo River lined with restaurants. Try Misoka-an Kawamichiya for 300-year-old soba tradition, or any of the riverside terraces.',
        type: 'food',
      },
    ],
    accommodation: 'Piece Hostel Sanjo',
    dailyCost: 155,
    mapImage: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
  },
  {
    day: 7,
    city: 'Kyoto',
    area: 'Culture & Craft',
    activities: [
      {
        time: '09:00',
        title: 'Tea Ceremony Experience',
        description:
          'Participate in a traditional Japanese tea ceremony in a tatami room in the Higashiyama district. Learn the philosophy of wabi-sabi, the choreography of preparation, and drink matcha made for you.',
        type: 'activity',
      },
      {
        time: '11:00',
        title: 'Philosopher\'s Path',
        description:
          'A 2km canal-side walk linking Ginkaku-ji (Silver Pavilion) and Nanzen-ji temple. Cherry trees line the path — mid-April might catch the last petals. Quiet, contemplative walking.',
        type: 'activity',
      },
      {
        time: '13:00',
        title: 'Lunch — Omen Nippon',
        description:
          'Famous udon restaurant near the Philosopher\'s Path. Their signature dish: thick udon noodles with seasonal vegetables in a rich dipping broth. Simple, outstanding.',
        type: 'food',
      },
      {
        time: '14:30',
        title: 'Nishijin Textile Center',
        description:
          'Kyoto has been Japan\'s silk-weaving capital for centuries. Watch kimono fabric being woven on traditional looms, see a kimono fashion show, and browse the shop for tenugui cloths.',
        type: 'activity',
      },
      {
        time: '16:00',
        title: 'Sake Tasting — Fushimi District',
        description:
          'Kyoto\'s Fushimi district is one of Japan\'s top sake-brewing regions. Visit Gekkeikan Okura Museum or Kizakura Kappa Country for tastings and brewery tours.',
        type: 'activity',
      },
      {
        time: '19:30',
        title: 'Dinner — Kyoto Gogyo',
        description:
          'Famous for their "burnt" miso ramen — the broth is intentionally scorched for a deep, smoky flavour. Unlike anything you\'ve had. Atmospheric industrial interior.',
        type: 'food',
      },
    ],
    accommodation: 'Piece Hostel Sanjo',
    dailyCost: 160,
    mapImage: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop',
  },
  {
    day: 8,
    city: 'Osaka',
    area: 'Dotonbori & Shinsekai',
    activities: [
      {
        time: '09:00',
        title: 'Shinkansen to Osaka',
        description: 'Kyoto to Osaka by Shinkansen (15 min, ¥1,450 / ~£8). Or take the regular JR line for free with a rail pass (30 min).',
        type: 'transport',
      },
      {
        time: '10:00',
        title: 'Check in — Cross Hotel Osaka',
        description:
          'Contemporary design hotel right in Shinsaibashi, walking distance to Dotonbori. Rooftop bar and a good Italian restaurant downstairs.',
        type: 'accommodation',
      },
      {
        time: '11:00',
        title: 'Osaka Castle',
        description:
          'Imposing 16th-century castle surrounded by a moat and expansive park. The museum inside covers Osaka\'s history and Toyotomi Hideyoshi. The top floor observation deck has great city views.',
        type: 'activity',
      },
      {
        time: '13:30',
        title: 'Lunch — Kuromon Market',
        description:
          'Osaka\'s "Kitchen" — a covered market with 170+ stalls. Fresh sashimi, grilled king crab legs, takoyaki, and the freshest fruit you\'ll ever see. Street-food-style grazing.',
        type: 'food',
      },
      {
        time: '15:30',
        title: 'Shinsekai District',
        description:
          'Retro neighbourhood with a Blade Runner-meets-1950s vibe. The Tsutenkaku Tower presides over streets packed with kushikatsu (deep-fried skewer) restaurants and retro game arcades.',
        type: 'activity',
      },
      {
        time: '18:00',
        title: 'Dotonbori',
        description:
          'Osaka\'s neon-drenched entertainment strip along the canal. Iconic signs (Glico Running Man, giant crab), endless food stalls, and pure sensory overload. This is where Osaka comes alive.',
        type: 'activity',
      },
      {
        time: '19:30',
        title: 'Dinner — Takoyaki & Okonomiyaki crawl',
        description:
          'Osaka is Japan\'s street food capital. Start with takoyaki (octopus balls) from Kukuru in Dotonbori, then okonomiyaki at Mizuno — queues are worth it. Finish with gyoza at Chao Chao.',
        type: 'food',
      },
    ],
    accommodation: 'Cross Hotel Osaka',
    dailyCost: 175,
    mapImage: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop',
  },
  {
    day: 9,
    city: 'Osaka',
    area: 'Umeda & Nightlife',
    activities: [
      {
        time: '09:30',
        title: 'Sumiyoshi Taisha Shrine',
        description:
          'One of Japan\'s oldest Shinto shrines (3rd century), with a distinctive architectural style that predates Chinese Buddhist influence. Beautiful arched bridge over a pond.',
        type: 'activity',
      },
      {
        time: '11:30',
        title: 'Shinsaibashi-suji Shopping',
        description:
          'Covered shopping arcade stretching 600m. Mix of international brands, Japanese fashion, vintage shops, and 100-yen stores. Great for souvenirs and Japanese stationery.',
        type: 'activity',
      },
      {
        time: '13:00',
        title: 'Lunch — Ippudo Ramen, Shinsaibashi',
        description:
          'Legendary Hakata-style tonkotsu ramen. Rich, creamy pork bone broth with thin noodles. Order "kata" for firm noodles. The black garlic version is exceptional.',
        type: 'food',
      },
      {
        time: '15:00',
        title: 'Umeda Sky Building',
        description:
          'Two towers connected by a "Floating Garden Observatory" 173m up. The open-air escalator between the towers is vertigo-inducing. Best at sunset — the views over Osaka are incredible.',
        type: 'activity',
      },
      {
        time: '17:30',
        title: 'Nakazakicho',
        description:
          'Hidden neighbourhood of converted old houses turned into quirky cafes, vintage shops, and art spaces. The anti-Dotonbori. Perfect for an afternoon wander.',
        type: 'activity',
      },
      {
        time: '19:30',
        title: 'Dinner — Torajiro Yakiniku',
        description:
          'Japanese BBQ — grill premium wagyu beef at your table. The tongue and karubi (short rib) are outstanding. Order the all-you-can-drink beer option for the full Osaka experience.',
        type: 'food',
      },
    ],
    accommodation: 'Cross Hotel Osaka',
    dailyCost: 165,
    mapImage: 'https://images.unsplash.com/photo-1556913396-662a0e0e0292?w=800&h=600&fit=crop',
  },
  {
    day: 10,
    city: 'Nara',
    area: 'Day Trip from Osaka',
    activities: [
      {
        time: '08:30',
        title: 'Train to Nara',
        description: 'JR Nara Line from Osaka (45 min, ¥820 / ~£4). Nara is compact and walkable — everything is within the park area.',
        type: 'transport',
      },
      {
        time: '09:30',
        title: 'Nara Deer Park',
        description:
          'Over 1,200 sacred deer roam freely in and around the park. Buy shika senbei (deer crackers) from vendors and bow to the deer — they bow back. Watch out for the pushy ones near the todai-ji entrance.',
        type: 'activity',
      },
      {
        time: '10:30',
        title: 'Todai-ji Temple',
        description:
          'Houses the largest bronze Buddha in the world (15m tall) inside the largest wooden building in the world. The scale is staggering. Try squeezing through the nostril-sized pillar hole for good luck.',
        type: 'activity',
      },
      {
        time: '12:00',
        title: 'Lunch — Kakinoha Sushi Tanaka',
        description:
          'Nara\'s specialty: sushi wrapped in persimmon leaves (kakinoha-zushi). The leaves are not eaten but impart a subtle fragrance to the mackerel and salmon sushi inside.',
        type: 'food',
      },
      {
        time: '13:30',
        title: 'Kasuga Taisha Shrine',
        description:
          'Shinto shrine famous for its 3,000 stone and bronze lanterns, many covered in moss. The approach through ancient forest with hanging lanterns is one of the most atmospheric walks in Japan.',
        type: 'activity',
      },
      {
        time: '15:00',
        title: 'Naramachi Old Town',
        description:
          'Preserved merchant district with traditional machiya townhouses, small museums, and craft shops. Visit the Naramachi Koshi-no-Ie for a peek inside a traditional Nara house.',
        type: 'activity',
      },
      {
        time: '16:30',
        title: 'Return to Osaka & Pack',
        description: 'Train back to Osaka. Pack for tomorrow\'s departure and enjoy a final evening stroll through Dotonbori.',
        type: 'transport',
      },
      {
        time: '19:00',
        title: 'Farewell Dinner — Kani Doraku, Dotonbori',
        description:
          'The restaurant under the giant mechanical crab sign. Full crab course: sashimi, tempura, grilled, hot pot. A splashy final meal under the neon lights of Dotonbori.',
        type: 'food',
      },
    ],
    accommodation: 'Cross Hotel Osaka',
    dailyCost: 125,
    mapImage: 'https://images.unsplash.com/photo-1624601573012-efb68f3a276b?w=800&h=600&fit=crop',
  },
]

export const promptSuggestions = [
  '10 days in Japan, cherry blossom season',
  'Weekend city break under £300',
  'Family beach holiday in August',
  '5 days exploring Iceland',
]
