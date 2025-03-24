export default defineEventHandler(async (event) => {
  try {
    await useDatabaseItems().delete(tableItems)

    setResponseStatus(event, 204, 'All items deleted')
  } catch (exception: any) {
    // eslint-disable-next-line no-console
    console.error(exception)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
