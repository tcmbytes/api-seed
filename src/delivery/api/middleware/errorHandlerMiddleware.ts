import { ErrorHandlerConstructor } from '../types'
import { Logger } from 'shared/logger'

type Params = {
  logger: Logger
}

export const errorHandlerMiddleware: ErrorHandlerConstructor<Params> = (params) => (err, _req, res) => {
  const { logger } = params
  const { message } = err

  logger.error('API errorHandlerMiddleware failed', {
    details: err,
  })

  res.status(500).json({
    status: 'Internal Server Error',
    statusCode: 500,
    message,
  })
}
