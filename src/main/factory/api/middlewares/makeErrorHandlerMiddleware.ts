import { ErrorHandlerFactory } from '../types'
import { makeContextFromRequest } from 'delivery/api/utils'
import { makeLogger } from '../../../../shared/logger'
import { newErrorHandlerMiddleware } from 'delivery/api/middleware'

export const makeErrorHandlerMiddleware: ErrorHandlerFactory = (_err, req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return newErrorHandlerMiddleware({
    logger,
  })
}
