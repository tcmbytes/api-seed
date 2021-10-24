import { sayHelloUseCase } from './hello-world'

describe('sayHello', () => {
  test("should return the 'Hi, Anonymous!' message when called with the input name 'Anonymous'", async () => {
    let request = { name: 'Anonymous' }

    let sut = sayHelloUseCase({})
    let response = sut(request)

    expect(response).toEqual({
      message: 'Hi, Anonymous!',
    })
  })
})
