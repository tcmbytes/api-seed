import { WithLoggingGreetingRepo, makeContext, makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { createGreetingHandler } from '../../../delivery/lamdba/handlers'
import { createGreetingUseCase } from '../../../domain/usecases'
import { getSharedGreetingsRepo } from '../repositories'
import { v4 } from 'uuid'

export const makeCreateGreetingHandlerFactory: HandlerFactory = (_event, _context) => {
  const context = makeContext()
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
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase)

  const handler = createGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'LAMBDA', 'getHelloHandler')(handler)

  return decoratedHandler
}
