/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';


export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/products',
  server: {
    port: 4203,
    host: 'localhost',
  },
  preview: {
    port: 4203,
    host: 'localhost',
  },
  plugins: [svelte(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']),
  federation({
    name: 'products',
    filename: 'remoteEntry.js',
    exposes: {
      './Module': './src/bootstrap.ts',
    },
    shared: {
      '@micro-frontend-tutorial/shared': {
        requiredVersion: false,
        packagePath: 'libs/shared/src/index.ts',
      },
    },
  }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/products',
    assetsDir: '',
    target: 'esnext',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
