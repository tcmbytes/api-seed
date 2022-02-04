import 'dotenv/config'

import { makeContext } from '../shared/logger/context'
import { makeLogger } from '../shared/logger/logger'
import { setupProcessListeners } from './process'
import { startServer } from './server'

;
(async () => {
  const context = makeContext()
  const logger = makeLogger({ context })

  setupProcessListeners({ logger })
  startServer({ logger })
})()
