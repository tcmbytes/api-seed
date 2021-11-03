import { HandlerConstructor } from '../types'
import { sayHelloUseCaseType } from '../../../domain/usecases'

interface Params {
  usecase: sayHelloUseCaseType
}

export const sayHelloHandler: HandlerConstructor<Params> = (params) => async (event) => {
  try {
    let name = event.queryStringParameters ? ['name'] : 'World'

    let { usecase } = params
    let response = usecase({ name: name as string })

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log(`> ${error.message}`)
    return {
      status: 'error',
      statusCode: 400,
      body: error.message,
    }
  }
}
