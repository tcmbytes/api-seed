import { Greeting } from 'domain/types'
import { GreetingsRepo } from 'domain/boundaries'
import { Logger } from './types'

type Params = {
  repo: GreetingsRepo
  logger: Logger
}

export const WithLoggingGreetingRepo = (params: Params): GreetingsRepo => {
  const { repo, logger } = params

  const create = (greeting: Greeting): Promise<void> => {
    logger.info('REPO GreetingsRepo.create was invoked')
    repo.create(greeting)
    logger.info('REPO GreetingsRepo.create finished')

    return Promise.resolve()
  }

  const update = (greeting: Greeting): Promise<void> => {
    logger.info('REPO GreetingsRepo.update was invoked')
    repo.update(greeting)
    logger.info('REPO GreetingsRepo.update finished')

    return Promise.resolve()
  }

  const findById = (id: string): Promise<Greeting | null> => {
    logger.info('REPO GreetingsRepo.findById was invoked')
    const greeting = repo.findById(id)
    logger.info('REPO GreetingsRepo.findById finished')

    return Promise.resolve(greeting)
  }

  const findAll = (): Promise<Greeting[]> => {
    logger.info('REPO GreetingsRepo.findAll was invoked')
    const greetings = repo.findAll()
    logger.info('REPO GreetingsRepo.findAll finished')

    return Promise.resolve(greetings)
  }

  const removeById = (id: string): Promise<void> => {
    logger.info('REPO GreetingsRepo.removeById was invoked')
    repo.removeById(id)
    logger.info('REPO GreetingsRepo.removeById finished')

    return Promise.resolve()
  }

  return {
    create,
    update,
    findById,
    findAll,
    removeById,
  }
}
