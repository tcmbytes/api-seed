import { callEndpoint, Method } from './shared/callEndpoint'

import { greetingsClient } from './shared/greetingsClient'

describe('POST /greetings should', () => {
  let GREETING_ID: string
  const cleanUp = (id: string) => {
    GREETING_ID = id
  }

  afterEach(() => async () => {
    await greetingsClient.removeById(GREETING_ID)
  })

  test('create new greeting', async () => {
    const body = {
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
    }

    const result = await callEndpoint('greetings', Method.Post, body)
    cleanUp(result.body.id)

    expect(result.status).toStrictEqual(201)

    expect(new Date(result.body.createdOn)).toBeInstanceOf(Date)
    expect(new Date(result.body.modifiedOn)).toBeInstanceOf(Date)

    expect(result.body).toMatchObject({
      id: expect.any(String),
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
      createdOn: expect.any(String),
      modifiedOn: expect.any(String),
    })
  })
})
