import { HandlerFactories } from '../types'
import { makeDeleteGreetingHandlerFactory } from './makeDeleteGreetingHandlerFactory'
import { makeGetGreetingHandlerFactory } from './makeGetGreetingHandlerFactory'
import { makeGetGreetingsHandlerFactory } from './makeGetGreetingsHandlerFactory'
import { makePostGreetingHandlerFactory } from './makePostGreetingHandlerFactory'
import { makePutGreetingHandlerFactory } from './makePutGreetingHandlerFactory'

export const apiHandlerFactories: HandlerFactories = {
  getGreetingHandler: makeGetGreetingHandlerFactory,
  deleteGreetingHandler: makeDeleteGreetingHandlerFactory,
  getGreetingsHandler: makeGetGreetingsHandlerFactory,
  putGreetingHandler: makePutGreetingHandlerFactory,
  postGreetingHandler: makePostGreetingHandlerFactory,
}
