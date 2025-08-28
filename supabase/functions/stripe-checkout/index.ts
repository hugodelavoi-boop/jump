import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

function corsResponse(body: string | object | null, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}

Deno.serve(async (req) => {
  try {
    console.log('Stripe checkout function called');
    console.log('Request method:', req.method);
    
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const requestBody = await req.text();
    console.log('Request body:', requestBody);
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return corsResponse({ error: 'Invalid JSON in request body' }, 400);
    }
    
    const { price_id, success_url, cancel_url, mode } = parsedBody;
    console.log('Parsed parameters:', { price_id, success_url, cancel_url, mode });
    
    // Get user from JWT token
    const authHeader = req.headers.get('Authorization');
    console.log('Auth header present:', !!authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return corsResponse({ error: 'Authorization required' }, 401);
    }

    const validationError = validateParameters(
      { price_id, success_url, cancel_url, mode },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
      },
    );

    if (validationError) {
      console.error('Validation error:', validationError);
      return corsResponse({ error: validationError }, 400);
    }

    // Parse JWT to get user info (simplified - in production use proper JWT validation)
    const token = authHeader.replace('Bearer ', '');
    let userEmail: string;
    
    try {
      // For now, we'll extract email from the token payload
      // In production, you should properly validate the JWT
      const payload = JSON.parse(atob(token.split('.')[1]));
      userEmail = payload.email;
      console.log('User email from token:', userEmail);
    } catch (e) {
      console.error('Token parsing error:', e);
      return corsResponse({ error: 'Invalid token' }, 401);
    }
    
    console.log('Creating Stripe checkout session...');
    
    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode,
      success_url,
      cancel_url,
      customer_email: userEmail,
    });

    console.log('Stripe session created successfully:', session.id);
    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout function error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return corsResponse({ error: error.message }, 500);
  }
});

type ExpectedType = 'string' | 'email' | { values: string[] };
type Expectations<T> = { [K in keyof T]: ExpectedType };

function validateParameters<T extends Record<string, any>>(values: T, expected: Expectations<T>): string | undefined {
  // Iterate over expected parameters first to ensure all required fields are present
  for (const parameter in expected) {
    const expectation = expected[parameter];
    const value = values[parameter];

    // Check if the parameter exists
    if (value === undefined || value === null) {
      return `Missing required parameter: ${parameter}`;
    }

    // Validate string type
    if (expectation === 'string') {
      if (typeof value !== 'string' || value.trim() === '') {
        return `Invalid parameter ${parameter}: expected non-empty string, got ${JSON.stringify(value)}`;
      }
    } 
    // Validate email type
    else if (expectation === 'email') {
      if (typeof value !== 'string' || !isValidEmail(value)) {
        return `Invalid parameter ${parameter}: expected valid email address, got ${JSON.stringify(value)}`;
      }
    }
    // Validate enum values
    else if ('values' in expectation) {
      if (!expectation.values.includes(value)) {
        return `Invalid parameter ${parameter}: expected one of [${expectation.values.join(', ')}], got ${JSON.stringify(value)}`;
      }
    }
  }

  return undefined;
}
