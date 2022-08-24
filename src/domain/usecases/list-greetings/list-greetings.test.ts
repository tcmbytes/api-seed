import { mock, mockClear } from 'jest-mock-extended'

import { Greeting } from '../../types'
import { GreetingsRepo } from '../../boundaries'
import { newListGreetingsUseCase } from './list-greetings'

describe('listGreetingsUseCase should', () => {
  const repo = mock<GreetingsRepo>()
  const sut = newListGreetingsUseCase({ repo })

  afterEach(() => {
    mockClear(repo)
  })

  test('get the list of greetings from the greetings repository', async () => {
    await sut()

    expect(repo.findAll).toBeCalledTimes(1)
  })

  test('return the list received from the greetings repoisory', async () => {
    const greeting: Greeting = {
      id: 'greetingId',
      from: 'me',
      to: 'you',
      message: 'hi',
      createdOn: new Date(),
      modifiedOn: new Date(),
    }
    repo.findAll.mockResolvedValue([greeting])

    const result = await sut()

    expect(result).toStrictEqual([greeting])
  })
})
