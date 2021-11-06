import { Contex } from './'
import { v4 as uuidv4 } from 'uuid'

export const makeContext = (traceID?: string): Contex => ({
  traceID: traceID ?? uuidv4(),
})
