// Stripe product configuration
export const products = {
  termProgram: {
    id: 'prod_T2Ykf79bN3K3kL',
    priceId: 'price_1S6TdOCAVPkj28mpxzTc1zcK',
    name: 'Jump Start Sports – Term 4 2025 Program Enrolment',
    description: 'One-term enrolment for Jump Start Sports\' after-school multi-sport sessions. Designed for kids aged 5–12, focused on confidence, movement, and fun. Exact school and schedule to be confirmed.',
    mode: 'payment' as const,
    price: 'A$105.00',
  },
  beldonTrial: {
    id: 'prod_SzCm4sL2Aw6fZk',
    priceId: 'price_1S3EMdCAVPkj28mpISfKIsJJ',
    name: 'Jump Start Sports - St Simon Peter Primary Trial',
    description: '17/9/25 3-4pm',
    mode: 'payment' as const,
    price: 'A$0.00',
  },
  singleSession: {
    id: 'prod_SP6NiaaCeAa6CX',
    priceId: 'price_1RUIAfCAVPkj28mpKvB1jp0d',
    name: 'Jump Start Sports – Single Session Pass',
    description: 'One-time access to a fun, coach-led multi-sport session for children aged 5–12. Perfect for trial sessions, casual bookings, or make-up days. Each session includes a mix of energetic activities like soccer, dodgeball, AFL, and more — all in a safe, inclusive environment.',
    mode: 'payment' as const,
    price: 'A$20.00',
  },
} as const;

export type ProductKey = keyof typeof products;
export type Product = typeof products[ProductKey];