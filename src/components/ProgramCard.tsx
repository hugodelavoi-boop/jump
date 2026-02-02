import React, { useState } from 'react';
import { Clock, Users, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { StripeProduct } from '../stripe-config';

interface ProgramCardProps {
  product: StripeProduct;
  onEnroll?: (priceId: string) => void;
  loading?: boolean;
}

export function ProgramCard({ product, onEnroll, loading = false }: ProgramCardProps) {
  const { session } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnroll = async () => {
    if (!session || !onEnroll) return;
    
    setIsProcessing(true);
    try {
      await onEnroll(product.priceId);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {product.priceDisplay}
            </div>
          </div>
        </div>

        {product.description && (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Ages 5-12</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Multi-sport</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>School venue</span>
          </div>
        </div>

        {session ? (
          <button
            onClick={handleEnroll}
            disabled={loading || isProcessing}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {(loading || isProcessing) ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Enroll Now
              </>
            )}
          </button>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-3">Please sign in to enroll</p>
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
            >
              Sign In Required
            </button>
          </div>
        )}
      </div>
    </div>
  );
}