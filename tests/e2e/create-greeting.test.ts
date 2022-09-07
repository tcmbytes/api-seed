import { callEndpoint, Method } from './shared/callEndpoint'

import { Greeting } from 'domain/types'
import { validate as validateUUID } from 'uuid'
import { greetingsClient } from './shared/greetingsClient'
import { CreateGreetingBody } from './types'

describe('POST /greetings should', () => {
  test('return the created greeting with status 201 when the greeting is created with success', async () => {
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
