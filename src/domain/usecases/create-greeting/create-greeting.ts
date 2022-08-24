import { Generator, GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { Greeting } from '../../types'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
  uuidGenerator: Generator<string>
}

type Request = {
  from: string
  to: string
  message: string
}

export type CreateGreetingUseCase = UseCase<Request, Greeting>

export const newCreateGreetingUseCase: UseCaseConstructor<Params, Request, Greeting> = (params) => async (request) => {
  const { repo, dateGenerator, uuidGenerator } = params
  const { from, to, message } = request

  const greeting: Greeting = {
    id: uuidGenerator.next(),
    from: from,
    to: to,
    message: message,
    createdOn: dateGenerator.next(),
    modifiedOn: dateGenerator.next(),
  }

  await repo.create(greeting)

  return greeting
}
