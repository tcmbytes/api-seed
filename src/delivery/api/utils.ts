import { Handler, Request } from 'express'

import { HandlerFactory } from './types'
import { makeContext } from '../../shared/logger'

export const makeContextFromRequest = (req: Request) => {
  const traceID = req.headers['x-trace-id'] as string | undefined
  const context = makeContext(traceID)

  return context
}

export const resolveRoute =
  (factory: HandlerFactory): Handler =>
  async (req, res, next) => {
    try {
      let handler = factory(req, res)
      return await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
