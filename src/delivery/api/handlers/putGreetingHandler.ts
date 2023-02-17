import { GreetingNotFoundError } from '@domain/errors'
import { RouteHandlerConstructor } from '../types'
import { UpdateGreetingUseCase } from '@domain/usecases'

type Params = {
  usecase: UpdateGreetingUseCase
}

export const putGreetingHandler: RouteHandlerConstructor<Params> = (params) => async (req, res) => {
  try {
    const { usecase } = params
    const { greetingId: id } = req.params
    const { message } = req.body

    const result = await usecase({ id, message })

    res.status(200).send(result)
  } catch (error) {
    const { message } = error as Error
    if (error instanceof GreetingNotFoundError) {
      res.status(404).json({
        status: 'Not Found',
        statusCode: 404,
        message: message,
      })
    } else {
      res.status(400).json({
        status: 'Bad Request',
        statusCode: 400,
        message: message,
      })
    }
  }
}
