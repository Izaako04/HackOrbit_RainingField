import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cloud, Droplets, MapPin, Sprout, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farmland.jpg";

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location-Based Predictions",
      description: "Search any location and get precise weather forecasts for your specific farmland area.",
    },
    {
      icon: Calendar,
      title: "Date-Specific Forecasts",
      description: "Select any future date to plan your agricultural activities with confidence.",
    },
    {
      icon: Droplets,
      title: "Detailed Rain Data",
      description: "Access comprehensive rainfall predictions, soil moisture, humidity, and temperature data.",
    },
    {
      icon: Sprout,
      title: "Smart Crop Recommendations",
      description: "Get AI-powered suggestions for the best crops to plant based on weather conditions.",
    },
    {
      icon: Cloud,
      title: "Interactive Weather Maps",
      description: "Visualize weather patterns across your selected area with our interactive mapping tools.",
    },
    {
      icon: TrendingUp,
      title: "Historical Trends",
      description: "Analyze past weather patterns to make better informed decisions for future planting.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Predict Rain, Plan Better
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Empower your farming decisions with accurate weather predictions and intelligent crop recommendations tailored to your land.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Link to="/prediction">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Predicting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and data you need to make informed agricultural decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Optimize Your Harvest?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already making data-driven decisions with AgroPredict.
          </p>
          <Link to="/prediction">
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
