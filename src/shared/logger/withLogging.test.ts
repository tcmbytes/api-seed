import { Logger } from './types'
import { withLogging } from './withLogging'

describe('withLogging should', () => {
  const infoMock = jest.fn()
  const errorMock = jest.fn()

  const logger: Logger = {
    info: infoMock,
    error: errorMock,
  }

  afterEach(() => {
    infoMock.mockReset()
    errorMock.mockReset()
  })

  test('return the value returned by the decorated function', async () => {
    const func = jest.fn()
    func.mockResolvedValue('output')

    const sut = withLogging(logger, 'TEST', 'sut')(func)
    const response = await sut()

    expect(response).toStrictEqual('output')
  })

  test('log info without details when the decorated function does not have any mappers attached', async () => {
    const func = jest.fn()

    const sut = withLogging(logger, 'TEST', 'sut')(func)
    await sut('details')

    expect(infoMock).toHaveBeenCalledTimes(2)
    expect(infoMock).toHaveBeenNthCalledWith(1, 'TEST sut was invoked')
    expect(infoMock).toHaveBeenNthCalledWith(2, 'TEST sut completed successfully')
  })

  test('log info with details when the decorated function has mappers attached', async () => {
    const func = jest.fn()
    func.mockReturnValue('output')

    const inputMapper = (details: string, value: number) => ({
      mappedDetails: details,
      mappedValue: value,
    })
    const outputMapper = (result: string) => ({
      mappedResult: result,
    })

    const sut = withLogging(logger, 'TEST', 'sut')(func, inputMapper, outputMapper)
    await sut('details', 42)

    expect(infoMock).toHaveBeenNthCalledWith(1, 'TEST sut was invoked', {
      input: { mappedDetails: 'details', mappedValue: 42 },
    })
    expect(infoMock).toHaveBeenNthCalledWith(2, 'TEST sut completed successfully', {
      output: { mappedResult: 'output' },
    })
  })

  test('rethrow when the decorated function throws', async () => {
    const func = jest.fn()

    const error = new Error()
    func.mockRejectedValue(error)

    const sut = withLogging(logger, 'TEST', 'sut')(func)
    await expect(sut('details')).rejects.toStrictEqual(error)
  })

  test('log error when the decorated function throws', async () => {
    const func = jest.fn()

    const error = new Error()
    func.mockRejectedValue(error)

    const sut = withLogging(logger, 'TEST', 'sut')(func)
    try {
      await sut('details')
    } catch {
      expect(true).toEqual(true)
    }

    expect(infoMock).toBeCalledTimes(1)
    expect(infoMock).not.toBeCalledWith('TEST sut completed successfully')

    expect(errorMock).toBeCalledTimes(1)
    expect(errorMock).toBeCalledWith('TEST sut failed', { error })
  })
})
