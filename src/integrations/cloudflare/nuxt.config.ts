export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'nitro-cloudflare-dev'],
  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        name: 'nuxt-layers-cloudflare',
      },
    },
    cloudflareDev: {
      configPath: 'dist/_worker.js/wrangler.json',
    },
  },
})
