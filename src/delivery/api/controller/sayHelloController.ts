import { RouteHandlerConstructor } from '../types'
import { sayHelloUseCaseType } from '../../../domain/usecases'

interface Params {
  usecase: sayHelloUseCaseType
}

export const sayHelloController: RouteHandlerConstructor<Params> = (params) => async (req, res) => {
  try {
    let { usecase } = params
    let result = usecase({ name: req.params.name })

    res.status(200).send(result)
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: error.message,
    })
  }
}
