import { makeLogger, plainMap, withLogging, WithLoggingGreetingRepo } from '@shared/logger'

import { deleteGreetingHandler } from '@delivery/api/handlers'
import { deleteGreetingUseCase } from '@domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const deleteGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = deleteGreetingUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'deleteGreeting')(usecase, plainMap, plainMap)

  const handler = deleteGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'deleteGreetingHandler')(handler)

  return decoratedHandler
}
