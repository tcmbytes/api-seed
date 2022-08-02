export type Greeting = {
  name: string
  savedOn: Date
}

export interface GreetingsRepo {
  save: (greeting: Greeting) => Promise<void>
  findAll: () => Promise<Greeting[]>
}
