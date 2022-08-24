import { AbstractFactory } from '../../../delivery/api/types'
import { ErrorHandlerFactories } from './types'
import { ErrorRequestHandler } from 'express'

export const makeErrorHandlersFactory = (factories: ErrorHandlerFactories): AbstractFactory<ErrorRequestHandler> => ({
  make: make(factories),
  getHandlers: getHandlers(factories),
})

const make =
  (factories: ErrorHandlerFactories) =>
  (name: string): ErrorRequestHandler =>
  async (err, req, res, next) => {
    const factory = factories[name]
    const handler = factory(err, req, res)
    return await handler(err, req, res, next)
  }

const getHandlers = (factories: ErrorHandlerFactories) => (): string[] => Object.keys(factories)
