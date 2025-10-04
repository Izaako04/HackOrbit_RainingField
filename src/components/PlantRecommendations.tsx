import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, CheckCircle, AlertTriangle } from "lucide-react";

interface Crop {
  name: string;
  suitability: "excellent" | "good" | "moderate" | "poor";
  score: number;
  reason: string;
  waterRequirement: string;
  harvestTime: string;
}

interface PlantRecommendationsProps {
  rainProbability: number;
  temperature: number;
  soilMoisture: number;
}

const PlantRecommendations = ({ rainProbability, temperature, soilMoisture }: PlantRecommendationsProps) => {
  const getCrops = (): Crop[] => {
    const crops: Crop[] = [];

    // High rain probability crops
    if (rainProbability >= 70) {
      crops.push({
        name: "Rice",
        suitability: "excellent",
        score: 95,
        reason: "High rainfall is ideal for rice cultivation",
        waterRequirement: "High",
        harvestTime: "3-4 months",
      });
      crops.push({
        name: "Sugarcane",
        suitability: "excellent",
        score: 90,
        reason: "Thrives in wet conditions with abundant water",
        waterRequirement: "High",
        harvestTime: "10-12 months",
      });
      crops.push({
        name: "Jute",
        suitability: "good",
        score: 85,
        reason: "Requires consistent moisture for fiber quality",
        waterRequirement: "High",
        harvestTime: "4-5 months",
      });
    }
    
    // Moderate rain probability crops
    else if (rainProbability >= 40) {
      crops.push({
        name: "Maize",
        suitability: "excellent",
        score: 92,
        reason: "Moderate rainfall suits maize growth perfectly",
        waterRequirement: "Moderate",
        harvestTime: "3-4 months",
      });
      crops.push({
        name: "Wheat",
        suitability: "good",
        score: 88,
        reason: "Good for moderate moisture conditions",
        waterRequirement: "Moderate",
        harvestTime: "4-5 months",
      });
      crops.push({
        name: "Cotton",
        suitability: "good",
        score: 85,
        reason: "Balanced moisture supports healthy cotton growth",
        waterRequirement: "Moderate",
        harvestTime: "5-6 months",
      });
    }
    
    // Low rain probability crops
    else {
      crops.push({
        name: "Millets",
        suitability: "excellent",
        score: 94,
        reason: "Drought-resistant and ideal for low rainfall",
        waterRequirement: "Low",
        harvestTime: "3-4 months",
      });
      crops.push({
        name: "Pulses (Chickpea)",
        suitability: "excellent",
        score: 90,
        reason: "Thrives in drier conditions",
        waterRequirement: "Low",
        harvestTime: "4-5 months",
      });
      crops.push({
        name: "Groundnut",
        suitability: "good",
        score: 87,
        reason: "Well-suited for low to moderate rainfall",
        waterRequirement: "Low-Moderate",
        harvestTime: "4-5 months",
      });
    }

    return crops.slice(0, 4);
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "excellent":
        return "bg-primary/10 text-primary border-primary/20";
      case "good":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "moderate":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getRainZone = () => {
    if (rainProbability >= 70) return { zone: "High rainfall zone", color: "text-blue-600" };
    if (rainProbability >= 50) return { zone: "Moderate-high zone", color: "text-blue-500" };
    if (rainProbability >= 30) return { zone: "Moderate zone", color: "text-yellow-600" };
    if (rainProbability >= 15) return { zone: "Low-moderate zone", color: "text-orange-500" };
    return { zone: "Low rainfall zone", color: "text-red-400" };
  };

  const crops = getCrops();
  const rainZone = getRainZone();

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Sprout className="h-5 w-5 text-primary" />
          <span>Crop Recommendations</span>
        </h3>
        <Badge variant="outline" className={rainZone.color}>
          {rainZone.zone}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Based on {rainProbability}% rain probability, {temperature}°C temperature, and {soilMoisture}% soil moisture
      </p>

      <div className="space-y-4">
        {crops.map((crop, index) => (
          <Card key={index} className="p-4 bg-muted/30 border-border hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-foreground">{crop.name}</h4>
                  <Badge className={getSuitabilityColor(crop.suitability)}>
                    {crop.suitability}
                  </Badge>
                  <span className="text-sm font-medium text-primary">{crop.score}/100</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{crop.reason}</span>
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium text-foreground">Water Need:</span> {crop.waterRequirement}
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Harvest:</span> {crop.harvestTime}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {rainProbability < 30 && (
        <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-destructive">Low Rainfall Warning</p>
              <p className="text-sm text-muted-foreground mt-1">
                Consider drought-resistant crops and ensure irrigation systems are ready
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PlantRecommendations;
