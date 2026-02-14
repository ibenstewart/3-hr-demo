export interface DisruptionScenario {
  type: 'delay' | 'cancellation' | 'gate-change';
  severity: 'minor' | 'major';
  message: string;
  impact: string;
  originalFlight: FlightLeg;
  alternatives: FlightOption[];
}

export interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'focus' | 'ooo' | 'travel';
}

export interface CalendarContext {
  existingEvents: CalendarEvent[];
  extractedEvents: {
    title: string;
    date: string;
    suggestedTime: string;
  }[];
  conflicts: {
    event: string;
    conflictReason: string;
  }[];
}

export interface ComparisonData {
  priceRank: 1 | 2 | 3;
  timeRank: 1 | 2 | 3;
  flexRank: 1 | 2 | 3;
  riskScore: 'low' | 'medium' | 'high';
  riskReason: string;
}

export interface FlightOption {
  id: string;
  type: 'budget' | 'fastest' | 'flexible';
  label: string;
  tagline: string;
  price: number;
  currency: string;
  outbound: FlightLeg;
  inbound: FlightLeg;
  reasoning: string[];
  tradeoffs: string;
  comparisonData: ComparisonData;
  whyNot?: string;
}

export interface FlightLeg {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departure: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    code: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
}

export interface HotelOption {
  id: string;
  name: string;
  chain: string;
  chainLogo: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  nights: number;
  totalPrice: number;
  location: string;
  distanceFromOffice: string;
  checkIn: string;
  checkOut: string;
  reasoning: string[];
  amenities: string[];
}

export interface TripScenario {
  id: string;
  query: {
    short: string;
    full: string;
  };
  parsedIntent: {
    destination: string;
    destinationCode: string;
    origin: string;
    originCode: string;
    outboundDate: string;
    returnDate: string;
    budget: string;
    tripPurpose: string;
  };
  thinkingSteps: { id: number; text: string }[];
  flightOptions: FlightOption[];
  hotel: HotelOption | null; // null for day trips
  alternativeHotels: HotelOption[]; // other approved hotel options
  resultsHeader: {
    title: string;
    subtitle: string;
  };
  calendarContext: CalendarContext;
  // Multi-city support
  isMultiCity?: boolean;
  legs?: MultiCityLeg[];
}

export interface MultiCityLeg {
  id: string;
  label: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  date: string;
  flightOptions: FlightOption[];
  hotel: HotelOption | null;
}

