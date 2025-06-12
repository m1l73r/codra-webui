import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss(), tsconfigPaths({ root: './' }), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: "./dist/"
  },

});
