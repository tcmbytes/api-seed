import { Builder } from '../boundaries'
import { Greeting } from './Greeting'
import faker from 'faker'

const storage = {
  id: faker.random.uuid(),
  from: faker.internet.email(),
  to: faker.internet.email(),
  message: faker.lorem.sentence(),
  createdOn: faker.date.past(),
  modifiedOn: faker.date.recent(),
}

export const GreetingBuilder: Builder<Greeting> = {
  build: (overrides) => ({
    ...storage,
    ...overrides,
  }),
}
