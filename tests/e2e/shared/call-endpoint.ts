import 'dotenv/config'

import supertest from 'supertest'
import { v4 as uuid } from 'uuid'
import { config } from '../../../src/main/config'

const baseURL = `${config.HOSTNAME}:${config.PORT}`

export enum Method {
  POST = 'post',
  GET = 'get',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export const callEndpoint = (method: Method, url: string, payload: object = {}) => {
  return supertest.agent(baseURL)[method](url).send(payload).set('trace-id', uuid()).redirects(0)
}
