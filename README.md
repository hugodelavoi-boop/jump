# jumpstart

## Current Mode: SANDBOX (Test Mode)

The application is currently configured for Stripe sandbox mode. This means:
- No real payments will be processed
- Use test card numbers like 4242 4242 4242 4242
- All transactions are simulated

## Stripe Configuration

This project uses Stripe for payment processing. To switch between sandbox (test) and live modes:

### Sandbox Mode (Testing)
1. In your Supabase dashboard, go to Settings > Environment Variables
2. Update these environment variables with your Stripe **test** keys:
   - `STRIPE_SECRET_KEY`: Your test secret key (starts with `sk_test_`)
   - `STRIPE_WEBHOOK_SECRET`: Your test webhook endpoint secret (starts with `whsec_`)

### Live Mode (Production)
1. Update the same environment variables with your Stripe **live** keys:
   - `STRIPE_SECRET_KEY`: Your live secret key (starts with `sk_live_`)
   - `STRIPE_WEBHOOK_SECRET`: Your live webhook endpoint secret (starts with `whsec_`)

### Important Notes:
- Test mode uses fake payment methods and won't charge real money
- Live mode processes real payments and charges real money
- Always test thoroughly in sandbox mode before switching to live
- Products and prices need to be created separately in test and live modes

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/hugodelav/jumpstart)