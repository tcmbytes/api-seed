import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { Greeting } from '../../types'
import { GreetingNotFoundError } from '../../errors'

type Params = {
  repo: GreetingsRepo
}

type Request = {
  id: string
}
type Response = Greeting

export type ShowGreetingsUseCase = UseCase<Request, Response>

export const newShowGreetingUseCase: UseCaseConstructor<Params, Request, Response> = (params) => async (input) => {
  const { repo } = params
  const { id } = input

  const greeting = await repo.findById(id)
  if (!greeting) {
    throw new GreetingNotFoundError(id)
  }

  return greeting
}
