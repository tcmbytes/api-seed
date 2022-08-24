import { HandlerFactory } from '../types'
import { makeContextFromRequest } from 'delivery/api/utils'
import { newTracingMiddleware } from 'delivery/api/middleware'

export const makeTracingMiddlewareFactory: HandlerFactory = (req, _res) => {
  const context = makeContextFromRequest(req)

  return newTracingMiddleware({
    context,
  })
}
