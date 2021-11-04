import { Logger } from '../shared/logger'

interface Params {
  logger: Logger
}

export const setupProcessListeners = (params: Params) => {
  const { logger } = params

  logger.info('MAIN setupProcessListeners was invoked')

  process.on('unhandledRejection', () => {
    logger.error('MAIN setupProcessListeners failed', { reason: 'unhandledRejection' })
    process.exit(1)
  })

  process.on('uncaughtException', () => {
    logger.error('MAIN setupProcessListeners failed', { reason: 'uncaughtException' })
    process.exit(1)
  })
}
