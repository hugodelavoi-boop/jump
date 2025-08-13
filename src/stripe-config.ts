export const products = {
  singleSession: {
    priceId: 'price_1RR7mLCAVPkj28mpfqVEMMai',
    name: 'Jump Start Sports – Single Session Pass',
    description: 'One-time access to a fun, coach-led multi-sport session for children aged 5–12. Perfect for trial sessions, casual bookings, or make-up days. Each session includes a mix of energetic activities like soccer, dodgeball, AFL, and more — all in a safe, inclusive environment.',
    mode: 'payment' as const,
  },
  termProgram: {
    priceId: 'price_1RR7hvCAVPkj28mpe4xQ3Slc',
    name: 'Jump Start Sports – Term Program Enrolment',
    description: 'One-term enrolment for Jump Start Sports\' after-school multi-sport sessions. Designed for kids aged 5–12, focused on confidence, movement, and fun. Exact school and schedule to be confirmed.',
    mode: 'payment' as const,
  },
} as const;