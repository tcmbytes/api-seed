import { Logger } from '../../../shared/logger'
import { RouteHandlerConstructor } from '../types'

type Params = {
  logger: Logger
}

export const routeUnavailableMiddleware: RouteHandlerConstructor<Params> = (params) => (req, res) => {
  const { logger } = params
  const message = `Cannot ${req.method} ${req.originalUrl}`

  logger.error('API routeUnavailableMiddleware failed', {
    details: message,
  })

  res.status(501).json({
    status: 'Not Implemented',
    statusCode: 501,
    message,
  })
}
