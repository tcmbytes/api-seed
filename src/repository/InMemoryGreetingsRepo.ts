import { Greeting, GreetingsRepo } from '../domain/boundaries'

type Row = {
  name: string
  date: number
}

export const InMemoryGreetingsRepo = (): GreetingsRepo => {
  const greetings: Row[] = []

  const save = (greeting: Greeting): Promise<void> => {
    const row = {
      name: greeting.name,
      date: greeting.savedOn.getTime(),
    }
    greetings.push(row)

    return Promise.resolve()
  }

  return {
    save: save,
  }
}
