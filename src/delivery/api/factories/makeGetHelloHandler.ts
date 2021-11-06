import { makeContext, makeLogger, withLogging } from '../../../shared/logger'

import { HandlerFactory } from '../types'
import { getHelloHandler } from '../handlers'
import { sayHelloUseCase } from '../../../domain/usecases'

export const makeGetHelloHandler: HandlerFactory = (req, res) => {
  const context = makeContext()
  const logger = makeLogger({ context })

  let usecase = sayHelloUseCase({})
  let handler = getHelloHandler({
    usecase: withLogging(logger, 'API', 'sayHelloUseCase')(usecase),
  })

  return withLogging(logger, 'API', 'getHelloHandler')(handler)
}
