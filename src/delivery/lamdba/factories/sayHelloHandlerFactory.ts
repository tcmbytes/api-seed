import { HandlerFactory } from '../types'
import { sayHelloHandler } from '../handlers'
import { sayHelloUseCase } from '../../../domain/usecases'

export const sayHelloHandlerFactory: HandlerFactory = (event, context) => {
  let usecase = sayHelloUseCase({})
  let handler = sayHelloHandler({
    usecase,
  })

  return handler
}
