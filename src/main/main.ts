import 'dotenv/config'

import { makeContext } from '../shared/logger/context'
import { makeExpressServer } from './factory/express'
import { makeLogger } from '../shared/logger/logger'
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
