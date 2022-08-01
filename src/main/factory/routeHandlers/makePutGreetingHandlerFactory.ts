import { makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { InMemoryGreetingsRepo } from '../../../repository/InMemoryGreetingsRepo'
import { WithLoggingGreetingRepo } from '../../../shared/logger/LoggingGreetingRepo'
import { createGreetingUseCase } from '../../../domain/usecases'
import { makeContextFromRequest } from '../../../delivery/api/utils'
import { putGreetingHandler } from '../../../delivery/api/handlers'

export const makePutGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = InMemoryGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = {
    next: () => new Date(),
  }

  const usecase = createGreetingUseCase({ repo: decoratedRepo, dateGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase)

  const handler = putGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'putGreetingHandler')(handler)

  return decoratedHandler
}