// ============ BERLIN SCENARIO ============
const berlinScenario: TripScenario = {
  id: 'berlin',
  query: {
    short: "Berlin, Tue-Thu",
    full: "I need to visit our Berlin office next Tuesday, back Thursday evening. Keep it under £400 if possible.",
  },
  parsedIntent: {
    destination: 'Berlin',
    destinationCode: 'BER',
    origin: 'London',
    originCode: 'LHR/LGW',
    outboundDate: 'Tuesday 28 January',
    returnDate: 'Thursday 30 January evening',
    budget: '£400',
    tripPurpose: 'Office visit',
  },
  thinkingSteps: [
    { id: 1, text: 'Understanding your request' },
    { id: 2, text: 'Resolving Berlin → BER' },
    { id: 3, text: 'Tue 28 Jan → Thu 30 Jan (2 nights)' },
    { id: 4, text: 'Searching flights' },
    { id: 5, text: 'Checking approved hotels near office' },
    { id: 6, text: 'Curating best options' },
  ],
  resultsHeader: {
    title: '3 flight options for London → Berlin',
    subtitle: 'Tue 28 Jan – Thu 30 Jan · 2 nights · Budget: £400',
  },
  calendarContext: {
    existingEvents: [
      { title: 'Team standup', date: 'Tue 28 Jan', time: '09:00', type: 'meeting' },
      { title: 'Sprint planning', date: 'Tue 28 Jan', time: '14:00', type: 'meeting' },
      { title: '1:1 with Sarah', date: 'Wed 29 Jan', time: '10:00', type: 'meeting' },
      { title: 'Deep work block', date: 'Thu 30 Jan', time: '09:00', type: 'focus' },
    ],
    extractedEvents: [
      { title: 'Berlin office visit', date: 'Tue 28 Jan – Thu 30 Jan', suggestedTime: 'All day' },
    ],
    conflicts: [
      { event: 'Team standup (Tue 9am)', conflictReason: 'You\'ll be traveling — can attend remotely from airport' },
      { event: 'Sprint planning (Tue 2pm)', conflictReason: 'You should be at BER office by then' },
    ],
  },
  hotel: {
    id: 'berlin-hotel',
    name: 'Premier Inn Berlin Alexanderplatz',
    chain: 'Premier Inn',
    chainLogo: '🟣',
    stars: 3,
    pricePerNight: 78,
    currency: '£',
    nights: 2,
    totalPrice: 156,
    location: 'Alexanderplatz, Berlin Mitte',
    distanceFromOffice: '0.4km from Acme Berlin office',
    checkIn: 'Tue 28 Jan',
    checkOut: 'Thu 30 Jan',
    reasoning: [
      'On company approved hotel list',
      'Closest approved hotel to Berlin office (0.4km walk)',
      '£78/night is well within £120 policy limit',
      'Includes breakfast — saves on expenses',
    ],
    amenities: ['Free WiFi', 'Breakfast included', '24hr reception'],
  },
  alternativeHotels: [
    {
      id: 'berlin-hotel-alt1',
      name: 'Holiday Inn Berlin Mitte',
      chain: 'Holiday Inn',
      chainLogo: '🟢',
      stars: 3,
      pricePerNight: 92,
      currency: '£',
      nights: 2,
      totalPrice: 184,
      location: 'Friedrichstraße, Berlin Mitte',
      distanceFromOffice: '0.8km from Acme Berlin office',
      checkIn: 'Tue 28 Jan',
      checkOut: 'Thu 30 Jan',
      reasoning: [
        'On company approved hotel list',
        'Great transport links (U-Bahn 2 min walk)',
        '£92/night within £120 policy limit',
        'IHG rewards points for your account',
      ],
      amenities: ['Free WiFi', 'Fitness center', 'Restaurant'],
    },
    {
      id: 'berlin-hotel-alt2',
      name: 'Marriott Berlin',
      chain: 'Marriott',
      chainLogo: '🔴',
      stars: 4,
      pricePerNight: 115,
      currency: '£',
      nights: 2,
      totalPrice: 230,
      location: 'Potsdamer Platz, Berlin',
      distanceFromOffice: '1.2km from Acme Berlin office',
      checkIn: 'Tue 28 Jan',
      checkOut: 'Thu 30 Jan',
      reasoning: [
        'On company approved hotel list',
        'Premium 4-star accommodation',
        '£115/night within £120 policy limit',
        'Executive lounge access included',
      ],
      amenities: ['Free WiFi', 'Executive lounge', 'Spa', 'Restaurant'],
    },
  ],
  flightOptions: [
    {
      id: 'berlin-budget',
      type: 'budget',
      label: 'Budget Pick',
      tagline: 'Best value within your £400 budget',
      price: 187,
      currency: '£',
      outbound: {
        airline: 'easyJet',
        airlineLogo: '🟠',
        flightNumber: 'U2 8542',
        departure: { airport: 'London Gatwick', code: 'LGW', time: '06:45', date: 'Tue 28 Jan' },
        arrival: { airport: 'Berlin Brandenburg', code: 'BER', time: '09:35', date: 'Tue 28 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      inbound: {
        airline: 'easyJet',
        airlineLogo: '🟠',
        flightNumber: 'U2 8543',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '18:20', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Gatwick', code: 'LGW', time: '19:10', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      reasoning: [
        'Lowest flight cost at £187',
        'Early arrival gets you to the Berlin office by 10am',
        'Evening return gives you a full working day Thursday',
        'Direct flights both ways — no connection risk',
      ],
      tradeoffs: 'Early 6:45am departure means a very early start. Gatwick may require more travel time from central London.',
      comparisonData: {
        priceRank: 1,
        timeRank: 3,
        flexRank: 3,
        riskScore: 'low',
        riskReason: 'Direct flights, reliable airline',
      },
      whyNot: 'Very early 6:45am departure requires 4am wake-up',
    },
    {
      id: 'berlin-fastest',
      type: 'fastest',
      label: 'Fastest Route',
      tagline: 'Optimised for your time',
      price: 294,
      currency: '£',
      outbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 984',
        departure: { airport: 'London Heathrow', code: 'LHR', time: '09:15', date: 'Tue 28 Jan' },
        arrival: { airport: 'Berlin Brandenburg', code: 'BER', time: '12:05', date: 'Tue 28 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      inbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 985',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '19:45', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '20:35', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      reasoning: [
        'Civilised 9:15am departure — no 5am alarms',
        'Heathrow is well-connected from most of London',
        'BA flights include cabin bag + hold luggage',
        'Latest possible evening return maximises time in Berlin',
      ],
      tradeoffs: '£107 more than budget option. Arrival at office will be afternoon rather than morning.',
      comparisonData: {
        priceRank: 2,
        timeRank: 1,
        flexRank: 2,
        riskScore: 'low',
        riskReason: 'BA has excellent on-time performance',
      },
      whyNot: '£107 more expensive than budget option',
    },
    {
      id: 'berlin-flexible',
      type: 'flexible',
      label: 'Most Flexible',
      tagline: 'Free changes if plans shift',
      price: 378,
      currency: '£',
      outbound: {
        airline: 'Lufthansa',
        airlineLogo: '🟡',
        flightNumber: 'LH 917',
        departure: { airport: 'London Heathrow', code: 'LHR', time: '08:00', date: 'Tue 28 Jan' },
        arrival: { airport: 'Berlin Brandenburg', code: 'BER', time: '10:50', date: 'Tue 28 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      inbound: {
        airline: 'Lufthansa',
        airlineLogo: '🟡',
        flightNumber: 'LH 918',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '17:30', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '18:20', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      reasoning: [
        'Flex fare allows free date/time changes up to 24h before departure',
        'Good balance of morning arrival and reasonable departure time',
        'Star Alliance frequent flyer miles if you have status',
        'Leaves budget headroom for expenses',
      ],
      tradeoffs: 'Premium for flexibility may not be needed if trip dates are certain. Earlier return means leaving Berlin mid-afternoon.',
      comparisonData: {
        priceRank: 3,
        timeRank: 2,
        flexRank: 1,
        riskScore: 'low',
        riskReason: 'Lufthansa very reliable, plus free rebooking',
      },
      whyNot: '£191 premium for flexibility you may not need',
    },
  ],
};

// ============ NYC SCENARIO ============
const nycScenario: TripScenario = {
  id: 'nyc',
  query: {
    short: "NYC next week",
    full: "NYC for a client meeting next week, flexible on dates. Business class if under £2000.",
  },
  parsedIntent: {
    destination: 'New York',
    destinationCode: 'JFK',
    origin: 'London',
    originCode: 'LHR',
    outboundDate: 'Monday 3 February',
    returnDate: 'Wednesday 5 February',
    budget: '£2,000',
    tripPurpose: 'Client meeting',
  },
  thinkingSteps: [
    { id: 1, text: 'Understanding your request' },
    { id: 2, text: 'Resolving NYC → JFK/EWR/LGA' },
    { id: 3, text: 'Mon 3 Feb → Wed 5 Feb (2 nights)' },
    { id: 4, text: 'Searching business class fares' },
    { id: 5, text: 'Checking approved hotels in Manhattan' },
    { id: 6, text: 'Curating best options' },
  ],
  resultsHeader: {
    title: '3 flight options for London → New York',
    subtitle: 'Mon 3 Feb – Wed 5 Feb · 2 nights · Budget: £2,000',
  },
  calendarContext: {
    existingEvents: [
      { title: 'Weekly sync', date: 'Mon 3 Feb', time: '10:00', type: 'meeting' },
      { title: 'Client prep call', date: 'Mon 3 Feb', time: '15:00', type: 'meeting' },
      { title: 'Board update due', date: 'Wed 5 Feb', time: '17:00', type: 'focus' },
    ],
    extractedEvents: [
      { title: 'Client meeting (NYC)', date: 'Tue 4 Feb', suggestedTime: '10:00 - 16:00' },
    ],
    conflicts: [
      { event: 'Weekly sync (Mon 10am)', conflictReason: 'You\'ll be mid-flight — needs rescheduling' },
    ],
  },
  hotel: {
    id: 'nyc-hotel',
    name: 'Hilton Midtown Manhattan',
    chain: 'Hilton',
    chainLogo: '🔷',
    stars: 4,
    pricePerNight: 195,
    currency: '£',
    nights: 2,
    totalPrice: 390,
    location: '6th Avenue, Midtown Manhattan',
    distanceFromOffice: '10 min walk to client office',
    checkIn: 'Mon 3 Feb',
    checkOut: 'Wed 5 Feb',
    reasoning: [
      'On company approved hotel list (Hilton corporate rate)',
      'Midtown location ideal for client meetings',
      '£195/night within £250 NYC policy limit',
      'Hilton Honors points for your account',
    ],
    amenities: ['Free WiFi', 'Fitness center', 'Business center', 'Concierge'],
  },
  alternativeHotels: [
    {
      id: 'nyc-hotel-alt1',
      name: 'Marriott Marquis Times Square',
      chain: 'Marriott',
      chainLogo: '🔴',
      stars: 4,
      pricePerNight: 220,
      currency: '£',
      nights: 2,
      totalPrice: 440,
      location: 'Times Square, Manhattan',
      distanceFromOffice: '15 min walk to client office',
      checkIn: 'Mon 3 Feb',
      checkOut: 'Wed 5 Feb',
      reasoning: [
        'On company approved hotel list',
        'Iconic Times Square location',
        '£220/night within £250 NYC policy limit',
        'Marriott Bonvoy points for your account',
      ],
      amenities: ['Free WiFi', 'Rooftop bar', 'Fitness center', 'Restaurant'],
    },
    {
      id: 'nyc-hotel-alt2',
      name: 'The Langham Fifth Avenue',
      chain: 'Langham',
      chainLogo: '🟤',
      stars: 5,
      pricePerNight: 245,
      currency: '£',
      nights: 2,
      totalPrice: 490,
      location: 'Fifth Avenue, Midtown',
      distanceFromOffice: '8 min walk to client office',
      checkIn: 'Mon 3 Feb',
      checkOut: 'Wed 5 Feb',
      reasoning: [
        'Premium 5-star for important client meetings',
        'Closest to client office location',
        '£245/night just within £250 NYC policy limit',
        'Exceptional service for business travelers',
      ],
      amenities: ['Free WiFi', 'Spa', 'Fine dining', 'Butler service'],
    },
  ],
  flightOptions: [
    {
      id: 'nyc-budget',
      type: 'budget',
      label: 'Budget Pick',
      tagline: 'Best value business class',
      price: 1420,
      currency: '£',
      outbound: {
        airline: 'Virgin Atlantic',
        airlineLogo: '🔴',
        flightNumber: 'VS 3',
        departure: { airport: 'London Heathrow', code: 'LHR', time: '09:30', date: 'Mon 3 Feb' },
        arrival: { airport: 'New York JFK', code: 'JFK', time: '12:25', date: 'Mon 3 Feb' },
        duration: '7h 55m',
        stops: 0,
      },
      inbound: {
        airline: 'Virgin Atlantic',
        airlineLogo: '🔴',
        flightNumber: 'VS 10',
        departure: { airport: 'New York JFK', code: 'JFK', time: '19:00', date: 'Wed 5 Feb' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '07:05', date: 'Thu 6 Feb' },
        duration: '7h 05m',
        stops: 0,
      },
      reasoning: [
        'Lowest business class fare at £1,420',
        'Morning departure, arrives NYC lunch time local',
        'Virgin Upper Class includes lounge access + flat bed',
        'Red-eye return maximises time in NYC',
      ],
      tradeoffs: 'JFK is further from Manhattan than Newark. Red-eye return means arriving tired next day.',
      comparisonData: {
        priceRank: 1,
        timeRank: 2,
        flexRank: 3,
        riskScore: 'medium',
        riskReason: 'Red-eye return can affect next-day productivity',
      },
      whyNot: 'Red-eye return means arriving tired Thursday morning',
    },
    {
      id: 'nyc-fastest',
      type: 'fastest',
      label: 'Best Schedule',
      tagline: 'Optimised for productivity',
      price: 1815,
      currency: '£',
      outbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 117',
        departure: { airport: 'London Heathrow', code: 'LHR', time: '08:25', date: 'Mon 3 Feb' },
        arrival: { airport: 'New York JFK', code: 'JFK', time: '11:25', date: 'Mon 3 Feb' },
        duration: '8h 00m',
        stops: 0,
      },
      inbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 178',
        departure: { airport: 'New York JFK', code: 'JFK', time: '22:00', date: 'Wed 5 Feb' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '10:00', date: 'Thu 6 Feb' },
        duration: '7h 00m',
        stops: 0,
      },
      reasoning: [
        'Earliest arrival gives you afternoon for meetings',
        'BA Club World has excellent flat-bed seats',
        'Same airline both ways simplifies logistics',
        'Late departure gives full working day Wednesday',
      ],
      tradeoffs: '£395 more than budget option. Early morning start from London.',
      comparisonData: {
        priceRank: 2,
        timeRank: 1,
        flexRank: 2,
        riskScore: 'low',
        riskReason: 'BA consistently on-time on this route',
      },
      whyNot: '£395 more than budget — worth it for better schedule',
    },
    {
      id: 'nyc-flexible',
      type: 'flexible',
      label: 'Most Flexible',
      tagline: 'Free changes + cancellation',
      price: 1980,
      currency: '£',
      outbound: {
        airline: 'American Airlines',
        airlineLogo: '🔶',
        flightNumber: 'AA 107',
        departure: { airport: 'London Heathrow', code: 'LHR', time: '10:40', date: 'Mon 3 Feb' },
        arrival: { airport: 'New York JFK', code: 'JFK', time: '13:50', date: 'Mon 3 Feb' },
        duration: '8h 10m',
        stops: 0,
      },
      inbound: {
        airline: 'American Airlines',
        airlineLogo: '🔶',
        flightNumber: 'AA 100',
        departure: { airport: 'New York JFK', code: 'JFK', time: '18:30', date: 'Wed 5 Feb' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '06:20', date: 'Thu 6 Feb' },
        duration: '6h 50m',
        stops: 0,
      },
      reasoning: [
        'Fully flexible ticket — free date changes anytime',
        'Cancel for full refund up to departure',
        'American Flagship Business has great reviews',
        'Just under your £2,000 flight budget',
      ],
      tradeoffs: 'Premium for flexibility may not be needed if dates are locked. £560 more than budget option.',
      comparisonData: {
        priceRank: 3,
        timeRank: 3,
        flexRank: 1,
        riskScore: 'low',
        riskReason: 'Full refund option eliminates financial risk',
      },
      whyNot: '£560 premium for flexibility you may not need',
    },
  ],
};

// ============ PARIS SCENARIO (Day trip - no hotel) ============
const parisScenario: TripScenario = {
  id: 'paris',
  query: {
    short: "Paris day trip",
    full: "Quick Paris trip tomorrow, back same day. Need to be there for a 2pm meeting.",
  },
  parsedIntent: {
    destination: 'Paris',
    destinationCode: 'CDG',
    origin: 'London',
    originCode: 'LHR/STP',
    outboundDate: 'Tomorrow (Wed 29 Jan)',
    returnDate: 'Same day evening',
    budget: '£400',
    tripPurpose: 'Day meeting',
  },
  thinkingSteps: [
    { id: 1, text: 'Understanding your request' },
    { id: 2, text: 'Resolving Paris → CDG/ORY' },
    { id: 3, text: 'Same-day return (no hotel needed)' },
    { id: 4, text: 'Must arrive before 2pm' },
    { id: 5, text: 'Including Eurostar options' },
    { id: 6, text: 'Curating best options' },
  ],
  resultsHeader: {
    title: '3 options for London → Paris',
    subtitle: 'Wed 29 Jan (day trip) · Meeting at 2pm',
  },
  calendarContext: {
    existingEvents: [
      { title: 'Design review', date: 'Wed 29 Jan', time: '09:00', type: 'meeting' },
      { title: 'Lunch with Alex', date: 'Wed 29 Jan', time: '12:30', type: 'meeting' },
    ],
    extractedEvents: [
      { title: 'Paris meeting', date: 'Wed 29 Jan', suggestedTime: '14:00' },
    ],
    conflicts: [
      { event: 'Lunch with Alex (12:30)', conflictReason: 'You\'ll be traveling — needs rescheduling' },
    ],
  },
  hotel: null, // Day trip - no hotel needed
  alternativeHotels: [], // Day trip - no hotels
  flightOptions: [
    {
      id: 'paris-budget',
      type: 'budget',
      label: 'Budget Pick',
      tagline: 'Eurostar — city to city',
      price: 178,
      currency: '£',
      outbound: {
        airline: 'Eurostar',
        airlineLogo: '🚄',
        flightNumber: 'ES 9014',
        departure: { airport: 'London St Pancras', code: 'STP', time: '08:31', date: 'Wed 29 Jan' },
        arrival: { airport: 'Paris Gare du Nord', code: 'GDN', time: '11:47', date: 'Wed 29 Jan' },
        duration: '2h 16m',
        stops: 0,
      },
      inbound: {
        airline: 'Eurostar',
        airlineLogo: '🚄',
        flightNumber: 'ES 9051',
        departure: { airport: 'Paris Gare du Nord', code: 'GDN', time: '20:01', date: 'Wed 29 Jan' },
        arrival: { airport: 'London St Pancras', code: 'STP', time: '21:30', date: 'Wed 29 Jan' },
        duration: '2h 29m',
        stops: 0,
      },
      reasoning: [
        'Best value at £178 return',
        'Arrives central Paris 11:47 — plenty of time for 2pm',
        'No airport security — station to station',
        'Evening return gets you home by 9:30pm',
      ],
      tradeoffs: 'Train is relaxing but no air miles. Gare du Nord can be hectic.',
      comparisonData: {
        priceRank: 1,
        timeRank: 2,
        flexRank: 3,
        riskScore: 'low',
        riskReason: 'Eurostar very reliable, no weather delays',
      },
      whyNot: 'No air miles, train takes longer than flight',
    },
    {
      id: 'paris-fastest',
      type: 'fastest',
      label: 'Latest Departure',
      tagline: 'Maximise your morning',
      price: 245,
      currency: '£',
      outbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 304',
        departure: { airport: 'London Heathrow', code: 'LHR', time: '10:10', date: 'Wed 29 Jan' },
        arrival: { airport: 'Paris CDG', code: 'CDG', time: '12:25', date: 'Wed 29 Jan' },
        duration: '1h 15m',
        stops: 0,
      },
      inbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 331',
        departure: { airport: 'Paris CDG', code: 'CDG', time: '21:15', date: 'Wed 29 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '21:35', date: 'Wed 29 Jan' },
        duration: '1h 20m',
        stops: 0,
      },
      reasoning: [
        'Leave at 10am — work the morning from London',
        '1h 15m flight time is quick',
        'Arrives 12:25, taxi to meeting by 1:30pm',
        'Late 9:15pm return flight',
      ],
      tradeoffs: 'CDG is 45min from central Paris. Need to factor in airport time both ends.',
      comparisonData: {
        priceRank: 2,
        timeRank: 1,
        flexRank: 2,
        riskScore: 'medium',
        riskReason: 'CDG transfer adds 45min + potential traffic',
      },
      whyNot: 'CDG is 45min from central Paris — tight for 2pm meeting',
    },
    {
      id: 'paris-flexible',
      type: 'flexible',
      label: 'Business Premier',
      tagline: 'Eurostar lounge + flexibility',
      price: 345,
      currency: '£',
      outbound: {
        airline: 'Eurostar',
        airlineLogo: '🚄',
        flightNumber: 'ES 9018',
        departure: { airport: 'London St Pancras', code: 'STP', time: '09:31', date: 'Wed 29 Jan' },
        arrival: { airport: 'Paris Gare du Nord', code: 'GDN', time: '12:47', date: 'Wed 29 Jan' },
        duration: '2h 16m',
        stops: 0,
      },
      inbound: {
        airline: 'Eurostar',
        airlineLogo: '🚄',
        flightNumber: 'ES 9057',
        departure: { airport: 'Paris Gare du Nord', code: 'GDN', time: '21:01', date: 'Wed 29 Jan' },
        arrival: { airport: 'London St Pancras', code: 'STP', time: '22:30', date: 'Wed 29 Jan' },
        duration: '2h 29m',
        stops: 0,
      },
      reasoning: [
        'Business Premier includes lounge access + meal',
        'Fully flexible — swap to any train same day',
        'Later departure lets you ease into the day',
        'Still arrives with 1hr buffer before 2pm',
      ],
      tradeoffs: '£167 premium over standard. Flexibility may not be needed for a fixed meeting.',
      comparisonData: {
        priceRank: 3,
        timeRank: 3,
        flexRank: 1,
        riskScore: 'low',
        riskReason: 'Same-day flexibility eliminates schedule risk',
      },
      whyNot: '£167 premium for flexibility on a fixed meeting',
    },
  ],
};

// ============ MULTI-CITY SCENARIO ============
const multiCityScenario: TripScenario = {
  id: 'multi-city',
  query: {
    short: "London → Berlin → Paris → London",
    full: "London to Berlin Tuesday, Berlin to Paris Thursday, Paris back to London Friday",
  },
  parsedIntent: {
    destination: 'Berlin, Paris',
    destinationCode: 'BER, CDG',
    origin: 'London',
    originCode: 'LHR',
    outboundDate: 'Tuesday 28 January',
    returnDate: 'Friday 31 January',
    budget: '£800',
    tripPurpose: 'Multi-city business trip',
  },
  thinkingSteps: [
    { id: 1, text: 'Understanding your multi-city request' },
    { id: 2, text: 'Leg 1: London → Berlin (Tue 28 Jan)' },
    { id: 3, text: 'Leg 2: Berlin → Paris (Thu 30 Jan)' },
    { id: 4, text: 'Leg 3: Paris → London (Fri 31 Jan)' },
    { id: 5, text: 'Finding hotels in Berlin (1 night) and Paris (1 night)' },
    { id: 6, text: 'Curating best options per leg' },
  ],
  resultsHeader: {
    title: 'Multi-city trip: 3 legs',
    subtitle: 'Tue 28 Jan – Fri 31 Jan · 2 hotel nights · Budget: £800',
  },
  calendarContext: {
    existingEvents: [
      { title: 'Berlin meetings', date: 'Tue 28 - Wed 29 Jan', time: 'All day', type: 'meeting' },
      { title: 'Paris meetings', date: 'Thu 30 Jan', time: 'All day', type: 'meeting' },
    ],
    extractedEvents: [
      { title: 'Multi-city business trip', date: 'Tue 28 - Fri 31 Jan', suggestedTime: 'All day' },
    ],
    conflicts: [],
  },
  flightOptions: [], // Not used for multi-city - see legs
  hotel: null, // Not used for multi-city - see legs
  alternativeHotels: [],
  isMultiCity: true,
  legs: [
    {
      id: 'leg-1',
      label: 'Leg 1: London → Berlin',
      origin: 'London',
      originCode: 'LHR',
      destination: 'Berlin',
      destinationCode: 'BER',
      date: 'Tue 28 Jan',
      flightOptions: [
        {
          id: 'leg1-budget',
          type: 'budget',
          label: 'Budget',
          tagline: 'Best value',
          price: 89,
          currency: '£',
          outbound: {
            airline: 'easyJet',
            airlineLogo: '🟠',
            flightNumber: 'U2 8542',
            departure: { airport: 'London Gatwick', code: 'LGW', time: '07:00', date: 'Tue 28 Jan' },
            arrival: { airport: 'Berlin Brandenburg', code: 'BER', time: '09:50', date: 'Tue 28 Jan' },
            duration: '1h 50m',
            stops: 0,
          },
          inbound: { airline: '', airlineLogo: '', flightNumber: '', departure: { airport: '', code: '', time: '', date: '' }, arrival: { airport: '', code: '', time: '', date: '' }, duration: '', stops: 0 },
          reasoning: ['Lowest cost at £89', 'Arrives Berlin by 10am'],
          tradeoffs: 'Early departure from Gatwick',
          comparisonData: { priceRank: 1, timeRank: 2, flexRank: 3, riskScore: 'low', riskReason: 'Direct flight' },
        },
        {
          id: 'leg1-fastest',
          type: 'fastest',
          label: 'Fastest',
          tagline: 'Best schedule',
          price: 145,
          currency: '£',
          outbound: {
            airline: 'British Airways',
            airlineLogo: '🔵',
            flightNumber: 'BA 984',
            departure: { airport: 'London Heathrow', code: 'LHR', time: '09:15', date: 'Tue 28 Jan' },
            arrival: { airport: 'Berlin Brandenburg', code: 'BER', time: '12:05', date: 'Tue 28 Jan' },
            duration: '1h 50m',
            stops: 0,
          },
          inbound: { airline: '', airlineLogo: '', flightNumber: '', departure: { airport: '', code: '', time: '', date: '' }, arrival: { airport: '', code: '', time: '', date: '' }, duration: '', stops: 0 },
          reasoning: ['Civilised 9am departure', 'Heathrow is convenient'],
          tradeoffs: '£56 more than budget',
          comparisonData: { priceRank: 2, timeRank: 1, flexRank: 2, riskScore: 'low', riskReason: 'BA very reliable' },
        },
      ],
      hotel: {
        id: 'berlin-hotel-mc',
        name: 'Premier Inn Berlin',
        chain: 'Premier Inn',
        chainLogo: '🟣',
        stars: 3,
        pricePerNight: 78,
        currency: '£',
        nights: 2,
        totalPrice: 156,
        location: 'Alexanderplatz',
        distanceFromOffice: '0.4km from office',
        checkIn: 'Tue 28 Jan',
        checkOut: 'Thu 30 Jan',
        reasoning: ['Company approved', 'Near office'],
        amenities: ['WiFi', 'Breakfast'],
      },
    },
    {
      id: 'leg-2',
      label: 'Leg 2: Berlin → Paris',
      origin: 'Berlin',
      originCode: 'BER',
      destination: 'Paris',
      destinationCode: 'CDG',
      date: 'Thu 30 Jan',
      flightOptions: [
        {
          id: 'leg2-budget',
          type: 'budget',
          label: 'Budget',
          tagline: 'Best value',
          price: 95,
          currency: '£',
          outbound: {
            airline: 'easyJet',
            airlineLogo: '🟠',
            flightNumber: 'U2 4582',
            departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '08:30', date: 'Thu 30 Jan' },
            arrival: { airport: 'Paris CDG', code: 'CDG', time: '10:20', date: 'Thu 30 Jan' },
            duration: '1h 50m',
            stops: 0,
          },
          inbound: { airline: '', airlineLogo: '', flightNumber: '', departure: { airport: '', code: '', time: '', date: '' }, arrival: { airport: '', code: '', time: '', date: '' }, duration: '', stops: 0 },
          reasoning: ['Best value at £95', 'Arrives Paris by 10:30am'],
          tradeoffs: 'Early departure',
          comparisonData: { priceRank: 1, timeRank: 2, flexRank: 3, riskScore: 'low', riskReason: 'Direct flight' },
        },
        {
          id: 'leg2-fastest',
          type: 'fastest',
          label: 'Fastest',
          tagline: 'Later departure',
          price: 165,
          currency: '£',
          outbound: {
            airline: 'Air France',
            airlineLogo: '🔵',
            flightNumber: 'AF 1035',
            departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '11:00', date: 'Thu 30 Jan' },
            arrival: { airport: 'Paris CDG', code: 'CDG', time: '12:50', date: 'Thu 30 Jan' },
            duration: '1h 50m',
            stops: 0,
          },
          inbound: { airline: '', airlineLogo: '', flightNumber: '', departure: { airport: '', code: '', time: '', date: '' }, arrival: { airport: '', code: '', time: '', date: '' }, duration: '', stops: 0 },
          reasoning: ['More reasonable departure', 'Air France quality'],
          tradeoffs: '£70 more than budget',
          comparisonData: { priceRank: 2, timeRank: 1, flexRank: 2, riskScore: 'low', riskReason: 'Air France reliable' },
        },
      ],
      hotel: {
        id: 'paris-hotel-mc',
        name: 'Novotel Paris',
        chain: 'Novotel',
        chainLogo: '🔵',
        stars: 4,
        pricePerNight: 120,
        currency: '£',
        nights: 1,
        totalPrice: 120,
        location: 'La Défense',
        distanceFromOffice: '10 min to office',
        checkIn: 'Thu 30 Jan',
        checkOut: 'Fri 31 Jan',
        reasoning: ['Company approved', 'Business district'],
        amenities: ['WiFi', 'Gym'],
      },
    },
    {
      id: 'leg-3',
      label: 'Leg 3: Paris → London',
      origin: 'Paris',
      originCode: 'CDG',
      destination: 'London',
      destinationCode: 'LHR',
      date: 'Fri 31 Jan',
      flightOptions: [
        {
          id: 'leg3-budget',
          type: 'budget',
          label: 'Budget',
          tagline: 'Eurostar value',
          price: 89,
          currency: '£',
          outbound: {
            airline: 'Eurostar',
            airlineLogo: '🚄',
            flightNumber: 'ES 9040',
            departure: { airport: 'Paris Gare du Nord', code: 'GDN', time: '17:01', date: 'Fri 31 Jan' },
            arrival: { airport: 'London St Pancras', code: 'STP', time: '18:30', date: 'Fri 31 Jan' },
            duration: '2h 29m',
            stops: 0,
          },
          inbound: { airline: '', airlineLogo: '', flightNumber: '', departure: { airport: '', code: '', time: '', date: '' }, arrival: { airport: '', code: '', time: '', date: '' }, duration: '', stops: 0 },
          reasoning: ['Best value at £89', 'City center to center'],
          tradeoffs: 'Train takes longer than flight',
          comparisonData: { priceRank: 1, timeRank: 2, flexRank: 2, riskScore: 'low', riskReason: 'Eurostar very reliable' },
        },
        {
          id: 'leg3-fastest',
          type: 'fastest',
          label: 'Fastest',
          tagline: 'Quick flight home',
          price: 125,
          currency: '£',
          outbound: {
            airline: 'British Airways',
            airlineLogo: '🔵',
            flightNumber: 'BA 331',
            departure: { airport: 'Paris CDG', code: 'CDG', time: '18:30', date: 'Fri 31 Jan' },
            arrival: { airport: 'London Heathrow', code: 'LHR', time: '18:50', date: 'Fri 31 Jan' },
            duration: '1h 20m',
            stops: 0,
          },
          inbound: { airline: '', airlineLogo: '', flightNumber: '', departure: { airport: '', code: '', time: '', date: '' }, arrival: { airport: '', code: '', time: '', date: '' }, duration: '', stops: 0 },
          reasoning: ['Quick 1h 20m flight', 'Home by 7pm'],
          tradeoffs: '£36 more, need to get to CDG',
          comparisonData: { priceRank: 2, timeRank: 1, flexRank: 2, riskScore: 'low', riskReason: 'BA reliable' },
        },
      ],
      hotel: null, // Returning home
    },
  ],
};

