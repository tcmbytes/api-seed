import { Request, Response } from 'express'

export type RouteHandlerConstructor<T> = (params: T) => RouteHandler
export type RouteHandler = (req: Request, res: Response) => Promise<void> | void
export type RouteResolver = (req: Request, res: Response) => Promise<void> | void
