import { UUID } from './UUID'

describe('UUID value object', () => {
  const uuid = new UUID('1a834fa5-ea49-46ba-b5d5-06a47dcd2a62')

  test('UUID value to remove the dashes', () => {
    expect(uuid.value).toStrictEqual('1a834fa5ea4946bab5d506a47dcd2a62')
  })
})
