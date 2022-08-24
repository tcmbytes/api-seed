import { makeLogger, plainMap, withLogging } from '../../../../shared/logger'

import { HandlerFactory } from '../types'
import { WithLoggingGreetingRepo } from '../../../../shared/logger/LoggingGreetingRepo'
import { getGreetingsHandler } from '../../../../delivery/api/handlers'
import { getSharedGreetingsRepo } from '../../repositories'
import { makeContextFromRequest } from '../../../../delivery/api/utils'
import { newListGreetingsUseCase } from '../../../../domain/usecases'

export const makeGetGreetingsHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = newListGreetingsUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'listGreetings')(usecase, undefined, plainMap)

  const handler = getGreetingsHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getGreetingsHandler')(handler)

  return decoratedHandler
}
