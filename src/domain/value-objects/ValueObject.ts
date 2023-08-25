export abstract class ValueObject {
  public equals(valueObject: ValueObject) {
    return JSON.stringify(this) === JSON.stringify(valueObject)
  }
}
