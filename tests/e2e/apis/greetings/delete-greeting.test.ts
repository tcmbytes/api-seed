import { callEndpoint, greetingsClient, Method } from '../../shared'
describe('DELETE /greeting/:greetingID should', () => {
  test('return an informative message with status 404 when the requested greeting does not exist', async () => {
    const greetingID = 'greetingId'

    const result = await callEndpoint(Method.DELETE, `/greetings/${greetingID}`)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toStrictEqual({
      message: `Greeting with id '${greetingID}' not found.`,
      status: 'Not Found',
      statusCode: 404,
    })
  })

  test('return no body with status 204 when the greeting is successfully deleted', async () => {
    const greeting = await greetingsClient.create()

    const result = await callEndpoint(Method.DELETE, `/greetings/${greeting.id}`)

    expect(result.status).toStrictEqual(204)
    expect(result.body).toStrictEqual({})
  })
})
