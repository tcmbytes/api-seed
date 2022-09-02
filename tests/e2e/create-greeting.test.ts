import 'dotenv/config'

import { Method, callEndpoint } from './shared/callEndpoint'

describe('POST /greetings should', () => {
  test('create new greeting', async () => {
    const body = {
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
    }

    const result = await callEndpoint('greetings', Method.Post, body)

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
