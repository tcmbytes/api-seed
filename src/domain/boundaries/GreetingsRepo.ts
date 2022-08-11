import { Greeting } from '../types'

export interface GreetingsRepo {
  create: (greeting: Greeting) => Promise<void>
  update: (greeting: Greeting) => Promise<void>
  findById: (id: string) => Promise<Greeting | null>
  findAll: () => Promise<Greeting[]>
  removeById: (id: string) => Promise<void>
}
