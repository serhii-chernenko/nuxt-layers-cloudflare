export default defineEventHandler(async (event) => {
  try {
    return await useDatabaseItems(event).insert(tableItems)
      .values({
        name: 'Item 1',
        createdAt: new Date(),
      })
      .returning()
      .get()
  } catch (exception: any) {
    // eslint-disable-next-line no-console
    console.error(exception)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
