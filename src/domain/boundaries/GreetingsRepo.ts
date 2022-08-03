export type Greeting = {
  name: string
  savedOn: Date
}

export interface GreetingsRepo {
  save: (greeting: Greeting) => Promise<void>
  findById: (id: string) => Promise<Greeting | null>
  findAll: () => Promise<Greeting[]>
}
