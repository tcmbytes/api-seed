import { setupProcessListeners } from './process'
import { startServer } from './server'
;
(async () => {
  setupProcessListeners({})
  startServer()
})()
