import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import tsconfigPaths from "vite-tsconfig-paths"
import postcss from "./postcss.config.js"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import replace from '@rollup/plugin-replace'

const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString(), preventAssignment: true }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
    ; (pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
    ; (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}


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
    svgr(),
    tsconfigPaths(),
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
