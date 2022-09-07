export type Greeting = {
  id: string
  from: string
  to: string
  message: string
  createdOn: Date
  modifiedOn: Date
}

export type Greetings = Greeting[]

export type CreateGreetingBody = {
  from: string
  to: string
  message: string
}

export type UpdateGreetingBody = {
  message: string
}
