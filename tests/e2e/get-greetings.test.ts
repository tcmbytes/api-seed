import { callEndpoint, Method } from './shared/callEndpoint'
import { greetingsClient } from './shared/greetingsClient'

describe('GET /greetings should', () => {
  test('return an empty list with status 200 when there are no created greetings', async () => {
    const result = await callEndpoint(Method.GET, '/greetings')

    expect(result.status).toStrictEqual(200)
    expect(result.body).toMatchObject([])
  })

  test('return a list with all greetings with 200 when there are created greetings', async () => {
    const firstGreeting = await greetingsClient.create()
    const secondGreeting = await greetingsClient.create()

    const result = await callEndpoint(Method.GET, '/greetings')

    expect(result.status).toStrictEqual(200)
    expect(result.body).toStrictEqual([firstGreeting, secondGreeting])

    await greetingsClient.removeById(firstGreeting.id)
    await greetingsClient.removeById(secondGreeting.id)
  })
})
