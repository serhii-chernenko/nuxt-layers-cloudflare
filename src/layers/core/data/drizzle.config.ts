import { defineConfig } from 'drizzle-kit'

const { DB_ITEMS_LOCAL_URL } = process.env

const localDbCredentials = DB_ITEMS_LOCAL_URL
  ? {
    dbCredentials: {
      url: `file:.wrangler/state/v3/d1/miniflare-D1DatabaseObject/${DB_ITEMS_LOCAL_URL}.sqlite`,
    },
  }
  : {}

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/db/schema/items.ts',
  out: '.drizzle/migrations/items',
  ...localDbCredentials,
})
