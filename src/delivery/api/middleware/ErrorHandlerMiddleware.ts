export const ErrorHandlerMiddleware = (err: any, req: any, res: any, next: any) => {
  const { message, statusCode } = err

  console.log(`> ${message}`)
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
}
