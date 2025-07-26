import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Zap, Search, Filter, ShoppingBag, Plus, Minus } from 'lucide-react';

interface WasteItem {
  id: string;
  name: string;
  category: string;
  pointsPerKg: number;
  description: string;
  image: string;
  examples: string[];
}

interface CartItem extends WasteItem {
  quantity: number;
  unit: 'kg' | 'piece';
}

export const WasteUpload = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [classificationResult, setClassificationResult] = useState<WasteItem | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const simulateClassification = () => {
    setIsClassifying(true);
    setTimeout(() => {
      setClassificationResult({
        id: '1',
        name: 'Plastic Bottles (PET)',
        category: 'Plastics',
        pointsPerKg: 25,
        description: 'Clear plastic bottles, typically used for beverages',
        image: 'https://images.unsplash.com/photo-1583255449109-5d8b9047ba59?w=200&h=200&fit=crop',
        examples: ['Water bottles', 'Soda bottles', 'Juice containers']
      });
      setIsClassifying(false);
    }, 2000);
  };

  return (
    <Card className="reloop-card p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">AI Waste Classification</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded waste" className="w-full h-48 object-cover rounded-lg mb-4" />
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Upload or take a photo</p>
                  <p className="text-sm text-muted-foreground">AI will classify your waste instantly</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => setUploadedImage('https://images.unsplash.com/photo-1583255449109-5d8b9047ba59?w=400&h=300&fit=crop')}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button 
              variant="outline"
              onClick={() => setUploadedImage('https://images.unsplash.com/photo-1583255449109-5d8b9047ba59?w=400&h=300&fit=crop')}
            >
              <Camera className="h-4 w-4 mr-2" />
              Camera
            </Button>
          </div>
          
          <Button 
            className="w-full" 
            onClick={simulateClassification}
            disabled={!uploadedImage || isClassifying}
          >
            <Zap className="h-4 w-4 mr-2" />
            {isClassifying ? 'Classifying...' : 'Classify with AI'}
          </Button>
        </div>

        {/* Classification Result */}
        <div className="space-y-4">
          {classificationResult ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={classificationResult.image} 
                  alt={classificationResult.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{classificationResult.name}</h3>
                  <Badge variant="secondary">{classificationResult.category}</Badge>
                </div>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="text-success font-semibold">
                  {classificationResult.pointsPerKg} points per kg
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {classificationResult.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Common Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {classificationResult.examples.map((example, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              Upload an image to see AI classification results
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export const WasteCatalog = ({ onAddToCart }: { onAddToCart: (item: WasteItem) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const wasteItems: WasteItem[] = [
    {
      id: '1',
      name: 'Plastic Bottles (PET)',
      category: 'Plastics',
      pointsPerKg: 25,
      description: 'Clear plastic bottles, beverage containers',
      image: 'https://images.unsplash.com/photo-1583255449109-5d8b9047ba59?w=200&h=200&fit=crop',
      examples: ['Water bottles', 'Soda bottles']
    },
    {
      id: '2',
      name: 'Smartphones',
      category: 'Electronics',
      pointsPerKg: 150,
      description: 'Mobile phones, old or broken devices',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
      examples: ['Old phones', 'Broken screens']
    },
    {
      id: '3',
      name: 'Cardboard',
      category: 'Paper',
      pointsPerKg: 15,
      description: 'Clean cardboard boxes and packaging',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
      examples: ['Shipping boxes', 'Food packaging']
    },
    {
      id: '4',
      name: 'Glass Bottles',
      category: 'Glass',
      pointsPerKg: 20,
      description: 'Clean glass containers and bottles',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      examples: ['Wine bottles', 'Jars']
    },
    {
      id: '5',
      name: 'Aluminum Cans',
      category: 'Metals',
      pointsPerKg: 45,
      description: 'Aluminum beverage cans',
      image: 'https://images.unsplash.com/photo-1594736797933-d0fa2a4e3836?w=200&h=200&fit=crop',
      examples: ['Soda cans', 'Beer cans']
    },
    {
      id: '6',
      name: 'Organic Waste',
      category: 'Compostables',
      pointsPerKg: 10,
      description: 'Food scraps and organic materials',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
      examples: ['Fruit peels', 'Vegetable scraps']
    }
  ];

  const categories = ['All', 'Plastics', 'Electronics', 'Paper', 'Glass', 'Metals', 'Compostables'];

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="reloop-card p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4 md:mb-0">Waste Categories</h2>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search waste types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            <Filter className="h-3 w-3 mr-1" />
            {category}
          </Button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="reloop-card p-4">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <Badge variant="secondary" className="mt-1">{item.category}</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-success font-semibold">
                  {item.pointsPerKg} pts/kg
                </div>
                <Button 
                  size="sm"
                  onClick={() => onAddToCart(item)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export const WasteCart = ({ cartItems, onUpdateQuantity, onRemoveItem }: {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}) => {
  const totalPoints = cartItems.reduce((sum, item) => sum + (item.pointsPerKg * item.quantity), 0);

  return (
    <Card className="reloop-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
        <ShoppingBag className="h-6 w-6 text-primary" />
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Your cart is empty. Add some waste items to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.pointsPerKg} pts/kg</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-12 text-center">{item.quantity} kg</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                Remove
              </Button>
            </div>
          ))}
          
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Points:</span>
              <span className="text-success">{totalPoints} points</span>
            </div>
            <Button className="w-full mt-4" size="lg">
              Schedule Pickup
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};