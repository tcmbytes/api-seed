import { setupServer } from '../delivery/api/server'

export const startServer = (): void => {
  const dotenv = require('dotenv')
  dotenv.config()

  const hostname = process.env.HOSTNAME ?? '0.0.0.0'
  const port = parseInt(process.env.PORT ?? '8080')

  setupServer({ port, hostname })
}
