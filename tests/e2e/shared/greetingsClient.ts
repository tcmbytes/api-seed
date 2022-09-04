import 'dotenv/config'

import axios from 'axios'
import { config } from '../../../src/main/config'

const baseURL = `${config.HOSTNAME}:${config.PORT}`
const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const greetingsClient = {
  removeById: async (id: string) => client.delete(`/greetings/${id}`),
}
