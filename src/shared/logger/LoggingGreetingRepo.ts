import { Greeting, GreetingsRepo } from '../../domain/boundaries'

import { Logger } from '.'

type Params = {
  repo: GreetingsRepo
  logger: Logger
}

export const WithLoggingGreetingRepo = (params: Params): GreetingsRepo => {
  const { repo, logger } = params

  const save = (greeting: Greeting): Promise<void> => {
    logger.info(`REPO GreetingsRepo.save was invoked`)
    repo.save(greeting)
    logger.info(`REPO GreetingsRepo.save finished`)

    return Promise.resolve()
  }

  return {
    save: save,
  }
}
