import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const searchLocation = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
          {
            headers: {
              'User-Agent': 'AgriRain/1.0',
            },
          }
        );
        
        const data = await response.json();
        setResults(data);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching location:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchLocation, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelectLocation = (result: SearchResult) => {
    onLocationSelect(parseFloat(result.lat), parseFloat(result.lon), result.display_name);
    setQuery(result.display_name);
    setShowResults(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a location (city, address, coordinates)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 h-12 text-base"
        />
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full max-h-80 overflow-y-auto bg-card border-border shadow-lg z-20">
          {results.map((result) => (
            <button
              key={result.place_id}
              onClick={() => handleSelectLocation(result)}
              className="w-full text-left p-4 hover:bg-muted transition-colors border-b border-border last:border-0 flex items-start space-x-3"
            >
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{result.display_name}</span>
            </button>
          ))}
        </Card>
      )}

      {isSearching && (
        <p className="text-sm text-muted-foreground mt-2">Searching...</p>
      )}
    </div>
  );
};

export default LocationSearch;
