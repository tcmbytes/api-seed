import { ErrorHandlerFactories, HandlerFactories } from '../types'

import { makeErrorHandlerMiddleware } from './makeErrorHandlerMiddleware'
import { makeLoggingContextMiddlewareFactory } from './makeLoggingContextMiddlewareFactory'
import { makeRouteUnavailableMiddlewareFactory } from './makeRouteUnavailableMiddlewareFactory'

export const apiMiddlewareFactories: HandlerFactories = {
  loggingContextMiddleware: makeLoggingContextMiddlewareFactory,
  routeUnavailableMiddleware: makeRouteUnavailableMiddlewareFactory,
}

export const errorHandlerFactories: ErrorHandlerFactories = {
  errorHandler: makeErrorHandlerMiddleware,
}
