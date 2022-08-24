import { Generator, GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { Greeting } from 'domain/types'
import { GreetingNotFoundError } from '../../errors'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
}

type Request = {
  id: string
  message: string
}

export type UpdateGreetingUseCase = UseCase<Request, Greeting>

export const newUpdateGreetingUseCase: UseCaseConstructor<Params, Request, Greeting> = (params) => async (request) => {
  const { repo, dateGenerator } = params
  const { id, message } = request

  const greeting = await repo.findById(id)
  if (!greeting) {
    throw new GreetingNotFoundError(id)
  }

  const uppdatedGreeting = {
    ...greeting,
    message,
    modifiedOn: dateGenerator.next(),
  }

  await repo.update(uppdatedGreeting)

  return uppdatedGreeting
}
