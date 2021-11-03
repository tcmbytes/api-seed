import { errorHandlerMiddleware, routeUnavailableMiddleware } from './middleware'

import { makeGetHelloHandler } from './factories'
import { resolveRoute } from './types'

interface Params {
  port: number
  hostname: string
}

export const setupServer = (params: Params) => {
  const { port, hostname } = params

  const express = require('express')
  const server = express()
  server.use(express.json())

  server.get('/say-hello/:name', resolveRoute(makeGetHelloHandler))

  server.use(routeUnavailableMiddleware)
  server.use(errorHandlerMiddleware)

  server
    .listen(port, hostname, () => {
      console.log(`> Server running at http://${hostname}:${port}/`)
    })
    .on('error', () => {
      process.exit(1)
    })
}
