import { GreetingsRepo } from 'domain/boundaries'
import { InMemoryGreetingsRepo } from 'repository/InMemoryGreetingsRepo'

let instance: GreetingsRepo

export const getSharedGreetingsRepo = (): GreetingsRepo => {
  if (!instance) {
    instance = InMemoryGreetingsRepo()
  }

  return instance
}
