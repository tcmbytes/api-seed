import { ErrorHandlerFactory } from '../types'
import { errorHandlerMiddleware } from 'delivery/api/middleware'
import { makeContextFromRequest } from '../utils'
import { makeLogger } from 'shared/logger'

export const errorHandlerMiddlewareFactory: ErrorHandlerFactory = (_err, req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return errorHandlerMiddleware({
    logger,
  })
}
