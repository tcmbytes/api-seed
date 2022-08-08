import { Greeting } from '../types'

export interface GreetingsRepo {
  save: (greeting: Greeting) => Promise<void>
  findById: (id: string) => Promise<Greeting | null>
  findAll: () => Promise<Greeting[]>
  remove: (id: string) => Promise<void>
}
