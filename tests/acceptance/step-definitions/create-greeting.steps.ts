import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { makeTestsServer } from '@main/factory/drivers'
import { dateGenerator, repo, state, uuidGenerator } from './common.steps'

const NOW = new Date('2022-07-20')
const UUID = 'uuid'
const FROM = 'from@example.com'
const TO = 'to@example.com'
const MESSAGE = 'Greetings!'

When('I create a new greeting', async () => {
  uuidGenerator.next.returns(UUID)
  dateGenerator.next.returns(NOW)

  const server = makeTestsServer({ repo, dateGenerator, uuidGenerator })
  const body = {
    from: FROM,
    to: TO,
    message: MESSAGE,
  }
  state.response = await server.post('/greetings').send(body)
})

Then('I receive the newly created greeting', async () => {
  expect(state.response?.status).to.equal(201)
  expect(state.response?.body).to.eql({
    id: UUID,
    from: FROM,
    to: TO,
    message: MESSAGE,
    createdOn: NOW.toJSON(),
    modifiedOn: NOW.toJSON(),
  })
})
