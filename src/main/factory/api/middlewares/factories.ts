import { HandlerFactories } from '../types'
import { makeLoggingContextMiddlewareFactory } from './makeLoggingContextMiddlewareFactory'
import { makeRouteUnavailableMiddlewareFactory } from './makeRouteUnavailableMiddlewareFactory'

export const apiMiddlewareFactories: HandlerFactories = {
  loggingContextMiddleware: makeLoggingContextMiddlewareFactory,
  routeUnavailableMiddleware: makeRouteUnavailableMiddlewareFactory,
}
