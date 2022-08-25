import { Generator } from 'domain/boundaries'
import { v4 } from 'uuid'

const instance = {
  next: () => v4(),
}

export const getSharedUUIDGenerator = (): Generator<string> => instance
