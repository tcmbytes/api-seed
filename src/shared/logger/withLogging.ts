import { Logger } from './types'

export const withLogging =
  (logger: Logger, component: string, funcName: string) =>
  <Params extends unknown[], Return>(func: (...args: Params) => Return | Promise<Return>) =>
  async (...args: Params): Promise<Return> => {
    try {
      logger.info(`${component} ${funcName} was invoked`)
      const result = await func(...args)
      logger.info(`${component} ${funcName} finished`)

      return result
    } catch (err) {
      logger.error(`${component} ${funcName} failed`, {
        details: err,
      })
      throw err
    }
  }
