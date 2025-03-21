import { createResolver } from '@nuxt/kit'
import tailwindcss from '@tailwindcss/vite'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  css: [resolve('./assets/css/main.css')],
  compatibilityDate: '2025-01-27',
  vite: {
    plugins: [tailwindcss()],
  },
})
