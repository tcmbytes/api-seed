import { GreetingsRepo } from '@domain/boundaries'
import { InMemoryGreetingsRepo } from '@repository'

const instance = InMemoryGreetingsRepo()

export const getSharedGreetingsRepo = (): GreetingsRepo => instance
