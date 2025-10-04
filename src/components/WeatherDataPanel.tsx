import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Cloud, Droplets, Thermometer, Wind } from "lucide-react";
import { format } from "date-fns";

interface WeatherData {
  rainProbability: number;
  precipitation: number;
  tempHigh: number;
  tempLow: number;
  humidity: number;
  soilMoisture: number;
  windSpeed: number;
}

interface WeatherDataPanelProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  weatherData: WeatherData | null;
}

const WeatherDataPanel = ({ selectedDate, onDateSelect, weatherData }: WeatherDataPanelProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Select Prediction Date</h3>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="mt-4 flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              onDateSelect(tomorrow);
            }}
          >
            Tomorrow
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const nextWeek = new Date();
              nextWeek.setDate(nextWeek.getDate() + 7);
              onDateSelect(nextWeek);
            }}
          >
            Next 7 Days
          </Button>
        </div>
      </Card>

      {weatherData && (
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Weather Forecast</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Cloud className="h-4 w-4" />
                <span className="text-sm">Rain Probability</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{weatherData.rainProbability}%</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span className="text-sm">Precipitation</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{weatherData.precipitation} mm</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Thermometer className="h-4 w-4" />
                <span className="text-sm">Temperature</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {weatherData.tempLow}° - {weatherData.tempHigh}°C
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Wind className="h-4 w-4" />
                <span className="text-sm">Wind Speed</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{weatherData.windSpeed} km/h</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span className="text-sm">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{weatherData.humidity}%</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span className="text-sm">Soil Moisture</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{weatherData.soilMoisture}%</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WeatherDataPanel;
