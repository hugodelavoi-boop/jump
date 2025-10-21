import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, CheckCircle } from 'lucide-react';
import { getProductByPriceId } from '../stripe-config';

interface Subscription {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
}

export const UserSubscriptionStatus: React.FC = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .eq('subscription_status', 'active');

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) return null;

  if (subscriptions.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-gray-600">No active subscriptions</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {subscriptions.map((subscription, index) => {
        const product = getProductByPriceId(subscription.price_id);
        return (
          <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <div>
                  <span className="font-medium text-green-800">
                    {product?.name || 'Active Subscription'}
                  </span>
                  <p className="text-sm text-green-600">
                    Status: {subscription.subscription_status}
                  </p>
                </div>
              </div>
              {subscription.current_period_end && (
                <div className="text-sm text-green-600">
                  Expires: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};