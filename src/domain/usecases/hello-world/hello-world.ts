import { UseCase, UseCaseConstructor } from '../../boundaries/usecase'

interface Props {}

interface Request {
  name: string
}

interface Response {
  message: string
}

export type sayHelloUseCaseType = UseCase<Request, Response>

export const sayHelloUseCase: UseCaseConstructor<Props, Request, Response> = (props) => (request) => {
  return {
    message: `Hi, ${request.name}!`,
  }
}
