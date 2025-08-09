import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to auto-center map when position changes
function CenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, map.getZoom());
  }, [coords]);
  return null;
}

function MapPage() {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('Locating...');
  const [accuracy, setAccuracy] = useState(null);
  const [error, setError] = useState(null);

  // Get address from coordinates (reverse geocoding)
  const getAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || 'Address unavailable';
    } catch (err) {
      console.error("Geocoding error:", err);
      return 'Could not fetch address';
    }
  };

  // Get user's location and update state
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const newPosition = [latitude, longitude];
        setPosition(newPosition);
        setAccuracy(accuracy);
        setAddress(await getAddress(latitude, longitude));
        setError(null);
      },
      (err) => {
        setError(`Location error: ${err.message}`);
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!position) {
    return <div className="loading">Loading map...</div>;
  }

  return (
    <div className="map-wrapper">
      <MapContainer
        center={position}
        zoom={18}
        style={{ height: '100vh', width: '100%' }}
      >
        <CenterMap coords={position} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position}>
          <Popup>
            <div className="location-info">
              <h3>Your Current Location</h3>
              <p>{address}</p>
              <div className="coordinates">
                Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
              </div>
              {accuracy && (
                <div className="accuracy">
                  Accuracy: {Math.round(accuracy)} meters
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapPage;

