import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const plugins = [vue()]

  // Load Vue DevTools only for `vite serve` and only when explicitly enabled
  if (command === 'serve' && process.env.ENABLE_VUE_DEVTOOLS === '1') {
    const { default: vueDevTools } = await import('vite-plugin-vue-devtools')
    plugins.push(vueDevTools())
  }

  return {
    base: "/PortfolioWebsite/",
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    css: {
      preprocessorOptions: {
        css: {
          charset: false, // Prevent charset issues with Tailwind
        },
      },
    },
  }
})
