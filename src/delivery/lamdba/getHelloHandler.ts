import { makeLambdaHandlersFactory } from '../../main/factory/lamdaHandlers'

const factory = makeLambdaHandlersFactory()

module.exports.handler = factory.make('getHelloHandler')
