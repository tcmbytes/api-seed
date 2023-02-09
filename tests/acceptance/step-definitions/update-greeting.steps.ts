import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { putGreetingHandler } from 'delivery/api/handlers'
import { setupServer } from 'delivery/api/server'
import { Generator, GreetingsRepo } from 'domain/boundaries'
import { updateGreetingUseCase } from 'domain/usecases'
import {
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from 'main/factory/api'
import { HandlerFactories, HandlerFactory } from 'main/factory/api/types'
import { makeExpressServer } from 'main/factory/drivers'
import supertest from 'supertest'
import { UpdateGreetingBody } from '../../e2e/types'
import { dateGenerator, GREETING, INVALID_UUID, repo, state } from './common.steps'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
}

const putGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo, dateGenerator } = params

    const usecase = updateGreetingUseCase({ repo, dateGenerator })

    return putGreetingHandler({
      usecase,
    })
  }

const makeServer = (params: Params) => {
  const server = makeExpressServer()

  const handlerFactories: HandlerFactories = {
    putGreetingHandler: putGreetingHandlerFactory(params),
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

const NOW = new Date()
const MESSAGE = 'New message'

When('I update the greeting', async () => {
  dateGenerator.next.returns(NOW)

  const server = makeServer({ repo, dateGenerator })
  const body: UpdateGreetingBody = {
    message: MESSAGE,
  }
  state.response = await server.put(`/greetings/${GREETING.id}`).send(body)
})

Then('I receive the updated greeting', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql({
    id: GREETING.id,
    from: GREETING.from,
    to: GREETING.to,
    message: MESSAGE,
    createdOn: GREETING.createdOn.toJSON(),
    modifiedOn: NOW.toJSON(),
  })
})

When('I try to update a greeting that does not exist', async () => {
  const server = makeServer({ repo, dateGenerator })
  const body: UpdateGreetingBody = {
    message: MESSAGE,
  }
  state.response = await server.put(`/greetings/${INVALID_UUID}`).send(body)
})
