import { APIGatewayEvent, Context } from 'aws-lambda'

import { Handler } from '../../../delivery/lamdba/types'

export type HandlerFactory = (event: APIGatewayEvent, context: Context) => Handler
