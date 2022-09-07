import { callEndpoint, greetingsClient, Method } from '../../shared'

describe('GET /greeting/:greetingID should', () => {
  test('return an informative message with status 404 when the requested greeting does not exist', async () => {
    const greetingID = 'greetingId'

    const result = await callEndpoint(Method.GET, `/greetings/${greetingID}`)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toStrictEqual({
      message: `Greeting with id '${greetingID}' not found.`,
      status: 'Not Found',
      statusCode: 404,
    })
  })

  test('return the greeting with status 200 when the greeting is successfully retrieved', async () => {
    const greeting = await greetingsClient.create()

    const result = await callEndpoint(Method.GET, `/greetings/${greeting.id}`)

    expect(result.status).toStrictEqual(200)
    expect(result.body).toStrictEqual(greeting)

    await greetingsClient.removeById(greeting.id)
  })
})
