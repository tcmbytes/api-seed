import { makeLogger, plainMap, withLogging } from '../../../shared/logger'

import { HandlerFactory } from './types'
import { WithLoggingGreetingRepo } from '../../../shared/logger/LoggingGreetingRepo'
import { getSharedGreetingsRepo } from '../repositories'
import { makeContextFromRequest } from '../../../delivery/api/utils'
import { postGreetingHandler } from '../../../delivery/api/handlers'
import { updateGreetingUseCase } from '../../../domain/usecases'

export const makePostGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = {
    next: () => new Date(),
  }

  const usecase = updateGreetingUseCase({ repo: decoratedRepo, dateGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'updateGreeting')(usecase, plainMap, plainMap)

  const handler = postGreetingHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'postGreetingHandler')(handler)

  return decoratedHandler
}
