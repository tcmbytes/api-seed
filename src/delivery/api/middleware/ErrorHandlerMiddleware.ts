import { ErrorRequestHandler } from 'express'

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const { message, statusCode } = err

  console.log(`> ${message}`)
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}
