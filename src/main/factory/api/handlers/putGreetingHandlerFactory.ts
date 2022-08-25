import { WithLoggingGreetingRepo, makeLogger, plainMap, withLogging } from 'shared/logger'
import { getSharedDateGenerator, getSharedUUIDGenerator } from '../../generators'

import { HandlerFactory } from '../types'
import { createGreetingUseCase } from 'domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { makeContextFromRequest } from '../utils'
import { putGreetingHandler } from 'delivery/api/handlers'

export const putGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = getSharedDateGenerator()
  const uuidGenerator = getSharedUUIDGenerator()

  const usecase = createGreetingUseCase({ repo: decoratedRepo, dateGenerator, uuidGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase, plainMap, plainMap)

  const handler = putGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'putGreetingHandler')(handler)

  return decoratedHandler
}
