import { Handler, Request, Response } from 'express'

export type HandlerFactory = (req: Request, res: Response) => Handler
export type RouteHandlerConstructor<T> = (params: T) => Handler

export const routeResolver =
  (factory: HandlerFactory): Handler =>
  async (req, res, next) => {
    try {
      let controller = factory(req, res)
      return await controller(req, res, next)
    } catch (err) {
      next(err)
    }
  }
