export interface RunningRoute {
  id: string
  name: string
  description: string
  distanceKm: number
  elevationGainM: number
  estimatedMinutes: number
  difficulty: 'easy' | 'moderate' | 'hard'
  surface: 'road' | 'trail' | 'mixed'
  image: string
  coordinates: [number, number][] // [lat, lng] for Leaflet polyline
  elevationProfile: { distanceKm: number; elevationM: number }[]
  highlights: string[]
  uaGear: { name: string; type: string; image: string }[]
}

export const barcelonaRoutes: RunningRoute[] = [
  {
    id: 'barceloneta-boardwalk',
    name: 'Barceloneta Boardwalk',
    description: 'A flat, scenic 5K along the Barcelona waterfront. Start at the W Hotel, run along the sandy boardwalk past Port Olimpic, and loop back through the old fishing quarter. Perfect for an easy morning run with sea views.',
    distanceKm: 5.2,
    elevationGainM: 12,
    estimatedMinutes: 28,
    difficulty: 'easy',
    surface: 'road',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=400&fit=crop',
    coordinates: [
      [41.3688, 2.1899], // W Hotel
      [41.3725, 2.1920], // Barceloneta beach mid
      [41.3780, 2.1935], // Barceloneta north
      [41.3835, 2.1970], // Port Olimpic marina
      [41.3870, 2.2015], // Port Olimpic north
      [41.3905, 2.2060], // Bogatell beach
      [41.3870, 2.2015], // Turn back at Bogatell
      [41.3835, 2.1970], // Port Olimpic return
      [41.3780, 2.1935], // Barceloneta return
      [41.3725, 2.1920], // Beach return
      [41.3688, 2.1899], // Back to W Hotel
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 3 },
      { distanceKm: 0.5, elevationM: 4 },
      { distanceKm: 1.0, elevationM: 3 },
      { distanceKm: 1.5, elevationM: 5 },
      { distanceKm: 2.0, elevationM: 4 },
      { distanceKm: 2.6, elevationM: 6 },
      { distanceKm: 3.0, elevationM: 5 },
      { distanceKm: 3.5, elevationM: 4 },
      { distanceKm: 4.0, elevationM: 3 },
      { distanceKm: 4.5, elevationM: 4 },
      { distanceKm: 5.2, elevationM: 3 },
    ],
    highlights: ['W Hotel', 'Port Olimpic Marina', 'Bogatell Beach', 'Barceloneta Fishing Quarter'],
    uaGear: [
      { name: 'UA HOVR Phantom 4', type: 'Road Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
      { name: 'UA Streaker Run Tee', type: 'Running Shirt', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'ciutadella-loop',
    name: 'Parc de la Ciutadella Loop',
    description: 'A peaceful 3K loop through Barcelona\'s green heart. Flat paths wind past the ornamental lake, the Cascada fountain (designed by a young Gaudí), and the Catalan Parliament building. Great for an easy warm-up or cool-down.',
    distanceKm: 3.1,
    elevationGainM: 8,
    estimatedMinutes: 17,
    difficulty: 'easy',
    surface: 'mixed',
    image: 'https://images.unsplash.com/photo-1583779457711-ab81cbe786c0?w=800&h=400&fit=crop',
    coordinates: [
      [41.3878, 2.1845], // Park entrance (Passeig Picasso)
      [41.3888, 2.1865], // Cascada fountain
      [41.3895, 2.1890], // North lake
      [41.3880, 2.1910], // Parliament
      [41.3860, 2.1905], // Zoo area
      [41.3850, 2.1880], // South path
      [41.3855, 2.1860], // Passeig Lluís Companys
      [41.3870, 2.1845], // Arc de Triomf area
      [41.3878, 2.1845], // Back to entrance
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 10 },
      { distanceKm: 0.4, elevationM: 12 },
      { distanceKm: 0.8, elevationM: 11 },
      { distanceKm: 1.2, elevationM: 13 },
      { distanceKm: 1.6, elevationM: 12 },
      { distanceKm: 2.0, elevationM: 11 },
      { distanceKm: 2.4, elevationM: 10 },
      { distanceKm: 2.8, elevationM: 11 },
      { distanceKm: 3.1, elevationM: 10 },
    ],
    highlights: ['Cascada Fountain', 'Ornamental Lake', 'Catalan Parliament', 'Arc de Triomf'],
    uaGear: [
      { name: 'UA Charged Assert 10', type: 'Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
      { name: 'UA Fly-By 3" Shorts', type: 'Running Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'montjuic-climb',
    name: 'Montjuïc Hill Climb',
    description: 'A challenging 8K route up Montjuïc hill with 180m of climbing. Start at Plaça Espanya, ascend past the Magic Fountain and MNAC, continue to the castle at the summit, then descend through the Olympic Stadium area. Stunning city views throughout.',
    distanceKm: 8.3,
    elevationGainM: 185,
    estimatedMinutes: 52,
    difficulty: 'hard',
    surface: 'mixed',
    image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?w=800&h=400&fit=crop',
    coordinates: [
      [41.3750, 2.1499], // Plaça Espanya
      [41.3720, 2.1510], // Magic Fountain
      [41.3695, 2.1528], // MNAC steps
      [41.3680, 2.1545], // MNAC palace
      [41.3660, 2.1570], // Jardí Botànic area
      [41.3640, 2.1600], // Mirador del Migdia
      [41.3630, 2.1640], // Castle approach
      [41.3635, 2.1660], // Castell de Montjuïc
      [41.3660, 2.1620], // Descent via gardens
      [41.3685, 2.1590], // Olympic Stadium
      [41.3710, 2.1555], // Palau Sant Jordi
      [41.3750, 2.1499], // Back to Plaça Espanya
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 30 },
      { distanceKm: 0.5, elevationM: 45 },
      { distanceKm: 1.0, elevationM: 68 },
      { distanceKm: 1.5, elevationM: 95 },
      { distanceKm: 2.0, elevationM: 120 },
      { distanceKm: 2.5, elevationM: 148 },
      { distanceKm: 3.0, elevationM: 170 },
      { distanceKm: 3.5, elevationM: 185 },
      { distanceKm: 4.0, elevationM: 195 },
      { distanceKm: 4.5, elevationM: 180 },
      { distanceKm: 5.0, elevationM: 155 },
      { distanceKm: 5.5, elevationM: 130 },
      { distanceKm: 6.0, elevationM: 105 },
      { distanceKm: 6.5, elevationM: 80 },
      { distanceKm: 7.0, elevationM: 55 },
      { distanceKm: 7.5, elevationM: 40 },
      { distanceKm: 8.3, elevationM: 30 },
    ],
    highlights: ['Magic Fountain', 'MNAC Palace', 'Castell de Montjuïc', 'Olympic Stadium'],
    uaGear: [
      { name: 'UA Charged Bandit TR 3', type: 'Trail Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
      { name: 'UA Qualifier Iso-Chill Tee', type: 'Cooling Shirt', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop' },
      { name: 'UA Storm Run Jacket', type: 'Weatherproof Layer', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'diagonal-mar-coastal',
    name: 'Diagonal Mar Coastal Path',
    description: 'A 7K out-and-back along the modern waterfront north of Barceloneta. Run past the Forum, Diagonal Mar park, and the striking architecture of the 22@ district. Flat and fast — ideal for tempo runs.',
    distanceKm: 7.0,
    elevationGainM: 15,
    estimatedMinutes: 38,
    difficulty: 'moderate',
    surface: 'road',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=400&fit=crop',
    coordinates: [
      [41.3905, 2.2060], // Bogatell beach start
      [41.3940, 2.2110], // Mar Bella beach
      [41.3970, 2.2160], // Nova Mar Bella
      [41.4010, 2.2210], // Llevant beach
      [41.4050, 2.2260], // Forum area
      [41.4080, 2.2300], // Diagonal Mar park
      [41.4050, 2.2260], // Turn back
      [41.4010, 2.2210], // Return
      [41.3970, 2.2160], // Return
      [41.3940, 2.2110], // Return
      [41.3905, 2.2060], // Back to start
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 4 },
      { distanceKm: 0.7, elevationM: 5 },
      { distanceKm: 1.4, elevationM: 4 },
      { distanceKm: 2.1, elevationM: 6 },
      { distanceKm: 2.8, elevationM: 8 },
      { distanceKm: 3.5, elevationM: 10 },
      { distanceKm: 4.2, elevationM: 8 },
      { distanceKm: 4.9, elevationM: 6 },
      { distanceKm: 5.6, elevationM: 5 },
      { distanceKm: 6.3, elevationM: 4 },
      { distanceKm: 7.0, elevationM: 4 },
    ],
    highlights: ['Mar Bella Beach', 'Forum Building', 'Diagonal Mar Park', '22@ Innovation District'],
    uaGear: [
      { name: 'UA HOVR Sonic 6', type: 'Road Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
      { name: 'UA Launch Run 7" Shorts', type: 'Running Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop' },
    ],
  },
  {
    id: 'carretera-aigues',
    name: 'Carretera de les Aigües Ridge',
    description: 'Barcelona\'s best-kept running secret. A 10K dirt track cut into the hillside of Collserola, 300m above the city. Completely flat despite being on a mountain — it follows the old water pipeline. Jaw-dropping panoramic views of the entire city.',
    distanceKm: 10.2,
    elevationGainM: 120,
    estimatedMinutes: 58,
    difficulty: 'moderate',
    surface: 'trail',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=400&fit=crop',
    coordinates: [
      [41.4085, 2.1290], // Vallvidrera FGC station approach
      [41.4100, 2.1325], // Trail start
      [41.4110, 2.1380], // Early section
      [41.4105, 2.1440], // Vista point 1
      [41.4095, 2.1510], // Mid section
      [41.4088, 2.1565], // Vista point 2
      [41.4080, 2.1620], // Approaching Tibidabo
      [41.4075, 2.1670], // Near Tibidabo
      [41.4080, 2.1620], // Turn back
      [41.4088, 2.1565], // Return
      [41.4095, 2.1510], // Return
      [41.4105, 2.1440], // Return
      [41.4110, 2.1380], // Return
      [41.4100, 2.1325], // Return
      [41.4085, 2.1290], // Back to start
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 250 },
      { distanceKm: 0.7, elevationM: 290 },
      { distanceKm: 1.4, elevationM: 310 },
      { distanceKm: 2.1, elevationM: 305 },
      { distanceKm: 2.8, elevationM: 300 },
      { distanceKm: 3.5, elevationM: 310 },
      { distanceKm: 4.2, elevationM: 315 },
      { distanceKm: 5.1, elevationM: 320 },
      { distanceKm: 5.8, elevationM: 315 },
      { distanceKm: 6.5, elevationM: 310 },
      { distanceKm: 7.2, elevationM: 305 },
      { distanceKm: 7.9, elevationM: 300 },
      { distanceKm: 8.6, elevationM: 295 },
      { distanceKm: 9.4, elevationM: 280 },
      { distanceKm: 10.2, elevationM: 250 },
    ],
    highlights: ['Panoramic City Views', 'Collserola Natural Park', 'Tibidabo Approach', 'Historic Water Pipeline'],
    uaGear: [
      { name: 'UA Charged Bandit TR 3', type: 'Trail Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop' },
      { name: 'UA Qualifier Iso-Chill Tee', type: 'Cooling Shirt', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop' },
      { name: 'UA Storm Run Jacket', type: 'Weatherproof Layer', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop' },
    ],
  },
]

export const runningChatResponse = {
  routeId: 'barceloneta-boardwalk',
  text: "Great idea! I'd recommend the **Barceloneta Boardwalk** — a flat 5.2km loop along the waterfront. Start at the W Hotel, run past Port Olimpic, and loop back through the old fishing quarter. Easy difficulty, perfect for a morning run with sea views.\n\n📍 5.2 km · 28 min · Easy · Road\n\nWant me to show you the full route with map and elevation profile?",
}
