import { Context, Logger } from './types'

type Params = {
  context: Context
}

export const makeLogger = (params: Params): Logger => {
  const { context } = params

  const logInfo = (title: string, details?: object) =>
    console.log({
      title,
      ...details,
      ...context,
    })

  const logError = (title: string, details?: object) =>
    console.error({
      title,
      ...details,
      ...context,
    })

  return {
    info: logInfo,
    error: logError,
  }
}
