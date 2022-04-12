import { errorHandlerMiddleware, loggingContextMiddleware, routeUnavailableMiddleware } from './middleware'
import express, { Express } from 'express'

import { Logger } from '../../shared/logger'
import { makeGetHelloHandler } from './factories'
import { resolveRoute } from './utils'

type Options = {
  port: number
  hostname: string
}

type Params = {
  server: Express
  logger: Logger
  options: Options
}

export const setupServer = (params: Params) => {
  const { logger, options, server } = params
  const { port, hostname } = options

  server.use(express.json())
  server.use(loggingContextMiddleware)

  server.get('/say-hello/:name', resolveRoute(makeGetHelloHandler))

  server.use(routeUnavailableMiddleware)
  server.use(errorHandlerMiddleware)

  server
    .listen(port, hostname, () => {
      logger.info('MAIN setupServer was invoked', {
        details: `Server running at http://${hostname}:${port}/`,
      })
    })
    .on('error', () => {
      logger.error('MAIN setupServer failed', {
        details: `Server failed running at http://${hostname}:${port}/`,
      })
      process.exit(1)
    })
}
