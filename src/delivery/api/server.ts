import express, { ErrorRequestHandler, Express, Handler } from 'express'

import { HandlersFactory } from './types'
import { Logger } from '../../shared/logger'
import YAML from 'yamljs'
import swaggerUi from 'swagger-ui-express'

type Options = {
  port: number
  hostname: string
}

type Params = {
  server: Express
  logger: Logger
  options: Options
  handlersFactory: HandlersFactory<Handler>
  middlewaresFactory: HandlersFactory<Handler>
  errorHandersFactory: HandlersFactory<ErrorRequestHandler>
}

export const setupServer = (params: Params) => {
  const { logger, options, server, handlersFactory, middlewaresFactory, errorHandersFactory } = params
  const { port, hostname } = options

  server.use(express.json())
  server.use(middlewaresFactory.make('loggingContextMiddleware'))

  setDocsRoute(server)

  server.put('/greetings', handlersFactory.make('putGreetingHandler'))
  server.get('/greetings', handlersFactory.make('getGreetingsHandler'))

  server.get('/greetings/:greetingId', handlersFactory.make('getGreetingHandler'))
  server.post('/greetings/:greetingId', handlersFactory.make('postGreetingHandler'))
  server.delete('/greetings/:greetingId', handlersFactory.make('deleteGreetingHandler'))

  server.use(middlewaresFactory.make('routeUnavailableMiddleware'))
  server.use(errorHandersFactory.make('errorHandler'))

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

const setDocsRoute = (server: Express) => {
  const apiDefinition = YAML.load('./src/delivery/api/openapi.yml')
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDefinition))
}
