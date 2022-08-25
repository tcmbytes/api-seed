import { HandlerFactory } from '../types'
import { makeContextFromRequest } from 'main/factory/api/utils'
import { makeLogger } from 'shared/logger'
import { newRouteUnavailableMiddleware } from 'delivery/api/middleware'

export const routeUnavailableMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return newRouteUnavailableMiddleware({
    logger,
  })
}
