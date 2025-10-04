import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Zap, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower farmers worldwide with accurate, accessible weather predictions that help optimize crop planning and increase agricultural productivity.",
    },
    {
      icon: Zap,
      title: "Advanced Technology",
      description:
        "We leverage cutting-edge meteorological data, machine learning algorithms, and geospatial analysis to provide the most accurate predictions possible.",
    },
    {
      icon: Users,
      title: "Farmer-Centric",
      description:
        "Built by understanding real farming challenges, our tools are designed to be intuitive and practical for agricultural professionals of all technical backgrounds.",
    },
    {
      icon: Shield,
      title: "Reliable Data",
      description:
        "Our predictions are based on comprehensive weather datasets, historical patterns, and real-time meteorological information from trusted sources.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About AgroPredict
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing agricultural planning through intelligent weather prediction and crop recommendation systems.
          </p>
        </div>

        <Card className="mb-12 shadow-medium">
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg leading-relaxed mb-4">
                AgroPredict is an innovative web application designed to help farmers and agricultural professionals make data-driven decisions about crop planning. By combining accurate weather forecasting with intelligent crop recommendation algorithms, we provide actionable insights that can significantly improve harvest outcomes.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Our platform analyzes multiple environmental factors including rainfall probability, temperature ranges, humidity levels, soil moisture, and wind patterns. This comprehensive approach ensures that farmers receive well-rounded recommendations tailored to their specific geographic location and chosen planting dates.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're planning a small family farm or managing large-scale agricultural operations, AgroPredict provides the tools and insights you need to optimize your planting strategy and maximize your agricultural success.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {values.map((value, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-medium bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl">Our Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Weather Data Analysis</h3>
              <p className="text-muted-foreground">
                We process historical and real-time weather data to generate accurate forecasts for specific locations and dates. Our system analyzes patterns from comprehensive meteorological datasets to provide reliable predictions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Crop Recommendation Algorithm</h3>
              <p className="text-muted-foreground">
                Our intelligent system evaluates multiple factors including predicted rainfall, temperature conditions, seasonal patterns, and soil moisture levels to recommend the most suitable crops for your specific conditions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Location-Based Precision</h3>
              <p className="text-muted-foreground">
                Using advanced geospatial technology, we provide location-specific predictions that account for local climate patterns and environmental conditions unique to your farming area.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
