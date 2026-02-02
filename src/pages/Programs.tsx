import React from 'react';
import { stripeProducts } from '../stripe-config';
import { ProgramCard } from '../components/ProgramCard';

export function Programs() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of multi-sport programs designed to build confidence, 
            improve fitness, and most importantly - have fun!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProgramCard
              key={product.priceId}
              product={product}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Sport Activities</h3>
              <p className="text-gray-600">Soccer, AFL, basketball, dodgeball, and more</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualified Coaches</h3>
              <p className="text-gray-600">Experienced and passionate sports coaches</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Skill Development</h3>
              <p className="text-gray-600">Focus on fundamental movement and sports skills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}