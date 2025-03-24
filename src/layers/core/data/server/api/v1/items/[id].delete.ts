export default defineEventHandler(async (event) => {
  try {
    const params = await getValidatedRouterParams(
      event,
      z.object({
        id: z.string().nonempty().max(255),
      }).safeParse,
    )

    if (params.error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid URL parameters',
        data: params.error,
      })
    }

    await useDatabaseItems()
      .delete(tableItems)
      .where(and(
        eq(tableItems.id, Number(params.data.id)),
      ))

    setResponseStatus(event, 204, 'Item deleted')
  } catch (exception: any) {
    // eslint-disable-next-line no-console
    console.error(exception)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
