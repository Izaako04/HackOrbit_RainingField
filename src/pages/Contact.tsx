import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, HelpCircle, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const helpTopics = [
    {
      icon: HelpCircle,
      title: "How to Use",
      description: "Learn how to search locations, select dates, and interpret weather data.",
    },
    {
      icon: MessageSquare,
      title: "Crop Recommendations",
      description: "Understand how our crop recommendation system works and how to use it effectively.",
    },
    {
      icon: FileText,
      title: "Data Sources",
      description: "Learn about the weather data sources and prediction methodologies we use.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact & Help
          </h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with us or find answers to common questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Send Us a Message
              </CardTitle>
              <CardDescription>
                Have questions or feedback? We'd love to hear from you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Help Topics */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>Common topics and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {helpTopics.map((topic, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <topic.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{topic.title}</h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-medium bg-gradient-card">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">How accurate are the predictions?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our predictions are based on comprehensive meteorological data and historical patterns. While we strive for high accuracy, weather is inherently unpredictable, and we recommend using our predictions as one of several factors in your decision-making.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I use this for any location?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes! Our system supports global location search. Simply enter any city name, coordinates, or address to get location-specific predictions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How do I interpret the crop recommendations?</h3>
                  <p className="text-sm text-muted-foreground">
                    Each recommended crop includes a suitability score (percentage match), water requirements, harvest timeframe, and reasoning based on predicted weather conditions. Higher scores indicate better suitability for the selected date and location.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
