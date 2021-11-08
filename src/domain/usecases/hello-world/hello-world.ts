import { UseCase, UseCaseConstructor } from '../../boundaries/usecase'

type Props = {}

type Request = {
  name: string
}

type Response = {
  message: string
}

export type sayHelloUseCaseType = UseCase<Request, Response>

export const sayHelloUseCase: UseCaseConstructor<Props, Request, Response> = (props) => (request) => {
  return {
    message: `Hi, ${request.name}!`,
  }
}
