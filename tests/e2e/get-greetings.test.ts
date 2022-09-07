import { callEndpoint, Method } from './shared/callEndpoint'
import { greetingsClient } from './shared/greetingsClient'

describe('GET /greetings should', () => {
  test('return 200 and an empty array when there are no greetings in the list', async () => {
    const result = await callEndpoint(Method.GET, '/greetings')

    expect(result.status).toStrictEqual(200)
    expect(result.body).toMatchObject([])
  })

  test('return 200 and the list off all greetings', async () => {
    const firstGreeting = await greetingsClient.create()
    const secondGreeting = await greetingsClient.create()

    const result = await callEndpoint(Method.GET, '/greetings')

    expect(result.status).toStrictEqual(200)
    expect(result.body).toMatchObject([firstGreeting.data, secondGreeting.data])

    await greetingsClient.removeById(firstGreeting.data.id)
    await greetingsClient.removeById(secondGreeting.data.id)
  })
})
