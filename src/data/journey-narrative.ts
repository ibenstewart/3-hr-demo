export interface JourneyStep {
  title: string
  description: string
  demoRoute: string
  demoTitle: string
  icon: string
}

export const journeySteps: JourneyStep[] = [
  {
    title: 'Meet Sarah',
    description: "She's planning a 10-day trip to Japan. Usually that means 23 browser tabs, 4 spreadsheets, and a group chat nobody reads. What if there was a better way?",
    demoRoute: '/trip-planner',
    demoTitle: 'AI Trip Planner',
    icon: 'map',
  },
  {
    title: "Sarah's on the ground",
    description: "She's in Barcelona now. Her flight got delayed, she needs dinner recommendations near her hotel, and tomorrow's weather looks rough. She needs a companion, not a booking confirmation.",
    demoRoute: '/companion',
    demoTitle: 'In-Trip Companion',
    icon: 'compass',
  },
  {
    title: "Before her next trip",
    description: "Sarah just booked flights to Lisbon. She needs travel insurance, an airport transfer, and maybe some activities. What if SkyVoyager helped her prepare — and earned margin doing it?",
    demoRoute: '/ancillaries',
    demoTitle: 'Smart Ancillaries',
    icon: 'shopping-bag',
  },
  {
    title: "Watching the prices",
    description: "Sarah found a great fare to New York, but she's not ready to book yet. The price could spike tomorrow — or drop next week. What if she could freeze it?",
    demoRoute: '/prices',
    demoTitle: 'Price Intelligence',
    icon: 'trending-up',
  },
  {
    title: "Filling her days",
    description: "She's booked her flights and hotel. Now she wants to explore — food tours, museum passes, sunset cruises. What if SkyVoyager compared experiences like it compares flights?",
    demoRoute: '/experiences',
    demoTitle: 'Tours & Experiences',
    icon: 'plane',
  },
  {
    title: "Meanwhile, at work",
    description: "Sarah's company sends 40 people travelling every month. Their travel manager uses 3 different tools and a shared spreadsheet. What if business travel was as easy as sending a message?",
    demoRoute: '/business-travel',
    demoTitle: 'Business Travel Agent',
    icon: 'briefcase',
  },
  {
    title: "How do we launch this?",
    description: "The product team built something great. Now marketing needs a plan — channels, tactics, timeline, budget. What if AI could generate that too?",
    demoRoute: '/marketing',
    demoTitle: 'Marketing Planner',
    icon: 'megaphone',
  },
]
