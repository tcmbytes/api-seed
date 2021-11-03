import { makeHelloHandler } from './factories'
import { resolveHandler } from './types'

module.exports.handler = resolveHandler(makeHelloHandler)
