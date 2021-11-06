import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda'

export type HandlerFactory = (event: APIGatewayEvent, context: Context) => Handler

export type HandlerConstructor<T> = (params: T) => Handler

export type Handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => APIGatewayProxyResult | Promise<APIGatewayProxyResult>
