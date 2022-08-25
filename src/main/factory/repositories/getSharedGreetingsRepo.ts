import { GreetingsRepo } from 'domain/boundaries'
import { InMemoryGreetingsRepo } from 'repository/InMemoryGreetingsRepo'

const instance = InMemoryGreetingsRepo()

export const getSharedGreetingsRepo = (): GreetingsRepo => instance
