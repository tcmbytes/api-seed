import 'dotenv/config'

import { apiHandlerFactories, apiMiddlewareFactories, makeHandlersFactory } from './factory/api'
import { makeContext, makeLogger } from '../shared/logger'

import { errorHandlerFactories } from './factory/api'
import { makeErrorHandlersFactory } from './factory/api/makeErrorHandlersFactory'
import { makeExpressServer } from './factory/drivers'
import { setupProcessListeners } from './process'
import { setupServer } from '../delivery/api/server'

const main = () => {
  const context = makeContext()
  const logger = makeLogger({ context })
  const server = makeExpressServer()

  const handlersFactory = makeHandlersFactory(apiHandlerFactories)
  const middlewaresFactory = makeHandlersFactory(apiMiddlewareFactories)
  const errorHandersFactory = makeErrorHandlersFactory(errorHandlerFactories)

  const hostname = process.env.HOSTNAME ?? '0.0.0.0'
  const port = parseInt(process.env.PORT ?? '8080')

  setupProcessListeners({ process, logger })
  setupServer({
    server,
    logger,
    options: { port, hostname },
    handlersFactory,
    middlewaresFactory,
    errorHandersFactory,
  })
}

main()
