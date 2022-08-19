import { Context } from './types'
import { v4 as uuidv4 } from 'uuid'

export const makeContext = (traceID?: string): Context => ({
  traceID: traceID ?? uuidv4(),
})
