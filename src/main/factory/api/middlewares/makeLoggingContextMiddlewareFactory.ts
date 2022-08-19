import { makeLogger, withLogging } from '../../../../shared/logger'

import { HandlerFactory } from '../types'
import { loggingContextMiddleware } from 'delivery/api/middleware'
import { makeContextFromRequest } from 'delivery/api/utils'

export const makeLoggingContextMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const middleware = loggingContextMiddleware({
    context,
  })

  return withLogging(logger, 'MIDDLEWARE', 'loggingContextMiddleware')(middleware)
}
