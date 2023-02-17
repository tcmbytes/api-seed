import { makeLogger, plainMap, withLogging, WithLoggingGreetingRepo } from '@shared/logger'
import { getSharedDateGenerator, getSharedUUIDGenerator } from '../../generators'

import { postGreetingHandler } from '@delivery/api/handlers'
import { createGreetingUseCase } from '@domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const postGreetingHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const dateGenerator = getSharedDateGenerator()
  const uuidGenerator = getSharedUUIDGenerator()

  const usecase = createGreetingUseCase({ repo: decoratedRepo, dateGenerator, uuidGenerator })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'createGreetingUseCase')(usecase, plainMap, plainMap)

  const handler = postGreetingHandler({
    usecase: decoratedUsecase,
  })

  return withLogging(logger, 'API', 'postGreetingHandler')(handler)
}
