export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  accessToken: string,
  successUrl: string,
  cancelUrl: string,
) {
  console.log('Creating checkout session with:', { 
    priceId, 
    mode, 
    successUrl, 
    cancelUrl,
    modeType: typeof mode,
    modeValue: mode 
  });
  console.log('Access token available:', !!accessToken);
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  
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

  console.log('Checkout response status:', response.status);
  console.log('Checkout response headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Checkout error response text:', errorText);
    
    let error;
    try {
      error = JSON.parse(errorText);
    } catch {
      error = { error: errorText };
    }
    
    console.error('Checkout error response:', error);
    throw new Error(error.error || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  console.log('Checkout URL created:', url);
  
  // Extract session ID from the URL
  const urlObj = new URL(url);
  const sessionId = urlObj.searchParams.get('session_id') || url.split('/').pop();
  
  return { url, sessionId };
}

export function getProductByPriceId(priceId: string) {
  // This function can remain for static product lookups if needed
  return null;
}