import { Generator, GreetingsRepo } from '../../boundaries'
import { mock, mockClear } from 'jest-mock-extended'

import { newCreateGreetingUseCase } from './create-greeting'

describe('createGreetingUseCase should', () => {
  const repo = mock<GreetingsRepo>()
  const dateGenerator = mock<Generator<Date>>()
  const uuidGenerator = mock<Generator<string>>()

  const sut = newCreateGreetingUseCase({ repo, dateGenerator, uuidGenerator })

  afterEach(() => {
    mockClear(repo)
    mockClear(dateGenerator)
  })

  test('create a new Greeting and save it into the GreetingsRepo repo', async () => {
    const fakeDate = new Date('2022-07-20')
    dateGenerator.next.mockReturnValue(fakeDate)

    const fakeId = 'greetingId'
    uuidGenerator.next.mockReturnValue(fakeId)

    const request = {
      from: 'me',
      to: 'you',
      message: 'hi',
    }

    const result = await sut(request)
    const expected = {
      id: 'greetingId',
      from: 'me',
      to: 'you',
      message: 'hi',
      createdOn: fakeDate,
      modifiedOn: fakeDate,
    }

    expect(repo.create).toBeCalledTimes(1)
    expect(repo.create).toBeCalledWith(expected)

    expect(result).toStrictEqual(expected)
  })
})
