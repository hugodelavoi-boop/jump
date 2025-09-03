import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';
import { products } from '../stripe-config';

interface UserSubscription {
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
  product_name?: string;
}

export function useUserSubscription() {
  const { session } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setSubscription({
            subscription_id: data.subscription_id,
            subscription_status: data.subscription_status,
            price_id: data.price_id,
            current_period_start: data.current_period_start,
            current_period_end: data.current_period_end,
            cancel_at_period_end: data.cancel_at_period_end,
            product_name: getProductNameByPriceId(data.price_id),
          });
        } else {
          setSubscription(null);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();

    // Subscribe to subscription changes
    const channel = supabase.channel('subscription_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'stripe_subscriptions' 
      }, () => {
        fetchSubscription();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [session]);

  const getProductNameByPriceId = (priceId: string | null): string | undefined => {
    if (!priceId) return undefined;
    const product = Object.values(products).find(p => p.priceId === priceId);
    return product?.name || 'Unknown Plan';
  };

  return {
    subscription,
    loading,
    error,
  };
}