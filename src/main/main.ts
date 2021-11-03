import { app } from '../delivery/api/app'
import { setupProcessListeners } from './process'
import { startServer } from './server'
;
(async () => {
  setupProcessListeners({})
  startServer({ app })
})()
