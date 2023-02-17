import { makeContext } from '@shared/logger'
import { Request } from 'express'

export const makeContextFromRequest = (req: Request) => {
  const traceID = req.headers['x-trace-id'] as string | undefined
  const context = makeContext(traceID)

  return context
}
