import { Handler, Request, Response } from 'express'

export type HandlerFactory = (req: Request, res: Response) => Handler
export type RouteHandlerConstructor<T> = (params: T) => Handler

export const resolveRoute =
  (factory: HandlerFactory): Handler =>
  async (req, res, next) => {
    try {
      let handler = factory(req, res)
      return await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
