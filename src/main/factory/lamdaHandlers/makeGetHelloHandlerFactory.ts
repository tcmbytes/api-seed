import { WithLoggingGreetingRepo, makeContext, makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { InMemoryGreetingsRepo } from '../../../repository/InMemoryGreetingsRepo'
import { getHelloHandler } from '../../../delivery/lamdba/handlers'
import { sayHelloUseCase } from '../../../domain/usecases'

export const makeGetHelloHandlerFactory: HandlerFactory = (_event, _context) => {
  const context = makeContext()
  const logger = makeLogger({ context })

  const repo = InMemoryGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = {
    next: () => new Date(),
  }

  const usecase = sayHelloUseCase({ repo: decoratedRepo, dateGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase)

  const handler = getHelloHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'LAMBDA', 'getHelloHandler')(handler)

  return decoratedHandler
}