// ============ EXPORTS ============
export const tripScenarios: TripScenario[] = [berlinScenario, nycScenario, parisScenario, multiCityScenario];

export const getScenarioByQuery = (query: string): TripScenario => {
  const lowerQuery = query.toLowerCase();
  // Check for multi-city (multiple arrows or "then")
  const arrowCount = (query.match(/→/g) || []).length;
  if (arrowCount >= 2 || (lowerQuery.includes('berlin') && lowerQuery.includes('paris'))) {
    return multiCityScenario;
  }
  if (lowerQuery.includes('nyc') || lowerQuery.includes('new york')) {
    return nycScenario;
  }
  if (lowerQuery.includes('paris')) {
    return parisScenario;
  }
  return berlinScenario; // default
};

export const exampleQueries = tripScenarios.map(s => s.query);

export const companyContext = {
  name: 'Acme Corp',
  avatar: 'A',
  policy: {
    budgetPerTrip: '£400',
    approvalRequired: 'Manager approval for all trips',
    preferredAirlines: ['BA', 'Lufthansa', 'easyJet', 'Virgin Atlantic'],
    approvedHotels: ['Premier Inn', 'Holiday Inn', 'Hilton', 'Marriott'],
    maxHotelPerNight: '£120 (UK/EU), £250 (US)',
  },
  approver: {
    name: 'Sarah Chen',
    title: 'Engineering Manager',
    avatar: 'SC',
  },
};

