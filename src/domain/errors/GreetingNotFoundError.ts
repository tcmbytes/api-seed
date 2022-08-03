import { DomainError } from './DomainError'

export class GreetingNotFoundError extends DomainError {
  constructor(greetingId: string) {
    super(`Greeting with id '${greetingId}' not found.`)
    this.name = 'GreetingNotFoundError'
  }
}
