import { RouteHandlerConstructor } from '../types'
import { sayHelloUseCaseType } from '../../../domain/usecases'

interface Params {
  usecase: sayHelloUseCaseType
}

export const getHelloHandler: RouteHandlerConstructor<Params> = (params) => async (req, res) => {
  try {
    let { usecase } = params
    let result = await usecase({ name: req.params.name })

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
