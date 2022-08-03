import { Greeting } from 'domain/types'
import { GreetingsRepo } from 'domain/boundaries'

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

  const findById = (_id: string): Promise<Greeting | null> => Promise.resolve(null)

  const findAll = (): Promise<Greeting[]> => {
    const result = greetings.map((row) => rowToGreeting(row))
    return Promise.resolve(result)
  }

  const rowToGreeting = (row: Row): Greeting => ({
    name: row.name,
    savedOn: new Date(row.date),
  })

  return {
    save: save,
    findById: findById,
    findAll: findAll,
  }
}
