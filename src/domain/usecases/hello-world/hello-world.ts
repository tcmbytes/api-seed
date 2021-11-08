import { GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

type Params = {
  repo: GreetingsRepo
}

type Request = {
  name: string
}

type Response = {
  message: string
}

export type sayHelloUseCaseType = UseCase<Request, Response>

export const sayHelloUseCase: UseCaseConstructor<Params, Request, Response> = (params) => async (request) => {
  const { name } = request
  const { repo } = params

  await repo.save({
    name: name,
    savedOn: new Date(),
  })

  return {
    message: `Hi, ${name}!`,
  }
}
