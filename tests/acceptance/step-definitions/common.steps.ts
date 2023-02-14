import { Before, Given, Then } from '@cucumber/cucumber'
import { GreetingBuilder } from '@tests/shared'
import { expect } from 'chai'
import { Generator, GreetingsRepo } from 'domain/boundaries'
import faker from 'faker'
import { Response } from 'supertest'
import { stubInterface } from 'ts-sinon'

interface State {
  response: Response | undefined
}

export const state: State = {
  response: undefined,
}
export const GREETING = GreetingBuilder.build()
export const INVALID_UUID = faker.random.uuid()

export const repo = stubInterface<GreetingsRepo>()
export const uuidGenerator = stubInterface<Generator<string>>()
export const dateGenerator = stubInterface<Generator<Date>>()

Before(() => {
  repo.findById.resolves(undefined)
  uuidGenerator.next.resolves(undefined)
  dateGenerator.next.resolves(undefined)
})

Given('I have previously created a greeting', async () => {
  repo.findById.resolves(GREETING)
})

Then('I receive a 404 error and message', async () => {
  expect(state.response?.status).to.equal(404)
  expect(state.response?.body).to.eql({
    status: 'Not Found',
    statusCode: 404,
    message: `Greeting with id '${INVALID_UUID}' not found.`,
  })
})
