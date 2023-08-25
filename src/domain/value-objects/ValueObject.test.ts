import { ValueObject } from './ValueObject'

describe('ValueObject', () => {
  class FakeValueObject extends ValueObject {
    value: string

    constructor(value: string) {
      super()
      this.value = value
    }
  }

  const aFake = new FakeValueObject('fake_a')
  const bFake = new FakeValueObject('fake_b')

  test('returns false when value objects are different', () => {
    expect(aFake.equals(bFake)).toBeFalsy()
  })
})
