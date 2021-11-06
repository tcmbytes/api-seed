import { makeContext, makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from '../types'
import { getHelloHandler } from '../handlers'
import { sayHelloUseCase } from '../../../domain/usecases'

export const makeGetHelloHandler: HandlerFactory = (event, _context) => {
  const context = makeContext()
  const logger = makeLogger({ context })

  const usecase = sayHelloUseCase({})
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase)

  const handler = getHelloHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'LAMBDA', 'getHelloHandler')(handler)

  return decoratedHandler
}
