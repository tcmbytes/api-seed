import { makeLogger, plainMap, withLogging, WithLoggingGreetingRepo } from '@shared/logger'

import { getGreetingHandler } from '@delivery/api/handlers'
import { showGreetingUseCase } from '@domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const getGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = showGreetingUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'showGreeting')(usecase, plainMap, plainMap)

  const handler = getGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getGreetingHandler')(handler)

  return decoratedHandler
}
