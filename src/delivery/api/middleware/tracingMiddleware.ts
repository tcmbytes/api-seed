import { Context } from '@shared/logger'
import { RouteHandlerConstructor } from '../types'

type Params = {
  context: Context
}

export const tracingMiddleware: RouteHandlerConstructor<Params> = (params) => (req, res, next) => {
  const { context } = params

  req.headers['x-trace-id'] = context.traceID
  res.setHeader('x-trace-id', req.headers['x-trace-id'])

  next()
}
