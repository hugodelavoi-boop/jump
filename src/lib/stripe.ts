import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export { stripePromise };

export const createCheckoutSession = async (
  priceId: string,
  mode: 'payment' | 'subscription',
  accessToken: string,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
  customerName?: string,
  childName?: string
): Promise<{ url: string; sessionId: string }> => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      customer_name: customerName,
      child_name: childName,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to create checkout session' }));
    throw new Error(errorData.error || 'Failed to create checkout session');
  }

  const data = await response.json();
  return {
    url: data.url,
    sessionId: data.sessionId
  };
};