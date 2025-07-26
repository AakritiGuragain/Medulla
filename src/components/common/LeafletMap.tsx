import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Import useToast from your Shadcn UI setup
// Assuming it's located at '@/components/ui/use-toast' or similar
// If you don't have this, you'll need to set up Shadcn's toast system first.
import { useToast } from '@/components/ui/use-toast'; // Adjust this path if necessary

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapState {
  map: L.Map | null;
  marker: L.Marker | null;
  latitude: string;
  longitude: string;
  location: string;
}

const LeafletMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapState, setMapState] = useState<MapState>({
    map: null,
    marker: null,
    latitude: '27.7103', // Default to Lalitpur, Nepal
    longitude: '85.3222', // Default to Lalitpur, Nepal
    location: ''
  });

  const { toast } = useToast(); // Initialize toast hook

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([parseFloat(mapState.latitude), parseFloat(mapState.longitude)], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Map click event
    map.on('click', (e: L.LeafletMouseEvent) => {
      setMarkerOnMap(e.latlng.lat, e.latlng.lng, map);
    });

    setMapState(prev => ({ ...prev, map }));

    // Cleanup function
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const setMarkerOnMap = (lat: number, lng: number, mapInstance?: L.Map) => {
    const currentMap = mapInstance || mapState.map;
    if (!currentMap) return;

    // Remove existing marker
    if (mapState.marker) {
      currentMap.removeLayer(mapState.marker);
    }

    // Add new marker
    const newMarker = L.marker([lat, lng]).addTo(currentMap);
    
    setMapState(prev => ({
      ...prev,
      marker: newMarker,
      latitude: lat.toString(),
      longitude: lng.toString()
    }));
    
    reverseGeocode(lat, lng);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setMapState(prev => ({
        ...prev,
        location: data.display_name || `${lat}, ${lng}`
      }));
    } catch (error) {
      console.error("Error during reverse geocoding:", error);
      setMapState(prev => ({
        ...prev,
        location: `${lat}, ${lng} (Location name not found)`
      }));
      toast({
        title: "Location Lookup Failed",
        description: "Could not retrieve detailed location name. Displaying coordinates.",
        variant: "destructive", // Use a destructive variant for errors
      });
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          if (mapState.map) {
            mapState.map.setView([lat, lng], 16);
            setMarkerOnMap(lat, lng, mapState.map);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location Access Denied",
            description: "Unable to retrieve your current location. Please allow location access in your browser settings.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation. Please try a different browser or manually select a location.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div 
        ref={mapRef} 
        className="w-full h-80 mb-4 border border-gray-300 rounded-lg shadow-sm"
      />
      
      <div className="space-y-4">
        <button
          type="button"
          onClick={getLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Choose My Current Location
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              value={mapState.latitude}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              value={mapState.longitude}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={mapState.location}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;