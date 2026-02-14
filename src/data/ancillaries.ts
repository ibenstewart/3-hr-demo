export interface Ancillary {
  id: string
  icon: string
  title: string
  description: string
  aiReasoning: string
  price: number
  currency: 'GBP' | 'EUR'
  originalPrice?: number
  perPerson: boolean
  passengers: number
}

export interface BookingDetails {
  route: string
  date: string
  airline: string
  flightNumber: string
  departure: string
  arrival: string
  passengers: { name: string }[]
  bookingRef: string
}

export const bookingDetails: BookingDetails = {
  route: 'Edinburgh (EDI) → Barcelona (BCN)',
  date: '12 February 2026',
  airline: 'easyJet',
  flightNumber: 'EZY8723',
  departure: '09:15',
  arrival: '13:30',
  passengers: [{ name: 'Ben Stewart' }, { name: 'Sarah Stewart' }],
  bookingRef: 'EZY-X7K9M2',
}

export const ancillaries: Ancillary[] = [
  {
    id: 'seat-selection',
    icon: 'Armchair',
    title: 'Seat Selection',
    description: 'Choose seats together — Row 12, A & B (window + middle) available.',
    aiReasoning:
      "You're travelling as a pair on a 4h+ flight. Seats 12A & 12B are together near the front — you'll deplane faster for your 14:10 airport bus to the city centre.",
    price: 24,
    currency: 'GBP',
    perPerson: false,
    passengers: 2,
  },
  {
    id: 'hold-luggage',
    icon: 'Luggage',
    title: '23kg Hold Bag (x2)',
    description: 'One 23kg checked bag per passenger.',
    aiReasoning:
      "A 4-day Barcelona trip in February — you'll want layers and going-out clothes. Two hold bags means you won't have to squeeze everything into cabin bags, and you can bring wine home from La Boqueria.",
    price: 38,
    currency: 'GBP',
    perPerson: false,
    passengers: 2,
  },
  {
    id: 'lounge-access',
    icon: 'Wine',
    title: 'Aspire Lounge — Edinburgh',
    description: 'Airside lounge with hot breakfast, drinks, and Wi-Fi.',
    aiReasoning:
      "Your flight departs at 09:15, so you'll be at the airport by 07:00. The Aspire Lounge has a full Scottish breakfast and good coffee — much better than the gate area for an early start.",
    price: 28,
    currency: 'GBP',
    perPerson: true,
    passengers: 2,
  },
  {
    id: 'travel-insurance',
    icon: 'ShieldCheck',
    title: 'Travel Insurance',
    description: 'Comprehensive cover: medical, cancellation, baggage, and delays.',
    aiReasoning:
      "Spain's public healthcare is good, but repatriation costs can hit £10k+. This policy covers flight delays (your route has a 22% delay rate in Feb), lost bags, and cancellation — solid peace of mind for £18.",
    price: 18,
    currency: 'GBP',
    perPerson: false,
    passengers: 2,
  },
  {
    id: 'airport-parking',
    icon: 'Car',
    title: 'Edinburgh Airport Parking',
    description: 'Long-stay parking, 4 days. Free shuttle to terminal (5 min).',
    aiReasoning:
      "Driving from central Edinburgh? Long-stay is £32 pre-booked vs £48 on the day — saving you £16. The shuttle runs every 10 minutes and the car park has ANPR so you won't need a ticket.",
    price: 32,
    currency: 'GBP',
    originalPrice: 48,
    perPerson: false,
    passengers: 2,
  },
  {
    id: 'esim-data',
    icon: 'Smartphone',
    title: 'Europe eSIM — 5GB / 7 days',
    description: 'Instant data in Spain. No roaming charges, no SIM swapping.',
    aiReasoning:
      "Post-Brexit roaming charges are back on most UK networks. An eSIM gives you 5GB for a week at £8 — you'll want data for Google Maps in the Gothic Quarter and translating menus.",
    price: 8,
    currency: 'GBP',
    perPerson: false,
    passengers: 2,
  },
  {
    id: 'airport-transfer',
    icon: 'Bus',
    title: 'Aerobús — BCN Airport to Plaça Catalunya',
    description: 'Direct airport bus, every 5 min. 35 min to city centre.',
    aiReasoning:
      "The Aerobús is the fastest and cheapest way from El Prat to the Gothic Quarter. It drops you at Plaça Catalunya — a 7-minute walk to Hotel Neri. A taxi would be €39-45 and not much faster.",
    price: 35,
    currency: 'EUR',
    perPerson: false,
    passengers: 2,
  },
]
