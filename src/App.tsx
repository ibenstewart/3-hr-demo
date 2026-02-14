import { Routes, Route } from 'react-router'
import Nav from './components/Nav'
import ErrorBoundary from './components/ErrorBoundary'
import DemoHub from './pages/DemoHub'
import TripPlanner from './pages/TripPlanner'
import InTripCompanion from './pages/InTripCompanion'
import Ancillaries from './pages/Ancillaries'
import PriceIntelligence from './pages/PriceIntelligence'
import Experiences from './pages/Experiences'
import ExperienceDetail from './pages/ExperienceDetail'
import BusinessTravel from './pages/BusinessTravel'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Nav />
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<DemoHub />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/companion" element={<InTripCompanion />} />
        <Route path="/ancillaries" element={<Ancillaries />} />
        <Route path="/prices" element={<PriceIntelligence />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/:id" element={<ExperienceDetail />} />
        <Route path="/business-travel" element={<BusinessTravel />} />
      </Routes>
      </ErrorBoundary>
    </div>
  )
}
