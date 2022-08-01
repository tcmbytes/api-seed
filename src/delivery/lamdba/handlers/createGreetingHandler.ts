import { CreateGreetingUseCase } from '../../../domain/usecases'
import { HandlerConstructor } from '../types'

type Params = {
  usecase: CreateGreetingUseCase
}

export const createGreetingHandler: HandlerConstructor<Params> = (params) => async (event) => {
  try {
    const name = event.queryStringParameters ? ['name'] : 'World'

    const { usecase } = params
    const response = await usecase({ name: name as string })

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    const { message } = error as Error
    return {
      status: 'Bad Request',
      statusCode: 400,
      body: message,
    }
  }
}
