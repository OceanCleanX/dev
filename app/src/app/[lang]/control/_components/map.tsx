import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// TODO: add track GPS location when GPS info is available
const Map = () => {
  return (
    <MapContainer
      attributionControl={false} // TODO: attribute somewhere else in the future
      className="w-96 h-64"
      center={[51.505, -0.09]}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default Map;
