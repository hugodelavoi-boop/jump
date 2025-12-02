import React, { useState } from 'react';
import { StripeProduct } from '../stripe-config';
import { createCheckoutSession } from '../lib/stripe';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProductCardProps {
  product: StripeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePurchase = async () => {
    if (!user) {
      alert('Please sign in to purchase');
      return;
    }

    setLoading(true);
    try {
      const { url } = await createCheckoutSession(product.priceId);
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          {product.priceDisplay}
        </div>
        
        <button
          onClick={handlePurchase}
          disabled={loading || !user}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Processing...' : product.price === 0 ? 'Enroll Free' : 'Purchase'}
        </button>
      </div>
    </div>
  );
};