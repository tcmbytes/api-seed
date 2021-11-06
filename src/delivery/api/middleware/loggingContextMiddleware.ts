import { Handler } from 'express'
import { makeContext } from '../../../shared/logger'

export const loggingContextMiddleware: Handler = (req, res, next) => {
  if (!req.headers['x-trace-id']) {
    let context = makeContext()
    req.headers['x-trace-id'] = context.traceID
  }

  res.setHeader('x-trace-id', req.headers['x-trace-id'])
  next()
}
