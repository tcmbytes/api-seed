import { AbstractFactory } from 'delivery/api/types'
import { Handler } from 'express'
import { HandlerFactories } from './types'

export const makeHandlersFactory = (factories: HandlerFactories): AbstractFactory<Handler> => ({
  make: make(factories),
  getHandlers: getHandlers(factories),
})

const make =
  (factories: HandlerFactories) =>
  (name: string): Handler =>
  async (req, res, next) => {
    try {
      const factory = factories[name]
      const handler = factory(req, res)
      return await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }

const getHandlers = (factories: HandlerFactories) => (): string[] => Object.keys(factories)
