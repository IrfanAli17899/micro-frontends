import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'budget',
  exposes: {
    './Module': './src/bootstrap.ts',
  },
  shared: (lib, config) => {
    return {
      ...config,
      singleton: true,
      ...(lib === '@micro-frontends/shared' ? { import: "libs/shared/src/index.ts" } : {}),
    }
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
