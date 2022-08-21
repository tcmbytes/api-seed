import express, { Express } from 'express'

import { HandlersFactory } from './types'
import { Logger } from '../../shared/logger'
import YAML from 'yamljs'
import { errorHandlerMiddleware } from './middleware'
import swaggerUi from 'swagger-ui-express'

type Options = {
  port: number
  hostname: string
}

type Params = {
  server: Express
  logger: Logger
  options: Options
  handlersFactory: HandlersFactory
  middlewaresFactory: HandlersFactory
}

export const setupServer = (params: Params) => {
  const { logger, options, server, handlersFactory, middlewaresFactory } = params
  const { port, hostname } = options

  server.use(express.json())
  server.use(middlewaresFactory.make('loggingContextMiddleware'))

  const apiDefinition = YAML.load('./src/delivery/api/openapi.yml')
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDefinition))

  server.put('/greetings', handlersFactory.make('putGreetingHandler'))
  server.get('/greetings', handlersFactory.make('getGreetingsHandler'))

  server.get('/greetings/:greetingId', handlersFactory.make('getGreetingHandler'))
  server.post('/greetings/:greetingId', handlersFactory.make('postGreetingHandler'))
  server.delete('/greetings/:greetingId', handlersFactory.make('deleteGreetingHandler'))

  server.use(middlewaresFactory.make('routeUnavailableMiddleware'))
  server.use(errorHandlerMiddleware({ logger }))

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
