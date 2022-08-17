export type Decorator<T> = (object: T) => T

export const decorate = <T>(object: T, decorators: Decorator<T>[]): T =>
  decorators.reduce((acc, decorator) => decorator(acc), object)
