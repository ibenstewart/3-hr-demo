export interface TimelineItem {
  id: string
  time: string
  type: 'flight' | 'transport' | 'hotel' | 'activity' | 'food' | 'suggestion' | 'alert'
  title: string
  description: string
  details?: Record<string, string>
  actions?: { label: string; variant: 'primary' | 'secondary' }[]
  status?: 'on-time' | 'delayed' | 'cancelled'
  icon: string
}

export interface TripDay {
  day: number
  date: string
  label: string
  items: TimelineItem[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface QuickAction {
  id: string
  icon: string
  label: string
  items: { title: string; detail: string; price?: string }[]
}

export const tripDays: TripDay[] = [
  {
    day: 1,
    date: '12 Feb 2026',
    label: 'Travel & Gothic Quarter',
    items: [
      {
        id: 'd1-flight',
        time: '09:15',
        type: 'flight',
        title: 'EZY8723 — Edinburgh → Barcelona',
        description: 'easyJet flight departing Edinburgh at 09:15, arriving Barcelona El Prat at 13:30.',
        details: {
          Terminal: 'Edinburgh T1 → Barcelona T2',
          Gate: 'B14',
          Seats: '12A & 12B',
          'Booking Ref': 'EZY-X7K9M2',
        },
        status: 'delayed',
        icon: 'Plane',
      },
      {
        id: 'd1-delay-alert',
        time: '08:45',
        type: 'alert',
        title: 'Flight Delayed — New departure 10:00',
        description:
          'EZY8723 is now departing at 10:00 (was 09:15). Late inbound aircraft from Bristol. New arrival 14:15. Your Aerobús connection still works — buses run every 5 minutes.',
        actions: [
          { label: 'View compensation rights', variant: 'secondary' },
          { label: 'Notify hotel', variant: 'primary' },
        ],
        status: 'delayed',
        icon: 'AlertTriangle',
      },
      {
        id: 'd1-transport',
        time: '14:30',
        type: 'transport',
        title: 'Aerobús to Plaça Catalunya',
        description:
          'Airport bus from T2 to Plaça Catalunya. Every 5 minutes, journey takes 35 minutes. Buy tickets from the machine at the stop or tap contactless.',
        details: {
          Price: '€6.75 each (€13.50 total)',
          Duration: '35 min',
          'Drop-off': 'Plaça Catalunya',
        },
        icon: 'Bus',
      },
      {
        id: 'd1-suggestion-transport',
        time: '14:30',
        type: 'suggestion',
        title: 'Alternative: Private Transfer',
        description:
          'A private car from El Prat takes 25 min and drops you directly at Hotel Neri. Worth considering after the flight delay — you might want the comfort.',
        details: {
          Price: '€39',
          Duration: '25 min',
          Provider: 'Welcome Pickups',
        },
        actions: [{ label: 'Book transfer', variant: 'primary' }],
        icon: 'Car',
      },
      {
        id: 'd1-hotel',
        time: '15:15',
        type: 'hotel',
        title: 'Check in — Hotel Neri',
        description:
          'Boutique hotel in a restored 18th-century palace on Plaça Sant Felip Neri, in the heart of the Gothic Quarter. Rooftop terrace with cathedral views.',
        details: {
          Address: 'Carrer de Sant Sever, 5, 08002 Barcelona',
          'Check-in': '15:00',
          'Check-out': '11:00',
          Room: 'Superior Double — 3rd floor',
          WiFi: 'HotelNeri_Guest / Welcome2026',
        },
        icon: 'Hotel',
      },
      {
        id: 'd1-activity',
        time: '16:00',
        type: 'activity',
        title: 'Gothic Quarter Walking Tour',
        description:
          'Self-guided walk through the Barri Gòtic. Start at the Cathedral of Barcelona, wander through Plaça del Rei, find the Roman temple columns on Carrer del Paradís, and end at Plaça Reial.',
        details: {
          Duration: '1.5-2 hours',
          Distance: '2.2 km',
          Highlights: 'Cathedral, Plaça del Rei, Roman Temple, Plaça Reial',
        },
        icon: 'MapPin',
      },
      {
        id: 'd1-suggestion-activity',
        time: '16:00',
        type: 'suggestion',
        title: 'Guided Gothic Quarter Tour',
        description:
          'A local guide brings the medieval streets to life — Roman walls, Jewish quarter, legends of the cathedral. 2 hours, small group (max 12 people).',
        details: {
          Price: '€22 per person',
          Provider: 'GetYourGuide',
          Duration: '2 hours',
        },
        actions: [{ label: 'Book tour', variant: 'primary' }],
        icon: 'Users',
      },
      {
        id: 'd1-food',
        time: '20:00',
        type: 'food',
        title: 'Dinner — Can Culleretes',
        description:
          "Barcelona's oldest restaurant, open since 1786. Traditional Catalan cuisine in a wonderfully old-fashioned dining room. Try the escudella (Catalan stew) and crema catalana.",
        details: {
          Address: 'Carrer d\'en Quintana, 5, 08002 Barcelona',
          'Price range': '€25-35 per person',
          'Reserve via': 'Phone +34 933 17 30 22',
          Cuisine: 'Traditional Catalan',
        },
        actions: [{ label: 'Get directions', variant: 'secondary' }],
        icon: 'UtensilsCrossed',
      },
    ],
  },
  {
    day: 2,
    date: '13 Feb 2026',
    label: 'Park Guell & Beach',
    items: [
      {
        id: 'd2-activity-1',
        time: '09:30',
        type: 'activity',
        title: 'Park Guell',
        description:
          "Gaudi's fantastical public park with mosaic terraces, gingerbread-style gatehouses, and sweeping views over Barcelona to the sea. Pre-booked timed entry.",
        details: {
          'Entry time': '09:30 slot',
          Price: '€10 per person (pre-booked)',
          Duration: '1.5-2 hours',
          'Getting there': 'Metro L3 Lesseps + 15 min walk uphill',
        },
        icon: 'Landmark',
      },
      {
        id: 'd2-food-1',
        time: '12:30',
        type: 'food',
        title: 'Lunch — La Pepita',
        description:
          'Lively spot in Gracia known for inventive tapas and craft beer. The "bikini" truffle sandwich is legendary. Covered in customer Post-it notes.',
        details: {
          Address: 'Carrer de Corsega, 343, Gracia',
          'Price range': '€15-25 per person',
        },
        icon: 'UtensilsCrossed',
      },
      {
        id: 'd2-activity-2',
        time: '15:00',
        type: 'activity',
        title: 'Barceloneta Beach',
        description:
          'Walk down from Gracia through Eixample to Barceloneta. February is too cold to swim, but the boardwalk is beautiful for a stroll. Grab a drink at a chiringuito if any are open.',
        details: {
          Duration: 'Afternoon',
          Tip: 'Walk along the seafront to Port Olimpic for great sunset views.',
        },
        icon: 'Waves',
      },
      {
        id: 'd2-food-2',
        time: '20:30',
        type: 'food',
        title: 'Dinner — La Mar Salada',
        description:
          'Seafood restaurant right by Barceloneta beach. Excellent paella, fresh grilled fish, and a solid wine list. Popular with locals — book ahead.',
        details: {
          Address: 'Passeig de Joan de Borbo, 58-59',
          'Price range': '€30-40 per person',
        },
        icon: 'UtensilsCrossed',
      },
    ],
  },
  {
    day: 3,
    date: '14 Feb 2026',
    label: 'Sagrada Familia & Tapas',
    items: [
      {
        id: 'd3-activity-1',
        time: '10:00',
        type: 'activity',
        title: 'Sagrada Familia',
        description:
          "Gaudi's unfinished masterpiece — the most-visited monument in Spain. Pre-booked tickets with tower access. The Nativity facade towers have the best views.",
        details: {
          'Entry time': '10:00 slot',
          Price: '€36 per person (with towers)',
          Duration: '2-2.5 hours',
          Tip: 'Visit the museum in the basement to see Gaudi\'s original models.',
        },
        icon: 'Church',
      },
      {
        id: 'd3-activity-2',
        time: '14:00',
        type: 'activity',
        title: 'Eixample & Casa Batllo',
        description:
          'Walk the Passeig de Gracia to see Gaudi\'s Casa Batllo and Casa Mila (La Pedrera) facades. The "Block of Discord" has three competing modernist buildings side by side.',
        details: {
          'Casa Batllo entry': '€35 per person (optional)',
          Duration: '1.5-2 hours',
        },
        icon: 'Building2',
      },
      {
        id: 'd3-food-1',
        time: '19:00',
        type: 'food',
        title: 'Tapas Crawl — El Born',
        description:
          'Valentine\'s Day tapas crawl through El Born: start with vermouth at El Xampanyet, patatas bravas at Bar del Pla, and jamón ibérico at Cal Pep.',
        details: {
          'Stop 1': 'El Xampanyet — vermouth & anchovies',
          'Stop 2': 'Bar del Pla — patatas bravas & croquetas',
          'Stop 3': 'Cal Pep — jamón & grilled prawns',
          Budget: '€40-50 per person across all three',
        },
        icon: 'UtensilsCrossed',
      },
      {
        id: 'd3-suggestion-1',
        time: '21:30',
        type: 'suggestion',
        title: "Valentine's — Rooftop Drinks",
        description:
          'It\'s Valentine\'s Day! The rooftop at Hotel Neri has views of the Gothic Quarter by night. Or try The Barcelona EDITION rooftop bar for cocktails with city views.',
        actions: [{ label: 'Reserve a table', variant: 'primary' }],
        icon: 'Heart',
      },
    ],
  },
  {
    day: 4,
    date: '15 Feb 2026',
    label: 'La Boqueria & Departure',
    items: [
      {
        id: 'd4-activity-1',
        time: '09:00',
        type: 'activity',
        title: 'La Boqueria Market',
        description:
          'Barcelona\'s famous food market on La Rambla. Go early to beat the crowds. Try fresh fruit juices, jamón, olives, and seafood. Pick up saffron and smoked paprika as souvenirs.',
        details: {
          Address: 'La Rambla, 91, 08001 Barcelona',
          Hours: '08:00-20:30 (closed Sundays)',
          Tip: 'Head to the back stalls for better prices and fewer tourists.',
        },
        icon: 'ShoppingBag',
      },
      {
        id: 'd4-hotel-checkout',
        time: '11:00',
        type: 'hotel',
        title: 'Check out — Hotel Neri',
        description: 'Check out by 11:00. They can store luggage if your flight is later.',
        icon: 'Hotel',
      },
      {
        id: 'd4-transport',
        time: '14:00',
        type: 'transport',
        title: 'Aerobús to Airport',
        description:
          'Aerobús from Plaça Catalunya to T2. Allow 35 minutes for the journey plus time for security.',
        details: {
          Price: '€6.75 each',
          'Flight departs': '17:20',
          'Recommended departure': '14:00 from Plaça Catalunya',
        },
        icon: 'Bus',
      },
      {
        id: 'd4-flight',
        time: '17:20',
        type: 'flight',
        title: 'EZY8724 — Barcelona → Edinburgh',
        description: 'easyJet return flight. Arrives Edinburgh 18:45.',
        details: {
          Terminal: 'Barcelona T2 → Edinburgh T1',
          Seats: '14A & 14B',
        },
        status: 'on-time',
        icon: 'Plane',
      },
    ],
  },
]

export const chatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'My flight is delayed — what should I know?',
    timestamp: '08:50',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      "EZY8723 is now departing at 10:00 instead of 09:15 — a 45-minute delay caused by a late inbound aircraft from Bristol. You'll land at approximately 14:15 instead of 13:30.\n\n**Good news:** This doesn't affect your plans much. The Aerobús runs every 5 minutes so there's no connection to miss, and Hotel Neri check-in isn't until 15:00 anyway.\n\n**Compensation:** Under UK261, delays under 2 hours at arrival don't qualify for compensation. But if the delay extends past 3 hours, you'd be entitled to €400 per person.\n\nI've adjusted your Day 1 timeline to reflect the new times. Want me to notify Hotel Neri about your updated arrival?",
    timestamp: '08:50',
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'What about a good restaurant for Valentine\'s Day tomorrow?',
    timestamp: '21:15',
  },
]

