import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import i18nResources from "./src/includes/locale";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
      vue({
        template: {
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      }),
      i18nResources({
          path: resolve(__dirname, "src/locales/frontend"),
      }),
      [pluginRewriteAll()]
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: '@vue/compat',
      find: 'vue-i18n',
      replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
    },
    dedupe: ['vue']
  }
})
