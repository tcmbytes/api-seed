import { callEndpoint, Method } from './shared/callEndpoint'

import { greetingsClient } from './shared/greetingsClient'

describe('DETELE /greeting/:greetingID should', () => {
  test('return 404 Not found when the greeting by the provided ID doesnt exist', async () => {
    const greetingID = 'greetingId'

    const result = await callEndpoint(`greetings/${greetingID}`, Method.Delete)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toMatchObject({
      message: `Greeting with id '${greetingID}' not found.`,
    })
  })

  test('return 204 when the greeting is successfully deleted', async () => {
    const response = await greetingsClient.create()
    const greetingID = response.data.id

    const result = await callEndpoint(`greetings/${greetingID}`, Method.Delete)

    expect(result.status).toStrictEqual(204)
    expect(result.body).toMatchObject({})
  })
})
