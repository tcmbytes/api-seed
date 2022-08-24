import { ListGreetingsUseCase } from 'domain/usecases'
import { RouteHandlerConstructor } from '../types'

type Params = {
  usecase: ListGreetingsUseCase
}

export const newGetGreetingsHandler: RouteHandlerConstructor<Params> = (params) => async (_req, res) => {
  try {
    const { usecase } = params
    const result = await usecase()

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