export const quickActions: QuickAction[] = [
  {
    id: 'transport',
    icon: 'Car',
    label: 'Transport',
    items: [
      { title: 'Aerobús (Airport)', detail: 'Every 5 min to Plaça Catalunya', price: '€6.75' },
      { title: 'Metro T-Casual', detail: '10 trips on metro/bus/tram', price: '€11.35' },
      { title: 'Taxi', detail: 'Free Now or Cabify apps', price: '€8-15 typical' },
      { title: 'Bike rental', detail: 'Donkey Republic — unlock via app', price: '€9/day' },
    ],
  },
  {
    id: 'eat',
    icon: 'UtensilsCrossed',
    label: 'Eat',
    items: [
      { title: 'Can Culleretes', detail: 'Oldest restaurant in BCN (1786), Catalan classics', price: '€25-35pp' },
      { title: 'Cal Pep', detail: 'Famous tapas bar in El Born — sit at the counter', price: '€35-45pp' },
      { title: 'La Pepita', detail: 'Creative tapas in Gracia, great craft beer', price: '€15-25pp' },
      { title: 'Cervecería Catalana', detail: 'Bustling pintxos bar in Eixample', price: '€20-30pp' },
      { title: 'La Boqueria stalls', detail: 'Market food — fresh juice, seafood, jamón', price: '€5-15' },
    ],
  },
  {
    id: 'see-and-do',
    icon: 'Camera',
    label: 'See & Do',
    items: [
      { title: 'Sagrada Família', detail: 'Pre-book timed entry + towers', price: '€36pp' },
      { title: 'Park Güell', detail: 'Timed entry required, go early', price: '€10pp' },
      { title: 'Casa Batlló', detail: 'Gaudí house museum on Passeig de Gràcia', price: '€35pp' },
      { title: 'Picasso Museum', detail: 'Free first Sunday of month', price: '€12pp' },
      { title: 'Gothic Quarter Walk', detail: 'Free — cathedral, Roman walls, Plaça Reial' },
    ],
  },
  {
    id: 'emergency',
    icon: 'Phone',
    label: 'Emergency',
    items: [
      { title: 'Emergency Services', detail: '112 (EU-wide)' },
      { title: 'UK Consulate BCN', detail: '+34 933 666 200' },
      { title: 'Hospital del Mar', detail: 'Nearest A&E — Passeig Marítim, 25-29' },
      { title: 'Pharmacy (24hr)', detail: 'Farmacia Torres — Carrer Aribau, 62' },
    ],
  },
  {
    id: 'documents',
    icon: 'FileText',
    label: 'Documents',
    items: [
      { title: 'Boarding Pass', detail: 'EZY8723 — Edinburgh → Barcelona' },
      { title: 'Hotel Confirmation', detail: 'Hotel Neri — Ref HN-2026-4471' },
      { title: 'Travel Insurance', detail: 'Policy #TI-887432' },
      { title: 'Return Boarding Pass', detail: 'EZY8724 — Barcelona → Edinburgh' },
    ],
  },
]
