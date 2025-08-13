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
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }

    if (req.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405);
    }

    const { price_id, success_url, cancel_url, mode, email } = await req.json();

    const error = validateParameters(
      { price_id, success_url, cancel_url, mode, email },
      {
        cancel_url: 'string',
        price_id: 'string',
        success_url: 'string',
        mode: { values: ['payment', 'subscription'] },
        email: 'email',
      },
    );

    if (error) {
      return corsResponse({ error }, 400);
    }

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
      customer_email: email,
    });

    return corsResponse({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error(`Checkout error: ${error.message}`);
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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}