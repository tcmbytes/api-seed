import 'dotenv/config'

import axios from 'axios'
import { Greeting } from 'domain/types'
import faker from 'faker'
import { config } from '../../../src/main/config'
import { CreateGreetingBody } from '../types'

const baseURL = `http://${config.HOSTNAME}:${config.PORT}`
const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const greetingsClient = {
  create: async (overrides?: Partial<CreateGreetingBody>) => {
    const body = {
      from: faker.internet.email(),
      to: faker.internet.email(),
      message: faker.lorem.sentence(),
      ...overrides,
    }
    const response = await client.post<Greeting>('/greetings', body)

    return response.data
  },
  removeById: async (id: string) => client.delete(`/greetings/${id}`),
}
