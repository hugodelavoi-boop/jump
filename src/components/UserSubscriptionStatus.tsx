import React, { useEffect, useState } from 'react';
import { Crown, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getProductByPriceId } from '../stripe-config';

interface Subscription {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
}

export function UserSubscriptionStatus() {
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

  if (loading || !subscription) {
    return null;
  }

  const product = getProductByPriceId(subscription.price_id);
  const endDate = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        <Crown className="w-6 h-6" />
        <div className="flex-1">
          <h3 className="font-semibold">Active Plan</h3>
          <p className="text-blue-100">{product?.name || 'Unknown Plan'}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-blue-100">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">Until {endDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}