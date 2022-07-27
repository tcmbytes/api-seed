import { Handler } from 'express'
import { makeContextFromRequest } from '../utils'
import { makeLogger } from '../../../shared/logger'

export const routeUnavailableMiddleware: Handler = (req, res) => {
  const message = `Cannot ${req.method} ${req.originalUrl}`

  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  logger.error('API routeUnavailableMiddleware failed', {
    details: message,
  })

  res.status(501).json({
    status: 'Not Implemented',
    statusCode: 501,
    message,
  })
}
