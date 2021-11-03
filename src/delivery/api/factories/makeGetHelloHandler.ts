import { HandlerFactory } from '../types'
import { getHelloHandler } from '../handlers'
import { sayHelloUseCase } from '../../../domain/usecases'

export const makeGetHelloHandler: HandlerFactory = (req, res) => {
  let usecase = sayHelloUseCase({})
  let handler = getHelloHandler({
    usecase,
  })

  return handler
}
