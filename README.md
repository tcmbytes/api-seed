# API Seed

The seed from which your software grows.
## Project setup

### Clone the project locally

If you have `SSH` setup on your account, run the following command:

```bash
$ git clone git@github.com:alexcristea/api-seed.git
```

Otherwise, you may use the `HTTPS` version (might ask for username and password):

```bash
$ git clone https://github.com/alexcristea/api-seed.git
```

### Install dependencies

Change the working directory to the repo directory:

```bash 
cd api-seed
```

If you're developing on macOS, then run the [setup-macos.sh](./bin/setup-macos.sh) script. It will install the system dependencies, project dependencies and the evironment for your app:

```bash
bash ./bin/setup-macos.sh
```

Otherwise, make sure to manually install [Node.js](https://nodejs.org) and [yarn](https://yarnpkg.com) on your machine before continuing with the development.

```bash
$ node --version
v11.14.0

$ yarn --version
1.22.4
```

To install the project dependencies, run the following install command:

```bash
$ yarn
```

## Development

To configure the `hostname` and `port` (default: `localhost:8080`) of the web server, make sure to configure the environment variables in the `.env` file:

```bash
cp .example.env .env
```

or copy the next lines into your `.env` file:

```bash
HOSTNAME='localhost'
PORT=8080
```

### Start local web server

To start the app on a local server, run the following command from the root directoy of the project:

```bash
$ yarn api:start
```

### Watch mode

To continuously watch for file changes and check for syntax errors, run the following command:

```bash
$ yarn api:watch
```

### Run unit tests

To run the unit test, run the following command from the root directoy of the project:

```bash
$ yarn test
```

To continuously run the unit tests as you code, run the following command:

```bash
$ yarn test:watch
```

The generated tests reports are available in `./reports/summary.html` file.

### Run end-2-end tests

To run the end-2-end test, make sure to have the app running:

```bash 
$ yarn api:watch
```

 and then run the following command from the root directoy of the project:

```bash
$ yarn test:e2e
```

### Code coverage

To generate the coverage report for your app, run the following command:

```bash
$ yarn test:coverage
```

The generated report is available in `./reports/coverage` directory.

### Docker

Make sure to have [Docker](https://docs.docker.com/get-started/) installed on your machine.

```bash
$ docker --version
Docker version 19.03.5, build 633a0ea
```

To build the Docker image, run the following command from the root directoy of the project:

```bash
$ yarn docker:build
```

To run the Docker image, run the following command from the root directoy of the project:

```bash
$ yarn docker:run
```

## Documentation

For the project technical documentation we use the [`README.md`](./README.md) file. 

For the API documentation we use sagger with the openapi 3.0 format. It is available in the [`./src/delivery/api/openapi.yml`](./src/delivery/api/openapi.yml) and its accessible at the `/docs` endpoint.

## Architecute and design

The `tests` document the full behaviour of the project functionality.

At this stage, the delivery mechanism is a simple `http` server that takes the input, sends it to the `sayHello()` function and returns the output to the caller. If an exception appears along the way, it will respond with a `400` error code.

### Structure

When implementing new features it is important to keep the [conceptual integrity](https://architecture.typepad.com/architecture_blog/2011/10/the-importance-of-conceptual-integrity.html) of the service by applying the: [TDD](https://en.wikipedia.org/wiki/Test-driven_development), [SOLID](https://en.wikipedia.org/wiki/SOLID), practices and following the [Clean Code](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29) philosophy.

In order to make it easy to understand and extend the codebase, the folder structure mirrors the project architecure:

```
api-seed
├── infrastructure          // Infrastructure as code (e.g. Docker)
│   └── containerization    // Example of Docker image
├── src                     // Production code and associated unit tests
│   ├── main                // Main layer
│   ├── delivery            // Delivery layer
│   ├── shared              // Shared functionalities between layers (e.g. Logging)
│   ├── repository          // Adapters layers (e.g. Repositories or Services)
│   └── domain              // Domain layer. It is agnostic of the way it's deployed
│       ├── boundaries      // Boundaraires to the external dependencies.
│       ├── entities        // Entities to the external dependencies.
│       └── usecases        // Busines logic. 
└── tests                   // Testing code
    ├── reports             // Generated reports
    └── e2e                 // End-2-end testing
```
