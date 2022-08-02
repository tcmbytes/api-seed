import { Greeting, GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

type Params = {
  repo: GreetingsRepo
}

type Request = void
type Response = Greeting[]

export type ListGreetingsUseCase = UseCase<Request, Response>

export const listGreetingsUseCase: UseCaseConstructor<Params, Request, Response> = (params) => async () => {
  const { repo } = params

  return await repo.findAll()
}
