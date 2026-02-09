import React, { useState } from 'react';
import { Clock, Users, MapPin, CreditCard } from 'lucide-react';
import { StripeProduct } from '../stripe-config';
import { useAuth } from '../contexts/AuthContext';

interface ProgramCardProps {
  product: StripeProduct;
  onEnroll: (priceId: string) => Promise<void>;
}

export function ProgramCard({ product, onEnroll }: ProgramCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    setIsLoading(true);
    try {
      await onEnroll(product.priceId);
    } catch (error) {
      console.error('Enrollment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{product.priceDisplay}</div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-3 text-blue-500" />
            <span>Ages 5-12</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-3 text-blue-500" />
            <span>1 hour sessions</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3 text-blue-500" />
            <span>School grounds</span>
          </div>
        </div>
        
        <button
          onClick={handleEnroll}
          disabled={isLoading || !user}
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
        
        {!user && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Please sign in to enroll
          </p>
        )}
      </div>
    </div>
  );
}