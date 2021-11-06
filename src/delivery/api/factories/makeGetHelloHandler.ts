import { makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from '../types'
import { getHelloHandler } from '../handlers'
import { makeContextFromRequest } from '../utils'
import { sayHelloUseCase } from '../../../domain/usecases'

export const makeGetHelloHandler: HandlerFactory = (req, res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const usecase = sayHelloUseCase({})
  const decoratedUsecase = withLogging(logger, 'USECASE', 'sayHelloUseCase')(usecase)

  const handler = getHelloHandler({
    usecase: decoratedUsecase,
  })
  const decoratedHandler = withLogging(logger, 'API', 'getHelloHandler')(handler)

  return decoratedHandler
}
