import { mock, mockClear } from 'jest-mock-extended'

import { Greeting } from '../../types'
import { GreetingNotFoundError } from '../../errors'
import { GreetingsRepo } from '../../boundaries'
import { newShowGreetingUseCase } from './show-greeting'

describe('showGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()
  const sut = newShowGreetingUseCase({ repo })

  afterEach(() => {
    mockClear(repo)
  })

  test('get the greeting by ID from the greetings repository', async () => {
    const greeting: Greeting = {
      id: 'greetingId',
      from: 'me',
      to: 'you',
      message: 'hi',
      createdOn: new Date(),
      modifiedOn: new Date(),
    }
    repo.findById.mockResolvedValue(greeting)

    const result = await sut({ id: 'greetingId' })

    expect(repo.findById).toBeCalledTimes(1)
    expect(repo.findById).toBeCalledWith('greetingId')
    expect(result).toStrictEqual(greeting)
  })

  test('throw GreetingNotFoundError when the greeting is not in the repository', async () => {
    repo.findById.mockResolvedValue(null)

    const error = new GreetingNotFoundError('greetingId')
    await expect(sut({ id: 'greetingId' })).rejects.toStrictEqual(error)
  })
})
