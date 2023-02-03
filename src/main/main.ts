import 'dotenv/config'

import { makeContext, makeLogger } from 'shared/logger'
import { apiHandlerFactories, apiMiddlewareFactories, makeHandlersFactory } from './factory/api'

import { setupServer } from 'delivery/api/server'
import { config } from './config'
import { errorHandlerFactories, makeErrorHandlersFactory } from './factory/api'
import { makeExpressServer } from './factory/drivers'
import { setupProcessListeners } from './process'

const main = () => {
  const context = makeContext()
  const logger = makeLogger({ context })
  const server = makeExpressServer()

  const options = {
    hostname: config.HOSTNAME,
    port: config.PORT,
  }

  const handlersFactory = makeHandlersFactory(apiHandlerFactories)
  const middlewaresFactory = makeHandlersFactory(apiMiddlewareFactories)
  const errorHandersFactory = makeErrorHandlersFactory(errorHandlerFactories)

  setupProcessListeners({ process, logger })
  setupServer({
    server,
    logger,
    options,
    handlersFactory,
    middlewaresFactory,
    errorHandersFactory,
  })
}

main()
