import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { Greeting } from '../../types'
import { GreetingNotFoundError } from '../../errors'

type Params = {
  repo: GreetingsRepo
}

type Request = {
  id: string
}

export type ShowGreetingsUseCase = UseCase<Request, Greeting>

export const newShowGreetingUseCase: UseCaseConstructor<Params, Request, Greeting> = (params) => async (request) => {
  const { repo } = params
  const { id } = request

  const greeting = await repo.findById(id)
  if (!greeting) {
    throw new GreetingNotFoundError(id)
  }

  return greeting
}
