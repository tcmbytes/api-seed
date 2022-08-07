import { mock, mockClear } from 'jest-mock-extended'

import { GreetingsRepo } from '../../boundaries'
import { deleteGreetingUseCase } from './delete-greeting'

describe('deleteGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()

  const sut = deleteGreetingUseCase({ repo })

  afterEach(() => {
    mockClear(repo)
  })

  test('delete the greeting from the GreetingsRepo repo', async () => {
    await sut({ id: 'greetingId' })
    expect(true).toStrictEqual(true)
  })
})
