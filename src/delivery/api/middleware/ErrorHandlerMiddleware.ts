import { ErrorRequestHandler } from 'express'
import { makeContextFromRequest } from '../utils'
import { makeLogger } from '../../../shared/logger'

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const { message } = err

  const context = makeContextFromRequest(req)
  const logger = makeLogger({ context })

  logger.error(`API errorHandlerMiddleware failed`, {
    details: err,
  })

  res.status(500).json({
    status: 'Internal Server Error',
    statusCode: 500,
    message,
  })
}
