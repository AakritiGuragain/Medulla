import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Truck,
  Recycle,
  Star,
  Route
} from 'lucide-react';

interface DropPoint {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  status: 'active' | 'full' | 'maintenance';
  capacity: number;
  currentFill: number;
  type: 'smart-bin' | 'collection-center' | 'pickup-point';
  acceptedWaste: string[];
  hours: string;
  contact?: string;
  rating: number;
  lastPickup: string;
  nextPickup: string;
}

const DropPoints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPoint, setSelectedPoint] = useState<DropPoint | null>(null);

  const dropPoints: DropPoint[] = [
    {
      id: '1',
      name: 'Thamel Smart Collection Hub',
      address: 'Thamel Marg, Ward 26, Kathmandu',
      coordinates: [85.3075, 27.7151],
      status: 'active',
      capacity: 100,
      currentFill: 45,
      type: 'smart-bin',
      acceptedWaste: ['Plastics', 'Electronics', 'Paper'],
      hours: '24/7',
      rating: 4.8,
      lastPickup: '2 hours ago',
      nextPickup: 'Tomorrow 9:00 AM'
    },
    {
      id: '2',
      name: 'Patan Community Center',
      address: 'Mangal Bazar, Patan Durbar Square',
      coordinates: [85.3206, 27.6742],
      status: 'active',
      capacity: 150,
      currentFill: 78,
      type: 'collection-center',
      acceptedWaste: ['All Types', 'Composting'],
      hours: '6:00 AM - 8:00 PM',
      contact: '+977-1-5555123',
      rating: 4.6,
      lastPickup: '1 day ago',
      nextPickup: 'Today 3:00 PM'
    },
    {
      id: '3',
      name: 'Bhaktapur Recycling Station',
      address: 'Dattaleju Square, Bhaktapur',
      coordinates: [85.4271, 27.6714],
      status: 'full',
      capacity: 200,
      currentFill: 195,
      type: 'collection-center',
      acceptedWaste: ['Metals', 'Glass', 'Electronics'],
      hours: '7:00 AM - 6:00 PM',
      contact: '+977-1-6661234',
      rating: 4.3,
      lastPickup: '3 hours ago',
      nextPickup: 'Today 5:00 PM'
    },
    {
      id: '4',
      name: 'Bouddha Mobile Pickup',
      address: 'Bouddha Stupa Area',
      coordinates: [85.3618, 27.7209],
      status: 'active',
      capacity: 50,
      currentFill: 12,
      type: 'pickup-point',
      acceptedWaste: ['Plastics', 'Paper', 'Organic'],
      hours: '8:00 AM - 4:00 PM',
      contact: '+977-9841234567',
      rating: 4.9,
      lastPickup: '30 minutes ago',
      nextPickup: 'In 2 hours'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'full':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'maintenance':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'full':
        return 'bg-yellow-500 text-white';
      case 'maintenance':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'smart-bin':
        return <Recycle className="h-4 w-4" />;
      case 'collection-center':
        return <MapPin className="h-4 w-4" />;
      case 'pickup-point':
        return <Truck className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const filteredPoints = dropPoints.filter(point => {
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || point.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Drop <span className="text-primary">Points</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find the nearest waste collection points in Kathmandu Valley. 
            Real-time capacity tracking and pickup scheduling available.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="reloop-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Find Drop Points</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Types' },
                      { value: 'smart-bin', label: 'Smart Bins' },
                      { value: 'collection-center', label: 'Collection Centers' },
                      { value: 'pickup-point', label: 'Pickup Points' }
                    ].map((type) => (
                      <Button
                        key={type.value}
                        variant={selectedType === type.value ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedType(type.value)}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </Card>

            {/* Live Pickup Tracking */}
            <Card className="reloop-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Live Tracking</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Pickup #1247</p>
                    <p className="text-sm text-muted-foreground">Arriving in 15 mins</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Route className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Pickup #1248</p>
                    <p className="text-sm text-muted-foreground">Next: 2:30 PM</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Clock className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Map and Points List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mock Map */}
            <Card className="reloop-card p-6">
              <div className="relative h-96 bg-gradient-accent rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-green-100/50"></div>
                <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-lg">
                  <p className="text-sm font-medium">Kathmandu Valley</p>
                  <p className="text-xs text-muted-foreground">{filteredPoints.length} drop points</p>
                </div>
                
                {/* Mock map pins */}
                <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-success rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                  <p className="text-xs text-muted-foreground">Interactive map coming soon</p>
                </div>
              </div>
            </Card>

            {/* Points List */}
            <div className="space-y-4">
              {filteredPoints.map((point) => (
                <Card 
                  key={point.id} 
                  className={`reloop-card p-6 cursor-pointer transition-all ${
                    selectedPoint?.id === point.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedPoint(point)}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          {getTypeIcon(point.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{point.name}</h3>
                          <p className="text-sm text-muted-foreground">{point.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(point.status)}
                        <Badge className={getStatusColor(point.status)}>
                          {point.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium">{point.currentFill}/{point.capacity}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            point.currentFill / point.capacity > 0.8 
                              ? 'bg-yellow-500' 
                              : point.currentFill / point.capacity > 0.95
                              ? 'bg-destructive'
                              : 'bg-success'
                          }`}
                          style={{ width: `${(point.currentFill / point.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Hours</p>
                        <p className="font-medium">{point.hours}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rating</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                          <span className="font-medium">{point.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Pickup</p>
                        <p className="font-medium">{point.lastPickup}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Pickup</p>
                        <p className="font-medium">{point.nextPickup}</p>
                      </div>
                    </div>

                    {/* Accepted Waste Types */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Accepted Waste</p>
                      <div className="flex flex-wrap gap-2">
                        {point.acceptedWaste.map((waste, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {waste}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button size="sm" className="flex-1">
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                      {point.contact && (
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Truck className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DropPoints;