import { Handler, Request, Response } from 'express'

export type HandlerFactory = (req: Request, res: Response) => Handler
export type RouteHandlerConstructor<T> = (params: T) => Handler
