import { Card } from "@/components/ui/card";
import { Cloud, Database, MapPin, Brain } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            About AgriRain
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering farmers with accurate weather predictions and intelligent crop recommendations
          </p>
        </div>

        <Card className="p-8 bg-card border-border">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            AgriRain is dedicated to helping farmers make informed decisions about crop planning through
            accurate rain predictions and intelligent analysis. By combining meteorological data with
            agricultural knowledge, we provide actionable insights that help optimize planting schedules,
            reduce crop losses, and improve overall farm productivity.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Interactive Mapping</h3>
            </div>
            <p className="text-muted-foreground">
              Using OpenStreetMap and Leaflet.js, we provide free, unlimited access to interactive
              maps with drawing tools to precisely select your farm area.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Cloud className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Weather Data</h3>
            </div>
            <p className="text-muted-foreground">
              We analyze comprehensive weather data including temperature, humidity, precipitation,
              and soil moisture to provide accurate predictions.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Database className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Historical Analysis</h3>
            </div>
            <p className="text-muted-foreground">
              Our system leverages historical weather patterns to improve prediction accuracy
              and provide trend analysis for better planning.
            </p>
          </Card>

          <Card className="p-6 bg-card border-border">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Smart Recommendations</h3>
            </div>
            <p className="text-muted-foreground">
              AI-powered crop recommendations based on predicted weather conditions help you
              choose the most suitable crops for your farm.
            </p>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-border">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Technology Stack</h2>
          <div className="space-y-3 text-muted-foreground">
            <p><strong className="text-foreground">Mapping:</strong> Leaflet.js with OpenStreetMap tiles (completely free)</p>
            <p><strong className="text-foreground">Geocoding:</strong> Nominatim API from OpenStreetMap</p>
            <p><strong className="text-foreground">Drawing Tools:</strong> Leaflet.draw for area selection</p>
            <p><strong className="text-foreground">Frontend:</strong> React, TypeScript, Tailwind CSS</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
