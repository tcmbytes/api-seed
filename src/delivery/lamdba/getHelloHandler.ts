import { makeGetHelloHandler } from './factories'
import { resolveHandler } from './utils'

module.exports.handler = resolveHandler(makeGetHelloHandler)
