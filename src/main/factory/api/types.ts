import { ErrorRequestHandler, Handler, Request, Response } from 'express'

export type HandlerFactory = (req: Request, res: Response) => Handler
export type ErrorHandlerFactory = (err: unknown, req: Request, res: Response) => ErrorRequestHandler

export type HandlerFactories = { [key: string]: HandlerFactory }
export type ErrorHandlerFactories = { [key: string]: ErrorHandlerFactory }
