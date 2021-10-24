import { sayHelloUseCase } from '../../domain/usecases'

module.exports.handler = async (event: any, context: any) => {
  try {
    let response = sayHelloUseCase({ name: event.queryStringParameters.name })

    context.succeed({
      statusCode: 200,
      body: JSON.stringify(response),
    })
  } catch (error) {
    console.log(`> ${error.message}`)
    context.fail({
      status: 'error',
      statusCode: 400,
      message: error.message,
    })
  }
}
