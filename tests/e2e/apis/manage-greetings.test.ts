import { Response } from 'supertest'
import { callEndpoint, Method } from '../shared'
import { GreetingBody } from '../types'

describe('Manage greetings flow', () => {
  let response: Response
  let greeting: GreetingBody

  test('successfully creates, gets, edits and deletes greetings', async () => {
    response = await callEndpoint(Method.POST, '/greetings', {
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
    })
    greeting = response.body

    expect(response.status).toStrictEqual(201)
    expect(greeting).toStrictEqual({
      id: expect.any(String),
      from: 'from@example.com',
      to: 'to@example.com',
      message: 'hi!',
      createdOn: expect.any(String),
      modifiedOn: expect.any(String),
    })

    response = await callEndpoint(Method.GET, '/greetings')

    expect(response.status).toStrictEqual(200)
    expect(response.body).toStrictEqual([greeting])

    response = await callEndpoint(Method.GET, `/greetings/${greeting.id}`)

    expect(response.status).toStrictEqual(200)
    expect(response.body).toStrictEqual(greeting)

    response = await callEndpoint(Method.PUT, `/greetings/${greeting.id}`, {
      message: 'Update message',
    })

    expect(response.status).toStrictEqual(200)
    expect(response.body.modifiedOn).not.toEqual(response.body.createdOn)
    expect(response.body).toStrictEqual({
      ...greeting,
      message: 'Update message',
      modifiedOn: expect.any(String),
    })

    response = await callEndpoint(Method.DELETE, `/greetings/${greeting.id}`)

    expect(response.status).toStrictEqual(204)
    expect(response.body).toStrictEqual({})
  })
})
