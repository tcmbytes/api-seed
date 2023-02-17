import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { makeTestsServer } from 'main/factory/drivers'
import { dateGenerator, GREETING, INVALID_UUID, repo, state, uuidGenerator } from './common.steps'

When('I delete the greeting', async () => {
  const server = makeTestsServer({ repo, dateGenerator, uuidGenerator })

  state.response = await server.delete(`/greetings/${GREETING.id}`).send()
})

Then('The greeting is successfully deleted', async () => {
  expect(state.response?.status).to.equal(204)
})

When('I delete a greeting that does not exists', async () => {
  const server = makeTestsServer({ repo, dateGenerator, uuidGenerator })

  state.response = await server.delete(`/greetings/${INVALID_UUID}`).send()
})
