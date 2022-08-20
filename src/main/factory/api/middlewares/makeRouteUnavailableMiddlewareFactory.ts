import { makeLogger, withLogging } from '../../../../shared/logger'

import { HandlerFactory } from '../types'
import { makeContextFromRequest } from 'delivery/api/utils'
import { routeUnavailableMiddleware } from 'delivery/api/middleware'

export const makeRouteUnavailableMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  const middleware = routeUnavailableMiddleware({
    logger,
  })

  return withLogging(logger, 'MIDDLEWARE', 'routeUnavailableMiddleware')(middleware)
}
