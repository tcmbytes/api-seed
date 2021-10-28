import { Handler } from 'express'

export const routeUnavailableMiddleware: Handler = (req, res, next) => {
  const statusCode = 404
  const message = `Cannot ${req.method} ${req.originalUrl}`

  console.log(`> ${message}`)
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  })
}
