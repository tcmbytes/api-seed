import { ErrorHandlerFactory } from '../types'
import { errorHandlerMiddleware } from 'delivery/api/middleware'
import { makeContextFromRequest } from 'delivery/api/utils'
import { makeLogger } from '../../../../shared/logger'

export const makeErrorHandlerMiddleware: ErrorHandlerFactory = (_err, req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return errorHandlerMiddleware({
    logger,
  })
}
