import { Given, Then, When } from '@cucumber/cucumber'
import { GreetingBuilder } from '@tests/shared'
import { expect } from 'chai'
import { makeServer } from '../shared'
import { repo, state } from './common.steps'

const greetings = [GreetingBuilder.build(), GreetingBuilder.build(), GreetingBuilder.build(), GreetingBuilder.build()]

Given('I have a bunch of greetings created', async () => {
  repo.findAll.resolves(greetings)
})

When('I request to list all greetings', async () => {
  const server = makeServer({ repo })

  state.response = await server.get('/greetings').send()
})

Then('The greetings are successfully listed', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql(
    greetings.map((item) => ({
      ...item,
      createdOn: item.createdOn.toJSON(),
      modifiedOn: item.modifiedOn.toJSON(),
    })),
  )
})

Given('I have no greetings created', async () => {
  repo.findAll.resolves([])
})

Then('I receive an empty list', async () => {
  expect(state.response?.status).to.equal(200)
  expect(state.response?.body).to.eql([])
})
