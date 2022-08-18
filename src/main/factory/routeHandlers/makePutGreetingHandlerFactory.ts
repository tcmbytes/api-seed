import { makeLogger, plainMap, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { WithLoggingGreetingRepo } from '../../../shared/logger/LoggingGreetingRepo'
import { createGreetingUseCase } from '../../../domain/usecases'
import { getSharedGreetingsRepo } from '../repositories'
import { makeContextFromRequest } from '../../../delivery/api/utils'
import { putGreetingHandler } from '../../../delivery/api/handlers'
import { v4 } from 'uuid'

export const makePutGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = {
    next: () => new Date(),
  }

  const uuidGenerator = {
    next: () => v4(),
  }

  const usecase = createGreetingUseCase({ repo: decoratedRepo, dateGenerator, uuidGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase, plainMap, plainMap)

  const handler = putGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'putGreetingHandler')(handler)

  return decoratedHandler
}
