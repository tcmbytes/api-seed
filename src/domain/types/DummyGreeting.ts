import { Dummy } from './Dummy'
import { Greeting } from './Greeting'
import faker from 'faker'

export const DummyGreeting: Dummy<Greeting> = (model) => ({
  id: faker.random.uuid(),
  from: faker.internet.email(),
  to: faker.internet.email(),
  message: faker.lorem.sentence(),
  createdOn: faker.date.past(),
  modifiedOn: faker.date.recent(),
  ...model,
})
