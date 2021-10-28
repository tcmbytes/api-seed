import { RouteResolver } from '../types'
import { sayHelloController } from '../controller/sayHelloController'
import { sayHelloUseCase } from '../../../domain/usecases'

export const sayHelloRouteResolver: RouteResolver = (req, res) => {
  let usecase = sayHelloUseCase({})
  let controller = sayHelloController({
    usecase,
  })

  return controller(req, res)
}
