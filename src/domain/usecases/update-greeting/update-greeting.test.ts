import { Generator, GreetingsRepo } from '../../boundaries'
import { mock, mockClear } from 'jest-mock-extended'

import { GreetingBuilder } from '../../types'
import { GreetingNotFoundError } from '../../errors'
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
    const greeting = GreetingBuilder.build({
      id: 'greetingId',
    })
    repo.findById.mockResolvedValue(greeting)

    await sut({
      id: 'greetingId',
      message: 'hi',
    })

    expect(repo.findById).toBeCalledTimes(1)
    expect(repo.findById).toBeCalledWith('greetingId')
  })

  test('throw GreetingNotFoundError when the greeting is not in the repository', async () => {
    repo.findById.mockResolvedValue(null)

    const error = new GreetingNotFoundError('greetingId')
    await expect(
      sut({
        id: 'greetingId',
        message: 'hi',
      }),
    ).rejects.toStrictEqual(error)
  })

  test('update the greeting into the greetings repository', async () => {
    const greeting = GreetingBuilder.build({
      id: 'greetingId',
    })
    repo.findById.mockResolvedValue(greeting)

    const modifiedOn = new Date('2022-07-20')
    dateGenerator.next.mockReturnValue(modifiedOn)

    const result = await sut({
      id: 'greetingId',
      message: 'hi there',
    })

    const expected = {
      id: 'greetingId',
      from: greeting.from,
      to: greeting.to,
      message: 'hi there',
      createdOn: greeting.createdOn,
      modifiedOn: new Date('2022-07-20'),
    }

    expect(repo.update).toBeCalledTimes(1)
    expect(repo.update).toBeCalledWith(expected)

    expect(result).toStrictEqual(expected)
  })
})
