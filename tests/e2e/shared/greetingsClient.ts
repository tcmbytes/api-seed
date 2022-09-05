import 'dotenv/config'

import axios from 'axios'
import { config } from '../../../src/main/config'
import faker from 'faker'

const baseURL = `http://${config.HOSTNAME}:${config.PORT}`
const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const generatePostBody = () => {
  return {
    from: faker.internet.email(),
    to: faker.internet.email(),
    message: faker.lorem.sentence(),
  }
}

export const greetingsClient = {
  create: async () => client.post('/greetings', generatePostBody()),
  removeById: async (id: string) => client.delete(`/greetings/${id}`),
}
