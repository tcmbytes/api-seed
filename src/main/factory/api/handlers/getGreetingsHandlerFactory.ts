import { makeLogger, plainMap, withLogging, WithLoggingGreetingRepo } from '@shared/logger'

import { getGreetingsHandler } from '@delivery/api/handlers'
import { listGreetingsUseCase } from '@domain/usecases'
import { getSharedGreetingsRepo } from '../../repositories'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const getGreetingsHandlerFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const repo = getSharedGreetingsRepo()
  const decoratedRepo = WithLoggingGreetingRepo({
    repo,
    logger,
  })

  const usecase = listGreetingsUseCase({ repo: decoratedRepo })
  const decoratedUsecase = withLogging(logger, 'USECASE', 'listGreetings')(usecase, undefined, plainMap)

  const handler = getGreetingsHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getGreetingsHandler')(handler)

  return decoratedHandler
}
