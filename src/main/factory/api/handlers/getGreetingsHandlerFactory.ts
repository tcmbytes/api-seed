import { WithLoggingGreetingRepo, makeLogger, plainMap, withLogging } from 'shared/logger'

import { HandlerFactory } from '../types'
import { getGreetingsHandler } from 'delivery/api/handlers'
import { getSharedGreetingsRepo } from '../../repositories'
import { listGreetingsUseCase } from 'domain/usecases'
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