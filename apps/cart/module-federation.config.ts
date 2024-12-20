import { ModuleFederationConfig } from '@nx/webpack';


const config: ModuleFederationConfig = {
  name: 'cart',
  exposes: {
    './Module': 'apps/cart/src/bootstrap.ts'
  },
  shared: (lib, config) => {
    return {
      ...config,
      singleton: true,
      ...(lib === '@micro-frontends/shared' ? { import: "libs/shared/src/index.ts" } : {}),
    }
  }
};

export default config;