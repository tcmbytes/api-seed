import { WithLoggingGreetingRepo, makeLogger, plainMap, withLogging } from '../../../../shared/logger'

import { HandlerFactory } from '../types'
import { deleteGreetingHandler } from '../../../../delivery/api/handlers'
import { deleteGreetingUseCase } from '../../../../domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { makeContextFromRequest } from '../../../../delivery/api/utils'

export const makeDeleteGreetingHandlerFactory: HandlerFactory = (req, _res) => {
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
