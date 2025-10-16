export interface StripeProduct {
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  productId: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1SIkF2CAVPkj28mpFUpO9SmO',
    name: 'St Simon Peters – Term 4 2025 Program Enrolment',
    description: 'One-term enrolment for Jump Start Sports\' after-school multi-sport sessions. Designed for kids aged 5–12, focused on confidence, movement, and fun. This is exclusive to St Simon Peters.',
    mode: 'payment',
    price: 90.00,
    currency: 'AUD',
    productId: 'prod_TFEie9GJ2lPj59'
  },
  {
    priceId: 'price_1SIkDyCAVPkj28mpSbFutqat',
    name: 'Beldon Primary – Term 4 2025 Program Enrolment',
    description: 'One-term enrolment for Jump Start Sports\' after-school multi-sport sessions. Designed for kids aged 5–12, focused on confidence, movement, and fun. This is exclusive to Beldon Primary.',
    mode: 'payment',
    price: 105.00,
    currency: 'AUD',
    productId: 'prod_TFEh2cTv6OnGAF'
  },
  {
    priceId: 'price_1S3EMdCAVPkj28mpISfKIsJJ',
    name: 'Jump Start Sports - St Simon Peter Primary Trial',
    description: '14/10/25 3-4pm',
    mode: 'payment',
    price: 0.00,
    currency: 'AUD',
    productId: 'prod_SzCm4sL2Aw6fZk'
  },
  {
    priceId: 'price_1RUIAfCAVPkj28mpKvB1jp0d',
    name: 'Jump Start Sports – Single Session Pass',
    description: 'One-time access to a fun, coach-led multi-sport session for children aged 5–12. Perfect for trial sessions, casual bookings, or make-up days. Each session includes a mix of energetic activities like soccer, dodgeball, AFL, and more — all in a safe, inclusive environment.',
    mode: 'payment',
    price: 20.00,
    currency: 'AUD',
    productId: 'prod_SP6NiaaCeAa6CX'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductByProductId = (productId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.productId === productId);
};