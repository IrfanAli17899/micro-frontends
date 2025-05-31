// const {}  = require('@nx/webpack');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (config, ctx) => {
  config.devServer = {
    ...(config.devServer ?? {}),
    port: 4201,
  };

  config.experiments = {
    ...(config.experiments ?? {}),
    outputModule: true,
  };
  
  config.output = {
    ...(config.output ?? {}),
    uniqueName: 'cart',
    publicPath: 'auto',
    scriptType: 'module',
  }

  config.optimization = {
    ...(config.optimization ?? {}),
    runtimeChunk: false,
  };

  config.plugins = [
    ...(config.plugins ?? []),
    new ModuleFederationPlugin({
      name: 'cart',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './apps/cart/src/bootstrap.ts',
      },
      library: { type: 'module' },
      shared: {
        '@micro-frontend-tutorial/shared': {
          singleton: true,
          requiredVersion: false,
          import: 'libs/shared/src/index.ts',
        },
      },
    }),
  ];
  return config;
};
