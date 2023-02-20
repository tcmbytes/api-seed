import { Greeting } from '@domain/types'
import { GreetingsRepo } from '@domain/boundaries'

type Row = {
  id: string
  from: string
  to: string
  message: string
  created_date: number
  modified_date: number
}

export const InMemoryGreetingsRepo = (): GreetingsRepo => {
  let rows: Row[] = []

  const create: GreetingsRepo['create'] = (greeting) => {
    const row = {
      id: greeting.id,
      from: greeting.from,
      to: greeting.to,
      message: greeting.message,
      created_date: greeting.createdOn.getTime(),
      modified_date: greeting.modifiedOn.getTime(),
    }
    rows.push(row)

    return Promise.resolve()
  }

  const update: GreetingsRepo['update'] = (greeting) => {
    const row = rows.find((row) => row.id === greeting.id)
    if (!row) {
      return Promise.resolve()
    }

    row.message = greeting.message
    row.modified_date = greeting.modifiedOn.getTime()

    return Promise.resolve()
  }

  const findById: GreetingsRepo['findById'] = (id) => {
    const row = rows.find((greeting) => greeting.id === id)
    if (!row) {
      return Promise.resolve(null)
    }

    const greeting = rowToGreeting(row)
    return Promise.resolve(greeting)
  }

  const findAll: GreetingsRepo['findAll'] = () => {
    const greetings = rows.map((row) => rowToGreeting(row))
    return Promise.resolve(greetings)
  }

  const removeById: GreetingsRepo['removeById'] = (id) => {
    rows = rows.filter((row) => row.id !== id)
    return Promise.resolve()
  }

  const rowToGreeting = (row: Row): Greeting => ({
    id: row.id,
    from: row.from,
    to: row.to,
    message: row.message,
    createdOn: new Date(row.created_date),
    modifiedOn: new Date(row.modified_date),
  })

  return {
    create,
    update,
    findById,
    findAll,
    removeById,
  }
}
