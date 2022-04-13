import { makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { InMemoryGreetingsRepo } from '../../../repository/InMemoryGreetingsRepo'
import { WithLoggingGreetingRepo } from '../../../shared/logger/LoggingGreetingRepo'
import { getHelloHandler } from '../../../delivery/api/handlers'
import { makeContextFromRequest } from '../../../delivery/api/utils'
import { sayHelloUseCase } from '../../../domain/usecases'

export const makeGetHelloHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = InMemoryGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = sayHelloUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase)

  const handler = getHelloHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getHelloHandler')(handler)

  return decoratedHandler
}
