import { makeLogger, plainMap, withLogging, WithLoggingGreetingRepo } from '@shared/logger'

import { putGreetingHandler } from '@delivery/api/handlers'
import { updateGreetingUseCase } from '@domain/usecases'
import { getSharedDateGenerator } from '../../generators'
import { getSharedGreetingsRepo } from '../../repositories'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const putGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = getSharedDateGenerator()

  const usecase = updateGreetingUseCase({ repo: decoratedRepo, dateGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'updateGreeting')(usecase, plainMap, plainMap)

  const handler = putGreetingHandler({
    usecase: decoratedUsecase,
  })

  return withLogging(logger, 'API', 'putGreetingHandler')(handler)
}
