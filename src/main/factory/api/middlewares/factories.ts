import { HandlerFactories } from '../types'
import { makeLoggingContextMiddlewareFactory } from './makeLoggingContextMiddlewareFactory'

export const apiMiddlewareFactories: HandlerFactories = {
  loggingContextMiddleware: makeLoggingContextMiddlewareFactory,
}
