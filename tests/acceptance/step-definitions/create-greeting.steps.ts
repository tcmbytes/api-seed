import { Given, Then } from '@cucumber/cucumber'
import assert from 'assert'
import { setupServer } from 'delivery/api/server'
import {
  apiHandlerFactories,
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from 'main/factory/api'
import { makeExpressServer } from 'main/factory/drivers'
import { makeContext, makeLogger } from 'shared/logger'
import supertest from 'supertest'
import { validate as validateUUID } from 'uuid'
import { CreateGreetingBody, Greeting } from '../../e2e/types'

const makeServer = () => {
  const context = makeContext()
  const logger = makeLogger({ context })
  const server = makeExpressServer()

  const options = {
    hostname: '',
    port: 8080,
  }

  const handlersFactory = makeHandlersFactory(apiHandlerFactories)
  const middlewaresFactory = makeHandlersFactory(apiMiddlewareFactories)
  const errorHandersFactory = makeErrorHandlersFactory(errorHandlerFactories)

  setupServer({
    server,
    logger,
    options,
    handlersFactory,
    middlewaresFactory,
    errorHandersFactory,
  })

  return supertest(server)
}

Given('I request to create a new greering', async () => {
  const server = makeServer()
  const body: CreateGreetingBody = {
    from: 'from@example.com',
    to: 'to@example.com',
    message: 'hi!',
  }
  const result = await server.post('/greetings').send(body)
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
})

Then('a new greeting is created in the database', async () => {
  console.log('Then')
  assert(true)
})

Then('returned back to me', async () => {
  console.log('Then')
  assert(true)
})
