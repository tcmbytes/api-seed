import { ErrorHandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'
import { makeLogger } from 'shared/logger'
import { newErrorHandlerMiddleware } from 'delivery/api/middleware'

export const errorHandlerMiddleware: ErrorHandlerFactory = (_err, req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return newErrorHandlerMiddleware({
    logger,
  })
}
