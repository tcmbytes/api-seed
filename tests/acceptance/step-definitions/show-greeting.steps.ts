import { Before, Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { getGreetingHandler } from 'delivery/api/handlers'
import { setupServer } from 'delivery/api/server'
import { GreetingsRepo } from 'domain/boundaries'
import { showGreetingUseCase } from 'domain/usecases'
import {
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from 'main/factory/api'
import { HandlerFactories, HandlerFactory } from 'main/factory/api/types'
import { makeExpressServer } from 'main/factory/drivers'
import supertest, { Response } from 'supertest'
import { stubInterface } from 'ts-sinon'
import { Greeting } from '../../e2e/types'

type Params = {
  repo: GreetingsRepo
}

const getGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo } = params

    const usecase = showGreetingUseCase({ repo })

    return getGreetingHandler({
      usecase,
    })
  }

const makeServer = (params: Params) => {
  const server = makeExpressServer()

  const handlerFactories: HandlerFactories = {
    getGreetingHandler: getGreetingHandlerFactory(params),
  }

  const handlersFactory = makeHandlersFactory(handlerFactories)
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

const NOW = new Date('2022-07-20')
const UUID = 'uuid'
const INVALID_UUID = 'invalid_uuid'
const FROM = 'from@example.com'
const TO = 'to@example.com'
const MESSAGE = 'hi!'

let result: Response
let greeting: Greeting

const repo = stubInterface<GreetingsRepo>()

Before(() => {
  repo.findById.resolves(undefined)
})

Given('I have previously created a greeting', async () => {
  const greeting: Greeting = {
    id: UUID,
    from: FROM,
    to: TO,
    message: MESSAGE,
    createdOn: NOW,
    modifiedOn: NOW,
  }

  repo.findById.resolves(greeting)
})

When('I request the greeting details', async () => {
  const server = makeServer({ repo })

  result = await server.get(`/greetings/${UUID}`).send()
  greeting = result.body
})

Then('The greeting is successfully retrieved', async () => {
  expect(result.status).to.equal(200)
  expect(greeting).to.eql({
    id: UUID,
    from: FROM,
    to: TO,
    message: MESSAGE,
    createdOn: NOW.toJSON(),
    modifiedOn: NOW.toJSON(),
  })
})

When('I request a greeting that does not exists', async () => {
  const server = makeServer({ repo })

  result = await server.get(`/greetings/${INVALID_UUID}`).send()
  greeting = result.body
})

Then('I receive a 404 error and message', async () => {
  expect(result.status).to.equal(404)
  expect(greeting).to.eql({
    status: 'Not Found',
    statusCode: 404,
    message: `Greeting with id '${INVALID_UUID}' not found.`,
  })
})
