import { v4 as uuidv4 } from 'uuid'
import { Contex } from './types'

export const makeContext = (traceID?: string): Contex => ({
  traceID: traceID ?? uuidv4(),
})
