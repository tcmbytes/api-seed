import { Logger } from './types'

type WithLogging = (
  logger: Logger,
  component: string,
  handler: string,
) => <Params extends unknown[], Return>(
  func: (...args: Params) => Return | Promise<Return>,
  inputMapper?: (...args: Params) => unknown,
  outputMapper?: (args: Return) => unknown,
) => (...args: Params) => Return | Promise<Return>

export const withLogging: WithLogging =
  (logger, component, handler) =>
  (func, inputMapper, outputMapper) =>
  async (...args) => {
    try {
      if (inputMapper) {
        logger.info(`${component} ${handler} was invoked`, {
          input: inputMapper(...args),
        })
      } else {
        logger.info(`${component} ${handler} was invoked`)
      }

      const result = await func(...args)

      if (outputMapper) {
        logger.info(`${component} ${handler} completed successfully`, {
          output: outputMapper(result),
        })
      } else {
        logger.info(`${component} ${handler} completed successfully`)
      }

      return result
    } catch (err) {
      logger.error(`${component} ${handler} failed`, { error: err })
      throw err
    }
  }
