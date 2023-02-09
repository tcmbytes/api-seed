import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { postGreetingHandler } from 'delivery/api/handlers'
import { setupServer } from 'delivery/api/server'
import { Generator, GreetingsRepo } from 'domain/boundaries'
import { createGreetingUseCase } from 'domain/usecases'
import {
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from 'main/factory/api'
import { HandlerFactories, HandlerFactory } from 'main/factory/api/types'
import { makeExpressServer } from 'main/factory/drivers'
import supertest from 'supertest'
import { dateGenerator, repo, state, uuidGenerator } from './common.steps'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
  uuidGenerator: Generator<string>
}

const postGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo, dateGenerator, uuidGenerator } = params

    const usecase = createGreetingUseCase({ repo, dateGenerator, uuidGenerator })

    return postGreetingHandler({
      usecase,
    })
  }

const makeServer = (params: Params) => {
  const server = makeExpressServer()

  const handlerFactories: HandlerFactories = {
    postGreetingHandler: postGreetingHandlerFactory(params),
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
const FROM = 'from@example.com'
const TO = 'to@example.com'
const MESSAGE = 'Greetings!'

When('I create a new greeting', async () => {
  uuidGenerator.next.returns(UUID)
  dateGenerator.next.returns(NOW)

  const server = makeServer({ repo, dateGenerator, uuidGenerator })
  const body = {
    from: FROM,
    to: TO,
    message: MESSAGE,
  }
  state.response = await server.post('/greetings').send(body)
})

Then('I receive the newly created greeting', async () => {
  expect(state.response?.status).to.equal(201)
  expect(state.response?.body).to.eql({
    id: UUID,
    from: FROM,
    to: TO,
    message: MESSAGE,
    createdOn: NOW.toJSON(),
    modifiedOn: NOW.toJSON(),
  })
})
