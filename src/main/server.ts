import { Logger } from '@shared/logger'
import { Config } from './config'
import { makeProductionServer } from './factory/drivers'

type Params = {
  logger: Logger
  config: Config
}

export const setupServerListerners = (params: Params) => {
  const server = makeProductionServer()

  const { logger, config } = params
  const { HOSTNAME, PORT } = config

  server
    .listen(PORT, HOSTNAME, () => {
      logger.info('MAIN setupServer was invoked', {
        details: `Server running at http://${HOSTNAME}:${PORT}/`,
      })
    })
    .on('error', () => {
      logger.error('MAIN setupServer failed', {
        details: `Server failed running at http://${HOSTNAME}:${PORT}/`,
      })
      process.exit(1)
    })
}
