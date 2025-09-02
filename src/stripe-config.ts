// Stripe product configuration
export const products = {
  testProduct: {
    priceId: 'price_1S2lvTCBYvO68Xc6V7BFEXOK',
    name: 'Test Product',
    description: 'Test product for Jump Start Sports enrollment',
    mode: 'payment' as const,
    price: 'A$20.00',
  },
} as const;

export type ProductKey = keyof typeof products;
export type Product = typeof products[ProductKey];