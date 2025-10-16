import React, { useEffect, useState } from 'react';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

interface Subscription {
  subscription_status: string;
  price_id: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export function UserSubscriptionStatus() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
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
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return null;
  }

  if (!subscription) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-medium">No active subscription</span>
        </div>
      </div>
    );
  }

  const product = getProductByPriceId(subscription.price_id);
  const endDate = new Date(subscription.current_period_end * 1000);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Crown className="w-5 h-5 text-green-600 mr-2" />
          <div>
            <span className="text-green-800 font-medium">
              {product?.name || 'Active Subscription'}
            </span>
            {subscription.cancel_at_period_end && (
              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Cancelling
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-green-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Until {endDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}