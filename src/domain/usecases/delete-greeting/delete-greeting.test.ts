import { mock, mockClear } from 'jest-mock-extended'

import { GreetingBuilder } from '../../__tests__/types'
import { GreetingNotFoundError } from '../../errors'
import { GreetingsRepo } from '../../boundaries'
import { deleteGreetingUseCase } from './delete-greeting'

describe('deleteGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()

  const sut = deleteGreetingUseCase({ repo })

  afterEach(() => {
    mockClear(repo)
  })

  test('throw GreetingNotFoundError when the greeting is not in the repository', async () => {
    repo.findById.mockResolvedValue(null)

    const error = new GreetingNotFoundError('greetingId')
    await expect(sut({ id: 'greetingId' })).rejects.toStrictEqual(error)
  })

  test('remove the greeting when the greeting is in the repository', async () => {
    const greeting = GreetingBuilder.build({
      id: 'greetingId',
    })
    repo.findById.mockResolvedValue(greeting)

    await sut({ id: 'greetingId' })

    expect(repo.removeById).toBeCalledTimes(1)
    expect(repo.removeById).toBeCalledWith('greetingId')
  })
})
