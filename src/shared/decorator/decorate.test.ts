import { decorate } from './decorate'

describe('decorate', () => {
  it('should run the decorators', () => {
    const decorator1 = jest.fn()
    const decorator2 = jest.fn()
    const object = { method: () => undefined }
    const decorators = [decorator1, decorator2]

    decorator1.mockReturnValue({ method: () => undefined })
    decorator2.mockReturnValue({ method: () => undefined })

    decorate(object, decorators)

    expect(decorator1).toBeCalledTimes(1)
    expect(decorator1).toBeCalledWith(object)
    expect(decorator2).toBeCalledTimes(1)
    expect(decorator2).toBeCalledWith(decorator1.mock.results[0].value)
  })

  it('should return the same object when no decorators are given', () => {
    const object = { method: () => undefined }

    const result = decorate(object, [])

    expect(result).toStrictEqual(object)
  })

  it('should return a decorated driver when decorators are given', () => {
    const decorator1 = jest.fn()
    const decorator2 = jest.fn()
    const object = { method: () => undefined }
    const decorators = [decorator1, decorator2]

    decorator1.mockReturnValue({ method: () => undefined })
    decorator2.mockReturnValue({ method: () => undefined })

    const result = decorate(object, decorators)

    expect(result).not.toStrictEqual(object)
  })
})
