import sayHello from '../../../domain/hello-world'

export const HelloWorldController = async (req: any, res: any, next: any) => {
  try {
    let result = sayHello({ name: req.params.name })
    res.status(200).send(result)
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: error.message
    })
  }
}
