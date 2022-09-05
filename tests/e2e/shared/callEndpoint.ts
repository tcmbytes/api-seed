import 'dotenv/config'

import { config } from '../../../src/main/config'
import supertest from 'supertest'
import { v4 } from 'uuid'

const { HOSTNAME: host, PORT: port } = config

export enum Method {
  Post = 'post',
  Get = 'get',
  Patch = 'patch',
  Put = 'put',
  Delete = 'delete',
}

export const callEndpoint = (url: string, method: Method, payload: object = {}) => {
  return supertest.agent(`${host}:${port}/`)[method](url).send(payload).set('trace-id', v4()).redirects(0)
}
