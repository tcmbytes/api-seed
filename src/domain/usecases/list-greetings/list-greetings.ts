import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { Greeting } from '../../types'

type Params = {
  repo: GreetingsRepo
}

export type ListGreetingsUseCase = UseCase<void, Greeting[]>

export const listGreetingsUseCase: UseCaseConstructor<Params, void, Greeting[]> = (params) => async () => {
  const { repo } = params

  return await repo.findAll()
}
