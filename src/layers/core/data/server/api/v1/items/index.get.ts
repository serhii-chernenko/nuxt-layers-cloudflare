export default defineEventHandler(async (event) => {
  try {
    return await useDatabaseItems(event).select().from(tableItems).all()
  } catch (exception: any) {
    // eslint-disable-next-line no-console
    console.error(exception)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
