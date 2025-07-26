import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Scan, Award, ShoppingBag, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Waste',
      description: 'Take a photo of your waste materials or scan barcodes for instant identification.',
      features: ['AI-powered classification', 'Barcode scanning', 'Real-time feedback'],
    },
    {
      icon: Scan,
      title: 'Get Classification',
      description: 'Our AI instantly categorizes your waste and calculates its value in our points system.',
      features: ['Instant results', 'Value calculation', 'Impact measurement'],
    },
    {
      icon: Award,
      title: 'Earn Points',
      description: 'Accumulate points based on the type and amount of waste you contribute to recycling.',
      features: ['Transparent rewards', 'Daily bonuses', 'Achievement badges'],
    },
    {
      icon: ShoppingBag,
      title: 'Redeem Rewards',
      description: 'Use your points for cash, upcycled art, event tickets, or support local recyclers.',
      features: ['Multiple options', 'Community impact', 'Local artists support'],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How ReLoop <span className="text-primary">Works</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform waste into value through our community-driven platform. 
            Every piece of waste is an opportunity to create positive impact in Kathmandu Valley.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="reloop-card p-6 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <step.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {step.description}
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {step.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Points System */}
        <div className="bg-gradient-accent rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Points System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background/50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">25 pts</div>
              <div className="font-medium text-foreground mb-1">Plastic Bottles</div>
              <div className="text-sm text-muted-foreground">per kg</div>
            </div>
            <div className="bg-background/50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">50 pts</div>
              <div className="font-medium text-foreground mb-1">Electronics</div>
              <div className="text-sm text-muted-foreground">per item</div>
            </div>
            <div className="bg-background/50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">15 pts</div>
              <div className="font-medium text-foreground mb-1">Paper/Cardboard</div>
              <div className="text-sm text-muted-foreground">per kg</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Impact Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of community members already making a difference. 
            Start by uploading your first waste photo today.
          </p>
          <Button size="lg" className="mr-4">
            Upload Waste Photo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            Find Drop Points
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;