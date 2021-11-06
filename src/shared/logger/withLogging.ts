import { Logger } from './'

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
      logger.info(`${component} ${funcName} failed`, {
        reason: err,
      })
      throw err
    }
  }
