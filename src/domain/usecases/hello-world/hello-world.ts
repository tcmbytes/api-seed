import { UseCaseConstructor } from '../../boundaries/usecase'

interface Props {}

interface Request {
  name: string
}

interface Response {
  message: string
}

export const sayHelloUseCase: UseCaseConstructor<Props, Request, Response> = (props) => (request) => {
  return {
    message: `Hi, ${request.name}!`,
  }
}
