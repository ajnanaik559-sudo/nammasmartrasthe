import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function BengaluruMap() {
  // Silk Board Junction coordinates
  const silkBoard = { lat: 12.9177, lng: 77.6230 };

  return (
    <div className="p-4 border border-border rounded-md shadow-md bg-card">
      <h3 className="text-lg font-bold text-foreground mb-2">Bengaluru Junction Map (OSM)</h3>
      <MapContainer center={[silkBoard.lat, silkBoard.lng]} zoom={14} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[silkBoard.lat, silkBoard.lng]}>
          <Popup>Silk Board Junction 🚦</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default BengaluruMap;
