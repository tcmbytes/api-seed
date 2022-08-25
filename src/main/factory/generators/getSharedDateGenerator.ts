import { Generator } from 'domain/boundaries'

const instance = {
  next: () => new Date(),
}

export const getSharedDateGenerator = (): Generator<Date> => instance