export const bookingSteps = [
  { id: 1, text: 'Opening Trip.com...' },
  { id: 2, text: 'Selecting your flights...' },
  { id: 3, text: 'Adding hotel reservation...' },
  { id: 4, text: 'Entering traveler details...' },
  { id: 5, text: 'Applying company payment...' },
  { id: 6, text: 'Confirming booking...' },
];

export const bookingConfirmation = {
  reference: 'TC-7829401',
  email: 'ben@acme.com',
  calendarAdded: true,
};

// ============ RECENT TRIPS ============
export interface RecentTrip {
  id: string;
  destination: string;
  destinationCode: string;
  dates: string;
  totalCost: number;
  currency: string;
  status: 'completed' | 'upcoming';
  flightAirline: string;
  hotel?: string;
}

export const recentTrips: RecentTrip[] = [
  {
    id: 'recent-1',
    destination: 'Berlin',
    destinationCode: 'BER',
    dates: '15-17 Jan',
    totalCost: 343,
    currency: '£',
    status: 'completed',
    flightAirline: 'easyJet',
    hotel: 'Premier Inn',
  },
  {
    id: 'recent-2',
    destination: 'New York',
    destinationCode: 'JFK',
    dates: '8-10 Jan',
    totalCost: 1810,
    currency: '£',
    status: 'completed',
    flightAirline: 'Virgin Atlantic',
    hotel: 'Hilton Midtown',
  },
  {
    id: 'recent-3',
    destination: 'Paris',
    destinationCode: 'CDG',
    dates: '3 Jan',
    totalCost: 178,
    currency: '£',
    status: 'completed',
    flightAirline: 'Eurostar',
  },
];

