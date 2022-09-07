import { callEndpoint, Method } from './shared/callEndpoint'
import { greetingsClient } from './shared/greetingsClient'

describe('PUT /greeting/:greetingID should', () => {
  test('return 404 Not found when the greeting by the provided ID doesnt exist', async () => {
    const greetingID = 'greetingId'
    const request = {
      message: 'Update message',
    }

    const result = await callEndpoint(Method.PUT, `/greetings/${greetingID}`, request)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toMatchObject({
      message: `Greeting with id '${greetingID}' not found.`,
    })
  })

  test('return 200 when the greeting is successfully updated', async () => {
    const response = await greetingsClient.create()
    const greetingID = response.data.id

    const request = {
      message: 'Update message',
    }
    const result = await callEndpoint(Method.PUT, `/greetings/${greetingID}`, request)

    expect(result.status).toStrictEqual(200)

    expect(new Date(result.body.createdOn)).toBeInstanceOf(Date)
    expect(new Date(result.body.modifiedOn)).toBeInstanceOf(Date)

    expect(result.body).toMatchObject({
      id: expect.any(String),
      from: expect.any(String),
      to: expect.any(String),
      message: 'Update message',
      createdOn: expect.any(String),
      modifiedOn: expect.any(String),
    })

    await greetingsClient.removeById(greetingID)
  })
})
