import { HandlerFactories } from '../types'
import { deleteGreetingHandlerFactory } from './deleteGreetingHandlerFactory'
import { getGreetingHandlerFactory } from './getGreetingHandlerFactory'
import { getGreetingsHandlerFactory } from './getGreetingsHandlerFactory'
import { postGreetingHandlerFactory } from './postGreetingHandlerFactory'
import { putGreetingHandlerFactory } from './putGreetingHandlerFactory'

export const apiHandlerFactories: HandlerFactories = {
  getGreetingHandler: getGreetingHandlerFactory,
  deleteGreetingHandler: deleteGreetingHandlerFactory,
  getGreetingsHandler: getGreetingsHandlerFactory,
  putGreetingHandler: putGreetingHandlerFactory,
  postGreetingHandler: postGreetingHandlerFactory,
}
