import { callEndpoint, Method } from './shared/callEndpoint'
import { greetingsClient } from './shared/greetingsClient'

describe('GET /greeting/:greetingID should', () => {
  test('return an error message with status 404 when the requested greeting does not exist', async () => {
    const greetingID = 'greetingId'

    const result = await callEndpoint(Method.GET, `/greetings/${greetingID}`)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toStrictEqual({
      message: `Greeting with id '${greetingID}' not found.`,
      status: 'Not Found',
      statusCode: 404,
    })
  })

  test('return the greeting with status 200 when the requested greeting exists', async () => {
    const greeting = await greetingsClient.create()

    const result = await callEndpoint(Method.GET, `/greetings/${greeting.id}`)

    expect(result.status).toStrictEqual(200)
    expect(result.body).toStrictEqual(greeting)

    await greetingsClient.removeById(greeting.id)
  })
})
