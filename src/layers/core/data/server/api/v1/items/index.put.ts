export default defineEventHandler(async () => {
  try {
    return await useDatabaseItems().insert(tableItems)
      .values({
        name: 'Item',
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
