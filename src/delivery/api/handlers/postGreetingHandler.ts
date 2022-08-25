import { CreateGreetingUseCase } from 'domain/usecases'
import { RouteHandlerConstructor } from '../types'

type Params = {
  usecase: CreateGreetingUseCase
}

export const postGreetingHandler: RouteHandlerConstructor<Params> = (params) => async (req, res) => {
  try {
    const { usecase } = params
    const { from, to, message } = req.body

    const result = await usecase({ from, to, message })

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
