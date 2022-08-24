import { Request } from 'express'
import { makeContext } from 'shared/logger'

export const makeContextFromRequest = (req: Request) => {
  const traceID = req.headers['x-trace-id'] as string | undefined
  const context = makeContext(traceID)

  return context
}
