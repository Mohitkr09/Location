import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Your main user location marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom orange marker for highlighted locations
const orangeIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Map() {
  const [position, setPosition] = useState(null);

   // Temporary highlighted locations
const highlightedLocations = [
  { lat: 26.280659564100052, lng: 82.07750771287583, name: "King Fitness" },
  { lat: 26.28409836091656, lng: 82.07827512060835, name: "Maharana Gate" },
  { lat: 26.28508262560957, lng: 82.07792335452085, name: "Ayush Medical store" },
];


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          // Send to backend (optional)
          fetch("https://your-backend.com/api/save-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User's current location */}
          <Marker position={position}>
            <Popup>You are here 🚀</Popup>
          </Marker>

          {/* Highlighted locations with orange markers */}
          {highlightedLocations.map((loc, index) => (
            <Marker
              key={index}
              position={[loc.lat, loc.lng]}
              icon={orangeIcon}
            >
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
}
