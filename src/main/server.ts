import { Express } from 'express'

interface Params {
  app: Express
}

export const startServer = (params: Params): void => {
  const { app } = params

  const dotenv = require('dotenv')
  dotenv.config()

  const hostname = process.env.HOSTNAME ?? '0.0.0.0'
  const port = parseInt(process.env.PORT ?? '8080')

  app
    .listen(port, hostname, () => {
      console.log(`> Server running at http://${hostname}:${port}/`)
    })
    .on('error', () => {
      process.exit(1)
    })
}
