import { routeUnavailableMiddleware } from '@delivery/api/middleware'
import { makeLogger } from '@shared/logger'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const routeUnavailableMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  return routeUnavailableMiddleware({
    logger,
  })
}
