import { Then, When } from '@cucumber/cucumber'
import { expect } from 'chai'
import { makeServer } from '../shared'
import { GREETING, INVALID_UUID, repo, state } from './common.steps'

When('I request the greeting details', async () => {
  const server = makeServer({ repo })

  state.response = await server.get(`/greetings/${GREETING.id}`).send()
})

Then('The greeting is successfully retrieved', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql({
    id: GREETING.id,
    from: GREETING.from,
    to: GREETING.to,
    message: GREETING.message,
    createdOn: GREETING.createdOn.toJSON(),
    modifiedOn: GREETING.modifiedOn.toJSON(),
  })
})

When('I request a greeting that does not exists', async () => {
  const server = makeServer({ repo })

  state.response = await server.get(`/greetings/${INVALID_UUID}`).send()
})
