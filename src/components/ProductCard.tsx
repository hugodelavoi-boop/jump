import React from 'react';
import { Calendar, Users, Star } from 'lucide-react';
import { StripeProduct } from '../stripe-config';

interface ProductCardProps {
  product: StripeProduct;
  onEnroll: (priceId: string) => void;
  loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnroll, loading }) => {
  const isFree = product.price_display === 'Free';
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {product.name}
          </h3>
          <div className="text-right">
            <div className={`text-2xl font-bold ${isFree ? 'text-green-600' : 'text-blue-600'}`}>
              {product.price_display}
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Ages 5-12</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>After School</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>Multi-Sport</span>
          </div>
        </div>
        
        <button
          onClick={() => onEnroll(product.priceId)}
          disabled={loading}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
            isFree
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? 'Processing...' : isFree ? 'Book Free Trial' : 'Enroll Now'}
        </button>
      </div>
    </div>
  );
};