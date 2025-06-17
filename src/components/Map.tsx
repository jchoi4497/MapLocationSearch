import 'leaflet/dist/leaflet.css';
import type { Place } from "../api/Place";
import type { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface MapProps {
  place: Place | null;
  darkMode: boolean;
}

export default function Map({ place, darkMode }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : ' bg-white'} p-4 transition-colors duration-300`}>
      <MapContainer
        ref={mapRef}
        center={[40.7, -74]}
        zoom={12}
        scrollWheelZoom
        className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black w-full h-[60vh] md:h-[100vh] rounded-lg shadow-lg'}`}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {place && <Marker position={[place.latitude, place.longitude]} />}
      </MapContainer>
    </div>
  );
}