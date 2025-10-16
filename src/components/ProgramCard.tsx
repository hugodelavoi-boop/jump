import React, { useState } from 'react';
import { Clock, Users, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { StripeProduct } from '../stripe-config';

interface ProgramCardProps {
  product: StripeProduct;
  onEnroll: (priceId: string) => Promise<void>;
}

export function ProgramCard({ product, onEnroll }: ProgramCardProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await onEnroll(product.priceId);
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) return 'FREE';
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price, product.currency)}
            </div>
            {product.mode === 'payment' && (
              <div className="text-sm text-gray-500">One-time payment</div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>Ages 5-12</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>After school sessions</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>School premises</span>
          </div>
        </div>

        {user ? (
          <button
            onClick={handleEnroll}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Enroll Now
              </>
            )}
          </button>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-3">Please sign in to enroll</p>
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
            >
              Sign In Required
            </button>
          </div>
        )}
      </div>
    </div>
  );
}