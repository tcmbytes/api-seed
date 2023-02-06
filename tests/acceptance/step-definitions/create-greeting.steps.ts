import { Then, When } from '@cucumber/cucumber'
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
import supertest, { Response } from 'supertest'
import { CreateGreetingBody } from '../../e2e/types'

const makeServer = () => {
  const server = makeExpressServer()

  const handlersFactory = makeHandlersFactory(apiHandlerFactories)
  const middlewaresFactory = makeHandlersFactory(apiMiddlewareFactories)
  const errorHandersFactory = makeErrorHandlersFactory(errorHandlerFactories)

  setupServer({
    server,
    handlersFactory,
    middlewaresFactory,
    errorHandersFactory,
  })

  return supertest(server)
}

let result: Response

When('I request to create a new greering', async () => {
  const server = makeServer()
  const body: CreateGreetingBody = {
    from: 'from@example.com',
    to: 'to@example.com',
    message: 'hi!',
  }
  result = await server.post('/greetings').send(body)
})

Then('The greeting is successfully created', async () => {
  assert.strictEqual(result.status, 201)
})
