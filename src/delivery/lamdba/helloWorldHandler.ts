import { APIGatewayProxyHandler } from 'aws-lambda'
import { sayHelloUseCase } from '../../domain/usecases'

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    let usecase = sayHelloUseCase({})
    let name = event.queryStringParameters ? ['name'] : ''

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
