import { HandlerFactory } from '../types'
import { makeContextFromRequest } from 'main/factory/api/utils'
import { tracingMiddleware } from 'delivery/api/middleware'

export const tracingMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)

  return tracingMiddleware({
    context,
  })
}
