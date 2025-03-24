export default defineNuxtConfig({
  extends: [
    '@demo/ui',
    '@demo/data',
  ],
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-03-22',
  typescript: {
    // https://github.com/nuxt/nuxt/issues/20155
    includeWorkspace: true,
  } })
