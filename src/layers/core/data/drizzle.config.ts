import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/db/schema/items.ts',
  out: '.drizzle/migrations/items',
})
