import { UseCaseFactory } from './UseCaseFactory'
import { sayHelloUseCase } from '../../../domain/usecases'

export const sayHelloFactory: UseCaseFactory<any, any> = () => {
  let usecase = sayHelloUseCase({})
  return usecase
}
