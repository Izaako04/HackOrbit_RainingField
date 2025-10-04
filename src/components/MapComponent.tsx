import { useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker, DrawingManager, Polygon, Circle } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Info, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MapComponentProps {
  searchedLocation: string;
}

const libraries: ("drawing" | "places")[] = ["drawing", "places"];

const MapComponent = ({ searchedLocation }: MapComponentProps) => {
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // India center
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [drawnShapes, setDrawnShapes] = useState<Array<{ type: string; shape: any; area: number }>>([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { toast } = useToast();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries,
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handlePlaceSearch = useCallback(() => {
    if (!searchedLocation || !mapRef.current) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchedLocation }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
        mapRef.current?.setCenter(newCenter);
        mapRef.current?.setZoom(14);
        
        toast({
          title: "Location Found",
          description: `Centered map on ${searchedLocation}`,
        });
      } else {
        toast({
          title: "Location Not Found",
          description: "Please try a different search term",
          variant: "destructive",
        });
      }
    });
  }, [searchedLocation, toast]);

  const onPolygonComplete = useCallback((polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const area = google.maps.geometry.spherical.computeArea(path);
    const areaInHectares = (area / 10000).toFixed(2);
    
    setDrawnShapes((prev) => [
      ...prev,
      { type: "polygon", shape: polygon, area: parseFloat(areaInHectares) },
    ]);

    toast({
      title: "Area Selected",
      description: `Polygon area: ${areaInHectares} hectares`,
    });
  }, [toast]);

  const onCircleComplete = useCallback((circle: google.maps.Circle) => {
    const radius = circle.getRadius();
    const area = Math.PI * radius * radius;
    const areaInHectares = (area / 10000).toFixed(2);
    
    setDrawnShapes((prev) => [
      ...prev,
      { type: "circle", shape: circle, area: parseFloat(areaInHectares) },
    ]);

    toast({
      title: "Area Selected",
      description: `Circle area: ${areaInHectares} hectares`,
    });
  }, [toast]);

  const clearAllShapes = useCallback(() => {
    drawnShapes.forEach(({ shape }) => {
      shape.setMap(null);
    });
    setDrawnShapes([]);
    toast({
      title: "Cleared",
      description: "All drawn shapes have been removed",
    });
  }, [drawnShapes, toast]);

  const handleApiKeySubmit = () => {
    if (googleMapsApiKey.trim()) {
      setShowApiInput(false);
      toast({
        title: "API Key Added",
        description: "Loading Google Maps...",
      });
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Google Maps API key",
        variant: "destructive",
      });
    }
  };

  // Search for location when searchedLocation changes
  useState(() => {
    if (searchedLocation && isLoaded && !showApiInput) {
      handlePlaceSearch();
    }
  });

  if (showApiInput) {
    return (
      <div className="space-y-4">
        <Alert className="bg-info/10 border-info">
          <Info className="h-4 w-4 text-info" />
          <AlertDescription className="text-sm space-y-2">
            <p>
              <strong>Google Maps Integration:</strong> To enable the interactive map with area selection tools, you'll need a free Google Maps API key.
            </p>
            <div className="space-y-1 text-xs">
              <p><strong>How to get your free API key:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Visit <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline text-info hover:text-info/80">Google Cloud Console</a></li>
                <li>Create a new project or select an existing one</li>
                <li>Enable the following APIs: Maps JavaScript API, Places API, Geocoding API</li>
                <li>Go to Credentials and create an API key</li>
                <li>Copy the API key and paste it below</li>
              </ol>
              <p className="mt-2 text-muted-foreground">
                💡 Google provides $200 free credits per month, which is more than enough for personal use.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Paste your Google Maps API key here"
                  value={googleMapsApiKey}
                  onChange={(e) => setGoogleMapsApiKey(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApiKeySubmit()}
                />
                <Button
                  onClick={handleApiKeySubmit}
                  disabled={!googleMapsApiKey.trim()}
                >
                  Load Map
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                🔒 Your API key is only stored in your browser session and never sent to our servers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load Google Maps. Please check your API key and ensure the required APIs are enabled.
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => setShowApiInput(true)}
          >
            Change API Key
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  const totalArea = drawnShapes.reduce((sum, { area }) => sum + area, 0).toFixed(2);

  return (
    <div className="space-y-4">
      <Alert className="bg-success/10 border-success">
        <MapPin className="h-4 w-4 text-success" />
        <AlertDescription className="text-sm">
          <strong>Map Tools Active:</strong> Use the drawing tools on the map to select your farming area. 
          Draw polygons for irregular shapes or circles for round areas.
          {drawnShapes.length > 0 && (
            <div className="mt-2 font-semibold">
              Total selected area: {totalArea} hectares ({(parseFloat(totalArea) * 2.47105).toFixed(2)} acres)
            </div>
          )}
        </AlertDescription>
      </Alert>

      <div className="relative rounded-lg overflow-hidden border border-border shadow-medium">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={mapCenter}
          zoom={10}
          onLoad={onMapLoad}
          options={{
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {markerPosition && <Marker position={markerPosition} />}
          
          <DrawingManager
            onPolygonComplete={onPolygonComplete}
            onCircleComplete={onCircleComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  google.maps.drawing.OverlayType.POLYGON,
                  google.maps.drawing.OverlayType.CIRCLE,
                ],
              },
              polygonOptions: {
                fillColor: "hsl(140, 70%, 35%)",
                fillOpacity: 0.3,
                strokeWeight: 2,
                strokeColor: "hsl(140, 70%, 35%)",
                editable: true,
                draggable: true,
              },
              circleOptions: {
                fillColor: "hsl(200, 70%, 50%)",
                fillOpacity: 0.3,
                strokeWeight: 2,
                strokeColor: "hsl(200, 70%, 50%)",
                editable: true,
                draggable: true,
              },
            }}
          />
        </GoogleMap>
      </div>

      <div className="flex gap-2 items-center">
        {drawnShapes.length > 0 && (
          <Button variant="outline" onClick={clearAllShapes} className="gap-2">
            <Trash2 className="h-4 w-4" />
            Clear All Shapes
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setShowApiInput(true);
            setDrawnShapes([]);
          }}
        >
          Change API Key
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>Map Features:</strong></p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>🗺️ <strong>Drawing Tools:</strong> Use the toolbar to draw polygons (irregular shapes) or circles</li>
          <li>✏️ <strong>Edit Shapes:</strong> Click on any drawn shape to edit, resize, or move it</li>
          <li>📏 <strong>Area Calculation:</strong> Area is automatically calculated in hectares and acres</li>
          <li>📍 <strong>Search:</strong> Use the location search above to find and center on specific locations</li>
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
