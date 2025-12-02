import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getProductByPriceId } from '../stripe-config';

interface Subscription {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
}

export const UserSubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .eq('subscription_status', 'active')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching subscription:', error);
        } else if (data) {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  if (!user || loading) {
    return null;
  }

  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          No active subscription found. Browse our programs to get started!
        </p>
      </div>
    );
  }

  const product = getProductByPriceId(subscription.price_id);
  const endDate = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-green-900 font-semibold mb-2">Active Subscription</h3>
      <p className="text-green-800 text-sm">
        <strong>{product?.name || 'Unknown Program'}</strong>
      </p>
      <p className="text-green-700 text-xs mt-1">
        Valid until {endDate.toLocaleDateString()}
      </p>
    </div>
  );
};