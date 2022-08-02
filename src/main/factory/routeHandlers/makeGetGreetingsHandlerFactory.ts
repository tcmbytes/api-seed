import { makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { WithLoggingGreetingRepo } from '../../../shared/logger/LoggingGreetingRepo'
import { getGreetingsHandler } from '../../../delivery/api/handlers'
import { getSharedGreetingsRepo } from '../repositories'
import { listGreetingsUseCase } from '../../../domain/usecases'
import { makeContextFromRequest } from '../../../delivery/api/utils'

export const makeGetGreetingsHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = listGreetingsUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'listGreetings')(usecase)

  const handler = getGreetingsHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getGreetingsHandler')(handler)

  return decoratedHandler
}
