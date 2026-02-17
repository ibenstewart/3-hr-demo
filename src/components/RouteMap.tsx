import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import type { LatLngExpression, PathOptions } from 'leaflet'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import 'leaflet/dist/leaflet.css'

// Auto-fit map bounds to route
function FitBounds({ positions }: { positions: LatLngExpression[] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(L.latLngBounds(positions), { padding: [30, 30] })
    }
  }, [map, positions])
  return null
}

// Custom divIcon markers to avoid Vite default marker icon bug
const startIcon = L.divIcon({
  className: '',
  html: '<div style="width:14px;height:14px;border-radius:50%;background:rgb(15,161,169);border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const endIcon = L.divIcon({
  className: '',
  html: '<div style="width:14px;height:14px;border-radius:50%;background:rgb(231,8,102);border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const routeStyle: PathOptions = {
  color: '#0062E3',
  weight: 4,
  opacity: 0.8,
}

interface RouteMapProps {
  coordinates: [number, number][]
  height?: string
}

export default function RouteMap({ coordinates, height = '200px' }: RouteMapProps) {
  const positions: LatLngExpression[] = useMemo(
    () => coordinates.map(([lat, lng]) => [lat, lng]),
    [coordinates]
  )
  const start = positions[0]
  const end = positions[positions.length - 1]

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      style={{ height, width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} pathOptions={routeStyle} />
      <FitBounds positions={positions} />
      <Marker position={start} icon={startIcon}>
        <Popup>Start</Popup>
      </Marker>
      <Marker position={end} icon={endIcon}>
        <Popup>Finish</Popup>
      </Marker>
    </MapContainer>
  )
}
