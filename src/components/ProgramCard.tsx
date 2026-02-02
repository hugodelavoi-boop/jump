import React, { useState } from 'react';
import { Clock, Users, MapPin, CreditCard } from 'lucide-react';
import { StripeProduct } from '../stripe-config';
import { createCheckoutSession, stripePromise } from '../lib/stripe';
import { useAuth } from '../contexts/AuthContext';

interface ProgramCardProps {
  product: StripeProduct;
  className?: string;
}

export function ProgramCard({ product, className = '' }: ProgramCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth';
      return;
    }

    setIsLoading(true);
    try {
      const { sessionId } = await createCheckoutSession(product.priceId);
      const stripe = await stripePromise;
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <span className="text-2xl font-bold text-blue-600">{product.priceDisplay}</span>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-3 text-blue-500" />
            <span>Ages 5-12</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-3 text-blue-500" />
            <span>45-minute sessions</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3 text-blue-500" />
            <span>School grounds</span>
          </div>
        </div>
        
        <button
          onClick={handleEnroll}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              {product.price === 0 ? 'Book Free Trial' : 'Enroll Now'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}