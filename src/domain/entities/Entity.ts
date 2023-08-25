import { Identifiable } from './Identifiable'

export abstract class Entity<T> implements Identifiable<T> {
  private readonly _id: T

  protected constructor(id: T) {
    this._id = id
  }

  public get id(): T {
    return this._id
  }

  public equals(entity: Entity<T>): boolean {
    return this.id === entity.id
  }
}
