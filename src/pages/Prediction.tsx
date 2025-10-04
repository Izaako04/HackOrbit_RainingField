import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  Calendar as CalendarIcon,
  Sprout,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import MapComponent from "@/components/MapComponent";
import { useToast } from "@/hooks/use-toast";

const Prediction = () => {
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchedLocation, setSearchedLocation] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Mock weather data - replace with real API calls
  const weatherData = {
    temperature: { high: 28, low: 18 },
    rainfall: 75,
    precipitation: 12,
    humidity: 68,
    soilMoisture: 72,
    windSpeed: 15,
  };

  // Mock crop recommendations
  const cropRecommendations = [
    {
      name: "Rice",
      suitability: 95,
      icon: "🌾",
      reason: "High rainfall and humidity levels are ideal",
      waterReq: "High",
      harvestTime: "3-4 months",
    },
    {
      name: "Corn",
      suitability: 85,
      icon: "🌽",
      reason: "Moderate temperature and good soil moisture",
      waterReq: "Moderate",
      harvestTime: "2-3 months",
    },
    {
      name: "Soybeans",
      suitability: 78,
      icon: "🫘",
      reason: "Suitable rainfall pattern for growth",
      waterReq: "Moderate",
      harvestTime: "3-4 months",
    },
  ];

  const cropsToAvoid = [
    { name: "Wheat", reason: "Too much rainfall expected" },
    { name: "Millet", reason: "Humidity levels too high" },
  ];

  const handleSearch = () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search",
        variant: "destructive",
      });
      return;
    }
    setSearchedLocation(location);
    setShowResults(true);
    toast({
      title: "Location Found",
      description: `Showing predictions for ${location}`,
    });
  };

  const quickDateSelections = [
    { label: "Tomorrow", days: 1 },
    { label: "Next 7 Days", days: 7 },
    { label: "Next 14 Days", days: 14 },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Rain Prediction Tool</h1>
          <p className="text-lg text-muted-foreground">
            Search your location, select dates, and get personalized crop recommendations
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location Search
            </CardTitle>
            <CardDescription>Enter a city name, coordinates, or address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Mumbai, India or 19.0760°N, 72.8777°E"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card className="mb-6 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Select Prediction Date
            </CardTitle>
            <CardDescription>Choose a date to see weather predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 mb-4">
              {quickDateSelections.map((quick) => (
                <Button
                  key={quick.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + quick.days);
                    setSelectedDate(date);
                  }}
                >
                  {quick.label}
                </Button>
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Custom Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {selectedDate && (
              <Alert className="bg-success/10 border-success">
                <CalendarIcon className="h-4 w-4 text-success" />
                <AlertDescription className="text-success-foreground">
                  Showing predictions for <strong>{format(selectedDate, "PPP")}</strong>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {showResults && (
          <>
            {/* Map Section */}
            <Card className="mb-6 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Interactive Map
                </CardTitle>
                <CardDescription>
                  View and select your farming area - {searchedLocation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapComponent searchedLocation={searchedLocation} />
              </CardContent>
            </Card>

            {/* Weather Data Section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-accent" />
                    Rain Probability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-accent">{weatherData.rainfall}%</div>
                  <p className="text-sm text-muted-foreground mt-1">High chance of rain</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-info" />
                    Precipitation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-info">{weatherData.precipitation}mm</div>
                  <p className="text-sm text-muted-foreground mt-1">Expected rainfall</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-secondary" />
                    Temperature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary">
                    {weatherData.temperature.high}°C
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Low: {weatherData.temperature.low}°C
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-primary" />
                    Humidity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{weatherData.humidity}%</div>
                  <p className="text-sm text-muted-foreground mt-1">Moderate humidity</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-success" />
                    Soil Moisture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">
                    {weatherData.soilMoisture}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Good for planting</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-soft hover:shadow-medium transition-all">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wind className="h-5 w-5 text-muted-foreground" />
                    Wind Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{weatherData.windSpeed} km/h</div>
                  <p className="text-sm text-muted-foreground mt-1">Light breeze</p>
                </CardContent>
              </Card>
            </div>

            {/* Crop Recommendations */}
            <Card className="mb-6 shadow-strong">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sprout className="h-6 w-6 text-success" />
                  Recommended Crops
                </CardTitle>
                <CardDescription>
                  Based on weather predictions for{" "}
                  {selectedDate ? format(selectedDate, "PPP") : "the selected date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {cropRecommendations.map((crop, index) => (
                    <Card key={index} className="border-2 border-success/20 hover:border-success/40 transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl">{crop.icon}</span>
                            <div>
                              <CardTitle className="text-lg">{crop.name}</CardTitle>
                              <Badge variant="outline" className="mt-1 bg-success/10 text-success border-success">
                                {crop.suitability}% Match
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                          {crop.reason}
                        </p>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Water:</span>{" "}
                            <span className="font-medium">{crop.waterReq}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Harvest:</span>{" "}
                            <span className="font-medium">{crop.harvestTime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Alert variant="destructive" className="bg-destructive/10">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Crops to Avoid:</strong>
                    <ul className="mt-2 space-y-1">
                      {cropsToAvoid.map((crop, index) => (
                        <li key={index} className="text-sm">
                          • {crop.name} - {crop.reason}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button variant="outline" size="lg" onClick={() => setShowResults(false)}>
                Clear Selection
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Prediction;
