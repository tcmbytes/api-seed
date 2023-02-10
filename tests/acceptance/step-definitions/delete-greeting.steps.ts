import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { makeServer } from '../shared'
import { GREETING, INVALID_UUID, repo, state } from './common.steps'

When('I delete the greeting', async () => {
  const server = makeServer({ repo })

  state.response = await server.delete(`/greetings/${GREETING.id}`).send()
})

Then('The greeting is successfully deleted', async () => {
  expect(state.response?.status).to.equal(204)
})

When('I delete a greeting that does not exists', async () => {
  const server = makeServer({ repo })

  state.response = await server.delete(`/greetings/${INVALID_UUID}`).send()
})