// ============ SUGGESTED DEALS ============
export interface SuggestedDeal {
  id: string;
  destination: string;
  tagline: string;
  priceFrom: number;
  currency: string;
  validUntil: string;
}

export const suggestedDeals: SuggestedDeal[] = [
  {
    id: 'deal-1',
    destination: 'Frankfurt',
    tagline: 'Office visit? Great fares next week',
    priceFrom: 89,
    currency: '£',
    validUntil: 'Valid until Feb 2',
  },
  {
    id: 'deal-2',
    destination: 'Amsterdam',
    tagline: 'Quick hop for meetings',
    priceFrom: 67,
    currency: '£',
    validUntil: 'Valid until Feb 5',
  },
];

// ============ DISRUPTION SCENARIO ============
export const mockDisruption: DisruptionScenario = {
  type: 'delay',
  severity: 'major',
  message: 'Your BA 985 return flight is delayed 3 hours due to weather in Berlin',
  impact: 'You\'ll arrive at Heathrow at 23:35 instead of 20:35. Last tube is 23:30.',
  originalFlight: {
    airline: 'British Airways',
    airlineLogo: '🔵',
    flightNumber: 'BA 985',
    departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '19:45', date: 'Thu 30 Jan' },
    arrival: { airport: 'London Heathrow', code: 'LHR', time: '20:35', date: 'Thu 30 Jan' },
    duration: '1h 50m',
    stops: 0,
  },
  alternatives: [
    {
      id: 'alt-1',
      type: 'fastest',
      label: 'Earlier Flight',
      tagline: 'Get home on time',
      price: 0, // No extra cost for rebooking
      currency: '£',
      outbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 985',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '19:45', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '20:35', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      inbound: {
        airline: 'Lufthansa',
        airlineLogo: '🟡',
        flightNumber: 'LH 916',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '16:30', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '17:20', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      reasoning: [
        'Arrives 17:20 — well before tube closes',
        'Free rebooking due to BA delay',
        'Only loses 2 hours of working day',
      ],
      tradeoffs: 'Need to leave Berlin office by 14:30',
      comparisonData: { priceRank: 1, timeRank: 1, flexRank: 2, riskScore: 'low', riskReason: 'Lufthansa very reliable' },
    },
    {
      id: 'alt-2',
      type: 'budget',
      label: 'Stay + Early AM',
      tagline: 'Avoid late night travel',
      price: 78, // One night hotel
      currency: '£',
      outbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 985',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '19:45', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '20:35', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      inbound: {
        airline: 'easyJet',
        airlineLogo: '🟠',
        flightNumber: 'U2 8541',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '07:00', date: 'Fri 31 Jan' },
        arrival: { airport: 'London Gatwick', code: 'LGW', time: '07:50', date: 'Fri 31 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      reasoning: [
        'Full evening to relax in Berlin',
        'In London by 8am Friday',
        '+£78 for extra hotel night',
      ],
      tradeoffs: 'Extends trip by one night, Gatwick return',
      comparisonData: { priceRank: 2, timeRank: 3, flexRank: 3, riskScore: 'low', riskReason: 'No stress option' },
    },
    {
      id: 'alt-3',
      type: 'flexible',
      label: 'Wait it Out',
      tagline: 'Accept the delay',
      price: 0,
      currency: '£',
      outbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 985',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '19:45', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '20:35', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      inbound: {
        airline: 'British Airways',
        airlineLogo: '🔵',
        flightNumber: 'BA 985 (delayed)',
        departure: { airport: 'Berlin Brandenburg', code: 'BER', time: '22:45', date: 'Thu 30 Jan' },
        arrival: { airport: 'London Heathrow', code: 'LHR', time: '23:35', date: 'Thu 30 Jan' },
        duration: '1h 50m',
        stops: 0,
      },
      reasoning: [
        'No rebooking hassle',
        'Full working day in Berlin',
        'BA lounge access while waiting',
      ],
      tradeoffs: 'Late arrival, need taxi home (£60-80)',
      comparisonData: { priceRank: 1, timeRank: 2, flexRank: 1, riskScore: 'medium', riskReason: 'Weather could worsen' },
    },
  ],
};
