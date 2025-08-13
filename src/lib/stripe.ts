export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  accessToken: string,
  successUrl: string,
  cancelUrl: string,
) {
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
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
}

export function getProductByPriceId(priceId: string) {
  // This function can remain for static product lookups if needed
  return null;
}