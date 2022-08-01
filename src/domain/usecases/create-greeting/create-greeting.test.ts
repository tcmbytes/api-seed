import { Generator, GreetingsRepo } from '../../boundaries'
import { mock, mockClear } from 'jest-mock-extended'

import { createGreetingUseCase } from './create-greeting'

describe('createGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()
  const dateGenerator = mock<Generator<Date>>()

  const sut = createGreetingUseCase({ repo, dateGenerator })

  afterEach(() => {
    mockClear(repo)
    mockClear(dateGenerator)
  })

  test('return the "Hi, Anonymous!" message when called with the input name "Anonymous"', async () => {
    const request = { name: 'Anonymous' }

    const response = await sut(request)

    expect(response).toStrictEqual({
      message: 'Hi, Anonymous!',
    })
  })

  test('save the name and request date into the GreetingsRepo', async () => {
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
