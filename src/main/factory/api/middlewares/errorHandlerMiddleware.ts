import { errorHandlerMiddleware } from '@delivery/api/middleware'
import { makeLogger } from '@shared/logger'
import { ErrorHandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const errorHandlerMiddlewareFactory: ErrorHandlerFactory = (_err, req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return errorHandlerMiddleware({
    logger,
  })
}
