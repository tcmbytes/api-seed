import { errorHandlerMiddleware, routeUnavailableMiddleware } from './middleware'

import { makeGetHelloHandler } from './factories'
import { resolveRoute } from './types'

const express = require('express')
export const app = express()
app.use(express.json())

app.get('/say-hello/:name', resolveRoute(makeGetHelloHandler))

app.use(routeUnavailableMiddleware)
app.use(errorHandlerMiddleware)
