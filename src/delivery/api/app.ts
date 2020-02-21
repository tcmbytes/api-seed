import http from 'http'
import sayHello from '../../domain/hello-world'

require('dotenv').config()

const hostname = process.env.HOSTNAME ?? '0.0.0.0'
const port = parseInt(process.env.PORT ?? '8080')
const method = 'POST'

const server = http.createServer((req: any, res: any) => {
  console.log(`New ${req.method} request.`)
  if (req.method != method) {
    return responseWithError(res, 405)
  }

  var body = ''
  req.on('data', (chunk: any) => {
    console.log(`Received ${chunk.length} bytes of data.`)
    body += chunk
  })
  req.on('end', () => {
    console.log(`Handling request.`)
    try {
      let input = JSON.parse(body)
      let transactions = sayHello(input)
      let output = JSON.stringify(transactions)

      responseWithSuccess(res, output)
    } catch (error) {
      responseWithError(res, 400)
    }
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
  console.log(`---------`)
})

function responseWithError(res: any, code: number, message?: string) {
  let output = message ? JSON.stringify({ message: message }) : null

  res.statusCode = code
  res.setHeader('Content-Type', 'application/json')
  res.end(output)

  console.log(`Request failed with error code: ${code}.`)
  console.log(`---------`)
}

function responseWithSuccess(res: any, output: any) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(output)

  console.log(`Request was successful. Status code: 200.`)
  console.log(`---------`)
}
