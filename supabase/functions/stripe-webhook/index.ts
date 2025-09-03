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
        
        // Format price for display
        let priceDisplay = 'Contact for pricing';
        if (price.unit_amount && price.currency) {
          const amount = price.unit_amount / 100; // Convert from cents
          const currency = price.currency.toUpperCase();
          priceDisplay = `${currency === 'AUD' ? 'A$' : currency}${amount.toFixed(2)}`;
        }
        
        // Upsert the product data into Supabase
        const { error } = await supabase.from('stripe_products').upsert({
          product_id: product.id,
          price_id: price.id,
          name: product.name,
          description: product.description,
          mode: price.type === 'recurring' ? 'subscription' : 'payment',
          active: product.active,
          price_display: priceDisplay,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'product_id'
        });

        if (error) {
          console.error('Error upserting product:', error);
          return new Response('Error updating product in database', { status: 500 });
        } else {
          console.log(`✅ Successfully updated product: ${product.name} (${product.id}) at ${new Date().toISOString()}`);
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
      } else {
        console.log(`✅ Successfully marked product as deleted: ${product.name} (${product.id}) at ${new Date().toISOString()}`);
      }
    }

    // Handle checkout session completion
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.CheckoutSession;
      console.log(`💳 Checkout session completed: ${session.id}`);
      
      // Update enrollment status to completed
      const { error: enrollmentError } = await supabase
        .from('enrollments')
        .update({ 
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('checkout_session_id', session.id);

      if (enrollmentError) {
        console.error('Error updating enrollment status:', enrollmentError);
      } else {
        console.log(`✅ Updated enrollment status to completed for session: ${session.id}`);
      }

      // Handle subscription creation
      if (session.mode === 'subscription' && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        // First, get or create the customer record
        const { data: existingCustomer } = await supabase
          .from('stripe_customers')
          .select('*')
          .eq('customer_id', session.customer as string)
          .single();

        if (!existingCustomer && session.customer_details?.email) {
          // Try to find the user by email
          const { data: userData } = await supabase.auth.admin.listUsers();
          const user = userData.users.find(u => u.email === session.customer_details?.email);
          
          if (user) {
            await supabase.from('stripe_customers').insert({
              user_id: user.id,
              customer_id: session.customer as string,
            });
          }
        }

        // Upsert subscription data
        const { error: subscriptionError } = await supabase
          .from('stripe_subscriptions')
          .upsert({
            customer_id: session.customer as string,
            subscription_id: subscription.id,
            price_id: subscription.items.data[0]?.price.id,
            current_period_start: subscription.current_period_start,
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
            status: subscription.status,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'customer_id'
          });

        if (subscriptionError) {
          console.error('Error updating subscription:', subscriptionError);
        } else {
          console.log(`✅ Updated subscription for customer: ${session.customer}`);
        }
      }

      // Handle one-time payment
      if (session.mode === 'payment' && session.payment_intent) {
        const { error: orderError } = await supabase
          .from('stripe_orders')
          .insert({
            checkout_session_id: session.id,
            payment_intent_id: session.payment_intent as string,
            customer_id: session.customer as string,
            amount_subtotal: session.amount_subtotal || 0,
            amount_total: session.amount_total || 0,
            currency: session.currency || 'aud',
            payment_status: session.payment_status,
            status: 'completed',
          });

        if (orderError) {
          console.error('Error creating order record:', orderError);
        } else {
          console.log(`✅ Created order record for session: ${session.id}`);
        }
      }
    }

    console.log(`📝 Webhook processed successfully for event: ${event.type} at ${new Date().toISOString()}`);
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