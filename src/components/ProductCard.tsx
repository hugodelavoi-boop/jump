import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { StripeProduct } from '../stripe-config';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface ProductCardProps {
  product: StripeProduct;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: product.priceId,
          mode: product.mode,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: window.location.href,
        }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currencySymbol: string) => {
    if (price === 0) return 'Free';
    return `${currencySymbol}${price.toFixed(2)}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          {formatPrice(product.price, product.currencySymbol)}
        </div>
        
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Buy Now'
          )}
        </button>
      </div>
    </div>
  );
};