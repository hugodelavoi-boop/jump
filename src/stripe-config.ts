export interface StripeProduct {
  priceId: string;
  name: string;
  description?: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  priceDisplay: string;
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    priceId: 'price_1STZkeCAVPkj28mpfOqCD3Uy',
    name: 'Clarkson Primary Trial',
    mode: 'payment',
    price: 0,
    currency: 'aud',
    priceDisplay: 'Free'
  },
  {
    priceId: 'price_1SQLk3CAVPkj28mpgjVdhRF1',
    name: 'Mindarie Primary Trial',
    mode: 'payment',
    price: 0,
    currency: 'aud',
    priceDisplay: 'Free'
  },
  {
    priceId: 'price_1SQLirCAVPkj28mpXKc8ZBiV',
    name: 'Quinns Beach Primary Trial',
    mode: 'payment',
    price: 0,
    currency: 'aud',
    priceDisplay: 'Free'
  },
  {
    priceId: 'price_1SIkDyCAVPkj28mpSbFutqat',
    name: 'Beldon Primary – Term 4 2025 Program Enrolment',
    description: 'One-term enrolment for Jump Start Sports\' after-school multi-sport sessions. Designed for kids aged 5–12, focused on confidence, movement, and fun. This is exclusive to Beldon Primary.',
    mode: 'payment',
    price: 105,
    currency: 'aud',
    priceDisplay: 'A$105.00'
  },
  {
    priceId: 'price_1RUIAfCAVPkj28mpKvB1jp0d',
    name: 'Jump Start Sports – Single Session Pass',
    description: 'One-time access to a fun, coach-led multi-sport session for children aged 5–12. Perfect for trial sessions, casual bookings, or make-up days. Each session includes a mix of energetic activities like soccer, dodgeball, AFL, and more — all in a safe, inclusive environment.',
    mode: 'payment',
    price: 20,
    currency: 'aud',
    priceDisplay: 'A$20.00'
  }
];

export const stripeProducts = STRIPE_PRODUCTS;

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};