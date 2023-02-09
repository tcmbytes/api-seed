import { Given, Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { getGreetingsHandler } from 'delivery/api/handlers'
import { setupServer } from 'delivery/api/server'
import { GreetingsRepo } from 'domain/boundaries'
import { GreetingBuilder } from 'domain/types'
import { listGreetingsUseCase } from 'domain/usecases'
import {
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from 'main/factory/api'
import { HandlerFactories, HandlerFactory } from 'main/factory/api/types'
import { makeExpressServer } from 'main/factory/drivers'
import supertest from 'supertest'
import { repo, state } from './common.steps'

type Params = {
  repo: GreetingsRepo
}

const getGreetingsHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo } = params

    const usecase = listGreetingsUseCase({ repo })

    return getGreetingsHandler({
      usecase,
    })
  }

const makeServer = (params: Params) => {
  const server = makeExpressServer()

  const handlerFactories: HandlerFactories = {
    getGreetingsHandler: getGreetingsHandlerFactory(params),
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

const greetings = [GreetingBuilder.build(), GreetingBuilder.build(), GreetingBuilder.build(), GreetingBuilder.build()]

Given('I have a bunch of greetings created', async () => {
  repo.findAll.resolves(greetings)
})

When('I request to list all greetings', async () => {
  const server = makeServer({ repo })

  state.response = await server.get('/greetings').send()
})

Then('The greetings are successfully listed', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql(
    greetings.map((item) => ({
      ...item,
      createdOn: item.createdOn.toJSON(),
      modifiedOn: item.modifiedOn.toJSON(),
    })),
  )
})

Given('I have no greetings created', async () => {
  repo.findAll.resolves([])
})

Then('I receive an empty list', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql([])
})
