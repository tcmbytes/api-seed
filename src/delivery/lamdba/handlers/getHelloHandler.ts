import { HandlerConstructor } from '../types'
import { sayHelloUseCaseType } from '../../../domain/usecases'

interface Params {
  usecase: sayHelloUseCaseType
}

export const getHelloHandler: HandlerConstructor<Params> = (params) => async (event) => {
  try {
    let name = event.queryStringParameters ? ['name'] : 'World'

    let { usecase } = params
    let response = await usecase({ name: name as string })

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
