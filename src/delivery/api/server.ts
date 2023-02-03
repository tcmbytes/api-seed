import express, { ErrorRequestHandler, Express, Handler } from 'express'

import { Logger } from 'shared/logger'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { AbstractFactory } from './types'

type Options = {
  port: number
  hostname: string
}

type Params = {
  server: Express
  logger: Logger
  options: Options
  handlersFactory: AbstractFactory<Handler>
  middlewaresFactory: AbstractFactory<Handler>
  errorHandersFactory: AbstractFactory<ErrorRequestHandler>
}

export const setupServer = (params: Params) => {
  const { logger, options, server, handlersFactory, middlewaresFactory, errorHandersFactory } = params
  const { port, hostname } = options

  server.use(express.json())
  server.use(middlewaresFactory.make('tracingMiddleware'))

  setDocsRoute(server)

  server.post('/greetings', handlersFactory.make('postGreetingHandler'))
  server.get('/greetings', handlersFactory.make('getGreetingsHandler'))

  server.get('/greetings/:greetingId', handlersFactory.make('getGreetingHandler'))
  server.put('/greetings/:greetingId', handlersFactory.make('putGreetingHandler'))
  server.delete('/greetings/:greetingId', handlersFactory.make('deleteGreetingHandler'))

  server.use(middlewaresFactory.make('routeUnavailableMiddleware'))
  server.use(errorHandersFactory.make('errorHandlerMiddleware'))

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
