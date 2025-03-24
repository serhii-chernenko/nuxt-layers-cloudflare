import { drizzle } from 'drizzle-orm/d1'

import * as schema from '@demo/data/server/db/schema/items'

export { sql, eq, and, or } from 'drizzle-orm'

export const tableItems = schema.items

export function useDatabaseItems() {
  const db = (globalThis as any).__env__.DB_ITEMS as D1Database

  if (!db) {
    throw new Error('Database not found')
  }

  return drizzle(db, { schema })
}

export type Item = typeof tableItems.$inferSelect
