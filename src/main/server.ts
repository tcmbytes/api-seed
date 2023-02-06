import { setupServer } from 'delivery/api/server'
import { Logger } from 'shared/logger'
import { config } from './config'
import {
  apiHandlerFactories,
  apiMiddlewareFactories,
  errorHandlerFactories,
  makeErrorHandlersFactory,
  makeHandlersFactory,
} from './factory/api'
import { makeExpressServer } from './factory/drivers'

type Params = {
  logger: Logger
}

export const setupServerListerners = (params: Params) => {
  const { logger } = params
  const { HOSTNAME, PORT } = config

  const server = makeExpressServer()

  const handlersFactory = makeHandlersFactory(apiHandlerFactories)
  const middlewaresFactory = makeHandlersFactory(apiMiddlewareFactories)
  const errorHandersFactory = makeErrorHandlersFactory(errorHandlerFactories)

  setupServer({
    server,
    handlersFactory,
    middlewaresFactory,
    errorHandersFactory,
  })

  server
    .listen(PORT, HOSTNAME, () => {
      logger.info('MAIN setupServer was invoked', {
        details: `Server running at http://${HOSTNAME}:${PORT}/`,
      })
    })
    .on('error', () => {
      logger.error('MAIN setupServer failed', {
        details: `Server failed running at http://${HOSTNAME}:${PORT}/`,
      })
      process.exit(1)
    })
}
