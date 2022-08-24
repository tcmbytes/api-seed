import { CreateGreetingUseCase } from '../../../domain/usecases'
import { HandlerConstructor } from '../types'

type Params = {
  usecase: CreateGreetingUseCase
}

export const newCreateGreetingHandler: HandlerConstructor<Params> = (params) => async (event) => {
  try {
    const from = event.queryStringParameters ? ['from'] : ''
    const to = event.queryStringParameters ? ['to'] : ''
    const message = event.queryStringParameters ? ['message'] : ''

    const { usecase } = params
    const response = await usecase({
      from: from as string,
      to: to as string,
      message: message as string,
    })

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
