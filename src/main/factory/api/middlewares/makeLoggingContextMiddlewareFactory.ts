import { makeLogger, withLogging } from '../../../../shared/logger'

import { HandlerFactory } from '../types'
import { makeContextFromRequest } from 'delivery/api/utils'
import { newLoggingContextMiddleware } from 'delivery/api/middleware'

export const makeLoggingContextMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const middleware = newLoggingContextMiddleware({
    context,
  })

  return withLogging(logger, 'MIDDLEWARE', 'loggingContextMiddleware')(middleware)
}
