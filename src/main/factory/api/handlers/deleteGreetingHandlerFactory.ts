import { WithLoggingGreetingRepo, makeLogger, plainMap, withLogging } from 'shared/logger'

import { HandlerFactory } from '../types'
import { getSharedGreetingsRepo } from '../../repositories'
import { makeContextFromRequest } from '../utils'
import { newDeleteGreetingHandler } from 'delivery/api/handlers'
import { newDeleteGreetingUseCase } from 'domain/usecases'

export const deleteGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = newDeleteGreetingUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'deleteGreeting')(usecase, plainMap, plainMap)

  const handler = newDeleteGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'deleteGreetingHandler')(handler)

  return decoratedHandler
}
