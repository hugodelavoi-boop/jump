import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Subscription {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
}

export function UserSubscriptionStatus() {
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
        .select('*');

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'trialing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'trialing':
        return 'Trial';
      case 'past_due':
        return 'Past Due';
      case 'canceled':
        return 'Canceled';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  if (!user || loading) {
    return null;
  }

  if (subscriptions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Active Subscriptions
      </h3>
      <div className="space-y-3">
        {subscriptions.map((subscription, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {getStatusIcon(subscription.subscription_status)}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  Subscription Plan
                </p>
                <p className="text-sm text-gray-500">
                  Status: {getStatusText(subscription.subscription_status)}
                </p>
              </div>
            </div>
            {subscription.current_period_end && (
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Renews: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}