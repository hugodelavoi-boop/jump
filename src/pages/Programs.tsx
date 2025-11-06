import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgramCard } from '../components/ProgramCard';
import { stripeProducts } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';

export function Programs() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async (priceId: string) => {
    if (!session) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/programs`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of fun, engaging sports programs designed to build confidence, 
            develop skills, and keep kids active and healthy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product) => (
            <ProgramCard
              key={product.priceId}
              product={product}
              onEnroll={handleEnroll}
              loading={loading}
            />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Jump Start Sports?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏃</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Active & Fun</h3>
                <p className="text-gray-600">Engaging activities that keep kids moving and having fun</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Social Skills</h3>
                <p className="text-gray-600">Building friendships and teamwork through sport</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Confidence Building</h3>
                <p className="text-gray-600">Helping every child feel successful and confident</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Programs;
