import { Then, When } from '@cucumber/cucumber'
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
import supertest from 'supertest'
import { GREETING, INVALID_UUID, repo, state } from './common.steps'

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

When('I request the greeting details', async () => {
  const server = makeServer({ repo })

  state.response = await server.get(`/greetings/${GREETING.id}`).send()
})

Then('The greeting is successfully retrieved', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql({
    id: GREETING.id,
    from: GREETING.from,
    to: GREETING.to,
    message: GREETING.message,
    createdOn: GREETING.createdOn.toJSON(),
    modifiedOn: GREETING.modifiedOn.toJSON(),
  })
})

When('I request a greeting that does not exists', async () => {
  const server = makeServer({ repo })

  state.response = await server.get(`/greetings/${INVALID_UUID}`).send()
})
