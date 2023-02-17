import {
  deleteGreetingHandler,
  getGreetingHandler,
  getGreetingsHandler,
  postGreetingHandler,
  putGreetingHandler,
} from 'delivery/api/handlers'
import { setupServer } from 'delivery/api/server'
import { Generator, GreetingsRepo } from 'domain/boundaries'
import {
  createGreetingUseCase,
  deleteGreetingUseCase,
  listGreetingsUseCase,
  showGreetingUseCase,
  updateGreetingUseCase,
} from 'domain/usecases'
import express from 'express'
import {
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from 'main/factory/api'
import { HandlerFactories, HandlerFactory } from 'main/factory/api/types'
import supertest from 'supertest'
import { dateGenerator, repo, uuidGenerator } from '../step-definitions/common.steps'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
  uuidGenerator: Generator<string>
}

export const makeServer = (params: Partial<Params>) => {
  const options = {
    repo,
    dateGenerator,
    uuidGenerator,
    ...params,
  }
  const server = express()

  const handlerFactories: HandlerFactories = {
    deleteGreetingHandler: deleteGreetingHandlerFactory(options),
    getGreetingHandler: getGreetingHandlerFactory(options),
    getGreetingsHandler: getGreetingsHandlerFactory(options),
    postGreetingHandler: postGreetingHandlerFactory(options),
    putGreetingHandler: putGreetingHandlerFactory(options),
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

const postGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo, dateGenerator, uuidGenerator } = params

    const usecase = createGreetingUseCase({ repo, dateGenerator, uuidGenerator })

    return postGreetingHandler({ usecase })
  }

const deleteGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo } = params

    const usecase = deleteGreetingUseCase({ repo })

    return deleteGreetingHandler({ usecase })
  }

const getGreetingsHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo } = params

    const usecase = listGreetingsUseCase({ repo })

    return getGreetingsHandler({ usecase })
  }

const getGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo } = params

    const usecase = showGreetingUseCase({ repo })

    return getGreetingHandler({ usecase })
  }

const putGreetingHandlerFactory =
  (params: Params): HandlerFactory =>
  (_req, _res) => {
    const { repo, dateGenerator } = params

    const usecase = updateGreetingUseCase({ repo, dateGenerator })

    return putGreetingHandler({ usecase })
  }
