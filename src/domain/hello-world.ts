interface Input {
  name: string
}

interface Output {
  message: string
}

const sayHello = (input: Input): Output => {
  return {
    message: `Hi, ${input.name}!`
  }
}

export default sayHello
