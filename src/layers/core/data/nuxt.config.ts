import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: [
    '@demo/cloudflare',
    '@demo/ui',
  ],
  modules: ['@nuxt/eslint'],
  runtimeConfig: {
    public: {
      itemsLimit: 5,
    },
  },
  nitro: {
    cloudflare: {
      wrangler: {
        d1_databases: [
          {
            binding: 'DB_ITEMS',
            database_id: process.env.DB_ITEMS_ID ?? '__SET_IN_ENV__DB_ITEMS_ID__',
            database_name: process.env.DB_ITEMS_NAME ?? 'nuxt-layers-cloudflare',
            migrations_dir: resolve('.drizzle/migrations/items'),
            migrations_table: 'items',
          },
        ],
      },
    },
  },
})
