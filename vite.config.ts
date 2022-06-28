import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from "vite-tsconfig-paths"
import postcss from "./postcss.config.js"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  css: {
    postcss,
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'favicon.png', 'robots.txt', 'apple-touch-icon.png'],
      // switch to "true" to enable sw on development
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
    svgr(),
    tsconfigPaths(),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
