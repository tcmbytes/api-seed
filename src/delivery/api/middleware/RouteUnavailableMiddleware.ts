export const RouteUnavailableMiddleware = (req: any, res: any, next: any) => {
  const statusCode = 404
  const message = `Cannot ${req.method} ${req.originalUrl}`

  console.log(`> ${message}`)
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}
