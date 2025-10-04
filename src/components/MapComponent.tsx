import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet-geometryutil";
import { Card } from "@/components/ui/card";

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  onAreaSelected?: (area: number, bounds: any) => void;
  rainProbability?: number;
}

const MapComponent = ({ center, zoom, onAreaSelected, rainProbability = 0 }: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const [selectedArea, setSelectedArea] = useState<number>(0);

  const getRainColor = (probability: number): string => {
    if (probability >= 70) return "#1e3a8a"; // Dark Blue
    if (probability >= 50) return "#3b82f6"; // Light Blue
    if (probability >= 30) return "#eab308"; // Yellow
    if (probability >= 15) return "#f97316"; // Orange
    return "#fca5a5"; // Light Red
  };

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Add drawn items layer
    map.current.addLayer(drawnItems.current);

    // Initialize draw control
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems.current,
      },
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: "#22c55e",
            fillOpacity: 0.4,
          },
        },
        circle: {
          shapeOptions: {
            color: "#22c55e",
            fillOpacity: 0.4,
          },
        },
        rectangle: {
          shapeOptions: {
            color: "#22c55e",
            fillOpacity: 0.4,
          },
        },
        polyline: false,
        marker: false,
        circlemarker: false,
      },
    });

    map.current.addControl(drawControl);

    // Handle draw created event
    map.current.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      drawnItems.current.addLayer(layer);
      
      // Calculate area
      let area = 0;
      if (layer instanceof L.Circle) {
        const radius = layer.getRadius();
        area = (Math.PI * radius * radius) / 10000; // Convert to hectares
      } else if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
        area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 10000;
      }
      
      setSelectedArea(area);
      if (onAreaSelected) {
        onAreaSelected(area, layer.getBounds());
      }
    });

    // Handle draw edited event
    map.current.on(L.Draw.Event.EDITED, (e: any) => {
      e.layers.eachLayer((layer: any) => {
        let area = 0;
        if (layer instanceof L.Circle) {
          const radius = layer.getRadius();
          area = (Math.PI * radius * radius) / 10000;
        } else if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
          area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 10000;
        }
        
        setSelectedArea(area);
        if (onAreaSelected) {
          onAreaSelected(area, layer.getBounds());
        }
      });
    });

    // Handle draw deleted event
    map.current.on(L.Draw.Event.DELETED, () => {
      setSelectedArea(0);
      if (onAreaSelected) {
        onAreaSelected(0, new L.LatLngBounds([0, 0], [0, 0]));
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map center when prop changes
  useEffect(() => {
    if (map.current) {
      map.current.setView(center, zoom);
      
      // Add marker at searched location
      L.marker(center).addTo(map.current);
    }
  }, [center, zoom]);

  // Update polygon colors based on rain probability
  useEffect(() => {
    if (rainProbability > 0 && drawnItems.current) {
      const color = getRainColor(rainProbability);
      
      drawnItems.current.eachLayer((layer: any) => {
        if (layer.setStyle) {
          layer.setStyle({
            color: "#ffffff",
            fillColor: color,
            fillOpacity: 0.5,
            weight: 2,
          });
        }
      });
    }
  }, [rainProbability]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg z-0" />
      
      {/* Color Legend */}
      <Card className="absolute bottom-4 right-4 p-4 bg-card/95 backdrop-blur-sm border-border z-10 shadow-lg">
        <h3 className="text-sm font-semibold mb-2 text-foreground">Rain Probability</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#1e3a8a" }} />
            <span className="text-muted-foreground">70-100%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#3b82f6" }} />
            <span className="text-muted-foreground">50-69%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#eab308" }} />
            <span className="text-muted-foreground">30-49%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f97316" }} />
            <span className="text-muted-foreground">15-29%</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#fca5a5" }} />
            <span className="text-muted-foreground">0-14%</span>
          </div>
        </div>
      </Card>

      {/* Area Display */}
      {selectedArea > 0 && (
        <Card className="absolute top-4 right-4 p-3 bg-card/95 backdrop-blur-sm border-border z-10 shadow-lg">
          <p className="text-sm text-muted-foreground">Selected Area</p>
          <p className="text-lg font-semibold text-foreground">
            {selectedArea.toFixed(2)} ha
          </p>
        </Card>
      )}
    </div>
  );
};

export default MapComponent;
