import { Contex } from './'
import { v4 as uuidv4 } from 'uuid'

export const makeContext = (): Contex => ({
  traceID: uuidv4(),
})
