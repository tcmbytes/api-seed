import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

type Params = {
  repo: GreetingsRepo
}

type Request = {
  id: string
}

export type DeleteGreetingUseCase = UseCase<Request, void>

export const deleteGreetingUseCase: UseCaseConstructor<Params, Request, void> = (_params) => async (_request) => {
  return Promise.resolve()
}
