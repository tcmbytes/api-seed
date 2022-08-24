import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { Greeting } from '../../types'

type Params = {
  repo: GreetingsRepo
}

type Request = void
type Response = Greeting[]

export type ListGreetingsUseCase = UseCase<Request, Response>

export const newListGreetingsUseCase: UseCaseConstructor<Params, Request, Response> = (params) => async () => {
  const { repo } = params

  return await repo.findAll()
}
