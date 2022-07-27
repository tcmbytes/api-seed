import { advanceTo, clear } from 'jest-date-mock'

import { GreetingsRepo } from '../../boundaries'
import { sayHelloUseCase } from './hello-world'

describe('sayHello', () => {
  const saveMock: jest.MockedFunction<GreetingsRepo['save']> = jest.fn()
  const repo: GreetingsRepo = {
    save: saveMock,
  }

  afterEach(() => {
    saveMock.mockReset()
    clear()
  })

  test('should return the "Hi, Anonymous!" message when called with the input name "Anonymous"', async () => {
    const request = { name: 'Anonymous' }

    const sut = sayHelloUseCase({ repo })
    const response = await sut(request)

    expect(response).toStrictEqual({
      message: 'Hi, Anonymous!',
    })
  })

  test('should save the name and request date into the GreetingsRepo', async () => {
    const fakeDate = new Date()
    advanceTo(fakeDate)

    const request = { name: 'Anonymous' }

    const sut = sayHelloUseCase({ repo })
    await sut(request)

    expect(saveMock).toBeCalledTimes(1)
    expect(saveMock).toBeCalledWith({
      name: 'Anonymous',
      savedOn: fakeDate,
    })
  })
})
