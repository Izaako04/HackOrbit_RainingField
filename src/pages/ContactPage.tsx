import { Card } from "@/components/ui/card";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Contact & Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get support and learn how to make the most of AgriRain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-card border-border hover:shadow-lg transition-all">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Email Support</h3>
            <p className="text-muted-foreground mb-4">
              Get help via email
            </p>
            <Button variant="outline" className="w-full">
              support@agrirain.com
            </Button>
          </Card>

          <Card className="p-6 text-center bg-card border-border hover:shadow-lg transition-all">
            <div className="inline-flex p-4 rounded-full bg-secondary/10 mb-4">
              <MessageSquare className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Community</h3>
            <p className="text-muted-foreground mb-4">
              Join our farmer community
            </p>
            <Button variant="outline" className="w-full">
              Join Forum
            </Button>
          </Card>

          <Card className="p-6 text-center bg-card border-border hover:shadow-lg transition-all">
            <div className="inline-flex p-4 rounded-full bg-accent/10 mb-4">
              <HelpCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">Documentation</h3>
            <p className="text-muted-foreground mb-4">
              Learn how to use AgriRain
            </p>
            <Button variant="outline" className="w-full">
              View Docs
            </Button>
          </Card>
        </div>

        <Card className="p-8 bg-card border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                How accurate are the rain predictions?
              </h3>
              <p className="text-muted-foreground">
                Our predictions use advanced meteorological data and historical patterns to provide
                accurate forecasts. Accuracy is typically highest for 1-3 day predictions and remains
                reliable for up to 7 days.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Can I use AgriRain for multiple locations?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can search for and save multiple farm locations. Each location can be
                independently monitored with custom area selections.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                How are crop recommendations determined?
              </h3>
              <p className="text-muted-foreground">
                Crop recommendations are based on predicted rainfall, temperature, soil moisture levels,
                and historical planting success data for similar weather conditions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Is there a mobile app available?
              </h3>
              <p className="text-muted-foreground">
                The web application is fully responsive and works great on mobile devices. You can
                access it from any smartphone browser for convenient field use.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
