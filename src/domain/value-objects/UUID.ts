import { ValueObject } from './ValueObject'

export class UUID extends ValueObject {
  private readonly _value: string

  constructor(value: string) {
    super()
    this._value = value.replace(/-/g, '')
  }

  get value(): string {
    return this._value
  }
}
