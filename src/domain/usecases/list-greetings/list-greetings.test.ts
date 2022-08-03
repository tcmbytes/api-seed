import { mock, mockClear } from 'jest-mock-extended'

import { Greeting } from '../../types'
import { GreetingsRepo } from '../../boundaries'
import { listGreetingsUseCase } from './list-greetings'

describe('listGreetingsUseCase should', () => {
  const repo = mock<GreetingsRepo>()
  const sut = listGreetingsUseCase({ repo })

  afterEach(() => {
    mockClear(repo)
  })

  test('get the list of greetings from the greetings repository', async () => {
    await sut()

    expect(repo.findAll).toBeCalledTimes(1)
  })

  test('return the list received from the greetings repoisory', async () => {
    const greeting: Greeting = {
      name: 'Anonymous',
      savedOn: new Date(),
    }
    repo.findAll.mockResolvedValue([greeting])

    const result = await sut()

    expect(result).toStrictEqual([greeting])
  })
})
