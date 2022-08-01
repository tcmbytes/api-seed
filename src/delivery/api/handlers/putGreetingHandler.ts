import { RouteHandlerConstructor } from '../types'
import { SayHelloUseCaseType } from '../../../domain/usecases'

type Params = {
  usecase: SayHelloUseCaseType
}

export const putGreetingHandler: RouteHandlerConstructor<Params> = (params) => async (req, res) => {
  try {
    const { usecase } = params
    const { name } = req.body
    const result = await usecase({ name })

    res.status(200).send(result)
  } catch (error) {
    const { message } = error as Error
    res.status(400).json({
      status: 'Bad Request',
      statusCode: 400,
      message: message,
    })
  }
}
