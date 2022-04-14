import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda'

export type Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => APIGatewayProxyResult | Promise<APIGatewayProxyResult>

export type HandlerConstructor<T> = (params: T) => Handler

export interface LambdaHandlersFactory {
  make: (name: string) => Handler
  getHandlers: () => string[]
}
