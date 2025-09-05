export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  accessToken: string,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
  customerName?: string,
  childName?: string,
): Promise<{ url: string; sessionId: string }> {
  console.log('🚀 Creating checkout session with:', { 
    priceId, 
    mode, 
    successUrl, 
    cancelUrl,
    customerEmail,
    customerName,
    childName,
    modeType: typeof mode,
    modeValue: mode 
  });
  
  // Validate required parameters
  if (!priceId || typeof priceId !== 'string') {
    throw new Error('Invalid price ID provided');
  }
  
  if (!mode || (mode !== 'payment' && mode !== 'subscription')) {
    throw new Error('Invalid mode provided. Must be "payment" or "subscription"');
  }
  
  if (!accessToken) {
    throw new Error('Access token is required');
  }
  
  if (!successUrl || !cancelUrl) {
    throw new Error('Success and cancel URLs are required');
  }
  
  console.log('✅ Parameters validated successfully');
  console.log('🔑 Access token available:', !!accessToken);
  console.log('🌐 Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('Supabase URL not configured');
  }
  
  const requestBody = {
    price_id: priceId,
    mode,
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
    customer_name: customerName,
    child_name: childName,
  };
  
  console.log('📤 Request body:', requestBody);
  
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📡 Checkout response status:', response.status);
    console.log('📡 Checkout response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Checkout error response text:', errorText);
      
      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { error: errorText };
      }
      
      console.error('❌ Checkout error response:', error);
      throw new Error(error.error || `HTTP ${response.status}: Failed to create checkout session`);
    }

    const responseData = await response.json();
    console.log('✅ Checkout response data:', responseData);
    
    if (!responseData.url) {
      throw new Error('No checkout URL returned from server');
    }
    
    if (!responseData.sessionId) {
      throw new Error('No session ID returned from server');
    }
    
    const { url, sessionId } = responseData;
    console.log('✅ Checkout URL created:', url);
    console.log('✅ Session ID:', sessionId);
    
    return { url, sessionId };
  } catch (fetchError) {
    console.error('❌ Network error during checkout:', fetchError);
    
    if (fetchError instanceof TypeError && fetchError.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to payment service. Please check your internet connection.');
    }
    
    throw fetchError;
  }
}