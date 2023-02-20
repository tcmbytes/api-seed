import { plainMap, withLogging } from './withLogging'

import { GreetingsRepo } from '@domain/boundaries'
import { Logger } from './types'

type Params = {
  repo: GreetingsRepo
  logger: Logger
}

export const WithLoggingGreetingRepo = (params: Params): GreetingsRepo => {
  const { repo, logger } = params

  return {
    create: withLogging(logger, 'REPO', 'GreetingsRepo.create')(repo.create, plainMap),
    update: withLogging(logger, 'REPO', 'GreetingsRepo.update')(repo.update, plainMap),
    findById: withLogging(logger, 'REPO', 'GreetingsRepo.findById')(repo.findById, plainMap, plainMap),
    findAll: withLogging(logger, 'REPO', 'GreetingsRepo.findAll')(repo.findAll, undefined, plainMap),
    removeById: withLogging(logger, 'REPO', 'GreetingsRepo.removeById')(repo.removeById, plainMap),
  }
}
