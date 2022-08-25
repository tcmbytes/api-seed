import { ErrorHandlerFactories, HandlerFactories } from '../types'

import { errorHandlerMiddleware } from './errorHandlerMiddleware'
import { routeUnavailableMiddlewareFactory } from './routeUnavailableMiddlewareFactory'
import { tracingMiddlewareFactory } from './tracingMiddlewareFactory'

export const apiMiddlewareFactories: HandlerFactories = {
  tracingMiddleware: tracingMiddlewareFactory,
  routeUnavailableMiddleware: routeUnavailableMiddlewareFactory,
}

export const errorHandlerFactories: ErrorHandlerFactories = {
  errorHandler: errorHandlerMiddleware,
}
