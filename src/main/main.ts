import 'dotenv/config'

import { apiHandlerFactories, makeHandlersFactory } from './factory/api'
import { makeContext, makeLogger } from '../shared/logger'

import { makeExpressServer } from './factory/drivers'
import { setupProcessListeners } from './process'
import { setupServer } from '../delivery/api/server'

const main = () => {
  const context = makeContext()
  const logger = makeLogger({ context })
  const server = makeExpressServer()

  const handlersFactory = makeHandlersFactory(apiHandlerFactories)

  const hostname = process.env.HOSTNAME ?? '0.0.0.0'
  const port = parseInt(process.env.PORT ?? '8080')

  setupProcessListeners({ process, logger })
  setupServer({
    server,
    logger,
    options: { port, hostname },
    handlersFactory,
  })
}

main()
