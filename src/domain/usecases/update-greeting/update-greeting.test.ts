import { Generator, GreetingsRepo } from '../../boundaries'
import { mock, mockClear } from 'jest-mock-extended'

import { updateGreetingUseCase } from './update-greeting'

describe('updateGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()
  const dateGenerator = mock<Generator<Date>>()

  const sut = updateGreetingUseCase({ repo, dateGenerator })

  afterEach(() => {
    mockClear(repo)
    mockClear(dateGenerator)
  })

  test('get the greeting from the greetings repository', async () => {
    const request = {
      id: 'greetingId',
      message: 'hi',
    }

    await sut(request)

    expect(repo.findById).toBeCalledTimes(1)
    expect(repo.findById).toBeCalledWith('greetingId')
  })
})
