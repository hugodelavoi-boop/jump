import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        stripeWebhookSecret
      );
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return new Response(
        `Webhook signature verification failed: ${error.message}`,
        { status: 400 }
      );
    }

    // Handle product events
    if (event.type === 'product.created' || event.type === 'product.updated') {
      const product = event.data.object as Stripe.Product;
      
      // Get the default price for the product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        limit: 1,
      });

      if (prices.data.length > 0) {
        const price = prices.data[0];
        
        // Upsert the product data into Supabase
        const { error } = await supabase.from('stripe_products').upsert({
          product_id: product.id,
          price_id: price.id,
          name: product.name,
          description: product.description,
          mode: price.type === 'recurring' ? 'subscription' : 'payment',
          active: product.active,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'product_id'
        });

        if (error) {
          console.error('Error upserting product:', error);
          return new Response('Error updating product in database', { status: 500 });
        }
      }
    }

    // Handle product deletion
    if (event.type === 'product.deleted') {
      const product = event.data.object as Stripe.Product;
      
      const { error } = await supabase
        .from('stripe_products')
        .update({ 
          active: false,
          deleted_at: new Date().toISOString(),
        })
        .eq('product_id', product.id);

      if (error) {
        console.error('Error marking product as deleted:', error);
        return new Response('Error updating product in database', { status: 500 });
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});