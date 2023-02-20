import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { makeTestsServer } from '@main/factory/drivers'
import { dateGenerator, GREETING, INVALID_UUID, repo, state, uuidGenerator } from './common.steps'

const NOW = new Date()
const MESSAGE = 'New message'

When('I update the greeting', async () => {
  dateGenerator.next.returns(NOW)

  const server = makeTestsServer({ repo, dateGenerator, uuidGenerator })
  const body = {
    message: MESSAGE,
  }
  state.response = await server.put(`/greetings/${GREETING.id}`).send(body)
})

Then('I receive the updated greeting', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql({
    id: GREETING.id,
    from: GREETING.from,
    to: GREETING.to,
    message: MESSAGE,
    createdOn: GREETING.createdOn.toJSON(),
    modifiedOn: NOW.toJSON(),
  })
})

When('I try to update a greeting that does not exist', async () => {
  const server = makeTestsServer({ repo, dateGenerator, uuidGenerator })
  const body = {
    message: MESSAGE,
  }
  state.response = await server.put(`/greetings/${INVALID_UUID}`).send(body)
})
