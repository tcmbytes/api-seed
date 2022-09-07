import { callEndpoint, Method } from './shared/callEndpoint'
import { greetingsClient } from './shared/greetingsClient'
import { UpdateGreetingBody } from './types'

describe('PUT /greeting/:greetingID should', () => {
  test('return an error message with status 404 when the requested greeting does not exist', async () => {
    const greetingID = 'greetingId'

    const request: UpdateGreetingBody = {
      message: 'Update message',
    }
    const result = await callEndpoint(Method.PUT, `/greetings/${greetingID}`, request)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toStrictEqual({
      message: `Greeting with id '${greetingID}' not found.`,
      status: 'Not Found',
      statusCode: 404,
    })
  })

  test('return the updated greeting with status 200 when the request is successful', async () => {
    const greeting = await greetingsClient.create()

    const request = {
      message: 'Update message',
    }
    const result = await callEndpoint(Method.PUT, `/greetings/${greeting.id}`, request)

    expect(result.status).toStrictEqual(200)

    expect(result.body.modifiedOn).not.toEqual(result.body.createdOn)
    expect(result.body).toStrictEqual({
      ...greeting,
      message: 'Update message',
      modifiedOn: expect.any(String),
    })

    await greetingsClient.removeById(greeting.id)
  })
})
