import { Handler } from 'express'
import { HandlerFactory } from './types'
import { RouteHandlersFactory } from '../../../delivery/api/types'
import { makeGetHelloHandlerFactory } from './makeGetHelloHandlerFactory'

export const makeRouteHandlersFactory = (): RouteHandlersFactory => ({
  make: make,
  getHandlers: getHandlers,
})

const handlerFactories: { [key: string]: HandlerFactory } = {
  getHelloHandler: makeGetHelloHandlerFactory,
}

const make =
  (name: string): Handler =>
  async (req, res, next) => {
    try {
      const factory = handlerFactories[name]
      const handler = factory(req, res)
      return await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }

const getHandlers = (): string[] => Object.keys(handlerFactories)
