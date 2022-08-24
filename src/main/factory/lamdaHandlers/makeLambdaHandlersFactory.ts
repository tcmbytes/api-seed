import { Handler, LambdaHandlersFactory } from 'delivery/lamdba/types'

import { HandlerFactory } from './types'
import { makeCreateGreetingHandlerFactory } from './makeCreateGreetingHandlerFactory'

export const makeLambdaHandlersFactory = (): LambdaHandlersFactory => ({
  make: make,
  getHandlers: getHandlers,
})

const handlerFactories: { [key: string]: HandlerFactory } = {
  createGreetingHandler: makeCreateGreetingHandlerFactory,
}

const make =
  (name: string): Handler =>
  async (event, context, callback) => {
    try {
      const factory = handlerFactories[name]
      const handler = factory(event, context)
      return await handler(event, context, callback)
    } catch (err) {
      const { message } = err as Error
      return {
        statusCode: 500,
        body: message,
      }
    }
  }

const getHandlers = (): string[] => Object.keys(handlerFactories)
