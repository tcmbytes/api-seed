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
import supertest, { Response } from 'supertest'
import { stubInterface } from 'ts-sinon'
import { CreateGreetingBody, Greeting } from '../../e2e/types'

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

let result: Response
let greeting: Greeting

When('I request to create a new greering', async () => {
  const repo: GreetingsRepo = stubInterface<GreetingsRepo>()

  const uuidGenerator = stubInterface<Generator<string>>()
  uuidGenerator.next.returns(UUID)

  const dateGenerator = stubInterface<Generator<Date>>()
  dateGenerator.next.returns(NOW)

  const server = makeServer({ repo, dateGenerator, uuidGenerator })
  const body: CreateGreetingBody = {
    from: 'from@example.com',
    to: 'to@example.com',
    message: 'hi!',
  }
  result = await server.post('/greetings').send(body)
  greeting = result.body
})

Then('The greeting is successfully created', async () => {
  expect(result.status).to.equal(201)
  expect(greeting).to.eql({
    id: UUID,
    from: 'from@example.com',
    to: 'to@example.com',
    message: 'hi!',
    createdOn: NOW.toJSON(),
    modifiedOn: NOW.toJSON(),
  })
})
