import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    conditions: ['development', 'browser'],
  },
  optimizeDeps: {
    exclude: ['drizzle-orm', '@neondatabase/serverless'] // Add any server-only dependencies here
  }
});