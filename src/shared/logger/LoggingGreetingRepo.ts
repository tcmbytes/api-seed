import { Greeting } from 'domain/types'
import { GreetingsRepo } from 'domain/boundaries'
import { Logger } from './types'

type Params = {
  repo: GreetingsRepo
  logger: Logger
}

export const WithLoggingGreetingRepo = (params: Params): GreetingsRepo => {
  const { repo, logger } = params

  const save = (greeting: Greeting): Promise<void> => {
    logger.info('REPO GreetingsRepo.save was invoked')
    repo.save(greeting)
    logger.info('REPO GreetingsRepo.save finished')

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

  const remove = (id: string): Promise<void> => {
    logger.info('REPO GreetingsRepo.remove was invoked')
    repo.remove(id)
    logger.info('REPO GreetingsRepo.remove finished')

    return Promise.resolve()
  }

  return {
    save,
    update,
    findById,
    findAll,
    remove,
  }
}
