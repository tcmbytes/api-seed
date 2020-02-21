import sayHello from '../../src/domain/hello-world'

test("sayHello should return the 'Hi, Anonymous!' message when called with the input name 'Anonymous'", async () => {
  // Arrange
  let input = { name: 'Anonymous' }

  // Act
  let output = sayHello(input)

  //Assert
  expect(output).toEqual({
    message: 'Hi, Anonymous!'
  })
})
