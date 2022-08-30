import 'dotenv/config'

import { apiHandlerFactories, apiMiddlewareFactories, makeHandlersFactory } from './factory/api'
import { makeContext, makeLogger } from '../shared/logger'

import { config } from './config'
import { errorHandlerFactories } from './factory/api'
import { makeErrorHandlersFactory } from './factory/api/makeErrorHandlersFactory'
import { makeExpressServer } from './factory/drivers'
import { setupProcessListeners } from './process'
import { setupServer } from '../delivery/api/server'

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
