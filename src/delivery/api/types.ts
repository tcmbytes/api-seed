import { ErrorRequestHandler, Handler } from 'express'

export type RouteHandlerConstructor<T> = (params: T) => Handler
export type ErrorHandlerConstructor<T> = (params: T) => ErrorRequestHandler

export interface AbstractFactory<T> {
  make: (name: string) => T
  getHandlers: () => string[]
}
