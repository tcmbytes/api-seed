import { WithLoggingGreetingRepo, makeLogger, plainMap, withLogging } from 'shared/logger'

import { HandlerFactory } from '../types'
import { getSharedGreetingsRepo } from '../../repositories'
import { makeContextFromRequest } from '../utils'
import { newGetGreetingHandler } from 'delivery/api/handlers'
import { showGreetingUseCase } from 'domain/usecases'

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

  const handler = newGetGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getGreetingHandler')(handler)

  return decoratedHandler
}
