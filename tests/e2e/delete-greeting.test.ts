import 'dotenv/config'

import { Method, callEndpoint } from './shared/callEndpoint'

describe('DETELE /greeting/:greetingID should', () => {
  test('return 404 Not found when the greeting by the provided ID doesnt exist', async () => {
    const greetingID = 'greetingId'

    const result = await callEndpoint(`greetings/${greetingID}`, Method.Delete)

    expect(result.status).toStrictEqual(404)
    expect(result.body).toMatchObject({
      message: `Greeting with id '${greetingID}' not found.`,
    })
  })
})
