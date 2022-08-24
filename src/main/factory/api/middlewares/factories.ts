import { ErrorHandlerFactories, HandlerFactories } from '../types'

import { makeErrorHandlerMiddleware } from './makeErrorHandlerMiddleware'
import { makeRouteUnavailableMiddlewareFactory } from './makeRouteUnavailableMiddlewareFactory'
import { makeTracingMiddlewareFactory } from './makeTracingMiddlewareFactory'

export const apiMiddlewareFactories: HandlerFactories = {
  tracingMiddleware: makeTracingMiddlewareFactory,
  routeUnavailableMiddleware: makeRouteUnavailableMiddlewareFactory,
}

export const errorHandlerFactories: ErrorHandlerFactories = {
  errorHandler: makeErrorHandlerMiddleware,
}
