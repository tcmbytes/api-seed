import { Handler, HandlerFactory } from './types'

export const resolveHandler =
  (factory: HandlerFactory): Handler =>
  async (event, context, callback) => {
    try {
      let handler = factory(event, context)
      return await handler(event, context, callback)
    } catch (err) {
      const { message } = err as Error
      return {
        statusCode: 500,
        body: message,
      }
    }
  }
