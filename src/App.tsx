import { Routes, Route } from 'react-router'
import Nav from './components/Nav'
import DemoHub from './pages/DemoHub'
import TripPlanner from './pages/TripPlanner'
import InTripCompanion from './pages/InTripCompanion'
import Ancillaries from './pages/Ancillaries'
import PriceIntelligence from './pages/PriceIntelligence'
import Experiences from './pages/Experiences'
import ExperienceDetail from './pages/ExperienceDetail'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Nav />
      <Routes>
        <Route path="/" element={<DemoHub />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/companion" element={<InTripCompanion />} />
        <Route path="/ancillaries" element={<Ancillaries />} />
        <Route path="/prices" element={<PriceIntelligence />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/:id" element={<ExperienceDetail />} />
      </Routes>
    </div>
  )
}
