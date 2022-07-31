import { Generator, GreetingsRepo } from '../../boundaries'
import { mock, mockClear } from 'jest-mock-extended'

import { clear } from 'jest-date-mock'
import { sayHelloUseCase } from './hello-world'

describe('sayHello', () => {
  const repo = mock<GreetingsRepo>()
  const dateGenerator = mock<Generator<Date>>()

  const sut = sayHelloUseCase({ repo, dateGenerator })

  afterEach(() => {
    mockClear(repo)
    mockClear(dateGenerator)
    clear()
  })

  test('should return the "Hi, Anonymous!" message when called with the input name "Anonymous"', async () => {
    const request = { name: 'Anonymous' }

    const response = await sut(request)

    expect(response).toStrictEqual({
      message: 'Hi, Anonymous!',
    })
  })

  test('should save the name and request date into the GreetingsRepo', async () => {
    const fakeDate = new Date('2022-07-20')
    dateGenerator.next.mockReturnValue(fakeDate)

    const request = { name: 'Anonymous' }

    await sut(request)

    expect(repo.save).toBeCalledTimes(1)
    expect(repo.save).toBeCalledWith({
      name: 'Anonymous',
      savedOn: fakeDate,
    })
  })
})
