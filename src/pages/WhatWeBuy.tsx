import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { WasteUpload, WasteCatalog, WasteCart } from '@/components/waste/WasteComponents';

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
      return [...prev, { ...item, quantity: 1, unit: 'kg' as const }];
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
            Upload photos for AI-powered waste classification or browse our catalog. 
            Turn your waste into valuable points redeemable for cash, art, and community events.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            <WasteUpload />
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