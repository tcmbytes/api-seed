import { errorHandlerMiddleware, routeUnavailableMiddleware } from './middleware'

import { routeResolver } from './types'
import { sayHelloHandlerFactory } from './factories'

const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '0.0.0.0'
const port = parseInt(process.env.PORT ?? '8080')

const express = require('express')
const app = express()
app.use(express.json())

app.get('/say-hello/:name', routeResolver(sayHelloHandlerFactory))

app.use(routeUnavailableMiddleware)
app.use(errorHandlerMiddleware)

app.listen(port, hostname, () => {
  console.log(`> Server running at http://${hostname}:${port}/`)
})
