# API Seed

## Project setup

Make sure to have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/get-npm) installed on your machine before continuing with the setup.

```bash
$ node --version
v11.14.0

$ npm --version
6.13.2
```

### Clone the project locally

If you have `SSH` setup on your account, run the following command: 

```bash
$ git clone git@github.com:alexcristea/api-seed.git
```

Otherwise, you may use the `HTTPS` version ( might ask for username and password):

```bash
$ git clone https://github.com/alexcristea/api-seed.git
```

### Install dependencies

Change the working directory to the repo directory.

 To install the project dependencies, run the following install command:

```bash
$ npm install
```

## Development

### Start local web server

To configure the `hostname` and `port` (default: `localhost:8080`) of the web server, make sure to configure the environment variables in the `.env` file:

```bash
HOSTNAME='localhost'
PORT=8080
```

To start the app on a local server, run the following command from the root directoy of the project:

```bash
$ npm run api:start
```

### Run tests

To run the unit test, run the following command from the root directoy of the project:

```bash
$ npm run test
```

To continuously run the unit tests as you code, run the following command:

```bash
$ npm run test:watch
```

The generated tests reports are available in `./tests/reports/` directory.

### Watch mode

To continuously watch for file changes and check for syntax errors, run the following command:

```bash
$ npm run watch
```

### Docker

Make sure to have [Docker](https://docs.docker.com/get-started/) installed on your machine.

```bash
$ docker --version
Docker version 19.03.5, build 633a0ea
```

To build the Docker image, run the following command from the root directoy of the project:

```bash
$ npm run docker:build
```

To run the Docker image, run the following command from the root directoy of the project:

```bash
$ npm run docker:run
```

## Architecute and design

The `tests` document the full behaviour of the project functionality.

At this stage, the delivery mechanism is a simple `http` server that takes the input, sends it to the `sayHello()` function and returns the output to the caller. If an exception appears along the way, it will respond with a `400` error code.

### Structure

When implementing new features it is important to keep the [conceptual integrity](https://architecture.typepad.com/architecture_blog/2011/10/the-importance-of-conceptual-integrity.html) of the service by applying the: [TDD](https://en.wikipedia.org/wiki/Test-driven_development), [SOLID](https://en.wikipedia.org/wiki/SOLID), practices and following the [Clean Code](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29) philosophy.

In order to make it easy to understand and extend the codebase, the folder structure mirrors the project architecure:

```
•
├── infrastructure          // code that implements infrastructure as code
│   └── containerization    // code that implements the Docker image recepie
├── src                     // code that implements business logic, flows and other concerns (i.e. delivery)
│   ├── delivery            // code that handles the external delivery of business logic and flows (i.e. web server).
│   └── domain              // code that implements busines flow and logic. It is agnostic of the way it's deployed.
└── tests                   // code that tests the business logic.
    ├── reports             // generated tests reports.
    └── unit                // code that tests and documents the business logic.
```