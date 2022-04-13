import { Handler } from 'express'

export type RouteHandlerConstructor<T> = (params: T) => Handler

export interface RouteHandlersFactory {
  make: (name: string) => Handler
  getHandlers: () => string[]
}
