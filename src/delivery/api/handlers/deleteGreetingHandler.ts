import { DeleteGreetingUseCase } from '../../../domain/usecases'
import { GreetingNotFoundError } from '../../../domain/errors'
import { RouteHandlerConstructor } from '../types'

type Params = {
  usecase: DeleteGreetingUseCase
}

export const deleteGreetingHandler: RouteHandlerConstructor<Params> = (params) => async (req, res) => {
  try {
    const { usecase } = params
    const { greetingId } = req.params

    const result = await usecase({ id: greetingId })

    res.status(204).send(result)
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
