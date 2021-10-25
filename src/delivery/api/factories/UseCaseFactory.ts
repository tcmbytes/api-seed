import { UseCase } from '../../../domain/boundaries/usecase'

export type UseCaseFactory<I, O> = () => UseCase<I, O>
