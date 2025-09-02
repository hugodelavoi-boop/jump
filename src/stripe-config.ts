// Stripe product configuration
export const products = {
  testRecurring: {
    id: 'prod_SyjqbAv8fqBKc2',
    priceId: 'price_1S2mMiCBYvO68Xc63X0b4m4y',
    name: 'Test Recurring',
    description: 'Recurring test product',
    mode: 'subscription' as const,
    price: 'A$20.00',
  },
  testProduct: {
    id: 'prod_SyjOWmyuC357d6',
    priceId: 'price_1S2lvTCBYvO68Xc6V7BFEXOK',
    name: 'Test Product',
    description: 'One-time test product',
    mode: 'payment' as const,
    price: 'A$20.00',
  },
} as const;

export type ProductKey = keyof typeof products;
export type Product = typeof products[ProductKey];