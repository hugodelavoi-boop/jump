import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Jump Start Sports Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
};

Deno.serve(async (req) => {
  try {
    console.log(`🔔 Webhook received: ${req.method} at ${new Date().toISOString()}`);

    if (req.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204,
        headers: corsHeaders 
      });
    }

    if (req.method !== 'POST') {
      console.error('❌ Invalid method:', req.method);
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });
    }

    // Validate environment variables
    if (!stripeSecret || !stripeWebhookSecret) {
      console.error('❌ Missing required environment variables');
      return new Response('Server configuration error', { 
        status: 500,
        headers: corsHeaders 
      });
    }

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      console.error('❌ No Stripe signature found in headers');
      return new Response('No signature found', { 
        status: 400,
        headers: corsHeaders 
      });
    }

    const body = await req.text();
    console.log(`📦 Webhook body length: ${body.length} characters`);

    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        stripeWebhookSecret
      );
      console.log(`✅ Webhook signature verified for event: ${event.type}`);
    } catch (error: any) {
      console.error(`❌ Webhook signature verification failed: ${error.message}`);
      return new Response(
        `Webhook signature verification failed: ${error.message}`,
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    console.log(`🎯 Processing event: ${event.type} (ID: ${event.id})`);

    // Handle product events
    if (event.type === 'product.created' || event.type === 'product.updated') {
      console.log(`📦 Processing product event: ${event.type}`);
      const product = event.data.object as Stripe.Product;
      
      try {
        // Get the default price for the product
        const prices = await stripe.prices.list({
          product: product.id,
          active: true,
          limit: 1,
        });

        console.log(`💰 Found ${prices.data.length} active prices for product ${product.id}`);

        if (prices.data.length > 0) {
          const price = prices.data[0];
          
          // Format price for display
          let priceDisplay = null;
          if (price.unit_amount !== null && price.currency) {
            const amount = price.unit_amount / 100; // Convert from cents
            const currency = price.currency.toUpperCase();
            priceDisplay = `${currency === 'AUD' ? 'A$' : currency}${amount.toFixed(2)}`;
          }
          
          console.log(`💵 Price display: ${priceDisplay}`);
          
          // Upsert the product data into Supabase
          const productData = {
            product_id: product.id,
            price_id: price.id,
            name: product.name,
            description: product.description || null,
            mode: price.type === 'recurring' ? 'subscription' : 'payment',
            active: product.active,
            price_display: priceDisplay,
            updated_at: new Date().toISOString(),
          };

          console.log(`📝 Upserting product data:`, productData);

          const { error } = await supabase
            .from('stripe_products')
            .upsert(productData, {
              onConflict: 'product_id'
            });

          if (error) {
            console.error('❌ Error upserting product:', error);
            throw error;
          } else {
            console.log(`✅ Successfully updated product: ${product.name} (${product.id})`);
          }
        } else {
          console.warn(`⚠️ No active prices found for product ${product.id}, skipping database update`);
        }
      } catch (productError) {
        console.error(`❌ Error processing product ${product.id}:`, productError);
        return new Response(`Error processing product: ${productError.message}`, { 
          status: 500,
          headers: corsHeaders 
        });
      }
    }

    // Handle product deletion
    else if (event.type === 'product.deleted') {
      console.log(`🗑️ Processing product deletion`);
      const product = event.data.object as Stripe.Product;
      
      try {
        const { error } = await supabase
          .from('stripe_products')
          .update({ 
            active: false,
            deleted_at: new Date().toISOString(),
          })
          .eq('product_id', product.id);

        if (error) {
          console.error('❌ Error marking product as deleted:', error);
          throw error;
        } else {
          console.log(`✅ Successfully marked product as deleted: ${product.name} (${product.id})`);
        }
      } catch (deleteError) {
        console.error(`❌ Error deleting product ${product.id}:`, deleteError);
        return new Response(`Error deleting product: ${deleteError.message}`, { 
          status: 500,
          headers: corsHeaders 
        });
      }
    }

    // Handle checkout session completion
    else if (event.type === 'checkout.session.completed') {
      console.log(`💳 Processing checkout session completion`);
      const session = event.data.object as Stripe.CheckoutSession;
      console.log(`💳 Checkout session completed: ${session.id}`);
      
      try {
        // Update enrollment status to completed
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from('enrollments')
          .update({ 
            status: 'completed',
            updated_at: new Date().toISOString(),
          })
          .eq('checkout_session_id', session.id)
          .select();

        if (enrollmentError) {
          console.error('❌ Error updating enrollment status:', enrollmentError);
        } else {
          console.log(`✅ Updated ${enrollmentData?.length || 0} enrollment(s) to completed for session: ${session.id}`);
        }

        // Handle subscription creation
        if (session.mode === 'subscription' && session.subscription) {
          console.log(`🔄 Processing subscription creation for session: ${session.id}`);
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          
          // First, get or create the customer record
          const { data: existingCustomer } = await supabase
            .from('stripe_customers')
            .select('*')
            .eq('customer_id', session.customer as string)
            .single();

          if (!existingCustomer && session.customer_details?.email) {
            console.log(`👤 Creating customer record for: ${session.customer_details.email}`);
            // Try to find the user by email
            const { data: userData } = await supabase.auth.admin.listUsers();
            const user = userData.users.find(u => u.email === session.customer_details?.email);
            
            if (user) {
              const { error: customerError } = await supabase
                .from('stripe_customers')
                .insert({
                  user_id: user.id,
                  customer_id: session.customer as string,
                });

              if (customerError) {
                console.error('❌ Error creating customer record:', customerError);
              } else {
                console.log(`✅ Created customer record for user: ${user.email}`);
              }
            }
          }

          // Upsert subscription data
          const subscriptionData = {
            customer_id: session.customer as string,
            subscription_id: subscription.id,
            price_id: subscription.items.data[0]?.price.id,
            current_period_start: subscription.current_period_start,
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
            status: subscription.status as any,
            updated_at: new Date().toISOString(),
          };

          const { error: subscriptionError } = await supabase
            .from('stripe_subscriptions')
            .upsert(subscriptionData, {
              onConflict: 'customer_id'
            });

          if (subscriptionError) {
            console.error('❌ Error updating subscription:', subscriptionError);
          } else {
            console.log(`✅ Updated subscription for customer: ${session.customer}`);
          }
        }

        // Handle one-time payment
        if (session.mode === 'payment' && session.payment_intent) {
          console.log(`💰 Processing one-time payment for session: ${session.id}`);
          
          const orderData = {
            checkout_session_id: session.id,
            payment_intent_id: session.payment_intent as string,
            customer_id: session.customer as string || 'guest',
            amount_subtotal: session.amount_subtotal || 0,
            amount_total: session.amount_total || 0,
            currency: session.currency || 'aud',
            payment_status: session.payment_status,
            status: 'completed' as any,
          };

          const { error: orderError } = await supabase
            .from('stripe_orders')
            .insert(orderData);

          if (orderError) {
            console.error('❌ Error creating order record:', orderError);
          } else {
            console.log(`✅ Created order record for session: ${session.id}`);
          }
        }
      } catch (checkoutError) {
        console.error(`❌ Error processing checkout session ${session.id}:`, checkoutError);
        return new Response(`Error processing checkout: ${checkoutError.message}`, { 
          status: 500,
          headers: corsHeaders 
        });
      }
    }

    // Handle other events
    else {
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    console.log(`✅ Webhook processed successfully for event: ${event.type} at ${new Date().toISOString()}`);
    return new Response(JSON.stringify({ 
      received: true,
      event_type: event.type,
      event_id: event.id,
      processed_at: new Date().toISOString()
    }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });

  } catch (error: any) {
    console.error('💥 Webhook processing error:', error);
    console.error('💥 Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), { 
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });
  }
});