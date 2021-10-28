import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda'

export type HandlerFactory = (event: APIGatewayEvent, context: Context) => APIGatewayProxyHandler
export type HandlerConstructor<T> = (params: T) => APIGatewayProxyHandler

export const resolveHandler =
  (factory: HandlerFactory): APIGatewayProxyHandler =>
  async (event, context, callback) => {
    try {
      let handler = factory(event, context)
      let result = await handler(event, context, callback)

      return result
    } catch (err) {
      return {
        statusCode: 500,
        body: err.message,
      }
    }
  }
