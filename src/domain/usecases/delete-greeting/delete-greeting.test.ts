import { mock, mockClear } from 'jest-mock-extended'

import { Greeting } from '../../types'
import { GreetingNotFoundError } from '../../errors'
import { GreetingsRepo } from '../../boundaries'
import { newDeleteGreetingUseCase } from './delete-greeting'

describe('deleteGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()

  const sut = newDeleteGreetingUseCase({ repo })

  afterEach(() => {
    mockClear(repo)
  })

  test('throw GreetingNotFoundError when the greeting is not in the repository', async () => {
    repo.findById.mockResolvedValue(null)

    const error = new GreetingNotFoundError('greetingId')
    await expect(sut({ id: 'greetingId' })).rejects.toStrictEqual(error)
  })

  test('remove the greeting when the greeting is in the repository', async () => {
    const greeting: Greeting = {
      id: 'greetingId',
      from: 'me',
      to: 'you',
      message: 'hi',
      createdOn: new Date(),
      modifiedOn: new Date(),
    }
    repo.findById.mockResolvedValue(greeting)

    await sut({ id: 'greetingId' })

    expect(repo.removeById).toBeCalledTimes(1)
    expect(repo.removeById).toBeCalledWith('greetingId')
  })
})
