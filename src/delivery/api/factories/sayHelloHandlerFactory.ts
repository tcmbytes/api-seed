import { HandlerFactory } from '../types'
import { sayHelloHandler } from '../handlers'
import { sayHelloUseCase } from '../../../domain/usecases'

export const sayHelloHandlerFactory: HandlerFactory = (req, res) => {
  let usecase = sayHelloUseCase({})
  let controller = sayHelloHandler({
    usecase,
  })

  return controller
}
