import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { WasteCatalog, WasteCart } from '@/components/waste/WasteComponents';

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

const WhatWeBuy = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: WasteItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1, unit: 'kg' }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What We <span className="text-primary">Buy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Scan waste for AI-powered classification or browse our catalog. 
            Turn your waste into valuable points redeemable for cash, art, and community events.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Scanner Link Box */}
            <div className="flex flex-col items-center gap-4 p-4 border border-dashed border-gray-300 rounded-lg">
              <p className="text-lg text-muted-foreground text-center">
                Scan your waste using your camera for instant classification (Organic or Inorganic)
              </p>
              <a
                href="/waste-scanner.html"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Open Scanner
              </a>
            </div>

            {/* Waste Catalog */}
            <WasteCatalog onAddToCart={addToCart} />
          </div>

          {/* Cart Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <WasteCart 
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatWeBuy;