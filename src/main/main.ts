import 'dotenv/config'

import { makeContext, makeLogger } from '../shared/logger'

import { makeExpressServer } from './factory/drivers'
import { makeRouteHandlersFactory } from './factory/routeHandlers'
import { setupProcessListeners } from './process'
import { setupServer } from '../delivery/api/server'

const main = () => {
  const context = makeContext()
  const logger = makeLogger({ context })
  const server = makeExpressServer()
  const routesFactory = makeRouteHandlersFactory()

  const hostname = process.env.HOSTNAME ?? '0.0.0.0'
  const port = parseInt(process.env.PORT ?? '8080')

  setupProcessListeners({ process, logger })
  setupServer({
    server,
    logger,
    options: { port, hostname },
    handlersFactory: routesFactory,
  })
}

main()
