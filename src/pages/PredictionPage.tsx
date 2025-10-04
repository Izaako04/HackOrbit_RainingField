import { useState } from "react";
import LocationSearch from "@/components/LocationSearch";
import MapComponent from "@/components/MapComponent";
import WeatherDataPanel from "@/components/WeatherDataPanel";
import PlantRecommendations from "@/components/PlantRecommendations";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { format } from "date-fns";
import weatherData from "@/data/mockWeatherData.json";
import type { LatLngBounds } from "leaflet";

const PredictionPage = () => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.209]);
  const [mapZoom, setMapZoom] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedArea, setSelectedArea] = useState<number>(0);
  const [currentWeatherData, setCurrentWeatherData] = useState<any>(null);

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    setMapCenter([lat, lon]);
    setMapZoom(12);
    
    // Find weather data for this location and date
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const data = weatherData.find(
      (d) =>
        Math.abs(parseFloat(d.lat.toString()) - lat) < 0.5 &&
        Math.abs(parseFloat(d.lon.toString()) - lon) < 0.5 &&
        d.date === formattedDate
    );
    
    setCurrentWeatherData(data || null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    // Update weather data based on new date
    const formattedDate = format(date, "yyyy-MM-dd");
    const data = weatherData.find(
      (d) =>
        Math.abs(parseFloat(d.lat.toString()) - mapCenter[0]) < 0.5 &&
        Math.abs(parseFloat(d.lon.toString()) - mapCenter[1]) < 0.5 &&
        d.date === formattedDate
    );
    
    setCurrentWeatherData(data || null);
  };

  const handleAreaSelected = (area: number, bounds: LatLngBounds) => {
    setSelectedArea(area);
  };

  const handleReset = () => {
    setMapCenter([28.6139, 77.209]);
    setMapZoom(10);
    setSelectedDate(new Date());
    setSelectedArea(0);
    setCurrentWeatherData(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Rain Prediction Tool
            </h1>
            <p className="text-muted-foreground">
              Search your location, draw your farm area, and get intelligent crop recommendations
            </p>
          </div>
          
          <Button variant="outline" onClick={handleReset} className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
              <MapComponent
                center={mapCenter}
                zoom={mapZoom}
                onAreaSelected={handleAreaSelected}
                rainProbability={currentWeatherData?.rainProbability || 0}
              />
            </div>
          </div>

          {/* Data Panel */}
          <div className="space-y-6">
            <WeatherDataPanel
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              weatherData={currentWeatherData}
            />

            {currentWeatherData && (
              <PlantRecommendations
                rainProbability={currentWeatherData.rainProbability}
                temperature={(currentWeatherData.tempHigh + currentWeatherData.tempLow) / 2}
                soilMoisture={currentWeatherData.soilMoisture}
              />
            )}
          </div>
        </div>

        {!currentWeatherData && (
          <div className="mt-8 text-center p-8 bg-muted/30 rounded-lg border border-border">
            <p className="text-muted-foreground">
              Search for a location and select a date to view weather predictions and crop recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
