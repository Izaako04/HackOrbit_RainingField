import { useState } from "react";
import LocationSearch from "./LocationSearch";
import MapComponent from "./MapComponent";

const MapPage = () => {
  // Quito como valor inicial
  const [center, setCenter] = useState<[number, number]>([-0.2202, -78.5123]);
  const [zoom, setZoom] = useState(11);

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    // Actualiza la posición y el zoom del mapa
    setCenter([lat, lon]);
    setZoom(11);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Contenedor del buscador */}
      <div className="p-4 bg-background z-10 shadow-md">
        <LocationSearch onLocationSelect={handleLocationSelect} />
      </div>

      {/* Contenedor del mapa */}
      <div className="flex-1 relative">
        <MapComponent center={center} zoom={zoom} />
      </div>
    </div>
  );
};

export default MapPage;
