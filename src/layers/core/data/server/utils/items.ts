import type { H3Event } from 'h3'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from '@demo/data/server/db/schema/items'

export { sql, eq, and, or } from 'drizzle-orm'

export const tableItems = schema.items

export function useDatabaseItems(event: H3Event) {
  const { DB_ITEMS } = event.context.cloudflare.env

  return drizzle(DB_ITEMS, { schema, logger: true })
}

export type Item = typeof tableItems.$inferSelect
