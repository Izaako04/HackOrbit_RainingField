import { Link } from "react-router-dom";
import { Cloud, MapPin, Calendar, Sprout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HomePage = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Search and select your farm location with interactive mapping",
    },
    {
      icon: Calendar,
      title: "Date-Specific Forecasts",
      description: "Get rain predictions for any date to plan your agricultural activities",
    },
    {
      icon: Cloud,
      title: "Visual Rain Probability",
      description: "Color-coded map overlays show rain chances at a glance",
    },
    {
      icon: Sprout,
      title: "Smart Crop Recommendations",
      description: "AI-powered suggestions for optimal crops based on weather patterns",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-background -z-10" />
        
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Smart Rain Predictions for
              <span className="text-primary block mt-2">Modern Agriculture</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Make informed farming decisions with accurate rain forecasts, interactive maps, and intelligent crop recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/prediction">
                <Button size="lg" className="group">
                  Start Prediction
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Everything You Need for Smart Farming
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-primary/80 border-0 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Optimize Your Farming?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join farmers who are making data-driven decisions with AgriRain's advanced prediction tools.
            </p>
            <Link to="/prediction">
              <Button size="lg" variant="secondary" className="font-semibold">
                Try Prediction Tool Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
