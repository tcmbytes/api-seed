import { UseCaseConstructor } from '../../boundaries/usecase'

export interface Props {}

export interface Request {
  name: string
}

export interface Response {
  message: string
}

export const sayHelloUseCase: UseCaseConstructor<Props, Request, Response> = (props) => (request) => {
  return {
    message: `Hi, ${request.name}!`,
  }
}
