import { Logger } from './'

export const withLogging =
  (logger: Logger, component: string) =>
  <Params extends unknown[], Return>(func: (...args: Params) => Return | Promise<Return>) =>
  async (...args: Params): Promise<Return> => {
    try {
      logger.info(`${component} ${func.name} was invoked`)
      return await func(...args)
    } catch (err) {
      logger.info(`${component} ${func.name} failed`, {
        reason: err,
      })
      throw err
    }
  }
