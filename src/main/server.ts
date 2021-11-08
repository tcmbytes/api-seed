import { Logger } from '../shared/logger'
import { setupServer } from '../delivery/api/server'

type Params = {
  logger: Logger
}

export const startServer = (params: Params): void => {
  const { logger } = params

  const dotenv = require('dotenv')
  dotenv.config()

  const hostname = process.env.HOSTNAME ?? '0.0.0.0'
  const port = parseInt(process.env.PORT ?? '8080')

  setupServer({
    logger,
    options: { port, hostname },
  })
}
