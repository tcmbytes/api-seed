import express, { ErrorRequestHandler, Express, Handler, RequestHandler } from 'express'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { AbstractFactory } from './types'

type Params = {
  server: Express
  handlersFactory: AbstractFactory<Handler>
  middlewaresFactory: AbstractFactory<Handler>
  errorHandersFactory: AbstractFactory<ErrorRequestHandler>
}

export const setupServer = (params: Params) => {
  const { server, handlersFactory, middlewaresFactory, errorHandersFactory } = params

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
}

const setDocsRoute = (server: Express) => {
  const apiDefinition = YAML.load('./src/delivery/api/openapi.yml')
  server.use('/docs', swaggerUi.serve as Array<RequestHandler>, swaggerUi.setup(apiDefinition) as RequestHandler)
}
