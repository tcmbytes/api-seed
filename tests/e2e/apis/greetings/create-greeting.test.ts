import { callEndpoint, greetingsClient, Method } from '../../shared'

import { validate as validateUUID } from 'uuid'
import { CreateGreetingBody, Greeting } from '../../types'

describe('POST /greetings should', () => {
  test('return the created greeting with status 201 when the greeting is successfully created', async () => {
    const body: CreateGreetingBody = {
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
    }
    const result = await callEndpoint(Method.POST, '/greetings', body)
    const greeting: Greeting = result.body

    expect(result.status).toStrictEqual(201)

    expect(validateUUID(greeting.id)).toEqual(true)
    expect(new Date(greeting.createdOn)).toBeInstanceOf(Date)
    expect(new Date(greeting.modifiedOn)).toBeInstanceOf(Date)

    expect(greeting).toStrictEqual({
      id: expect.any(String),
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
      createdOn: expect.any(String),
      modifiedOn: expect.any(String),
    })

    await greetingsClient.removeById(result.body.id)
  })
})
