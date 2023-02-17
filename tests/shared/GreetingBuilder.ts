import { Greeting } from '@domain/types/Greeting'
import faker from 'faker'
import { Builder } from './Builder'

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
