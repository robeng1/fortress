import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  css: {
    postcss,
  },
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: val => {
          return val.replace(/^~/, '');
        },
      },
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
