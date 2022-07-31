import { Generator, GreetingsRepo, UseCase, UseCaseConstructor } from '../../boundaries'

type Params = {
  repo: GreetingsRepo
  dateGenerator: Generator<Date>
}

type Request = {
  name: string
}

type Response = {
  message: string
}

export type SayHelloUseCaseType = UseCase<Request, Response>

export const sayHelloUseCase: UseCaseConstructor<Params, Request, Response> = (params) => async (request) => {
  const { repo, dateGenerator } = params
  const { name } = request

  await repo.save({
    name: name,
    savedOn: dateGenerator.next(),
  })

  return {
    message: `Hi, ${name}!`,
  }
}
