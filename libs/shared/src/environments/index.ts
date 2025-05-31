export const config = {
  production: false,
  cartUrl: 'http://localhost:4201',
  productsUrl: 'http://localhost:4202',
  budgetUrl: 'http://localhost:4203'
};

export type Config = typeof config; 
