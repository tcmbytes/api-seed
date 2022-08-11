import { Generator, GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
}

type Request = {
  id: string
  message: string
}

export type UpdateGreetingUseCase = UseCase<Request, void>

export const updateGreetingUseCase: UseCaseConstructor<Params, Request, void> = (params) => async (request) => {
  const { repo } = params
  const { id } = request

  await repo.findById(id)

  return Promise.resolve()
}
