import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { deleteGreetingHandler } from 'delivery/api/handlers'
import { setupServer } from 'delivery/api/server'
import { GreetingsRepo } from 'domain/boundaries'
import { deleteGreetingUseCase } from 'domain/usecases'
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

const deleteGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo } = params

    const usecase = deleteGreetingUseCase({ repo })

    return deleteGreetingHandler({
      usecase,
    })
  }

const makeServer = (params: Params) => {
  const server = makeExpressServer()

  const handlerFactories: HandlerFactories = {
    deleteGreetingHandler: deleteGreetingHandlerFactory(params),
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

When('I delete the greeting', async () => {
  const server = makeServer({ repo })

  state.response = await server.delete(`/greetings/${GREETING.id}`).send()
})

Then('The greeting is successfully deleted', async () => {
  expect(state.response?.status).to.equal(204)
})

When('I delete a greeting that does not exists', async () => {
  const server = makeServer({ repo })

  state.response = await server.delete(`/greetings/${INVALID_UUID}`).send()
})
