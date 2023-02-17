import { tracingMiddleware } from '@delivery/api/middleware'
import { HandlerFactory } from '../types'
import { makeContextFromRequest } from '../utils'

export const tracingMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)

  return tracingMiddleware({
    context,
  })
}
