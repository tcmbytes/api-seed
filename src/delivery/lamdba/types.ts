import { APIGatewayEvent, APIGatewayProxyHandler, Callback, Context } from 'aws-lambda'

export type HandlerFactory = (event: APIGatewayEvent, context: Context) => APIGatewayProxyHandler
export type HandlerConstructor<T> = (params: T) => APIGatewayProxyHandler

export const resolveHandler =
  (factory: HandlerFactory) => async (event: APIGatewayEvent, context: Context, callback: Callback) => {
    try {
      let handler = factory(event, context)
      return await handler(event, context, callback)
    } catch (err) {
      return {
        statusCode: 500,
        body: err.message as string,
      }
    }
  }
