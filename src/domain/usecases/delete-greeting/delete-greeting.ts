import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

import { GreetingNotFoundError } from '../../errors'

type Params = {
  repo: GreetingsRepo
}

type Request = {
  id: string
}

export type DeleteGreetingUseCase = UseCase<Request, void>

export const newDeleteGreetingUseCase: UseCaseConstructor<Params, Request, void> = (params) => async (request) => {
  const { repo } = params
  const { id } = request

  const greeting = await repo.findById(id)
  if (!greeting) {
    throw new GreetingNotFoundError(id)
  }

  await repo.removeById(id)
}
