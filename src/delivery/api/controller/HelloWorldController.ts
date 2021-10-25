import { Request, Response } from '../../../domain/usecases'

import { UseCaseFactory } from '../factories/UseCaseFactory'

export const HelloWorldController =
  (factory: UseCaseFactory<Request, Response>) => async (req: any, res: any, next: any) => {
    try {
      let usecase = factory()
      let result = usecase({ name: req.params.name })
      res.status(200).send(result)
    } catch (error) {
      console.log(`> ${error.message}`)
      res.status(400).json({
        status: 'error',
        statusCode: 400,
        message: error.message,
      })
    }
  }
