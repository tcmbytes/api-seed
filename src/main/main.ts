import 'dotenv/config'

import { makeContext, makeLogger } from 'shared/logger'

import { setupProcessListeners } from './process'
import { setupServerListerners } from './server'

const main = () => {
  const context = makeContext()
  const logger = makeLogger({ context })

  setupProcessListeners({ process, logger })
  setupServerListerners({ logger })
}

main()
