import { Given, Then } from '@cucumber/cucumber'
import assert from 'assert'

Given('I request to create a new greering', async () => {
  console.log('Given')
})

Then('a new greeting is created in the database', async () => {
  console.log('Then')
  assert(true)
})

Then('returned back to me', async () => {
  console.log('Then')
  assert(true)
})
