import { Logger } from '../shared/logger'

type Params = {
  process: NodeJS.Process
  logger: Logger
}

export const setupProcessListeners = (params: Params) => {
  const { process, logger } = params

  logger.info('MAIN setupProcessListeners was invoked')

  process.on('unhandledRejection', (error) => {
    logger.error('MAIN setupProcessListeners failed', { reason: 'unhandledRejection', error })
    process.exit(1)
  })

  process.on('uncaughtException', (error) => {
    logger.error('MAIN setupProcessListeners failed', { reason: 'uncaughtException', error })
    process.exit(1)
  })
}
