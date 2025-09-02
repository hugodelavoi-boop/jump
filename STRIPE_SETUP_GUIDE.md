# Stripe Setup Guide

## Switching Between Sandbox and Live Mode

### Current Status
Your Stripe integration is currently configured for **LIVE MODE**. This means real payments are being processed.

## To Switch to Sandbox Mode (Recommended for Testing)

### Step 1: Get Your Test API Keys
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Make sure you're in **Test mode** (toggle in the top left should say "Test mode")
3. Go to Developers > API keys
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### Step 2: Update Supabase Environment Variables
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > Environment Variables
4. Update these variables:
   - `STRIPE_SECRET_KEY`: Your test secret key (`sk_test_...`)
   - `STRIPE_WEBHOOK_SECRET`: Your test webhook secret (`whsec_...`)

### Step 3: Create Test Products
1. In Stripe Dashboard (Test mode), go to Products
2. Create test versions of your products:
   - Jump Start Sports – Single Session Pass
   - Jump Start Sports – Term Program Enrolment
3. Copy the **Price IDs** (they'll start with `price_test_`)

### Step 4: Update Price IDs in Code
Update `src/stripe-config.ts` with your test price IDs:

```typescript
export const products = {
  singleSession: {
    priceId: 'price_test_YOUR_TEST_PRICE_ID_HERE',
    // ... rest of config
  },
  termProgram: {
    priceId: 'price_test_YOUR_OTHER_TEST_PRICE_ID_HERE',
    // ... rest of config
  },
} as const;
```

### Step 5: Set Up Test Webhook
1. In Stripe Dashboard (Test mode), go to Developers > Webhooks
2. Create a new webhook endpoint
3. URL: `https://YOUR_SUPABASE_PROJECT.supabase.co/functions/v1/stripe-webhook`
4. Events to send:
   - `product.created`
   - `product.updated` 
   - `product.deleted`
   - `checkout.session.completed`
5. Copy the webhook secret and update `STRIPE_WEBHOOK_SECRET` in Supabase

## Testing in Sandbox Mode

### Test Payment Methods
Use these test card numbers:
- **Successful payment**: `4242 4242 4242 4242`
- **Declined payment**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

### Verification
- Payments will show as "Test" in your Stripe dashboard
- No real money will be charged
- You can see all test transactions in the Stripe dashboard

## Switching Back to Live Mode

1. Update environment variables with live keys (`sk_live_`, `whsec_`)
2. Update price IDs in `src/stripe-config.ts` with live price IDs
3. Ensure webhook is set up for live mode
4. Test thoroughly before going live!

## Important Security Notes

- **Never commit API keys to version control**
- **Always test in sandbox mode first**
- **Keep test and live keys separate**
- **Monitor live transactions carefully**

## Troubleshooting

If payments aren't working after switching:
1. Check that all environment variables are updated
2. Verify price IDs match your Stripe dashboard
3. Ensure webhook is receiving events
4. Check Supabase function logs for errors