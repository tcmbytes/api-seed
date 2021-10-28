import { resolveHandler } from './types'
import { sayHelloHandlerFactory } from './factories'

module.exports.handler = resolveHandler(sayHelloHandlerFactory)
